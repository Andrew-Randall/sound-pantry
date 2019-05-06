import React, { Component } from "react";
import { Link } from "react-router";

const SampleTile = props => {
  return (
    <div className="tile">
      {props.name}<audio controls>
        <source src={props.path}/>
      </audio>
    </div>
  );
};

export default SampleTile;
