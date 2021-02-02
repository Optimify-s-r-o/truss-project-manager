import { ApiURL } from '../../../constants/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Error, fetchSaga } from '../../../sagas/_sagas';
import { getType } from 'typesafe-actions';
import { lang, t } from '../../../translation/i18n';
import { Method } from '../../../constants/enum';
import { notificationAction } from '../../../components/Toast/_actions';
import { Status } from '../../../components/Toast/_types';
import { translationPath } from '../../../utils/getPath';
import {
  priceListsGetAction,
  priceListGetByIdAction,
  createEmptyPriceListPostAction,
  addItemToPriceListPostAction,
  priceListDuplicatePostAction,
  priceListEditNamePutAction,
  priceListEditItemPutAction,
  priceListDeleteAction,
  priceListDelteItemtAction,
  priceListsPlatesGetAction,
} from './_actions';

function* priceListGetActionSaga(
  action: ReturnType<typeof priceListsGetAction.request>
): Generator {
  try {
    // @ts-ignore
    const { errorResponseData, response, success, statusText } = yield call(
      fetchSaga,
      ApiURL.PRICE_LIST,
      Method.GET
    );

    if (!success) {
      yield put(priceListsGetAction.failure(errorResponseData));
      return;
    }

    yield put(priceListsGetAction.success(response));
  } catch (err) {
    yield put(
      notificationAction({
        code: Status.ERROR,
        message: t(translationPath(lang.common.errorMessage)),
      })
    );
    yield put(priceListsGetAction.failure(err));
  }
}

function* priceListPlatesGetActionSaga(
  action: ReturnType<typeof priceListsPlatesGetAction.request>
): Generator {
  try {
    // @ts-ignore
    const { errorResponseData, response, success, statusText } = yield call(
      fetchSaga,
      ApiURL.PRICE_LIST_PLATES,
      Method.GET
    );

    if (!success) {
      yield put(priceListsPlatesGetAction.failure(errorResponseData));
      return;
    }

    yield put(priceListsPlatesGetAction.success(response));
  } catch (err) {
    yield put(
      notificationAction({
        code: Status.ERROR,
        message: t(translationPath(lang.common.errorMessage)),
      })
    );
    yield put(priceListsPlatesGetAction.failure(err));
  }
}

function* priceListGetByIdActionSaga(
  action: ReturnType<typeof priceListGetByIdAction.request>
): Generator {
  try {
    // @ts-ignore
    const { errorResponseData, response, success, statusText } = yield call(
      fetchSaga,
      ApiURL.PRICE_LIST,
      Method.GET,
      {
        param: action.payload,
      }
    );

    if (!success) {
      yield put(priceListGetByIdAction.failure(errorResponseData));
      return;
    }

    yield put(priceListGetByIdAction.success(response));
  } catch (err) {
    yield put(
      notificationAction({
        code: Status.ERROR,
        message: t(translationPath(lang.common.errorMessage)),
      })
    );
    yield put(priceListGetByIdAction.failure(err));
  }
}

