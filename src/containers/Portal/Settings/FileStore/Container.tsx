import Component, { DispatchProps, StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Fetch } from '../../../../types/_types';
import { fileChangeRootPath } from '../../../../sagas/DownloadFile/_actions';
import { RootStateType } from '../../../../reducers';
import { settings } from '../../_actions';
import { setTrussFilesPath } from 'src/containers/Portal/_actions';
import { withRouter } from 'react-router';

const mapStateToProps = (state: RootStateType): StateProps => ({
	routerState: state.router.location.state,
	settingsEntity: state.SettingsReducer.settings,
	local: state.AuthReducer.local,
	cloud: state.AuthReducer.cloud,
	role: state.AuthReducer.role,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	settingsCall: (data: Fetch) => dispatch(settings.request(data)),
	fileChangeRootPath: (data: string) =>
		dispatch(fileChangeRootPath.request(data)),
	trussFilesPath: (data: string) => dispatch(setTrussFilesPath(data)),
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
