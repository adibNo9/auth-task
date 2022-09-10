import React from "react";
import "./skeleton.css";

const Skeleton = () => {
  return (
    <div className="ui segment boxes">
      <div className="ui active dimmer">
        <div className="ui medium text loader">Loading</div>
      </div>
      <p className="row"></p>
      <p className="row"></p>
      <p className="row"></p>
    </div>
  );
};

export default Skeleton;
