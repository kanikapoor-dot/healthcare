import React from "react";
import "./DoctorTRcard.css";
import {withRouter} from "react-router-dom";
import UploadFiles from "../../components/uploadfiles/uploadfiles";

class DoctorTRcard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showconver: false,
        }
    }

    showcon(e){
        e.preventDefault()
        this.setState({showconver: !this.state.showconver})
    }

render(){   
    return(
        <div className="bd">
        <div className="bdiv">
            <h3>{this.props.patients.patient_name}</h3>
            <h5>{this.props.patients.patientid}</h5>
            <button className="patientrecdel" onClick={this.showcon.bind(this)}>Details</button>
         </div>
         <div className="baba" style={{display: this.state.showconver ? 'block' : 'none'}}><UploadFiles  patients={this.props.patients}/></div> 
        </div> 
  
    )
}

}export default withRouter (DoctorTRcard)