function* createEmptyPriceListPostActionSaga(
  action: ReturnType<typeof createEmptyPriceListPostAction.request>
): Generator {
  try {
    // @ts-ignore
    const { errorResponseData, response, success, statusText } = yield call(
      fetchSaga,
      ApiURL.PRICE_LIST,
      Method.POST,
      {
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
      yield put(createEmptyPriceListPostAction.failure(errorResponseData));
      return;
    }
    yield put(priceListsGetAction.request());
    yield put(createEmptyPriceListPostAction.success(response));
  } catch (err) {
    yield put(
      notificationAction({
        code: Status.ERROR,
        message: t(translationPath(lang.common.errorMessage)),
      })
    );
    yield put(createEmptyPriceListPostAction.failure(err));
  }
}

function* priceListAddItemPostActionSaga(
  action: ReturnType<typeof addItemToPriceListPostAction.request>
): Generator {
  try {
    // @ts-ignore
    const { errorResponseData, response, success, statusText } = yield call(
      fetchSaga,
      ApiURL.PRICE_LIST_ITEM,
      Method.POST,
      {
        bodyJSON: { priceListId: action.payload.Id },
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
      yield put(addItemToPriceListPostAction.failure(errorResponseData));
      return;
    }
    yield put(priceListGetByIdAction.request(action.payload.Id));
    yield put(addItemToPriceListPostAction.success(response));
  } catch (err) {
    yield put(
      notificationAction({
        code: Status.ERROR,
        message: t(translationPath(lang.common.errorMessage)),
      })
    );
    yield put(addItemToPriceListPostAction.failure(err));
  }
}

function* priceListDuplicatePostActionSaga(
  action: ReturnType<typeof priceListDuplicatePostAction.request>
): Generator {
  try {
    // @ts-ignore
    const { errorResponseData, response, success, statusText } = yield call(
      fetchSaga,
      ApiURL.PRICE_LIST_DUPLICATE,
      Method.POST,
      {
        param: action.payload.Id,
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
      yield put(addItemToPriceListPostAction.failure(errorResponseData));
      return;
    }
    yield put(priceListGetByIdAction.request(action.payload.Id));
    yield put(priceListDuplicatePostAction.success(response));
  } catch (err) {
    yield put(
      notificationAction({
        code: Status.ERROR,
        message: t(translationPath(lang.common.errorMessage)),
      })
    );
    yield put(priceListDuplicatePostAction.failure(err));
  }
}

function* priceListPutActionSaga(
  action: ReturnType<typeof priceListEditNamePutAction.request>
): Generator {
  try {
    // @ts-ignore
    const { errorResponseData, response, success, statusText } = yield call(
      fetchSaga,
      ApiURL.PRICE_LIST,
      Method.PUT,
      {
        param: action.payload.Id,
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
      yield put(priceListEditNamePutAction.failure(errorResponseData));
      return;
    }
    yield put(priceListsGetAction.request());
    yield put(priceListGetByIdAction.request(action.payload.Id));
    yield put(priceListEditNamePutAction.success(response));
  } catch (err) {
    yield put(
      notificationAction({
        code: Status.ERROR,
        message: t(translationPath(lang.common.errorMessage)),
      })
    );
    yield put(priceListEditNamePutAction.failure(err));
  }
}

function* priceListEditItemPutActionSaga(
  action: ReturnType<typeof priceListEditItemPutAction.request>
): Generator {
  try {
    // @ts-ignore
    const { errorResponseData, response, success, statusText } = yield call(
      fetchSaga,
      ApiURL.PRICE_LIST_ITEMS,
      Method.PUT,
      {
        param: action.payload.Id,
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
      yield put(priceListEditItemPutAction.failure(errorResponseData));
      return;
    }
    yield put(priceListGetByIdAction.request(action.payload.PriceListId));
    yield put(priceListEditItemPutAction.success(response));
  } catch (err) {
    yield put(
      notificationAction({
        code: Status.ERROR,
        message: t(translationPath(lang.common.errorMessage)),
      })
    );
    yield put(priceListEditItemPutAction.failure(err));
  }
}

function* priceListDeleteActionSaga(
  action: ReturnType<typeof priceListDeleteAction.request>
): Generator {
  try {
    // @ts-ignore
    const { errorResponseData, response, success, statusText } = yield call(
      fetchSaga,
      ApiURL.PRICE_LIST,
      Method.DELETE,
      {
        param: action.payload.Id,
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
      yield put(priceListDeleteAction.failure(errorResponseData));
      return;
    }
    yield put(priceListsGetAction.request());
    yield put(priceListDeleteAction.success(response));
  } catch (err) {
    yield put(
      notificationAction({
        code: Status.ERROR,
        message: t(translationPath(lang.common.errorMessage)),
      })
    );
    yield put(priceListDeleteAction.failure(err));
  }
}

function* priceListDeleteItemActionSaga(
  action: ReturnType<typeof priceListDelteItemtAction.request>
): Generator {
  try {
    // @ts-ignore
    const { errorResponseData, response, success, statusText } = yield call(
      fetchSaga,
      ApiURL.PRICE_LIST_ITEMS,
      Method.DELETE,
      {
        param: action.payload.Id,
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
      yield put(priceListDelteItemtAction.failure(errorResponseData));
      return;
    }
    yield put(priceListsGetAction.request());
    yield put(priceListDelteItemtAction.success(response));
  } catch (err) {
    yield put(
      notificationAction({
        code: Status.ERROR,
        message: t(translationPath(lang.common.errorMessage)),
      })
    );
    yield put(priceListDelteItemtAction.failure(err));
  }
}

export function* watchGetPriceListsAction() {
  yield takeLatest(
    getType(priceListsGetAction.request),
    priceListGetActionSaga
  );
}

export function* watchGetPriceListByIdAction() {
  yield takeLatest(
    getType(priceListGetByIdAction.request),
    priceListGetByIdActionSaga
  );
}

export function* watchCreateEmptyPriceListPostAction() {
  yield takeLatest(
    getType(createEmptyPriceListPostAction.request),
    createEmptyPriceListPostActionSaga
  );
}
export function* watchPriceListDuplicatePostAction() {
  yield takeLatest(
    getType(priceListDuplicatePostAction.request),
    priceListDuplicatePostActionSaga
  );
}

export function* watchAddItemToPriceListPostAction() {
  yield takeLatest(
    getType(addItemToPriceListPostAction.request),
    priceListAddItemPostActionSaga
  );
}
export function* watchPriceListPutAction() {
  yield takeLatest(
    getType(priceListEditNamePutAction.request),
    priceListPutActionSaga
  );
}
export function* watchPriceListEditItemPutAction() {
  yield takeLatest(
    getType(priceListEditItemPutAction.request),
    priceListEditItemPutActionSaga
  );
}
export function* watchPriceListDeleteAction() {
  yield takeLatest(
    getType(priceListDeleteAction.request),
    priceListDeleteActionSaga
  );
}
export function* watchPriceListDeleteItemAction() {
  yield takeLatest(
    getType(priceListDelteItemtAction.request),
    priceListDeleteItemActionSaga
  );
}
export function* watchPriceListPlatesGetAction() {
  yield takeLatest(
    getType(priceListsPlatesGetAction.request),
    priceListPlatesGetActionSaga
  );
}
