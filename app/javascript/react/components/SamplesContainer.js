import React, { Component } from "react";
import SampleTile from "./SampleTile";

class SamplesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samples: [],
      currentUser: this.props.currentUser
    };
  }

  componentDidMount() {
    let packId = this.props.packId;
    fetch(`/api/v1/packs/${packId}/samples`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}(${response.statusText})`,
          error = new Error(errorMessage);
        throw error;
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        samples: body
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let samplesArray = this.state.samples.map(sample => {
      return (
        <SampleTile
          key={sample.id}
          id={sample.id}
          name={sample.name}
          path={sample.path}
          userId={sample.user_id}
          packId={sample.pack_id}
        />
      );
    });

    return (
      <div id="pack-samples">
        <div className="pack-sample-array-container">{samplesArray}</div>
      </div>
    );
  }
}

export default SamplesContainer;
