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



class DeleteProjectDialog extends Component {
    constructor() {
        super();
        this.textInput = React.createRef();
        this.state = {
          project_name:""
        };
    }


    componentDidMount() {
        
        this.setState({project_name:this.props.project[0].project_name})

      };

    deleteProject = () => {

        fetch('http://localhost:8000/api/projects/'+this.props.project[0].id + '/', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(() => {
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
                title={"Are you sure you want to delete " + this.props.project[0].project_name + "?"}
                content={
                  <form>
                   <ButtonToolbar>
                        <Button onClick = {this.deleteProject} bsStyle="default" round fill>
                             Yes
                        </Button>
                        <Button onClick={this.props.closePopup} bsStyle="default" round fill>
                             No
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

export default DeleteProjectDialog;