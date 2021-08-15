import Component, { StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Credentials } from './_types';
import { Folder } from 'src/types/_types';
import { login } from './_actions';
import { RootStateType } from '../../../reducers';
import { setFolders } from 'src/containers/Portal/_actions';
import { setTrussFilesPath } from '../../Portal/_actions';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch: Dispatch) => ({
	login: (data: Credentials) => dispatch(login.request(data)),
	setFolders: (data: Folder) => dispatch(setFolders(data)),
	setTrussFilesPath: (data: string) => dispatch(setTrussFilesPath(data)),
});

const mapStateToProps = (state: RootStateType): StateProps => ({
	pending: state.AuthReducer.pending,
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(Component);
