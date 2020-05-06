import React from "react";
import "./PatientTrackRecord.css";
import { withRouter } from "react-router-dom";
import PatientTRcard from "../../card/PatientTRCard/PatientTRcard";


class PatientTrackRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: JSON.parse(localStorage.getItem("userToken")),
      card: [],
      searchdoctor: "",
    };
  }
  componentDidMount(){
      this.getdoctorrecord()
  }
 
  onChange(e) {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value }); 
  }

  getdoctorrecord() {
    const temp = [];

    const body = JSON.stringify({
     patientid : this.state.data['@rid']
    });

    fetch("http://localhost:4000/PatientTR", {
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
                <PatientTRcard key={result['@rid']} doctors={result} />
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
    let filterdoctors= this.state.card
     filterdoctors=filterdoctors.filter(
      (doctors)=>{
        return doctors.props.doctors.doctorid.indexOf(this.state.searchdoctor)!==-1;
      }
    )
    return (
      <div className="doctorrecords">
        <div className="searchdoctorrecords">
          <input
            type="text"
            placeholder="Doctor id"
            name="searchdoctor"
            id="searchdoctor"
            onChange={this.onChange.bind(this)}
          />
        </div>
        <div className="doctorrecordcontent">
          {filterdoctors}
        </div>
      </div>
    );
}
}
export default withRouter(PatientTrackRecord);

