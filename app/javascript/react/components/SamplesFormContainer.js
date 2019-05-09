import React, { Component } from "react";
import Dropzone from 'react-dropzone';
import TextField from "./TextField";

class SamplesFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      message: "",
      file: []
    };
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  handleOnChange(event) {
    let newSample = event.target.value;
    this.setState({ [event.target.name]: newSample })
  }

  handleOnSubmit(event) {
    event.preventDefault();

    let body = new FormData()
    body.append("user_id",this.props.userId)
    body.append("pack_id",this.props.packId)
    body.append("name",this.state.name)
    body.append("path",this.state.file[0])

    fetch(`/api/v1/packs/${this.props.packId}/samples`, {
      credentials: "same-origin",
      method: "POST",
      body: body
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
      this.setState({ message: body.message });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));

    this.clearForm();
  }

  clearForm() {
    this.setState({
      name: "",
    });
  }

  onDrop(file) {
    if(file.length == 1) {
      this.setState({ file: file })
    } else {
      this.setState({ message: 'You can only upload one sample at a time.'})
    }
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleOnSubmit}
          className="sample-form-render">
          <TextField
            type="number"
            labelName="name"
            inputName="name"
            value={this.state.name}
            handleOnChange={this.handleOnChange}
          />
          <section>
            <div className="dropzone">
              <Dropzone onDrop={this.onDrop}>
                <p>Try dropping some files here, or click to select files to upload.</p>
              </Dropzone>
            </div>
            <aside>
              <h2>Dropped files</h2>
              <ul>
                {
                  this.state.file.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                }
              </ul>
            </aside>
          </section>

          <input type="submit" value="Submit" className="button" />
        </form>
      </div>
    );
  }
}

export default SamplesFormContainer;