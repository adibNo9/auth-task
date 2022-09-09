import "./PageSkeleton.css";
import React from "react";

const PageSkeleton = () => {
  return (
    <div className="ui segment pageLoader">
      <div className="ui active inverted dimmer">
        <div className="ui large text loader">Loading</div>
      </div>
    </div>
  );
};

export default PageSkeleton;
