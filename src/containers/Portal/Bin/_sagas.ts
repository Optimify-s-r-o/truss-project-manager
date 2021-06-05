import { ApiURL } from '../../../constants/api';
import {
	call,
	put,
	select,
	takeLatest
	} from 'redux-saga/effects';
import { Error, fetchSaga } from '../../../sagas/_sagas';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../../translation/i18n';
import { Method } from '../../../constants/enum';
import { notificationAction } from '../../../components/Toast/_actions';
import { Status } from '../../../components/Toast/_types';
import { translationPath } from '../../../utils/getPath';
import {
	deleteEntity,
	emptyBin,
	getBinAction,
	refreshFromBinAction,
} from "./_actions";

function* getBinByParamActionSaga(
	action: ReturnType<typeof getBinAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.BIN + `/${action.payload.type}`,
			Method.GET,
			{
				urlWildCards: {
					PageSize: action.payload.PageSize || null,
					Page: action.payload.Page || null,
				},
			}
		);

		if (!success) {
			yield put(getBinAction.failure(errorResponseData));
			return;
		}

		yield put(getBinAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(getBinAction.failure(err));
	}
}

function* refreshFromBinActionSaga(
	action: ReturnType<typeof refreshFromBinAction.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.BIN_RESTORE,
			Method.POST,
			{
				param: action.payload.type,
				bodyJSON: { Id: action.payload.id },
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
			yield put(refreshFromBinAction.failure(errorResponseData));
			return;
		}
		const currentData: any = yield select(
			(state: any) => state.BinReducer.data
		);
		yield put(
			getBinAction.request({
				type: action.payload.type,
				PageSize: currentData?.SettingsPageSize,
				Page:
					currentData?.CurrentPage == 1
						? currentData?.CurrentPage - 1
						: currentData?.Data.length == 1
						? currentData?.CurrentPage - 2
						: currentData?.CurrentPage - 1,
			})
		);
		yield put(refreshFromBinAction.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(refreshFromBinAction.failure(err));
	}
}

function* deleteEntityActionSaga(
	action: ReturnType<typeof deleteEntity.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.API + `${action.payload.type}/${action.payload.id}/permanent`,
			Method.DELETE
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
			yield put(deleteEntity.failure(errorResponseData));
			return;
		}
		const currentData: any = yield select(
			(state: any) => state.BinReducer.data
		);
		yield put(
			getBinAction.request({
				type: action.payload.type,
				PageSize: currentData?.SettingsPageSize,
				Page:
					currentData?.CurrentPage == 1
						? currentData?.CurrentPage - 1
						: currentData?.Data.length == 1
						? currentData?.CurrentPage - 2
						: currentData?.CurrentPage - 1,
			})
		);
		yield put(deleteEntity.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(deleteEntity.failure(err));
	}
}

function* emptyBinActionSaga(
	action: ReturnType<typeof emptyBin.request>
): Generator {
	try {
		// @ts-ignore
		const { errorResponseData, response, success, statusText } = yield call(
			fetchSaga,
			ApiURL.BIN + `/${action.payload.type}/empty`,
			Method.DELETE
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
			yield put(emptyBin.failure(errorResponseData));
			return;
		}
		yield put(getBinAction.request({ type: action.payload.type }));
		yield put(emptyBin.success(response));
	} catch (err) {
		yield put(
			notificationAction({
				code: Status.ERROR,
				message: t(translationPath(lang.common.errorMessage)),
			})
		);
		yield put(emptyBin.failure(err));
	}
}

export function* watchDeleteEntityAction() {
	yield takeLatest(getType(deleteEntity.request), deleteEntityActionSaga);
}

export function* watchEmptyBinAction() {
	yield takeLatest(getType(emptyBin.request), emptyBinActionSaga);
}

export function* watchRefreshFromBinActionSaga() {
	yield takeLatest(
		getType(refreshFromBinAction.request),
		refreshFromBinActionSaga
	);
}

export function* watchGetBinByParamActionSaga() {
	yield takeLatest(getType(getBinAction.request), getBinByParamActionSaga);
}
