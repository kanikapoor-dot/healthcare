import React, { Component } from "react";
import firebase from "../firebase";
import "./UploadLists.css";

class UploadLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
        usertype: localStorage.getItem("usertype"),
      path: this.props.datas.downloadUrl,
      download: null,
      url: "",
    };
    console.log(this.state.path);
  }

  patientstyle = {
    
        backgroundColor: 'violet',
        color: 'white',
        padding: '5px',
        margin: '10px',
  }
  doctorstyle = {
    backgroundColor: 'teal',
    color: 'white',
    padding: '5px',
    margin: '10px',
}

  downloadFile() {
    var storage = firebase.storage();
    var pathReference = storage.ref(this.state.path);
    pathReference
      .getDownloadURL()
      .then(function (url) {
        window.open(url, "_blank");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  timess = () => {
    var str = this.props.datas.dateofupload;
    var tim = str.slice(17, 22);
    var checktim = Number(tim.slice(0,2))
    if(checktim > 12){
        tim =  String(checktim - 12)+str.slice(19, 22)+' pm'
    }
    return (
      <div className="whoes" style={ this.props.datas.upbyhome  == 'patient' ? this.patientstyle : this.doctorstyle}>
        <h5>{this.props.datas.upbyhome}</h5>
        <p>{tim}</p>
      </div>
    );
  };

  render() {
    return (
      <div className="uploadList">
        <div className="typeuser">
          {this.timess()}
          <button onClick={this.downloadFile.bind(this)}>
            {this.props.datas.filename}
          </button>
        </div>
      </div>
    );
  }
}

export default UploadLists;
