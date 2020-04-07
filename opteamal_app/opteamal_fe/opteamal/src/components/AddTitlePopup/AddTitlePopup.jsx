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



class AddTitlePopup extends Component {
    constructor() {
        super();
        this.textInput = React.createRef();
        this.state = { 
          title:"",
          talents:[],
          possible_talents:[],
          errors:[]
        };
    }

    customStyles = {
        invalidEntry: {
            borderColor: 'red'
        }
    }

    componentDidMount() {
        
      fetch('http://localhost:8000/api/talents/')
      .then(res => res.json())
      .then((data) => {
          let talents = data.map(opt => ({ value: opt.id, label: opt.talent }));
          this.setState({possible_talents:talents}); 
      })
      .catch(console.log)
    }

    handleText() {
        this.setState({title:this.title_name.value});
     }

     handleTalents = (talents) => {
      this.setState({talents})
    }

    createTalentGroups = (title) => {
        
      this.state.talents.forEach(function(talent) {
          console.log(talent.label);
          console.log(title.id)
         
          fetch('http://localhost:8000/api/talentgroup/', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  title_id: title.id,
                  talent_id : talent.value
              })
          }).then(res => res.json()).catch(console.log)
          
      });
      window.location.reload()

    }

    createTitle() {
    

        fetch('http://localhost:8000/api/titles/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title
            })
        }).then(res => res.json())
        .then((data) => {
          this.createTalentGroups(data)
          
        })
            
        .catch(console.log)
      };


      handleValidation(title){
        const errors = []
        var errorCount = 0

        if (title.length == 0){
            errors["title"]="*Title required"
            errorCount++
        }else{
            errors["title"]="No Error"
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

        const title = this.state.title;

        const errors = this.handleValidation(title)

        if (errors["errorCount"] > 0) {
            this.setState({ errors });
            return;
        }else{
            this.createTitle();
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
                title="Add Title"
                content={
                  <form>
                   <Row>
                        <div className="col-md-12">
                        <FormGroup>
                            <FormControl 
                                style={this.handleStyle("title")}
                                type="text"
                                placeholder= "Title"
                                defaultValue= ""
                                inputRef={(ref) => {this.title_name = ref}}
                                onChange={() => this.handleText()}
                            />
                            {this.handleError("title")}
                        </FormGroup>
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

export default AddTitlePopup;