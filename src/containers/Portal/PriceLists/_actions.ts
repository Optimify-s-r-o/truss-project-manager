import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import { Error } from '../../../sagas/_sagas';
import {
	PriceList,
	PriceListItem,
	PriceLists,
	PriceListsPlates,
} from "./_types";

export const priceListsGetAction = createAsyncAction(
	"PRICE_LISTS_GET_REQUEST",
	"PRICE_LISTS_GET_SUCCESS",
	"PRICE_LISTS_GET_FAILED"
)<void, PriceLists, Error>();

export const priceListsPlatesGetAction = createAsyncAction(
	"PRICE_LISTS_PLATES_GET_REQUEST",
	"PRICE_LISTS_PLATES_GET_SUCCESS",
	"PRICE_LISTS_PLATES_GET_FAILED"
)<void, PriceListsPlates, Error>();

export const priceListGetByIdAction = createAsyncAction(
	"PRICE_LIST_GET_BY_ID_REQUEST",
	"PRICE_LIST_GET_BY_ID_SUCCESS",
	"PRICE_LIST_GET_BY_ID_FAILED"
)<string, PriceList, Error>();

export const createEmptyPriceListPostAction = createAsyncAction(
	"PRICE_LIST_CREATE_POST_REQUEST",
	"PRICE_LIST_CREATE_POST_SUCCESS",
	"PRICE_LIST_CREATE_POST_FAILED"
)<PriceList, any, Error>();

export const priceListDuplicatePostAction = createAsyncAction(
	"PRICE_LIST_DUPLICATE_POST_REQUEST",
	"PRICE_LIST_DUPLICATE_POST_SUCCESS",
	"PRICE_LIST_DUPLICATE_POST_FAILED"
)<PriceList, any, Error>();

export const addItemToPriceListPostAction = createAsyncAction(
	"PRICE_LIST_ADD_ITEM_POST_REQUEST",
	"PRICE_LIST_ADD_ITEM_POST_SUCCESS",
	"PRICE_LIST_ADD_ITEM_POST_FAILED"
)<PriceListItem, void, Error>();

export const priceListEditNamePutAction = createAsyncAction(
	"PRICE_LIST_EDIT_NAME_PUT_REQUEST",
	"PRICE_LIST_EDIT_NAME_PUT_SUCCESS",
	"PRICE_LIST_EDIT_NAME_PUT_FAILED"
)<PriceList, void, Error>();

export const priceListEditItemPutAction = createAsyncAction(
	"PRICE_LIST_EDIT_ITEM_PUT_REQUEST",
	"PRICE_LIST_EDIT_ITEM_PUT_SUCCESS",
	"PRICE_LIST_EDIT_ITEM_PUT_FAILED"
)<PriceListItem, void, Error>();

export const priceListDeleteAction = createAsyncAction(
	"PRICE_LIST_DELETE_REQUEST",
	"PRICE_LIST_DELTE_SUCCESS",
	"PRICE_LIST_DELETE_FAILED"
)<PriceList, void, Error>();

export const priceListDelteItemtAction = createAsyncAction(
	"PRICE_LIST_DELETE_ITEM_REQUEST",
	"PRICE_LIST_DELETE_ITEM_SUCCESS",
	"PRICE_LIST_DELETE_ITEM_FAILED"
)<PriceListItem, void, Error>();

export const clearPriceList = createAction("CLEAR_PRICE_LISTS")<void>();

export type PriceListType = ActionType<
	| typeof priceListsGetAction
	| typeof priceListGetByIdAction
	| typeof createEmptyPriceListPostAction
	| typeof addItemToPriceListPostAction
	| typeof priceListDuplicatePostAction
	| typeof priceListEditNamePutAction
	| typeof priceListEditItemPutAction
	| typeof priceListDeleteAction
	| typeof priceListDelteItemtAction
	| typeof priceListsPlatesGetAction
	| typeof clearPriceList
>;
