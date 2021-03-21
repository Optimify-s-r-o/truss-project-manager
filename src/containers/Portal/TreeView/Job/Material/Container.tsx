import Component, { DispatchProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getJobMaterials } from '../_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state: any) => ({
	materials: state.JobReducer.materials,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	getJobMaterials: (data: string) => dispatch(getJobMaterials.request(data)),
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
