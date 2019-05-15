import React, { Component } from "react"
import { Link } from "react-router"
import CollectionTile from '../components/CollectionTile'

class UserShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: "",
      collections: []
    }
  }

  componentDidMount() {
    let userId = this.props.params.id
    fetch(`/api/v1/users/${userId}`)
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status}(${response.statusText})` ,
        error = new Error(errorMessage)
        throw(error)
      }
      })
    .then(response => response.json())
    .then(body => {
      this.setState({user: body.user, collections: body.collections})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let collections = this.state.collections.map(collection => {
      return (
        <CollectionTile
          key={collection.id}
          id={collection.id}
          user_id={collection.user_id}
          name={collection.name}
          img={collection.img}
        />
      )
    })

    return(
      <div>
        <h1 id="user-show-title"> Packs by {this.state.user.username} </h1>
        <div id="gallery-user">
          {collections}
        </div>
      </div>
    )
  }
}

export default UserShowContainer
