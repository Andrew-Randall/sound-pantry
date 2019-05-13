import React, { Component } from 'react'
import Tone from 'tone'
import Drums from './Drums'

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
        <Drums
        />
      </div>
    )
  }
}

export default DrumsContainer
