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
      percs: [],
      kick: "https://sound-pantry-dev.s3.amazonaws.com/uploads/sample/kick1.mp3",
      snare: "https://sound-pantry-dev.s3.amazonaws.com/uploads/sample/snare3.mp3",
      hat: "https://sound-pantry-dev.s3.amazonaws.com/uploads/sample/hat1.mp3",
      perc1: "https://sound-pantry-dev.s3.amazonaws.com/uploads/sample/percussion1.wav",
      perc2: "https://sound-pantry-dev.s3.amazonaws.com/uploads/sample/percussion2.wav",
      perc3: "https://sound-pantry-dev.s3.amazonaws.com/uploads/sample/percussion3.wav"
    }
    this.handleKickSelect = this.handleKickSelect.bind(this)
    this.handleHatSelect = this.handleHatSelect.bind(this)
    this.handleSnareSelect = this.handleSnareSelect.bind(this)
    this.handlePercSelect = this.handlePercSelect.bind(this)
    this.handlePerc2Select = this.handlePerc2Select.bind(this)
    this.handlePerc3Select = this.handlePerc3Select.bind(this)
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
      this.setState({kicks: body.kicks, snares: body.snares, hats: body.hats, percs: body.percs})
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

  handlePercSelect(event){
    this.setState({perc1: event.target.value})
  }

  handlePerc2Select(event){
    this.setState({perc2: event.target.value})
  }

  handlePerc3Select(event){
    this.setState({perc3: event.target.value})
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

    let percs = this.state.percs
    let percPathsArray = []
    percs.forEach(perc => {
      percPathsArray.push(<option value={perc.path}>{perc.name}</option>)
    })

    let kd = new Tone.Player(this.state.kick).toMaster()
    let sn = new Tone.Player(this.state.snare).toMaster()
    let hh = new Tone.Player(this.state.hat).toMaster()
    let p1 = new Tone.Player(this.state.perc1).toMaster()
    let p2 = new Tone.Player(this.state.perc2).toMaster()
    let p3 = new Tone.Player(this.state.perc3).toMaster()

    kd.autostart = false;
    sn.autostart = false;
    hh.autostart = false;
    p1.autostart = false;

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

    function playPerc1(){
      let color = colorsArray[Math.floor(Math.random()*colorsArray.length)]

      p1.start()
      document.getElementById("percussion-circle").style.backgroundColor = color
    }

    function playPerc2(){
      let color = colorsArray[Math.floor(Math.random()*colorsArray.length)]

      p2.start()
      document.getElementById("percussion-circle-2").style.backgroundColor = color
    }

    function playPerc3(){
      let color = colorsArray[Math.floor(Math.random()*colorsArray.length)]

      p3.start()
      document.getElementById("percussion-circle-3").style.backgroundColor = color
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
            <KeyboardEventHandler
              handleKeys={['w']}
              onKeyEvent={playPerc1}
            />
            <KeyboardEventHandler
              handleKeys={['y']}
              onKeyEvent={playPerc2}
            />
            <KeyboardEventHandler
              handleKeys={['j']}
              onKeyEvent={playPerc3}
            />
          </div>
            <div id="gallery-circles">
              <div className="drum-tile">
                <h2>KICK</h2>
                <h3>(press 'a' key)</h3>
                <form id="kick-form">
                  <select onChange={this.handleKickSelect}>
                    {kickPathsArray}
                  </select>
                </form>
              </div>
              <div className="drum-tile">
                <h2>SNARE</h2>
                <h3>(press 'd' key)</h3>
                <form id="snare-form">
                  <select onChange={this.handleSnareSelect}>
                    {snarePathsArray}
                  </select>
                </form>
              </div>
              <div className="drum-tile">
                <h2>HAT</h2>
                <h3>(press 'g' key)</h3>
                <form id="hat-form">
                  <select onChange={this.handleHatSelect}>
                    {hatPathsArray}
                  </select>
                </form>
              </div>
            </div>
            <div id="gallery-circles">
              <div className="drum-tile">
                <h2>PERCUSSION 1</h2>
                <h3>(press 'w' key)</h3>
                <form id="percussion-form">
                  <select onChange={this.handlePercSelect}>
                    {percPathsArray}
                  </select>
                </form>
              </div>
              <div className="drum-tile">
                <h2>PERCUSSION 2</h2>
                <h3>(press 'y' key)</h3>
                <form id="percussion-form-2">
                  <select onChange={this.handlePerc2Select}>
                    {percPathsArray}
                  </select>
                </form>
              </div>
              <div className="drum-tile">
                <h2>PERCUSSION 3</h2>
                <h3>(press 'j' key)</h3>
                <form id="percussion-form-3">
                  <select onChange={this.handlePerc3Select}>
                    {percPathsArray}
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
