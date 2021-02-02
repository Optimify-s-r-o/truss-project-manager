import Component from './Component';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state: any) => ({
  pending: state.TrussReducer.pending,
  truss: state.TrussReducer.truss,
  image: state.TrussReducer.image
});

export default compose(withRouter, connect(mapStateToProps, null))(Component);
