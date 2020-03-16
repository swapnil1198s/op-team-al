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



class AddManagementLevelPopup extends Component {
    constructor() {
        super();
        this.textInput = React.createRef();
        this.state = { 
          level:"",
          errors:[]
        };
    }

    customStyles = {
        invalidEntry: {
            borderColor: 'red'
        }
    }

    handleText() {
        this.setState({level:this.level.value});
     }

    createManagementLevel() {
    

        fetch('http://localhost:8000/api/managementlevel/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                level: this.state.level
            })
        }).then(res => res.json())
        .then(() => {
          window.location.reload()
        })
            
        .catch(console.log)
      };


      handleValidation(level){
        const errors = []
        var errorCount = 0

        if (level.length == 0){
            errors["level"]="*Level required"
            errorCount++
        }else{
            errors["level"]="No Error"
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

        const level = this.state.level;

        const errors = this.handleValidation(level)

        if (errors["errorCount"] > 0) {
            this.setState({ errors });
            return;
        }else{
            this.createManagementLevel();
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
                title="Add Management Level"
                content={
                  <form>
                   <Row>
                        <div className="col-md-6">
                        <FormGroup>
                            <FormControl 
                                style={this.handleStyle("level")}
                                type="text"
                                placeholder= "Level"
                                defaultValue= ""
                                inputRef={(ref) => {this.level = ref}}
                                onChange={() => this.handleText()}
                            />
                            {this.handleError("level")}
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

export default AddManagementLevelPopup;