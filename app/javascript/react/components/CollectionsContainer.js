import React, { Component } from 'react'
import { Link } from 'react-router'
import CollectionTile from './CollectionTile'

class CollectionsContainer extends Component {
  constructor(props) {
    super(props)
    this.state={
      collections: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/collections')
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
      this.setState({collections: body})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
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
        <div id="gallery">
          {collections}
        </div>
      </div>
    )
  }
}

export default CollectionsContainer
