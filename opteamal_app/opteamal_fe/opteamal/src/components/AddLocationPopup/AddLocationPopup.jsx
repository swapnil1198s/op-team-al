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



class AddLocationPopup extends Component {
    constructor() {
        super();
        this.textInput = React.createRef();
        this.state = { 
          building:"",
          city_name:"",
          state:"",
          country:"",
          continent:"",
          errors:[]
        };
    }

    customStyles = {
        invalidEntry: {
            borderColor: 'red'
        }
    }

    handleText() {
        this.setState({building:this.building.value});
        this.setState({city_name:this.city_name.value});
        this.setState({state:this.state.value});
        this.setState({country:this.country.value});
        this.setState({continent:this.continent.value});
     }

    createLocation() {
        
        let building = this.state.building
        console.log(building)
        fetch('http://localhost:8000/api/locations/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                building: building,
                city_name: this.state.city_name,
                state: this.state.state,
                country: this.state.country,
                continent: this.state.continent
            })
        }).then(res =>console.log(res.json()))
        .then(() => {
            
          //window.location.reload()
        })
            
        .catch(console.log)
      }


      handleValidation = (building, city_name, state, country, continent) =>{
        const errors = []
        var errorCount = 0

        if (building.length == 0){
            errors["building"]="*Building required"
            errorCount++
        }else{
            errors["building"]="No Error"
        }
        
        if (city_name.length == 0){
            errors["city_name"]="*City required"
            errorCount++
        }else{
            errors["city_name"]="No Error"
        }

        if (state.length == 0){
            errors["state"]="*State required"
            errorCount++
        }else{
            errors["state"]="No Error"
        }

        if (country.length == 0){
            errors["country"]="*Country required"
            errorCount++
        }else{
            errors["country"]="No Error"
        }

        if (continent.length == 0){
            errors["continent"]="*Continent required"
            errorCount++
        }else{
            errors["continent"]="No Error"
        }

        errors["errorCount"]=errorCount
        return errors;
    }

    handleStyle(type){
        if(this.state.errors[type]!="No Error" && this.state.errors[type]!=null){
            
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

        
        console.log(this.state.building)
        const errors = this.handleValidation(this.building.value, this.city_name.value, this.state.value, this.country.value, this.continent.value)

        if (errors["errorCount"] > 0) {
            this.setState({ errors });
            return;
        }else{
            this.createLocation();
        }
    }

  render() {
    const {errors} = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col xsOffset={4} md={4}>
              <Card
                title="Add Location"
                content={
                  <form>
                   <Row>
                        <div className="col-md-6">
                        <FormGroup>
                            <ControlLabel>Building</ControlLabel>
                            <FormControl 
                                style={this.handleStyle("building")}
                                type="text"
                                placeholder= "Building"
                                defaultValue= ""
                                inputRef={(ref) => {this.building = ref}}
                                onChange={() => this.handleText()}
                            />
                            {this.handleError("building")}
                        </FormGroup>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-6">
                        <FormGroup>
                            <ControlLabel>City</ControlLabel>
                            <FormControl 
                                style={this.handleStyle("city_name")}
                                type="text"
                                placeholder= "City"
                                defaultValue= ""
                                inputRef={(ref) => {this.city_name = ref}}
                                onChange={() => this.handleText()}
                            />
                            {this.handleError("city_name")}
                        </FormGroup>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-6">
                        <FormGroup>
                            <ControlLabel>State</ControlLabel>
                            <FormControl 
                                style={this.handleStyle("state")}
                                type="text"
                                placeholder= "State"
                                defaultValue= ""
                                inputRef={(ref) => {this.state = ref}}
                                onChange={() => this.handleText()}
                            />
                            {this.handleError("state")}
                        </FormGroup>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-6">
                        <FormGroup>
                            <ControlLabel>Country</ControlLabel>
                            <FormControl 
                                style={this.handleStyle("country")}
                                type="text"
                                placeholder= "Country"
                                defaultValue= ""
                                inputRef={(ref) => {this.country = ref}}
                                onChange={() => this.handleText()}
                            />
                            {this.handleError("country")}
                        </FormGroup>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-6">
                        <FormGroup>
                            <ControlLabel>Continent</ControlLabel>
                            <FormControl 
                                style={this.handleStyle("continent")}
                                type="text"
                                placeholder= "Continent"
                                defaultValue= ""
                                inputRef={(ref) => {this.continent = ref}}
                                onChange={() => this.handleText()}
                            />
                            {this.handleError("continent")}
                        </FormGroup>
                        </div>
                    </Row>

                    <ButtonToolbar>
                        <Button onClick = {this.handleSubmit} bsStyle="default" round fill>
                             Add
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

export default AddLocationPopup;