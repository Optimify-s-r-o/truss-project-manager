import { getType } from 'typesafe-actions';
import { PriceListsStateType } from './_types';
import {
  PriceListType,
  clearPriceList,
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

const initialState: PriceListsStateType = {
  error: null,
  pending: false,
  priceLists: null,
  priceList: null,
  priceListsPlates: null,
};

export const PriceListsReducer = (
  state: PriceListsStateType = initialState,
  action: PriceListType
): PriceListsStateType => {
  switch (action.type) {
    case getType(clearPriceList):
      return initialState;
    case getType(priceListsGetAction.request):
    case getType(priceListGetByIdAction.request):
    case getType(createEmptyPriceListPostAction.request):
    case getType(addItemToPriceListPostAction.request):
    case getType(priceListDuplicatePostAction.request):
    case getType(priceListEditNamePutAction.request):
    case getType(priceListEditItemPutAction.request):
    case getType(priceListDeleteAction.request):
    case getType(priceListDelteItemtAction.request):
    case getType(priceListsPlatesGetAction.request):
      return {
        ...state,
        pending: true,
      };
    case getType(priceListsGetAction.success):
      return {
        ...state,
        priceLists: action.payload.PriceLists,
      };
    case getType(priceListsPlatesGetAction.success):
      return {
        ...state,
        priceListsPlates: action.payload.Plates,
      };
    case getType(priceListGetByIdAction.success):
      return {
        ...state,
        priceList: action.payload,
      };
    case getType(createEmptyPriceListPostAction.success):
    case getType(addItemToPriceListPostAction.success):
    case getType(priceListDuplicatePostAction.success):
    case getType(priceListEditNamePutAction.success):
    case getType(priceListEditItemPutAction.success):
    case getType(priceListDeleteAction.success):
    case getType(priceListDelteItemtAction.success):
      return {
        ...state,
        pending: false,
      };

    case getType(priceListsGetAction.failure):
    case getType(priceListGetByIdAction.failure):
    case getType(createEmptyPriceListPostAction.failure):
    case getType(addItemToPriceListPostAction.failure):
    case getType(priceListDuplicatePostAction.failure):
    case getType(priceListEditNamePutAction.failure):
    case getType(priceListEditItemPutAction.failure):
    case getType(priceListDeleteAction.failure):
    case getType(priceListDelteItemtAction.failure):
    case getType(priceListsPlatesGetAction.failure):
      return {
        ...state,
        error: action.payload.ErrorMessage,
        pending: false,
      };
    default:
      return state;
  }
};
