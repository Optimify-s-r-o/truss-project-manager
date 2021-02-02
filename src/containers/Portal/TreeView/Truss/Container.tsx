import Component, { StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getTruss, setTruss, trussImage } from './_actions';
import { priceListsGetAction } from '../../PriceLists/_actions';
import { Truss, TrussRequest } from './_types';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getTrussRequest: (data: TrussRequest) => dispatch(getTruss.request(data)),
	getTrussImage: (data: string) => dispatch(trussImage.request(data)),
	setTruss: (data: Truss) => dispatch(setTruss(data)),
	priceListsGetAction: (data: void) =>
		dispatch(priceListsGetAction.request(data)),
});

const mapStateToProps = (state: any): StateProps => ({
	routerState: state.router.location.state,
	truss: state.TrussReducer.truss,
	token: state.AuthReducer.token,
	local: state.AuthReducer.local,
	trussHub: state.HubReducer.truss,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
