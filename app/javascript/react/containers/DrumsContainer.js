import React, { Component } from 'react'
import Tone from 'tone'
import Drums from '../components/Drums'

class DrumsContainer extends Component {
  constructor(props) {
    super(props);
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

  render() {
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

    return(
      <div id="drum-page">
        <h1 id="drum-machine-title">Drum Machine</h1>
        <Drums
          kick={this.state.kick}
          hat={this.state.hat}
          snare={this.state.snare}
        />
        <div id="forms-container">
          <form id="kick-form">
            <select onChange={this.handleKickSelect}>
              {kickPathsArray}
            </select>
          </form>
          <form id="snare-form">
            <select onChange={this.handleSnareSelect}>
              {snarePathsArray}
            </select>
          </form>
          <form id="hat-form">
            <select onChange={this.handleHatSelect}>
              {hatPathsArray}
            </select>
          </form>
        </div>
      </div>
    )
  }
}

export default DrumsContainer
