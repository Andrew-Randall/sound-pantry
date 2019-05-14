import React, { Component } from 'react'
import { Link } from 'react-router'
import Tone from 'tone'
import KeyboardEventHandler from 'react-keyboard-event-handler';

class Drums extends Component {
  constructor(props) {
    super(props)
    this.state={
      kicks: [],
      snares: [],
      hats: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/drums', {
      credentials: "same-origin",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
          throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      ({kicks: body.kickSamples, snares: body.snareSamples, hats: body.hatSamples})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render(){
    let beat = document.documentElement.addEventListener(
      "mousedown", function(){
        if (Tone.context.state !== 'running') {
          Tone.context.resume();
        }
      }
    )

    let kickPathsArray = []
    this.state.kicks.forEach(kick => {
      kickPathsArray.push(kick.path)
    })

    let randKickPath = kickPathsArray[Math.floor(Math.random()*kickPathsArray.length)]

    let kd = new Tone.Player("https://sound-pantry-dev.s3.amazonaws.com/uploads/sample/kick1.mp3").toMaster()
    let sn = new Tone.Player("https://sound-pantry-dev.s3.amazonaws.com/uploads/sample/snare3.mp3").toMaster()
    let hh = new Tone.Player("https://sound-pantry-dev.s3.amazonaws.com/uploads/sample/hat2.mp3").toMaster()

    kd.autostart = false;
    sn.autostart = false;
    hh.autostart = false;

    let colorsArray = ["#1D2E4C", "#1A5D65", "#3C8E77", "#75616B", "#BFCFF7", "#0B0E31", "#7F9CA0", "#556270", "#480048", "#4A403D", "#99B2B7", "#373737", "#292C37"]

    function playKick(){
      let color = colorsArray[Math.floor(Math.random()*colorsArray.length)]

      kd.start()
      document.getElementById("kick-circle").style.backgroundColor = color
    }

    function playSnare(){
      let color = colorsArray[Math.floor(Math.random()*colorsArray.length)]

      sn.start()
      document.getElementById("snare-circle").style.backgroundColor = color
    }

    function playHat(){
      let color = colorsArray[Math.floor(Math.random()*colorsArray.length)]

      hh.start()
      document.getElementById("hat-circle").style.backgroundColor = color
    }

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
          <KeyboardEventHandler
            handleKeys={['g']}
            onKeyEvent={playHat}
          />
        </div>
          <div id="gallery-circles">
            <div id="kick-circle">
              <h2 id="kick-title">KICK</h2>
              <h3 id="kick-instructions">(press 'a' key)</h3>
            </div>
            <div id="snare-circle">
              <h2 id="snare-title">SNARE</h2>
              <h3 id="snare-instructions">(press 'd' key)</h3>
            </div>
            <div id="hat-circle">
              <h2 id="hat-title">HAT</h2>
              <h3 id="hat-instructions">(press 'g' key)</h3>
            </div>
          </div>
      </div>
    )
  }
}

export default Drums
