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



class AddProjectDialog extends Component {
    constructor() {
        super();
        this.textInput = React.createRef();
        this.state = {
          selectedOption: '',
          project_name:"",
          start_date:"1/1/1950",
          due_date:"1/1/2150",
          location:0,
          remote_work:false,
          client:'',
          assigned:[],
          project_lead:0,
          possible_employees:[],
          possible_locations:[],
          errors:[]
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

      };

    handleText() {
   
        this.setState({start_date:this.start_date.value});
        this.setState({due_date:this.due_date.value});
        this.setState({client:this.client.value});
        this.setState({project_name:this.project_name.value})
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
            console.log(data);
            })
            .catch(console.log)
        
            
        });

    }


    createProject = () => {

        const assignedArr = []
        this.state.assigned.forEach(item => assignedArr.push(item.value));

        fetch('http://localhost:8000/api/projects/', {
            method: 'POST',
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
          console.log(data);
          this.createAssignedEntry(data)
          window.location.reload();
        })
        .catch(console.log)
        
      };

      handleValidation(project_name, start_date, due_date, location, client, project_lead){
        const errors = [];

        if (project_name.length == 0){
            errors.push("Project name is empty");
        }

        if (project_lead == 0){
            errors.push("Project lead not selected")
        }
        
        if (client.length == 0){
            errors.push("Client name is empty");
        }

        if (start_date == "1/1/1950" || Date.parse(start_date) != Date.parse(start_date)){
            errors.push("Start date not selected")
        }

        if (due_date == "1/1/2150" || Date.parse(due_date) != Date.parse(due_date)){
            errors.push("Due date not selected")
        }

        if (Date.parse(start_date) > Date.parse(due_date)){
            errors.push("Start date can't be after due date")
        }

        if (location == 0){
            errors.push("Location not selected")
        }

        return errors;
    }

    handleSubmit = (e) => {    
        e.preventDefault();

        const { project_name, start_date, due_date, location, client, project_lead } = this.state;

        const errors = this.handleValidation(project_name, start_date, due_date, location, client, project_lead);
        if (errors.length > 0) {
            this.setState({ errors });
            return;
        }else{
            this.createProject();
        }
    };

    

  render() {
    const {errors} = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col xsOffset={4} md={4}>
                {errors.map(error => (
                <p key={error}><i class="material-icons">close</i> {error}</p>
                ))}
              <Card
                title="Add Project"
                content={
                  <form>
                   <Row>
                        <div className="col-md-6">
                        <FormGroup>
                            <ControlLabel>Project Name</ControlLabel>
                            <FormControl 
                                type="text"
                                placeholder= "Project Name"
                                defaultValue= ""
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
                                placeholder= "Client Name"
                                defaultValue= ""
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
                                defaultValue= ""
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
                                defaultValue= ""
                                inputRef={(ref) => {this.due_date = ref}}
                                onChange={() => this.handleText()}
                            />
                        </FormGroup>
                        </div>
                    </Row>
                    
                    <Row>

                    <FormGroup className="col-md-6">
                        <ControlLabel>Location</ControlLabel>
                        <Select
                        
                         options={this.state.possible_locations}
                         onChange={this.handleLocation}
                         />
                         
                     </FormGroup>

                     <FormGroup className="col-md-6">
                        <ControlLabel>Remote Work?</ControlLabel>
                        <Select
                            options={[{value:true, label:'Yes' }, {value:false, label:'No' }]}
                            onChange={this.handleRemoteWork}
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
                            options={this.state.possible_employees}
                            onChange={this.handleAssigned}
                        />
                    </FormGroup>  

                    </Row>

                    <ButtonToolbar>
                        <Button onClick = {this.handleSubmit} bsStyle="default" round fill>
                             Add Project
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

export default AddProjectDialog;