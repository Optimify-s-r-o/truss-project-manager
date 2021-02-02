import Component, { DispatchProps, StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ViewerRequest } from './_types';
import { withRouter } from 'react-router-dom';
import {
  clearModels,
  deleteModel,
  editModelPutAction,
  modelsGetAction,
  uploadModelPostAction,
} from './_actions';


const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  uploadModelPostAction: (data: ViewerRequest) =>
    dispatch(uploadModelPostAction.request(data)),
  editModelPutAction: (data: ViewerRequest) =>
    dispatch(editModelPutAction.request(data)),
  modelsGetAction: (data: string) => dispatch(modelsGetAction.request(data)),
  deleteModel: (data: string) => dispatch(deleteModel.request(data)),
  clearModels: (data: void) => dispatch(clearModels()),
});

const mapStateToProps = (state: any): StateProps => ({
  models: state.ViewerReducer.models,
  pending: state.ViewerReducer.pending,
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Component);
