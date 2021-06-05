import Component, { DispatchProps, StateProps } from './Component';
import { BinRequest, BinRestore, DeleteRequest } from './_types';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
	clearBinReducer,
	deleteEntity,
	getBinAction,
	refreshFromBinAction,
} from "./_actions";

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	getBinAction: (data: BinRequest) => dispatch(getBinAction.request(data)),
	refreshFromBinAction: (data: BinRestore) =>
		dispatch(refreshFromBinAction.request(data)),
	deleteEntity: (data: DeleteRequest) => dispatch(deleteEntity.request(data)),
	clearBinReducer: () => dispatch(clearBinReducer()),
});

const mapStateToProps = (state: any): StateProps => ({
	data: state.BinReducer.data,
	pending: state.BinReducer.pending,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
