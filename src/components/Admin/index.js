import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import Pornsearch from "pornsearch";

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleTest = this.handleTest.bind(this);
  }

  handleTest = () => {
    Pornsearch.search("oops")
      .driver("sex")
      .gifs()
      .then(gifs => {
        gifs.map(gif =>
          this.props.firebase.images().push({
            url: gif.url
          })
        );
      });
  };

  handleUpload = () => {
    const { image } = this.state;
    const storage = this.props.firebase.storage;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // Observe state change events such as progress, pause, and resume
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log("File available at", downloadURL);

          this.props.firebase.images().push({
            url: downloadURL
          });
        });
      }
    );
  };

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  render() {
    return (
      <div>
        <h1>Admin</h1>
        <h2>Image Upload</h2>
        <progress value={this.state.progress} max="100" />
        <br />
        <input type="file" onChange={this.handleChange} />
        <br />
        <button onClick={this.handleUpload}>Upload</button>
        <br />
        <button onClick={this.handleTest}>Test</button>
      </div>
    );
  }
}

export default withFirebase(AdminPage);
