import React, { Component } from 'react'
import { Link } from 'react-router'
import PackTile from './PackTile'

class PacksContainer extends Component {
  constructor(props) {
    super(props)
    this.state={
      packs: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/packs')
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
      this.setState({packs: body})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
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
          {packs}
        </div>
      </div>
    )
  }
}

export default PacksContainer
