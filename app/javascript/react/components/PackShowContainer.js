import React, { Component } from "react";
import SamplesContainer from "./SamplesContainer"
import SampleTile from "./SampleTile"

class PackShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pack: {},
      samples: {},
      currentUser: ""
    }
  }

  componentDidMount() {
    let packId = this.props.params.id

    fetch(`/api/v1/packs/${packId}`, {
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
      let noUser = {
        id: 0,
        role: "Not Signed In"
      };
      if (body.current_user === null) {
        body.current_user = noUser;
      }
      this.setState({ pack: body.pack, currentUser: body.current_user, samples: body.samples })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render() {
    return (
      <div id="show-page">
        <div id="show-image">
          <img src={this.state.pack.img} />
        </div>
        <div id="show-text">
          <h2>
            About {this.state.pack.name}
          </h2>
          <div id="pack-description">
            <p>
              {this.state.pack.description}
            </p>
          </div>
        </div>
        <SamplesContainer
            currentUser={this.state.currentUser}
            packId={this.props.params.id}
        />
      </div>
    )
  }
}

export default PackShowContainer
