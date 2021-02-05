import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose, Dispatch } from "redux";
import { Page } from "../../../../types/_types";
import { getTruss } from "../Truss/_actions";
import Component, { StateProps } from "./Component";

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getTrussesRequest: (data: Page) => dispatch(getTruss.request(data)),
});

const mapStateToProps = (state: any): StateProps => ({
	pending: state.TrussReducer.pending,
	truss: state.TrussReducer.truss,
	routerState: state.router.location.state,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
