import Component, { DispatchProps, StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Fetch } from '../../../../types/_types';
import { getOrganization, updateOrganization } from '../Organization/_actions';
import { Organization } from '../Organization/_types';
import { RootStateType } from '../../../../reducers';
import { settings } from '../../_actions';
import { withRouter } from 'react-router';

const mapStateToProps = (state: RootStateType): StateProps => ({
	routerState: state.router.location.state,
	settingsEntity: state.SettingsReducer.settings,
	local: state.AuthReducer.local,
	cloud: state.AuthReducer.cloud,
	organization: state.OrganizationReducer.organization,
	pending: state.OrganizationReducer.pending,
	role: state.AuthReducer.role,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	updateOrganization: (data: Organization) =>
		dispatch(updateOrganization.request(data)),
	getOrganization: (data: void) => dispatch(getOrganization.request(data)),
	settingsCall: (data: Fetch) => dispatch(settings.request(data)),
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
