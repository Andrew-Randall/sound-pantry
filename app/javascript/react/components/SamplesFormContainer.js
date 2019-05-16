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
    event.preventDefault()

    let body = new FormData()
    body.append("user_id",this.props.userId)
    body.append("collection_id",this.props.collectionId)
    body.append("name",this.state.name)
    body.append("sample_path",this.state.file[0])

    debugger

    fetch(`/api/v1/collections/${this.props.collectionId}/samples`, {
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
    this.props.force;
  }

  clearForm() {
    this.setState({
      name: "",
      message: "",
      file: []
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
    let sampleForm = <div></div>
    if (this.props.userId === this.props.creatorId ||
        this.props.currentUser.role === "admin"
    ) {
        sampleForm = <div id="sample-form-div">
         <h3> Add a Sample </h3>
          <form
            onSubmit={this.handleOnSubmit}
            className="sample-form-render">
            <TextField
              type="number"
              labelName="Sample Name"
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
                <h3 id="dropzone-text">Dropped files</h3>
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
    }

    return (
      <div>
        {sampleForm}
      </div>
    );
  }
}

export default SamplesFormContainer;
