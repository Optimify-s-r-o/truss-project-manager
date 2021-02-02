import Component, { DispatchProps, StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { priceListsPlatesGetAction } from '../PriceLists/_actions';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  priceListsPlatesGetAction: (data: void) =>
    dispatch(priceListsPlatesGetAction.request(data)),
});

const mapStateToProps = (state: any): StateProps => ({
  priceListsPlates: state.PriceListsReducer.priceListsPlates,
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Component);
