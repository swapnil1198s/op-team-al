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



class EditProjectDialog extends Component {
    constructor() {
        super();
        this.textInput = React.createRef();
        this.state = {
          selectedOption: '',
          project_name:"",
          start_date:"1/1/2020",
          due_date:"1/1/2030",
          location:0,
          remote_work:false,
          client:'',
          assigned:[],
          project_lead:null,
          possible_employees:[],
          possible_locations:[],

        };
    }


    componentDidMount() {
        
        fetch('http://localhost:8000/api/employees/')
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            let employees = data.map(opt => ({ value: opt.id, label: opt.f_name + " " + opt.l_name}));
            this.setState({possible_employees:employees}); 
        })
        .catch(console.log)


        fetch('http://localhost:8000/api/locations/')
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            let levels = data.map(opt => ({ value: opt.id, label: opt.city_name }));
            this.setState({possible_locations:levels}); 
        })
        .catch(console.log)
        
        this.setState({project_name:this.props.project[0].project_name})
        this.setState({project_lead:{"value":this.props.project[0].project_lead.id, "label":this.props.project[0].project_lead.f_name + ' ' + this.props.project[0].project_lead.l_name }})
        this.setState({start_date:this.props.project[0].project_start})
        this.setState({due_date:this.props.project[0].project_due})
        this.setState({location:{"value":this.props.project[0].location.id, "label":this.props.project[0].location.city_name}})
        this.setState({client:this.props.project[0].client})

        this.props.project[0].employees.forEach(employee => {
            this.state.assigned.push({"value":employee.employee.id, "label":employee.employee.f_name + ' ' + employee.employee.l_name})
        })

      };

    handleText() {
   
        this.setState({start_date:this.start_date.value});
        this.setState({due_date:this.due_date.value});
        this.setState({client:this.client.value});
        //this.setState({project_name:this.project_name.value})
     }
     handleLocation = (location) => {
        this.setState({location});
     }
     handleProjectLead = (project_lead) => {
        this.setState({project_lead});
     }
     handleRemoteWork = (remote_work) => {
         this.setState({remote_work:remote_work.value})
     }

    handleAssigned = (assigned) => {
         this.setState({assigned})
     }
     createAssignedEntry = (project) => {

        this.state.assigned.forEach(function(assign) {
  
            fetch('http://localhost:8000/api/project/assigned/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employee_id: assign.value,
                    project_id : project.id
                })
            }).then(res => res.json())
            .then((data) => {
            })
            .catch(console.log)
        
            
        });

    }

    
    createAssignedEntry = (project) => {

        const new_assigned= this.state.assigned
        const current_assigned = this.props.project[0].employees
        let add_assigned= []
        let delete_assigned= []
        let already_exist = false
        let not_deleted = false

        
        new_assigned.forEach(function(new_employee){
            already_exist = false
            current_assigned.forEach(function(old_employee){
                if(new_employee.value == old_employee.employee.id){
                    already_exist = true   
                }
            });
            if(!already_exist){
                add_assigned.push(new_employee)
            }    
        });
        

        current_assigned.forEach(function(old_employee){
            not_deleted = false
            new_assigned.forEach(function(new_employee){
                if(new_employee.value == old_employee.employee.id){
                    not_deleted = true               
                }
            });
            if(!not_deleted){
                delete_assigned.push(old_employee)
            } 

        });
        

        
        
        for (var i = 0; i < add_assigned.length; i++) {
            fetch('http://localhost:8000/api/project/assigned/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    project_id: project.id,
                    employee_id : add_assigned[i].value
                })
            }).then(res => res.json()).catch(console.log)

       }

       for (var i = 0; i < delete_assigned.length; i++) {

            fetch('http://localhost:8000/api/project/assigned/'+ delete_assigned[i].id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                } 
            }).then().catch(console.log)

        }
        
        

    }


    saveProject = () => {

        //const assignedArr = []
        //this.state.assigned.forEach(item => assignedArr.push(item.value));

        fetch('http://localhost:8000/api/projects/'+this.props.project[0].id +'/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                project_name: this.state.project_name,
                project_lead_id: this.state.project_lead.value,
                project_start: this.state.start_date,
                project_due: this.state.due_date,
                location_id: this.state.location.value,
                client: this.state.client
            })
        }).then(res => res.json())
        .then((data) => {
          
          this.createAssignedEntry(data)
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
                title="Edit Project"
                content={
                  <form>
                   <Row>
                        <div className="col-md-6">
                        <FormGroup>
                            <ControlLabel>Project Name</ControlLabel>
                            <FormControl 
                                type="text"
                                placeholder= {this.props.project[0].project_name}
                                defaultValue= {this.props.project[0].project_name}
                                inputRef={(ref) => {this.project_name = ref}}
                                onChange={() => this.handleText()}
                            />
                        </FormGroup>
                        </div>
                    
                        <div className="col-md-6">
                        <FormGroup>
                            <ControlLabel>Project Lead</ControlLabel>
                            <Select
                            options={this.state.possible_employees} 
                            onChange={this.handleProjectLead}
                            value={this.state.project_lead}
                            />
                        </FormGroup>
                        </div>
                    </Row>
                    <Row>

                    <div className="col-md-12">
                        <FormGroup>
                            <ControlLabel>Client Name</ControlLabel>
                            <FormControl 
                                type="text"
                                placeholder= {this.state.client}
                                defaultValue= {this.state.client}
                                inputRef={(ref) => {this.client = ref}}
                                onChange={() => this.handleText()}
                            />
                        </FormGroup>
                    </div>
                    </Row> 
                    <Row>
                    
                        <div className="col-md-6">
                        <FormGroup>
                        <ControlLabel>Project Start</ControlLabel>
                            <FormControl 
                                type="date"
                                placeholder= "Start Date"
                                value= {this.state.start_date}
                                inputRef={(ref) => {this.start_date = ref}}
                                onChange={() => this.handleText()}
                            />
                        </FormGroup>
                        </div>
                        <div className="col-md-6">
                        <FormGroup>
                        <ControlLabel>Project Due Date</ControlLabel>
                            <FormControl 
                                type="date"
                                placeholder= "Due Date"
                                value= {this.state.due_date}
                                inputRef={(ref) => {this.due_date = ref}}
                                onChange={() => this.handleText()}
                            />
                        </FormGroup>
                        </div>
                    </Row>
                    
                    <Row>

                    <FormGroup className="col-md-12">
                        <ControlLabel>Location</ControlLabel>
                        <Select
                        
                         options={this.state.possible_locations}
                         onChange={this.handleLocation}
                         value={this.state.location}
                         />
                         
                     </FormGroup>

 
                                        
                    </Row> 
                    <Row>

                    <FormGroup className="col-md-12">
                        <ControlLabel>Assign to Project</ControlLabel>
                        <Select
                            defaultValue={[]}
                            isMulti
                            name="talents"
                            value = {this.state.assigned}
                            options={this.state.possible_employees}
                            onChange={this.handleAssigned}
                        />
                    </FormGroup>  

                    </Row>

                    <ButtonToolbar>
                        <Button onClick = {this.saveProject} bsStyle="default" round fill>
                             Save Project
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

export default EditProjectDialog;