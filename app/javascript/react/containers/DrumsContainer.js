import React, { Component } from 'react'
import Tone from 'tone'
import Drums from '../components/Drums'

class DrumsContainer extends Component {
  constructor(props) {
    super(props);
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
      this.setState({kicks: body.kickSamples, snares: body.snareSamples, hats: body.hatSamples})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  handleOnSubmit(){

  }

  render() {
    debugger
    let kicks = this.state.kicks

    return(
      <div id="drum-page">
        <h1 id="drum-machine-title">Drum Machine</h1>
        <form onSubmit={this.handleOnSubmit}>
          <select name = "kicks">
            {kicks.map(kick => {
              return (<option value="sup">sup</option>)
            })}
          </select>
          <input type ="submit" className="button" value="Submit"/>
        </form>
        <Drums
        />
      </div>
    )
  }
}

export default DrumsContainer
