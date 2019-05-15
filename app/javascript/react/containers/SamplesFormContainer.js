import React, { Component } from "react";
import Dropzone from 'react-dropzone';
import TextField from "../components/TextField";

class SamplesFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      message: "",
      file: []
    };
    this.handleOnChange = this.handleOnChange.bind(this)
    this.passPayload = this.passPayload.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  handleOnChange(event) {
    let newSample = event.target.value;
    this.setState({ [event.target.name]: newSample })
  }

  passPayload(event) {
    event.preventDefault()

    let body = new FormData()
    body.append("user_id",this.props.userId)
    body.append("collection_id",this.props.collectionId)
    body.append("name",this.state.name)
    body.append("sample_path",this.state.file[0])

    debugger
    let payload = {
        name: this.state.name,
        file: this.state.file[0]
    }

    this.props.onSubmit(payload)
    this.setState({
      name: "",
      file: []
    })
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
            onSubmit={this.passPayload}
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
