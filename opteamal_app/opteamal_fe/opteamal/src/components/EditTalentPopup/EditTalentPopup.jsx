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



class AddTalentPopup extends Component {
    constructor() {
        super();
        this.textInput = React.createRef();
        this.state = { 
          talent:"",
          errors:[]
        };
    }

    customStyles = {
        invalidEntry: {
            borderColor: 'red'
        }
    }

    handleText() {
        this.setState({talent:this.talent_name.value});
     }

    saveTalent() {
    

        fetch('http://localhost:8000/api/talents/'+this.props.talent[0].id + '/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                talent: this.state.talent
            })
        }).then(res => res.json())
        .then(() => {
          window.location.reload()
        })
            
        .catch(console.log)
      };


      handleValidation(talent){
        const errors = []
        var errorCount = 0

        if (talent.length == 0){
            errors["talent"]="*Talent required"
            errorCount++
        }else{
            errors["talent"]="No Error"
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

        const talent = this.state.talent;

        const errors = this.handleValidation(talent)

        if (errors["errorCount"] > 0) {
            this.setState({ errors });
            return;
        }else{
            this.saveTalent();
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
                title="Edit Talent"
                content={
                  <form>
                   <Row>
                        <div className="col-md-6">
                        <FormGroup>
                            <FormControl 
                                style={this.handleStyle("talent")}
                                type="text"
                                placeholder= "Talent"
                                defaultValue= {this.props.talent[0].talent}
                                inputRef={(ref) => {this.talent_name = ref}}
                                onChange={() => this.handleText()}
                            />
                            {this.handleError("talent")}
                        </FormGroup>
                        </div>
                    </Row>

                    <ButtonToolbar>
                        <Button onClick = {this.handleSubmit} bsStyle="default" round fill>
                             Save
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

export default AddTalentPopup;