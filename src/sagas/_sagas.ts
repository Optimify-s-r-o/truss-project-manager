import Cookies from 'universal-cookie';
import { ApiURL } from '../constants/api';
import { call, put } from 'redux-saga/effects';
import { getLanguage, lang, t } from '../translation/i18n';
import { notificationAction } from '../components/Toast/_actions';
import { push } from 'connected-react-router';
import { Routes } from '../constants/routes';
import { Status } from '../components/Toast/_types';
import { translationPath } from '../utils/getPath';

export const query = (params: WildCards) => {
	const queryString = Object.keys(params)
		.map((k) => `${encodeURIComponent(params[k])}`)
		.join("/");

	return `/${queryString}`;
};

export const getParam = (params: WildCards) => {
	const queryString = Object.keys(params)
		.map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
		.join("&");

	return `?${queryString}`;
};

export const getParamObject = (params: object) => {
	return Object.keys(params)
		.map((k) => `${encodeURIComponent(params[k])}`)
		.join("/");
};

export const getAppUrl = (server: string) => {
	return server;
};

export type WildCards = Record<string, string | number>;

export const replaceWildCards = (url: string, wildCards?: WildCards) => {
	if (!wildCards) {
		return url;
	}

	return Object.keys(wildCards).reduce(
		(acc, key) => acc.replace(`:${key}`, `${wildCards[key]}`),
		url
	);
};

export interface FetchSagaReponseType {
	errorResponse?: Error;
	errorResponseData?: object;
	response?: object | string;
	status?: number;
	success?: boolean;
	headers?: any;
}

export interface Error {
	ErrorMessage: string;
	ErrorStatus: number;
	TimeOccured: string;
}

const createRequestParams = ({
	bodyFormData,
	bodyJSON,
	method,
	token,
}: {
	bodyFormData?: FormData;
	bodyJSON?: object;
	method: string;
	token: string;
}): RequestInit => {
	const headers: HeadersInit = {
		...(getLanguage && { "Accept-Language": getLanguage() }),
		Accept: "application/json",
		"no-cors": "true",
		"Access-Control-Allow-Origin": "*",
		...(token && { Authorization: `Bearer ${token}` }),
		...(bodyJSON && { "Content-Type": "application/json" }),
	} as HeadersInit;

	let body = null;

	if ((method === "POST" || method === "PUT") && bodyJSON) {
		body = JSON.stringify(bodyJSON);
	}

	if ((method === "POST" || method === "PUT") && bodyFormData) {
		body = bodyFormData;
	}

	const params = {
		body,
		headers,
		method,
	};

	return params;
};

export const makeUrl = (
	url: string,
	server: string,
	params?: WildCards,
	urlWildCards?: WildCards,
	param?: string,
	paramObject?: object
) => {
	const endpoint = replaceWildCards(url, urlWildCards);
	const appUrl: string = `${getAppUrl(server)}${endpoint}`;
	if (param) {
		return appUrl + "/" + param;
	} else if (urlWildCards) {
		return appUrl + getParam(urlWildCards);
	} else if (paramObject) {
		return appUrl + "/" + getParamObject(paramObject);
	}
	return appUrl;
};

// checks if content-type is application/json and if so, parses it
// because response.json() fails when there is no body in response
// e.g. 200 success response without body
const parseResponse = (response: Response) => {
	const contentType = response.headers.get("content-type");
	if (contentType && contentType.indexOf("application/json") !== -1) {
		return response.json();
	} else {
		return response.blob();
	}
};

export function* fetchSaga(
	url: ApiURL | any,
	method: string = "GET",
	{
		bodyJSON,
		bodyFormData,
		params,
		urlWildCards,
		param,
		paramObject,
	}: {
		bodyJSON?: object;
		bodyFormData?: FormData;
		params?: Record<string, string>;
		urlWildCards?: WildCards;
		param?: string;
		paramObject?: object;
	} = {}
): any {
	let fetchData: FetchSagaReponseType;

	try {
		const token = new Cookies().get("token");
		const requestParams = yield call(createRequestParams, {
			bodyFormData,
			bodyJSON,
			method,
			token,
		});

		const server = process.env.REACT_APP_BACKEND_API;

		const appUrl = yield call(
			makeUrl,
			url,
			server,
			params,
			urlWildCards,
			param,
			paramObject
		);
		const response = yield call(fetch, appUrl, requestParams);
		const responseData = yield call(parseResponse, response);

		if (response.ok) {
			fetchData = yield {
				response: responseData,
				status: response.status,
				success: true,
				headers: response.headers,
			};

			return fetchData;
		}

		if (response.status === 401) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(translationPath(lang.common.InvalidToken)),
				})
			);
			yield put(push(Routes.HOME));
			return;
		}

		if (response.status === 502 || response.status === 503) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(translationPath(lang.common.errorMessage503)),
				})
			);
			yield put(push(Routes.HOME));
			return;
		}

		if (response.status === 422) {
			fetchData = yield {
				response: null,
				status: 422,
				success: false,
				errorResponseData: responseData,
			};
		}

		return fetchData;
	} catch (ex) {
		console.log(ex);
		fetchData = yield {
			response: null,
			status: null,
			success: false,
		};

		return fetchData;
	}
}
