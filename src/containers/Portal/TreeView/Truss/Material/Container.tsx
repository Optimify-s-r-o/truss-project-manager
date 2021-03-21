import Component, { DispatchProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getTrussMaterials } from '../_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state: any) => ({
	pending: state.TrussReducer.pending,
	truss: state.TrussReducer.truss,
	image: state.TrussReducer.image,
	materials: state.TrussReducer.materials,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	getTrussMaterials: (data: string) =>
		dispatch(getTrussMaterials.request(data)),
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
