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
            this.state.talents.push({"value":talent.id, "label":talent.talent})
        })

        this.props.employee[0].desired_locations.forEach(location => {
            this.state.desiredLocation.push({"value":location.id, "label":location.location_name.city_name})
        })

        this.setState({f_name:this.props.employee[0].f_name})
        this.setState({l_name:this.props.employee[0].l_name})
        this.setState({email:this.props.employee[0].email})
        this.setState({start_date:this.props.employee[0].start_date})
        this.setState({availability:this.props.employee[0].availability})
        this.setState({titles:{"value":this.props.employee[0].title.id, "label":this.props.employee[0].title.title}})
        this.setState({location:{"value":this.props.employee[0].location.id, "label":this.props.employee[0].location.city_name}})
        this.setState({managementLevel:{"value":this.props.employee[0].management_level.id, "label":this.props.employee[0].management_level.level}})
        this.setState({remote_work:this.props.employee[0].remote_work})
        this.setState({relocate:this.props.employee[0].relocate})



      };

    handleRelocation = (selection) => {
        this.setState({relocate:selection.value});
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



    createDesiredLocations = (employee) => {

        this.state.desiredLocation.forEach(function(location) {
           
            fetch('http://localhost:8000/api/desiredlocations/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employee_id: employee.id,
                    location_id : location.value
                })
            }).then(res => res.json()).catch(console.log)
        
            
        });

    }

    createTalents = (employee) => {

        this.state.talents.forEach(function(talent) {
           
            fetch('http://localhost:8000/api/talent/entry/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employee_id: employee.id,
                    talent_id : talent.value
                })
            }).then(res => res.json())
            .then((data) => {
            console.log(data);
            })
            .catch(console.log)
            
        });

    }

    saveEmployee = () => {

        //const talentsArr = []
        //const desiredLocationArr = []
        //const titlesArr = []
        //this.state.talents.forEach(item => talentsArr.push(item.value));
        //this.state.desiredLocation.forEach(item => desiredLocationArr.push(item.value));
       

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
                remote_work: this.state.remote_work,
                relocate: this.state.relocate,
                title_id:this.state.location.value
            })
        }).then(res => res.json())
        .then((data) => {
          console.log(data);
          this.createDesiredLocations(data)
          this.createTalents(data)
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
                        <Button onClick = {this.props.closePopup} bsStyle="default" round fill>
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