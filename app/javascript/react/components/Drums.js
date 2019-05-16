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
      hats: [],
      kick: "",
      snare: "",
      hat: ""
    }
    this.handleKickSelect = this.handleKickSelect.bind(this)
    this.handleHatSelect = this.handleHatSelect.bind(this)
    this.handleSnareSelect = this.handleSnareSelect.bind(this)
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
      this.setState({kicks: body.kicks, snares: body.snares, hats: body.hats})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  handleKickSelect(event){
    this.setState({kick: event.target.value})
  }

  handleSnareSelect(event){
    this.setState({snare: event.target.value})
  }

  handleHatSelect(event){
    this.setState({hat: event.target.value})
  }

  render(){
    let beat = document.documentElement.addEventListener(
      "mousedown", function(){
        if (Tone.context.state !== 'running') {
          Tone.context.resume();
        }
      }
    )

    let kicks = this.state.kicks
    let kickPathsArray = []
    kicks.forEach(kick => {
      kickPathsArray.push(<option value={kick.path}>{kick.name}</option>)
    })

    let snares = this.state.snares
    let snarePathsArray = []
    snares.forEach(snare => {
      snarePathsArray.push(<option value={snare.path}>{snare.name}</option>)
    })

    let hats = this.state.hats
    let hatPathsArray = []
    hats.forEach(hat => {
      hatPathsArray.push(<option value={hat.path}>{hat.name}</option>)
    })

    let kd = new Tone.Player(this.state.kick).toMaster()
    let sn = new Tone.Player(this.state.snare).toMaster()
    let hh = new Tone.Player(this.state.hat).toMaster()

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
      <div id="drum-page">
        <h1 id="drum-machine-title">Drum Machine</h1>
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
                <form id="kick-form">
                  <select onChange={this.handleKickSelect}>
                    {kickPathsArray}
                  </select>
                </form>
              </div>
              <div id="snare-circle">
                <h2 id="snare-title">SNARE</h2>
                <h3 id="snare-instructions">(press 'd' key)</h3>
                <form id="snare-form">
                  <select onChange={this.handleSnareSelect}>
                    {snarePathsArray}
                  </select>
                </form>
              </div>
              <div id="hat-circle">
                <h2 id="hat-title">HAT</h2>
                <h3 id="hat-instructions">(press 'g' key)</h3>
                <form id="hat-form">
                  <select onChange={this.handleHatSelect}>
                    {hatPathsArray}
                  </select>
                </form>
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Drums
