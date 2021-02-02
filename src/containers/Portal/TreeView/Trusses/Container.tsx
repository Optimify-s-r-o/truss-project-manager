import Component, { StateProps } from './Component';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getTruss } from '../Truss/_actions';
import { TrussRequest } from '../Truss/_types';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getTrussesRequest: (data: TrussRequest) => dispatch(getTruss.request(data))
});

const mapStateToProps = (state: any): StateProps => ({
  pending: state.TrussReducer.pending,
  truss: state.TrussReducer.truss,
  routerState: state.router.location.state
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Component);
