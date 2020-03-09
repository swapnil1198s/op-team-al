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
import Icon from '@material-ui/core/Icon';



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
          start_date:"1/1/1950",
          availability:"1/1/2150",
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
          errors:[]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    customStyles = {
        invalidEntry: {
            borderColor: 'red'
        },
        control: (base, state) => ({
          ...base,
          borderColor: state.isFocused ? "red" : "red",
          "&:hover": {
            borderColor: state.isFocused ? "red" : "red"
          }
        })
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

      };


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

    createDesiredLocations = (employee) => {

        this.state.desiredLocation.forEach(function(location) {
            console.log(location.label);
            console.log(employee.id)
           
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
            console.log(talent.label);
            console.log(employee.id)
           
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
            }).then(res => res.json()).catch(console.log)
    
        });

    }

    createEmployee() {

        const talentsArr = []
        const desiredLocationArr = []
        const titlesArr = []
        this.state.talents.forEach(item => talentsArr.push(item.value));
        this.state.desiredLocation.forEach(item => desiredLocationArr.push(item.value));
    

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
                management_level_id: this.state.managementLevel.value,
                start_date: this.state.start_date,
                availability: this.state.availability,
                location_id: this.state.location.value,
                remote_work: this.state.remote_work,
                relocate: this.state.relocate,
                title_id:this.state.titles.value
            })
        }).then(res => res.json())
        .then((data) => {
          this.createDesiredLocations(data)
          this.createTalents(data)
          window.location.reload()
        })
            
        .catch(console.log)
      };


      handleValidation(f_name,l_name,email,titles,start_date,availability,location,managementLevel){
        const errors = []
        var errorCount = 0

        if (f_name.length == 0){
            errors["f_name"]="*First name required"
            errorCount++
        }else{
            errors["f_name"]="No Error"
        }

        if (l_name.length == 0){
            errors["l_name"]="*Last name required"
            errorCount++
        }else{
            errors["l_name"]="No Error"
        }
        
        if (email.length == 0){
            errors["email"]="*Email required"
            errorCount++
        }else if ((email.split("").filter(x => x == "@").length !== 1) || (email.indexOf(".") == -1)) {
            errors["email"]="*Email invalid"
            errorCount++
        }else{
            errors["email"]="No Error"
        }
        
        if (titles == 0){
            errors["titles"]="*Title required"
            errorCount++
        }else{
            errors["titles"]="No Error"
        }

        if (managementLevel == 0){
            errors["managementLevel"]="*Management level required"
            errorCount++
        }else{
            errors["managementLevel"]="No Error"
        }

        if (availability == "1/1/2150" || Date.parse(availability) != Date.parse(availability)){
            errors["availability"]="*Availability required"
            errorCount++
        }else{
            errors["availability"]="No Error"
        }
        
        if (start_date == "1/1/1950" || Date.parse(start_date) != Date.parse(start_date)){
            errors["start_date"]="*Start date required"
            errorCount++
        }else if (Date.parse(start_date) > Date.parse(availability)){
            errors["start_date"]="*Start date can't be after availability"
            errors["availability"]=""
            errorCount++
        }else{
            errors["start_date"]="No Error"
        }

        if (location == 0){
            errors["location"]="*Location required"
            errorCount++
        }else{
            errors["location"]="No Error"
        }

        errors["errorCount"]=errorCount
        return errors;
    }

    handleStyle(data, entryMethod){
        if(this.state.errors[data]!="No Error" && this.state.errors[data]!=null){
            
            if(entryMethod=="selection")
                return this.customStyles;
            else
                return this.customStyles.invalidEntry;

        }
    }

    handleError(type){
        if(this.state.errors[type]!="No Error" && this.state.errors[type]!=null){
            return <text style={{color: "red"}}>{this.state.errors[type]}</text>
        }
    }

    

    handleSubmit = (e) => {    
        e.preventDefault();

        const { f_name, l_name, email, titles, start_date, availability, location, managementLevel, errorCount } = this.state;

        const errors = this.handleValidation(f_name, l_name, email, titles, start_date, availability, location, managementLevel);
        if (errors["errorCount"] > 0) {
            this.setState({ errors });
            return;
        }else{
            this.createEmployee();
        }
    };

  render() {
    const {errors} = this.state;
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
                                style={this.handleStyle("f_name", "textEntry")}
                                type="text"
                                placeholder= "First Name"
                                defaultValue= ""
                                inputRef={(ref) => {this.first_name = ref}}
                                onChange={() => this.handleText()}
                            />
                            {this.handleError("f_name")}
                        </FormGroup>
                        </div>
                    
                        <div className="col-md-6">
                        <FormGroup>
                        <ControlLabel>Last Name</ControlLabel>
                            <FormControl 
                                style={this.handleStyle("l_name", "textEntry")}
                                type="text"
                                placeholder= "Last Name"
                                defaultValue= ""
                                inputRef={(ref) => {this.last_name = ref}}
                                onChange={() => this.handleText()}
                            />
                            {this.handleError("l_name")}
                        </FormGroup>
                        
                        </div>
                    </Row> 
                    <Row>
                        <div className="col-md-6">
                        <FormGroup>
                            <ControlLabel>Email address</ControlLabel>
                            <FormControl 
                                style={this.handleStyle("email", "textEntry")}
                                type="email"
                                placeholder= "Email"
                                defaultValue= ""
                                inputRef={(ref) => {this.email = ref}}
                                onChange={() => this.handleText()}
                            />
                            {this.handleError("email")}
                        </FormGroup>
                        
                        </div>
                        <div className="col-md-6">
                        <FormGroup>
                            <ControlLabel>Management Level</ControlLabel>
                            <Select
                            styles={this.handleStyle("managementLevel", "selection")}
                            options={this.state.possible_levels} 
                            onChange={this.handleManagementLevel}
                            />
                            {this.handleError("managementLevel")}
                        </FormGroup>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-12">
                        <FormGroup>
                            <ControlLabel>Titles</ControlLabel>
                            <Select
                            styles={this.handleStyle("titles", "selection")}
                            options={this.state.possible_titles}
                            onChange={this.handleTitles}
                            />
                            {this.handleError("titles")}
                        </FormGroup>
                        </div>
                    </Row>
                    <Row>
                    
                        <div className="col-md-6">
                        <FormGroup>
                        <ControlLabel>Start Date</ControlLabel>
                            <FormControl 
                                style={this.handleStyle("start_date", "textEntry")}
                                type="date"
                                placeholder= "Start Date"
                                defaultValue= ""
                                inputRef={(ref) => {this.start_date = ref}}
                                onChange={() => this.handleText()}
                            />
                            {this.handleError("start_date")}
                        </FormGroup>
                        </div>
                        <div className="col-md-6">
                        <FormGroup>
                        <ControlLabel>Next Availability</ControlLabel>
                            <FormControl 
                                style={this.handleStyle("availability", "textEntry")}
                                type="date"
                                placeholder= "Start Date"
                                defaultValue= ""
                                inputRef={(ref) => {this.availability = ref}}
                                onChange={() => this.handleText()}
                            />
                            {this.handleError("availability")}
                        </FormGroup>
                        </div>
                    </Row>
                    
                    <Row>

                    <FormGroup className="col-md-4">
                        <ControlLabel>Location</ControlLabel>
                        <Select
                         styles={this.handleStyle("location", "selection")}
                         options={this.state.possible_locations}
                         onChange={this.handleLocation}
                         />
                         {this.handleError("location")}
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
                            options={this.state.possible_locations}
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