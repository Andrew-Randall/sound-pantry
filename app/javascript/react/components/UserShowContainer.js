import React, { Component } from "react"
import { Link } from "react-router"
import PackTile from './PackTile'

class UserShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: "",
      packs: []
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
      debugger
      this.setState({user: body.user, packs: body.packs})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let packs = this.state.packs.map(pack => {
      return (
        <PackTile
          key={pack.id}
          id={pack.id}
          user_id={pack.user_id}
          name={pack.name}
          img={pack.img}
        />
      )
    })

    return(
      <div>
        <div id="gallery">
          <h1 id="show-title"> Packs by {this.state.user.username} </h1>
          {packs}
        </div>
      </div>
    )
  }
}

export default UserShowContainer
