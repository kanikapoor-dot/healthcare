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
  }

  patientstyle = {
    backgroundColor: "violet",
    width: 'auto',
    height: 'auto',
    color: "white",
    padding: "5px",
    margin: "10px",
  };
  doctorstyle = {
    backgroundColor: "teal",
    width: 'auto',
    height: 'auto',
    color: "white",
    padding: "5px",
    margin: "10px",
  };

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
    var date = str.slice(4, 16);
    var time = str.slice(16, 22);
    var chec = Number(str.slice(16,18))
    if(chec > 12){
      chec = chec - 12
      time = String(chec)+str.slice(18,21)+' pm'
    }else{
      time = time+' am'
    }
    return (
      <div
        className="whoes"
        style={
          this.props.datas.upbyhome === "patient"
            ? this.patientstyle
            : this.doctorstyle
        }
      >
        <h5>{date}</h5>
        <h6>{time}</h6>
        <h4>{this.props.datas.upbyhome}</h4>
      </div>
    );
  };

  render() {
    return (
      <div className="uploadList">
        <div className="typeuser">
          {this.timess()}
          <div className="descr">
            <button onClick={this.downloadFile.bind(this)}>
              {this.props.datas.filename}
            </button>
            <p>{this.props.datas.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadLists;
