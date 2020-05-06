import React from "react";
import "./DoctorTrackRecord.css";
import { withRouter } from "react-router-dom";
import DoctorTRcard from "../../card/DoctorTRcard/DoctorTRcard";

class DoctorTrackRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: JSON.parse(localStorage.getItem("userToken")),
      card: [],
      searchpatient: "",
    };
  }
  componentDidMount(){
      this.getpatientrecord()
  }
 
  onChange(e) {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value }); 
  }

  getpatientrecord() {
    const temp = [];

    const body = JSON.stringify({
     doctorid : this.state.data['@rid']
    });

    fetch("http://localhost:4000/DoctorTR", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp) {
          resp.forEach((result) => {
              const newtemp = (
                <DoctorTRcard key={result['@rid']} patients={result} />
              );
              temp.push(newtemp)
            })
          this.setState({ card: temp });
        } else {
          return null;
        }
      });
  }


  render() {
    let filterpatients= this.state.card
     filterpatients=filterpatients.filter(
      (patients)=>{
        return patients.props.patients.patientid.indexOf(this.state.searchpatient)!==-1;
      }
    )
    return (
      <div className="patientrecords">
        <div className="searchpatientrecords">
          <input
            type="text"
            placeholder="Patient id"
            name="searchpatient"
            id="searchpatient"
            onChange={this.onChange.bind(this)}
          />
        </div>
        <div className="patientrecordcontent">
          {filterpatients}
        </div>
      </div>
    );
}
}
export default withRouter(DoctorTrackRecord);
