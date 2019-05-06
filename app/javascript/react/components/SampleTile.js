import React, { Component } from "react";
import { Link } from "react-router";

const SampleTile = props => {

  return (
    <div className="tile">
      <audio id={"player-" + props.id} src={props.path}></audio>
      <div>
        <button onClick={props.play}>Play</button>
        <button onClick={props.pause}>Pause</button>
        <button onClick={props.volumeUp}>Vol+</button>
        <button onClick={props.volumeDown}>Vol-</button>
      </div>
    </div>
  );
};

export default SampleTile;
