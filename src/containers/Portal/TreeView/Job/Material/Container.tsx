import Component from './Component';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state: any) => ({
  jobs: state.JobReducer.jobs
});

export default compose(withRouter, connect(mapStateToProps, null))(Component);
