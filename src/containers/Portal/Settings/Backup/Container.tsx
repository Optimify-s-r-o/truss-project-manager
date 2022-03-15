import Component, { DispatchProps, StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootStateType } from '../../../../reducers';
import { withRouter } from 'react-router';
import {createBackup, setBackupDownloadingText} from "./_actions";
import {BackupRequest} from "./_types";

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	createBackup: (data: BackupRequest) =>
		dispatch(createBackup.request(data)),
});

const mapStateToProps = (state: RootStateType): StateProps => ({
	status: state.BackupReducer.status,
	pending: state.BackupReducer.pending,
	downloadingText: state.BackupReducer.downloadingText
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
