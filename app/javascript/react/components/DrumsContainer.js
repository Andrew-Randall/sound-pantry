import React, { Component } from 'react'
import Tone from 'tone'
import DrumsTest from './DrumsTest'

class DrumsContainer extends Component {
  constructor(props) {
    super(props);
    this.state={
      x: []
    }
  }

  render() {
    return(
      <div>
        <h1 id="drum-machine-title">Drum Machine</h1>
        <DrumsTest
        />
      </div>
    )
  }
}

export default DrumsContainer
