import React, { Component } from "react"
import SampleTile from "../components/SampleTile"

class SamplesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let samplesArray = this.props.samples.map(sample => {
      function playFunction(){
        document.getElementById('player-' + sample.id).play()
      }

      function pauseFunction(){
        document.getElementById('player-' + sample.id).pause()
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
          collectionId={sample.collection_id}
          play={playFunction}
          pause={pauseFunction}
          download={downloadFunction}
          forceRender={this.props.forceRender}
          currentUser={this.props.currentUser}
          currentUserId={this.props.currentUser.id}
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
