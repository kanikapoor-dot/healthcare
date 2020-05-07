import React from "react";
import "./PatientTRcard.css";
import {withRouter} from "react-router-dom";
import UploadFiles from "../../components/uploadfiles/uploadfiles";

class PatientTRcard extends React.Component{
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
                <h5>{this.props.doctors.doctorid}</h5>
                <button className="doctorrecdel" onClick={this.showcon.bind(this)}>Details</button>
             </div>
             <div className="baba" style={{display: this.state.showconver ? 'block' : 'none'}}><UploadFiles  doctors={this.props.doctors}/></div> 
            </div>         
        )
    }

}export default withRouter (PatientTRcard)