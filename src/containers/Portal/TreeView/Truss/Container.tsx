import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose, Dispatch } from "redux";
import { priceListsGetAction } from "../../PriceLists/_actions";
import Component, { StateProps } from "./Component";
import { setTruss, trussImage } from "./_actions";
import { Truss } from "./_types";

const mapDispatchToProps = (dispatch: Dispatch) => ({
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
