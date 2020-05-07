import React, { Component } from "react";
import firebase from "../firebase";
import "./uploadfiles.css";
import UploadLists from "./UploadLIsts";
let counter = 0;
class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: null,
      data: this.props.patients ? this.props.patients : this.props.doctors,
      downloadUrl: null,
      uploadedFiles: [],
      description: "",
    };
  }

  componentDidMount() {
    this.getOldUserRecords();
  }

  getOldUserRecords() {
    const temp = [];
    const { data } = this.state;
    const body = JSON.stringify({
      patientid: data.patientid,
      doctorid: data.doctorid,
    });

    fetch("http://localhost:4000/get_record", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body,
    })
      .then((resp) => resp.json())
      .then((res) => {
        if (res) {
          res.forEach((element) => {
            const newTemp = <UploadLists key={counter++} datas={element} />;
            temp.push(newTemp);
          });
          this.setState({ uploadedFiles: temp });
        } else {
          return null;
        }
      });
  }

  handleChange = (files) => {
    this.setState({
      files: files,
    });
  };

  handlesave = () => {
    if (!this.state.files) {
      return null;
    }
    var file = this.state.files[0];
    var storageRef = firebase.storage().ref();
    var path = `${this.state.data.doctorid}_${this.state.data.patientid}/${file.name}`;
    var refToStoreFile = storageRef.child(path);

    var uploadTask = refToStoreFile.put(file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (
      snapshot
    ) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      if (progress === 100) {
        alert("uploaded successfully");
      }
    });

    this.uploadrecordlocaldb(path);
  };

  uploadrecordlocaldb(path) {
    const { data, files } = this.state;
    const body = JSON.stringify({
      patientid: data.patientid,
      doctorid: data.doctorid,
      downloadUrl: path,
      filename: files[0].name,
      upbyhome: localStorage.getItem("usertype") === "patient" ? "patient" : "doctor",
      description: this.state.description,
    });

    fetch("http://localhost:4000/record_upload", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body,
    })
      .then((resp) => resp.json())
      .then((res) => console.log(res));
  }

  render() {
    return (
      <div className="uploadfiles">
        <div className="showrecords">
          {this.state.uploadedFiles.length > 0 ? (
            this.state.uploadedFiles
          ) : (
            <h4>No Previous Records</h4>
          )}
        </div>
        <div className="uploaddiv">
          <input
            type="file"
            className="uploadInput"
            onChange={(e) => {
              this.handleChange(e.target.files);
            }}
          />
          <input
            type="text"
            className="description"
            type="description"
            placeholder="Type Description"
            onChange={(e) => {
              this.setState({ description: e.target.value });
            }}
          />
          <button className="uplbut" onClick={this.handlesave}>
            send
          </button>
        </div>
      </div>
    );
  }
}

export default UploadFiles;
