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
          location:"",
          remote_work:false,
          talents:[],
          desiredLocation:[]

          
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
        this.setState({locations:location.value});
     }
     handleRemoteWork = (remote_work) => {
         this.setState({remote_work:remote_work.value})
     }
     handleTalents = (talents) => {
         this.setState({talents})
     }
     handDesiredLocation = (desiredLocation) => {
        this.setState({desiredLocation})
    }
    handleEditing = () => {

        const talentsArr = []
        const desiredLocationArr = []
        this.state.talents.forEach(item => talentsArr.push(item.value));
        this.state.desiredLocation.forEach(item => desiredLocationArr.push(item.value));
         const json =  '{'
         +'"f_name" : "'+this.state.f_name + '",'
         +'"l_name" : "'+ this.state.l_name + '",'
         +'"email" : "'+ this.state.email + '",'
         +'"start_date" : "'+ this.state.start_date + '",'
         +'"availability" : "'+ this.state.availability + '",'
         +'"location" : "'+ this.state.location + '",'
         +'"remote_work" : '+ this.state.remote_work + ','
         +'"relocate" : '+ this.state.relocate + ','
         +'"talents" : ['+ talentsArr + '],'
         +'"desiredLocation" : ['+ desiredLocationArr+ ']'
         +'}';

        console.log(json)
        
      };
    handleSubmit = (e) => {
        
        this.handleEditing();
      };

    createJson


     



  render() {

    const options = [
        { value: 'Charleston', label: 'Charleston' },
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
                                bsClass="form-control"
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
                                bsClass="form-control"
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
                        <div className="col-md-4">
                        <FormGroup>
                            <ControlLabel>Email address</ControlLabel>
                            <FormControl 
                                bsClass="form-control"
                                type="text"
                                placeholder= "Email"
                                defaultValue= ""
                                inputRef={(ref) => {this.email = ref}}
                                onChange={() => this.handleText()}
                            />
                        </FormGroup>
                        </div>
                    
                        <div className="col-md-4">
                        <FormGroup>
                        <ControlLabel>Start Date</ControlLabel>
                            <FormControl 
                                bsClass="form-control"
                                type="date"
                                placeholder= "Start Date"
                                defaultValue= ""
                                inputRef={(ref) => {this.start_date = ref}}
                                onChange={() => this.handleText()}
                            />
                        </FormGroup>
                        </div>
                        <div className="col-md-4">
                        <FormGroup>
                        <ControlLabel>Next Availability</ControlLabel>
                            <FormControl 
                                bsClass="form-control"
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
                         options={[{value:'Charleston', label:'Charleston' }]}
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
                        <Button onClick = {this.handleSubmit} bsStyle="default" round fill>
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