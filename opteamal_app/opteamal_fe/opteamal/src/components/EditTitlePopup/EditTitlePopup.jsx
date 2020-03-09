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



class EditTitlePopup extends Component {
    constructor() {
        super();
        this.textInput = React.createRef();
        this.state = { 
          title:"",
          errors:[]
        };
    }

    customStyles = {
        invalidEntry: {
            borderColor: 'red'
        }
    }

    handleText() {
        this.setState({title:this.title_name.value});
     }

    saveTitle() {
    

        fetch('http://localhost:8000/api/titles/'+this.props.title[0].id + '/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title
            })
        }).then(res => res.json())
        .then(() => {
          window.location.reload()
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
            this.saveTitle();
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
                title="Edit Title"
                content={
                  <form>
                   <Row>
                        <div className="col-md-6">
                        <FormGroup>
                            <FormControl 
                                style={this.handleStyle("title")}
                                type="text"
                                placeholder= "Title"
                                defaultValue= {this.props.title[0].title}
                                inputRef={(ref) => {this.title_name = ref}}
                                onChange={() => this.handleText()}
                            />
                            {this.handleError("title")}
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

export default EditTitlePopup;