import React, { Component } from "react"
import { Link } from "react-router"

const SampleTile = props => {

  return (
    <div className="sample-tile">
      <audio id={"player-" + props.id} src={props.path}></audio>
      <div>
        {props.name}<button id="player-buttons" onClick={props.play}>Play</button>
        <button id="player-buttons" onClick={props.pause}>Pause</button>
        <button id="player-buttons" onClick={props.volumeUp}>Vol+</button>
        <button id="player-buttons" onClick={props.volumeDown}>Vol-</button>
        <a id="player-buttons" href={props.path} download={props.name}>Download</a>
      </div>
    </div>
  )
}

export default SampleTile;
