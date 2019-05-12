import React, { Component } from "react"
import SamplesFormContainer from "./SamplesFormContainer"
import SampleTile from "./SampleTile"

class SamplesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      samples: []
    }
    this.addSample = this.addSample.bind(this);
    this.forceRender = this.forceRender.bind(this);
  }

  componentDidMount() {
    let collectionId = this.props.collectionId;
    let currentUserId = this.props.currentUserId
    fetch(`/api/v1/collections/${collectionId}/samples`)
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status}(${response.statusText})`,
          error = new Error(errorMessage)
        throw error;
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        samples: body
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  forceRender() {
    this.componentDidMount();
  }

  addSample(sample) {
    this.forceRender();
  }

  render() {
    let samplesArray = this.state.samples.map(sample => {
      function playFunction(){
        document.getElementById('player-' + sample.id).play()
      }

      function pauseFunction(){
        document.getElementById('player-' + sample.id).pause()
      }

      function volumeUpFunction(){
        document.getElementById('player-' + sample.id).volume += 0.2
      }

      function volumeDownFunction(){
        document.getElementById('player-' + sample.id).volume -= 0.2
      }

      function downloadFunction(){
        document.getElementById('player-' + sample.id).download()
      }
      return (
        <SampleTile
          key={sample.id}
          id={sample.id}
          name={sample.name}
          path={sample.path}
          userId={sample.user_id}
          packId={sample.pack_id}
          play={playFunction}
          pause={pauseFunction}
          volumeUp={volumeUpFunction}
          volumeDown={volumeDownFunction}
          download={downloadFunction}
          force={this.forceRender}
        />
      )
    })

    return (
      <div id="pack-samples">
        <div className="pack-sample-array-container">{samplesArray}</div>
      </div>
    )
  }
}

export default SamplesContainer
