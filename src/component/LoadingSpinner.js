import React from "react";

const LoadingSpinner = props => (
  <div className={props.floatLeft ? "float-left" : "text-center"}>
    <i className="fa fa-spinner fa-spin" />{" "}
    {props.dataToHide ? "" : "Loading..."}
  </div>
);

export default LoadingSpinner;
