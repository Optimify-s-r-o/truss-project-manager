import Component, { StateProps } from './Component';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setExpandedKeys, setSelectedKeys } from '../TreeView/_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state: any): StateProps => ({
	pending: state.SearchedReducer.pending,
	searched: state.SearchedReducer.searched,
	routerState: state.router.location.state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setSelectedKeys: (data: string[]) => dispatch(setSelectedKeys(data)),
	setExpandedKeys: (data: string[]) => dispatch(setExpandedKeys(data)),
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
