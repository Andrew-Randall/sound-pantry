import React, { Component } from "react"
import { Link } from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SampleTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.onDelete = this.onDelete.bind(this)
  }

  onDelete(event) {
    event.preventDefault();
    fetch(`/api/v1/collections/${this.props.collectionId}/samples/${this.props.id}`, {
      credentials: "same-origin",
      method: "DELETE",
      body: JSON.stringify({ id: this.props.userId }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
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
      this.props.forceRender();
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let deleteButton;
    if (
      this.props.userId === this.props.currentUserId ||
      this.props.currentUser.role == "admin"
    ) {
      deleteButton = (
        <button className="player-buttons" onClick={this.onDelete}><FontAwesomeIcon icon="trash"/></button>
      )
    } else {
      deleteButton = "";
    }
    return (
      <div className="sample-tile">
        <audio id={"player-" + this.props.id} src={this.props.path}></audio>
        <div id="sample-tile">
          {this.props.name}
          <button className="player-buttons" onClick={this.props.play}><FontAwesomeIcon icon="play-circle"/></button>
          <button className="player-buttons" onClick={this.props.pause}><FontAwesomeIcon icon="pause"/></button>
          <a className="player-buttons" href={this.props.path} download={this.props.name}><FontAwesomeIcon icon="download"/></a>
          {deleteButton}
        </div>
      </div>
    )
  }
}

export default SampleTile;
