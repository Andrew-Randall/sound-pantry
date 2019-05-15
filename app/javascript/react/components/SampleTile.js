import React, { Component } from "react"
import { Link } from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SampleTile = props => {

  return (
    <div className="sample-tile">
      <audio id={"player-" + props.id} src={props.path}></audio>
      <div id="sample-tile">
        {props.name}
        <button className="player-buttons" onClick={props.play}><FontAwesomeIcon icon="play-circle"/></button>
        <button className="player-buttons" onClick={props.pause}><FontAwesomeIcon icon="pause"/></button>
        <a className="player-buttons" href={props.path} download={props.name}><FontAwesomeIcon icon="download"/></a>
      </div>
    </div>
  )
}

export default SampleTile;
