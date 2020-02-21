import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  Fade
} from "react-bootstrap";

import { Card } from "../Card/Card.jsx";
import { FormInputs } from "../FormInputs/FormInputs.jsx";
import Button from "../CustomButton/CustomButton.jsx";
import Select from 'react-select'



class AddEmployeeDialog extends Component {
    constructor() {
        super();
        this.textInput = React.createRef();
        this.state = {
          selectedOption: '',
          relocate: false,   
          f_name:"",
          l_name:"",
          email:"",
          start_date:"1/1/2020",
          availability:"1/1/2030",
          location:0,
          remote_work:false,
          titles:[],
          talents:[],
          desiredLocation:[],
          managementLevel:0

          
        };
    }
    handleRelocation = (selectedOption) => {
        this.setState({relocate:selectedOption.value});
      }
    handleText() {
        this.setState({f_name:this.first_name.value});
        this.setState({l_name:this.last_name.value});
        this.setState({email:this.email.value});
        this.setState({start_date:this.start_date.value});
        this.setState({availability:this.availability.value});
     }
     handleLocation = (location) => {
        this.setState({location});
     }
     handleManagementLevel = (managementLevel) => {
        this.setState({managementLevel});
     }
     handleRemoteWork = (remote_work) => {
         this.setState({remote_work:remote_work.value})
     }
     handleTitles = (titles) => {
        this.setState({titles})
    }
     handleTalents = (talents) => {
         this.setState({talents})
     }
     handDesiredLocation = (desiredLocation) => {
        this.setState({desiredLocation})
    }
    createEmployee = () => {

        const talentsArr = []
        const desiredLocationArr = []
        const titlesArr = []
        this.state.talents.forEach(item => talentsArr.push(item.value));
        this.state.desiredLocation.forEach(item => desiredLocationArr.push(item.value));
        this.state.titles.forEach(item => titlesArr.push(item.value));

        fetch('http://localhost:8000/api/employees/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                f_name: this.state.f_name,
                l_name: this.state.l_name,
                email: this.state.email,
                start_date: this.state.start_date,
                availability: this.state.availability,
                location: this.state.location.value,
                remote_work: this.state.remote_work,
                relocate: this.state.relocate,
            })
        }).then(res => res.json())
        .then((data) => {
          console.log(data);
          window.location.reload();
        })
        .catch(console.log)
        
      };



    handleSubmit = (e) => {
        
        this.handleEditing();
      };

    createJson


     



  render() {

    const options = [
        { value: '2', label: 'Charleston' },
      ]

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col xsOffset={4} md={4}>
              <Card
                title="Add Employee"
                content={
                  <form>
                   <Row>
                        <div className="col-md-6">
                        <FormGroup>
                            <ControlLabel>First Name</ControlLabel>
                            <FormControl 
                                type="text"
                                placeholder= "First Name"
                                defaultValue= ""
                                inputRef={(ref) => {this.first_name = ref}}
                                onChange={() => this.handleText()}
                            />
                        </FormGroup>
                        </div>
                    
                        <div className="col-md-6">
                        <FormGroup>
                        <ControlLabel>Last Name</ControlLabel>
                            <FormControl 
                                type="text"
                                placeholder= "Last Name"
                                defaultValue= ""
                                inputRef={(ref) => {this.last_name = ref}}
                                onChange={() => this.handleText()}
                            />
                        </FormGroup>
                        </div>
                    </Row> 
                    <Row>
                        <div className="col-md-6">
                        <FormGroup>
                            <ControlLabel>Email address</ControlLabel>
                            <FormControl 
                                type="email"
                                placeholder= "Email"
                                defaultValue= ""
                                inputRef={(ref) => {this.email = ref}}
                                onChange={() => this.handleText()}
                            />
                        </FormGroup>
                        </div>
                        <div className="col-md-6">
                        <FormGroup>
                            <ControlLabel>Management Level</ControlLabel>
                            <Select
                            options={[{value:1, label:'Consultant' }, {value:2, label:'Senior Consultant' }]}
                            onChange={this.handleManagementLevel}
                            />
                        </FormGroup>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-12">
                        <FormGroup>
                            <ControlLabel>Titles</ControlLabel>
                            <Select
                            isMulti
                            options={[{value:1, label:'Software Engineer' }, {value:2, label:'Business Analyst' }]}
                            onChange={this.handTitles}
                            />
                        </FormGroup>
                        </div>
                    </Row>
                    <Row>
                    
                        <div className="col-md-6">
                        <FormGroup>
                        <ControlLabel>Start Date</ControlLabel>
                            <FormControl 
                                type="date"
                                placeholder= "Start Date"
                                defaultValue= ""
                                inputRef={(ref) => {this.start_date = ref}}
                                onChange={() => this.handleText()}
                            />
                        </FormGroup>
                        </div>
                        <div className="col-md-6">
                        <FormGroup>
                        <ControlLabel>Next Availability</ControlLabel>
                            <FormControl 
                                type="date"
                                placeholder= "Start Date"
                                defaultValue= ""
                                inputRef={(ref) => {this.availability = ref}}
                                onChange={() => this.handleText()}
                            />
                        </FormGroup>
                        </div>
                    </Row>
                    
                    <Row>

                    <FormGroup className="col-md-4">
                        <ControlLabel>Location</ControlLabel>
                        <Select
                        
                         options={[{value:'2', label:'Charleston' }]}
                         onChange={this.handleLocation}
                         />
                         
                     </FormGroup>

                     <FormGroup className="col-md-4">
                        <ControlLabel>Remote Work?</ControlLabel>
                        <Select
                            options={[{value:true, label:'Yes' }, {value:false, label:'No' }]}
                            onChange={this.handleRemoteWork}
                        />
                    </FormGroup>

                     <FormGroup className="col-md-4">
                        <ControlLabel>Relocation Possible?</ControlLabel>
                        <Select
                            options={[{value:true, label:'Yes' }, {value:false, label:'No' }]}
                            onChange={this.handleRelocation}
                        />
                    </FormGroup> 
 
                                        
                    </Row>
                    {this.state.relocate ?  
                    <Row>
                        
                        <FormGroup className="col-md-12">
                        <ControlLabel>Desired Locations</ControlLabel>
                        <Select
                            defaultValue={[]}
                            isMulti
                            name="locations"
                            options={[{value:'1', label:'Charleston' }, {value:'2', label:'Charleston'}]}
                            onChange={this.handDesiredLocation}

                        />
                        </FormGroup>
                    </Row>  
                    : null} 
                    <Row>

                    <FormGroup className="col-md-12">
                        <ControlLabel>Talents</ControlLabel>
                        <Select
                            defaultValue={[]}
                            isMulti
                            name="talents"
                            options={[{value:'1', label:'Java' }, {value:'2', label:'Scrum' }]}
                            onChange={this.handleTalents}
                        />
                    </FormGroup>  

                    </Row>

                    <ButtonToolbar>
                        <Button onClick = {this.createEmployee} bsStyle="default" round fill>
                             Add Employee
                        </Button>
                        <Button onClick={this.props.closePopup} bsStyle="default" round fill>
                             Close
                        </Button>
                    </ButtonToolbar>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AddEmployeeDialog;