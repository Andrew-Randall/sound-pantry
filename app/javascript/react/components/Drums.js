import React, { Component } from 'react'
import { Link } from 'react-router'
import Tone from 'tone'
import KeyboardEventHandler from 'react-keyboard-event-handler';

let kd = new Tone.Player("https://sound-pantry-dev.s3.amazonaws.com/kick1.mp3").toMaster()
let hh = new Tone.Player("https://sound-pantry-dev.s3.amazonaws.com/uploads/sample/snare3.mp3").toMaster()

kd.autostart = false;
hh.autostart = false;

let beat = document.documentElement.addEventListener(
  "mousedown", function(){
    if (Tone.context.state !== 'running') {
    Tone.context.resume();
}})

let colorsArray = ["white", "grey", "lightgrey", "black", "blue", "lightblue"]

function playKick(){
  let color = colorsArray[Math.floor(Math.random()*colorsArray.length)]

  kd.start()
  document.getElementById("kick-circle").style.backgroundColor = color
}

function playSnare(){
  let color = colorsArray[Math.floor(Math.random()*colorsArray.length)]

  hh.start()
  document.getElementById("snare-circle").style.backgroundColor = color
}

const Drums = props => {
  return(
    <div id="drums-section">
      <div>
        <KeyboardEventHandler
          handleKeys={['a']}
          onKeyEvent={playKick}
        />
        <KeyboardEventHandler
          handleKeys={['d']}
          onKeyEvent={playSnare}
        />
      </div>
        <div id="gallery-circles">
          <div id="kick-circle" />
          <div id="snare-circle" />
          <div id="hat-circle" />
        </div>
    </div>
  )
}

export default Drums
