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
import Button from "../CustomButton/CustomButton.jsx";
import Select from 'react-select'



class EditEmployeeDialog extends Component {
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
          managementLevel:0,
          possible_titles:[],
          possible_levels:[],
          possible_locations:[],
          possible_talents:[],
        };
    }


    componentDidMount() {
        
        fetch('http://localhost:8000/api/titles/')
        .then(res => res.json())
        .then((data) => {
            let titles = data.map(opt => ({ value: opt.id, label: opt.title }));
            this.setState({possible_titles:titles}); 
        })
        .catch(console.log)
        
        fetch('http://localhost:8000/api/managementlevel/')
        .then(res => res.json())
        .then((data) => {
            let levels = data.map(opt => ({ value: opt.id, label: opt.level }));
            this.setState({possible_levels:levels}); 
        })
        .catch(console.log)

        fetch('http://localhost:8000/api/locations/')
        .then(res => res.json())
        .then((data) => {
            let levels = data.map(opt => ({ value: opt.id, label: opt.city_name }));
            this.setState({possible_locations:levels}); 
        })
        .catch(console.log)

        fetch('http://localhost:8000/api/talents/')
        .then(res => res.json())
        .then((data) => {
            let talents = data.map(opt => ({ value: opt.id, label: opt.talent }));
            this.setState({possible_talents:talents}); 
        })
        .catch(console.log)

        this.props.employee[0].talents.forEach(talent => {
            this.state.talents.push({"value":talent.talent_id, "label":talent.talent})
        })

        this.props.employee[0].desired_locations.forEach(location => {
            this.state.desiredLocation.push({"value":location.location_name.id, "label":location.location_name.city_name})
        })

        this.setState({f_name:this.props.employee[0].f_name})
        this.setState({l_name:this.props.employee[0].l_name})
        this.setState({email:this.props.employee[0].email})
        this.setState({start_date:this.props.employee[0].start_date})
        this.setState({availability:this.props.employee[0].availability})
        this.setState({titles:{"value":this.props.employee[0].title.id, "label":this.props.employee[0].title.title}})
        this.setState({location:{"value":this.props.employee[0].location.id, "label":this.props.employee[0].location.city_name}})
        this.setState({managementLevel:{"value":this.props.employee[0].management_level.id, "label":this.props.employee[0].management_level.level}})
        this.setState({remote_work:{"value":this.props.employee[0].remote_work,"label":this.props.employee[0].remote_work.toString()}})
        this.setState({relocate:{"value":this.props.employee[0].relocate,"label":this.props.employee[0].relocate.toString()}})



      };

    handleRelocation = (relocate) => {
        this.setState({relocate});
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
         this.setState({remote_work})
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

    createDesiredLocations = (employee) => {

        const new_locations = this.state.desiredLocation
        const current_locations = this.props.employee[0].desired_locations
        let add_locations = []
        let delete_locations= []
        let already_exist = false
        let not_deleted = false

        
        new_locations.forEach(function(new_location){
            
            already_exist = false
            current_locations.forEach(function(old_location){
                console.log("LOG: " + new_location.value + ' ' + old_location.location_name.id)
                if(new_location.value == old_location.location_name.id){
                    already_exist = true   
                }
            });
            if(!already_exist){
                add_locations.push(new_location)
            }    
        });
        

        current_locations.forEach(function(old_location){
            not_deleted = false
            new_locations.forEach(function(new_location){
                if(new_location.value == old_location.location_name.id){
                    not_deleted = true               
                }
            });
            if(!not_deleted){
                delete_locations.push(old_location)
            } 

        });
        
        console.log(delete_locations)
        console.log(add_locations)
        
        
        for (var i = 0; i < add_locations.length; i++) {
            fetch('http://localhost:8000/api/desiredlocations/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employee_id: employee.id,
                    location_id : add_locations[i].value
                })
            }).then(res => res.json()).catch(console.log)

       }

       for (var i = 0; i < delete_locations.length; i++) {

            fetch('http://localhost:8000/api/desiredlocations/'+ delete_locations[i].id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                } 
            }).then().catch(console.log)

        }
        

    }

    createTalents = (employee) => {
        
        const new_talents = this.state.talents
        const current_talents = this.props.employee[0].talents
        let add_talents = []
        let delete_talents = []
        let already_exist = false
        let not_deleted = false

        
        new_talents.forEach(function(new_talent){
            
            already_exist = false
            current_talents.forEach(function(old_talent){
                if(new_talent.value == old_talent.talent_id){
                    already_exist = true
                    
                }
            });
            if(!already_exist){
                add_talents.push(new_talent)
            }    
        });

        current_talents.forEach(function(old_talent){

            not_deleted = false
            new_talents.forEach(function(new_talent){
                if(new_talent.value == old_talent.talent_id){
                    not_deleted = true               
                }
            });
            if(!not_deleted){
                delete_talents.push(old_talent)
            } 

        });

        console.log(delete_talents)
        console.log(add_talents)

        
        for (var i = 0; i < add_talents.length; i++) {
            fetch('http://localhost:8000/api/talent/entry/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employee_id: employee.id,
                    talent_id : add_talents[i].value
                })
            }).then(res => res.json())
            .then((data) => {
                console.log(data)
            }).catch(console.log)

       }


       for (var i = 0; i < delete_talents.length; i++) {

            fetch('http://localhost:8000/api/talent/entry/'+ delete_talents[i].id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                } 
            }).then().catch(console.log)

        }
    
    }


    saveEmployee = () => {


        fetch('http://localhost:8000/api/employees/'+this.props.employee[0].id + '/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                f_name: this.state.f_name,
                l_name: this.state.l_name,
                email: this.state.email,
                management_level_id: this.state.managementLevel.value,
                start_date: this.state.start_date,
                availability: this.state.availability,
                location_id: this.state.location.value,
                remote_work: this.state.remote_work.value,
                relocate: this.state.relocate.value,
                title_id:this.state.location.value
            })
        
        }).then(res => res.json())
        .then((data) => {
          console.log(data);
          this.createTalents(data)
          this.createDesiredLocations(data)
          window.location.reload();
        })
        .catch(console.log)
        
      };

    handleSubmit = (e) => {
        
        this.handleEditing();
      };

  render() {

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col xsOffset={4} md={4}>
              <Card
                title="Edit Employee"
                content={
                  <form>
                   <Row>
                        <div className="col-md-6">
                        <FormGroup>
                            <ControlLabel>First Name</ControlLabel>
                            <FormControl 
                                type="text"
                                placeholder= {this.props.employee[0].f_name}
                                defaultValue= {this.props.employee[0].f_name}
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
                                placeholder= {this.props.employee[0].l_name}
                                defaultValue= {this.props.employee[0].l_name}
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
                                defaultValue= {this.props.employee[0].email}
                                inputRef={(ref) => {this.email = ref}}
                                onChange={() => this.handleText()}
                            />
                        </FormGroup>
                        </div>
                        <div className="col-md-6">
                        <FormGroup>
                            <ControlLabel>Management Level</ControlLabel>
                            <Select
                            options={this.state.possible_levels} 
                            onChange={this.handleManagementLevel}
                            value={this.state.managementLevel}
                            />
                        </FormGroup>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-12">
                        <FormGroup>
                            <ControlLabel>Titles</ControlLabel>
                            <Select
                            options={this.state.possible_titles}
                            onChange={this.handleTitles}
                            value={this.state.titles}
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
                                defaultValue= {this.props.employee[0].start_date}
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
                                defaultValue= {this.props.employee[0].availability}
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
                            options={this.state.possible_locations}
                            onChange={this.handleLocation}
                            value={this.state.location}
                    
                         />
                         
                     </FormGroup>

                     <FormGroup className="col-md-4">
                        <ControlLabel>Remote Work?</ControlLabel>
                        <Select
                            options={[{value:true, label:'true' }, {value:false, label:'false' }]}
                            onChange={this.handleRemoteWork}
                            value={this.state.remote_work}
                        />
                    </FormGroup>

                     <FormGroup className="col-md-4">
                        <ControlLabel>Relocation Possible?</ControlLabel>
                        <Select
                            options={[{value:true, label:'true' }, {value:false, label:'false' }]}
                            onChange={this.handleRelocation}
                            value={this.state.relocate}
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
                            options={this.state.possible_locations}
                            value={this.state.desiredLocation}
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
                            options={this.state.possible_talents}
                            onChange={this.handleTalents}
                            value={this.state.talents}
                        />
                    </FormGroup>  

                    </Row>

                    <ButtonToolbar>
                        <Button onClick = {this.saveEmployee} bsStyle="default" round fill>
                             Save Employee
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

export default EditEmployeeDialog;