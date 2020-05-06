import React, { Component } from 'react';
import firebase from '../firebase'

class UploadFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: null,
            data: this.props.patients ? this.props.patients : this.props.doctors,
          }
          console.log(this.state.data)
    }

    handleChange = (files) => {
        this.setState({
            files:files
        })
    }

    handlesave = () => {
        let bucketName = 'files'
        let file = this.state.files[0]
        let storageRef = firebase.storage().ref(`${bucketName}/${}/${file.name}`)
    }

    render() { 
        return ( 
            <div className="uploadfiles">
                <input
                type="file"
                onChange={(e) => {this.handleChange(e.target.files)}}
                />
                <button 
               onClick={this.handlesave}
               >
                   send
               </button>
            </div>
         );
    }
}
 
export default UploadFiles;