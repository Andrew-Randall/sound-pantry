import React, { Component } from 'react'
import TextField from './TextField'

class PacksFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state={
      name: '',
      img: '',
      description: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  handleOnChange(event) {
    let newData = event.target.value
    this.setState({[event.target.name] : newData})
  }

  handleOnSubmit(event){
    event.preventDefault()
    let packPayload={
      name: this.state.name,
      img: this.state.img,
      description: this.state.description
    }

    fetch ('api/v1/packs', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(packPayload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}(${response.statusText})` ,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      return window.location.href = `/packs/${body.pack.id}`
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))

    this.clearForm()
  }

  clearForm(){
    this.setState({name: '', img: '', description: ''})
  }

  render() {
    return(
      <div id="new-pack-form">
        <h2>Submit A New Pack</h2>
        <br />
        <form onSubmit={this.handleOnSubmit}>
          <TextField
            labelName='Name'
            inputName='name'
            value={this.state.name}
            handleOnChange={this.handleOnChange}
          />
          <TextField
            labelName='Image'
            inputName='img'
            value={this.state.img}
            handleOnChange={this.handleOnChange}
          />
          <TextField
            labelName='Description'
            inputName='description'
            value={this.state.description}
            handleOnChange={this.handleOnChange}
          />
          <br />
          <input type ="submit" className="button" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default PacksFormContainer
