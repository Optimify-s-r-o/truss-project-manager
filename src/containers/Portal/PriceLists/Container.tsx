import Component, { DispatchProps, StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { PriceList, PriceListItem } from './_types';
import { withRouter } from 'react-router-dom';
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
} from './_actions';

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  priceListsGetAction: (data: void) =>
    dispatch(priceListsGetAction.request(data)),
  priceListGetByIdAction: (data: string) =>
    dispatch(priceListGetByIdAction.request(data)),
  createEmptyPriceListPostAction: (data: PriceList) =>
    dispatch(createEmptyPriceListPostAction.request(data)),
  addItemToPriceListPostAction: (data: PriceListItem) =>
    dispatch(addItemToPriceListPostAction.request(data)),

  priceListDuplicatePostAction: (data: PriceList) =>
    dispatch(priceListDuplicatePostAction.request(data)),
  priceListEditNamePutAction: (data: PriceList) =>
    dispatch(priceListEditNamePutAction.request(data)),
  priceListEditItemPutAction: (data: PriceListItem) =>
    dispatch(priceListEditItemPutAction.request(data)),
  priceListDeleteAction: (data: PriceList) =>
    dispatch(priceListDeleteAction.request(data)),
  priceListDelteItemtAction: (data: PriceListItem) =>
    dispatch(priceListDelteItemtAction.request(data)),
});

const mapStateToProps = (state: any): StateProps => ({
  priceLists: state.PriceListsReducer.priceLists,
  priceList: state.PriceListsReducer.priceList,
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Component);
