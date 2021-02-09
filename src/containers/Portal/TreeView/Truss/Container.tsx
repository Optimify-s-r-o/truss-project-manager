import Component, { StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { priceListsGetAction } from '../../PriceLists/_actions';
import { setLoading } from '../Project/General/_actions';
import { setTruss, trussImage } from './_actions';
import { Truss } from './_types';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getTrussImage: (data: string) => dispatch(trussImage.request(data)),
	setTruss: (data: Truss) => dispatch(setTruss(data)),
	priceListsGetAction: (data: void) =>
		dispatch(priceListsGetAction.request(data)),
	setLoading: (data: void) => dispatch(setLoading()),
});

const mapStateToProps = (state: any): StateProps => ({
	routerState: state.router.location.state,
	truss: state.TrussReducer.truss,
	token: state.AuthReducer.token,
	local: state.AuthReducer.local,
	trussHub: state.HubReducer.truss,
	loadingPage: state.LoadingReducer.loadingPage,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
