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



class FindTalentSearch extends Component {
    constructor() {
        super();
        this.textInput = React.createRef();
        this.state = {
            possible_titles:[],
            possible_locations:[],
            possible_talents:[],
            titles:[],
            talents:[],
            locations:[]
            
        };

    }
    componentDidMount() {
        
        fetch('http://localhost:8000/api/titles/')
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            let titles = data.map(opt => ({ value: opt.id, label: opt.title }));

            this.setState({possible_titles:titles}); 
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

        fetch('http://localhost:8000/api/talents/')
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            let talents = data.map(opt => ({ value: opt.id, label: opt.talent }));
            this.setState({possible_talents:talents}); 
        })
        .catch(console.log)

      };
      handleTitles = (titles) => {
        this.setState({titles})
      }
      handleTalents = (talents) => {
        this.setState({talents})
      }
      handleLocations = (locations) =>{
          this.setState({locations})
      }
      passTitles = () => {
          this.props.closePopup(this.state.titles, this.state.talents, this.state.locations);
      }

    render() {

    return (
    <Col xsOffset={2}>
        <form>
            <Row>
                <div className="col-md-10">
                    <FormGroup>
                        <ControlLabel>What titles are needed for the project?</ControlLabel>
                        <Select
                        isMulti
                        options={this.state.possible_titles}
                        onChange={this.handleTitles}
                        />
                    </FormGroup>
                </div>
            </Row>
            <Row>
                <div className="col-md-10">
                    <FormGroup>
                        <ControlLabel>What locations are needed for the project?</ControlLabel>
                        <Select
                        isMulti
                        options={this.state.possible_locations}
                        onChange={this.handleLocations}
                        />
                    </FormGroup>
                </div>
            </Row>
            <Row>
                <div className="col-md-10">
                    <FormGroup>
                        <ControlLabel>What talents are needed for the project?</ControlLabel>
                        <Select
                        isMulti
                        options={this.state.possible_talents}
                        onChange={this.handleTalents}
                        />
                    </FormGroup>
                </div>
            </Row>
            <Row>
                <Col xsOffset={3} >
                    <Button onClick={this.passTitles} bsStyle="default" round fill>Find Talent</Button>
                </Col>
            </Row>
             <div className="clearfix" />
        </form>
    </Col>       
    );
  }
}

export default FindTalentSearch;