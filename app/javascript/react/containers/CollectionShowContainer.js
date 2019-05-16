import React, { Component } from "react"
import { Link } from "react-router"
import SamplesContainer from "../containers/SamplesContainer"
import SampleTile from "../components/SampleTile"
import SamplesFormContainer from "../containers/SamplesFormContainer"

class CollectionShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collection: {},
      creator: "",
      samples: [],
      currentUser: ""
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    let collectionId = this.props.params.id

    fetch(`/api/v1/collections/${collectionId}`, {
      credentials: "same-origin",
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
      if (body.collection.currentUser === null) {
        body.collection.currentUser = noUser;
      }
      this.setState({ collection: body.collection, creator: body.collection.creator, currentUser: body.collection.currentUser, samples: body.collection.samples })
      return this.state
    })
    .then(stateFul => {
      this.setState({state:stateFul})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  onSubmit(payload) {
    let collectionId = this.props.params.id
    fetch(`/api/v1/collections/${collectionId}/samples`, {
      credentials: "same-origin",
      method: "POST",
      body: payload
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw error;
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ samples: this.state.samples.concat(body.sample) });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let samples
    let currentUserId = this.state.currentUser.id

    if (this.state.samples.length >= 0){
        samples = <SamplesContainer
          currentUserId={currentUserId}
          collectionId={this.state.collection.id}
          samples={this.state.samples}
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
            creatorId={this.state.collection.user_id}
            currentUser={this.state.currentUser}
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    )
  }
}

export default CollectionShowContainer
