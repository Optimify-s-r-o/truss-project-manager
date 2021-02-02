
import React from "react";
import { connect } from "react-redux";

export default (mapStateToProps, dispatchMappingPromise, ...rest) => Component =>
  React.lazy(() =>
    dispatchMappingPromise.then(mapDispatchToProps => ({
      default: connect(
        mapStateToProps,
        mapDispatchToProps,
        ...rest
      )(Component)
    }))
  );