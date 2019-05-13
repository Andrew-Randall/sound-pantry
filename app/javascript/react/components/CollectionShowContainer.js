import React, { Component } from "react"
import { Link } from "react-router"
import SamplesContainer from "./SamplesContainer"
import SampleTile from "./SampleTile"
import SamplesFormContainer from "./SamplesFormContainer"

class CollectionShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collection: {},
      creator: "",
      samples: {},
      currentUser: ""
    }
  }

  componentDidMount() {
    let collectionId = this.props.params.id

    fetch(`/api/v1/collections/${collectionId}`, {
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
      this.setState({ collection: body.collection, creator: body.creator, currentUser: body.current_user, samples: body.samples })
      return this.state
    })
    .then(stateFul => {
      this.setState({state:stateFul})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render() {
    let samples
    let currentUserId = this.state.currentUser.id

    if (this.state.samples.length >= 0){
        samples = <SamplesContainer
          currentUserId={this.state.currentUser.id}
          collectionId={this.props.params.id}
      />
    }
    return (
      <div id="show-page">
        <div id="show-image">
          <img src={this.state.collection.img} />
        </div>
        <div id="show-text">
          <h2>
            About {this.state.collection.name}
          </h2>
          <div id="pack-description">
            <p>
              {this.state.collection.description}<br /><br />
              Created by <Link to={`/users/${this.state.creator.id}`}>{this.state.creator.username}</Link>
            </p>
          </div>
        </div>
        <div>
          {samples}
        </div>
        <div id="sample-form">
          <SamplesFormContainer
            collectionId={this.props.params.id}
            userId={this.state.currentUser.id}
            addSample={this.addSample}
            force={this.forceRender}
            creatorId={this.state.collection.user_id}
            currentUser={this.state.currentUser}
          />
        </div>
      </div>
    )
  }
}

export default CollectionShowContainer
