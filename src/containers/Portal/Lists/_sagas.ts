import { ApiURL } from '../../../constants/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Error, fetchSaga } from '../../../sagas/_sagas';
import { getHeaderSettings, putHeaderSettings } from './_action';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../../translation/i18n';
import { Method } from '../../../constants/enum';
import { notificationAction } from '../../../components/Toast/_actions';
import { Status } from '../../../components/Toast/_types';
import { translationPath } from '../../../utils/getPath';

function* getHeadersSettingsActionSaga(
	action: ReturnType<typeof getHeaderSettings.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.SETTINGS_HEADERS,
			Method.GET,
			{
				param: action.payload,
			}
		);

		if (!success) {
			yield put(getHeaderSettings.failure(errorResponseData));
			return;
		}

		yield put(getHeaderSettings.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(getHeaderSettings.failure(err));
	}
}

function* putHeadersSettingsActionSaga(
	action: ReturnType<typeof putHeaderSettings.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.SETTINGS_HEADERS,
			Method.PUT,
			{
				param: action.payload.Param,
				bodyJSON: action.payload,
			}
		);

		if (!success) {
			yield put(
				notificationAction({
					code: Status.ERROR,
					message: t(
						translationPath(
							lang.common[(errorResponseData as Error).ErrorMessage]
						)
					),
				})
			);
			yield put(putHeaderSettings.failure(errorResponseData));
			return;
		}
		yield put(putHeaderSettings.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(putHeaderSettings.failure(err));
	}
}

export function* watchPutHeadersSettingsAction() {
	yield takeLatest(
		getType(putHeaderSettings.request),
		putHeadersSettingsActionSaga
	);
}

export function* watchGetHeadersSettingsAction() {
	yield takeLatest(
		getType(getHeaderSettings.request),
		getHeadersSettingsActionSaga
	);
}
