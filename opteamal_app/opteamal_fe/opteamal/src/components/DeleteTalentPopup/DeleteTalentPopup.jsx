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



class DeleteTalentPopup extends Component {
    constructor() {
        super();
        this.textInput = React.createRef();
        this.state = {
          talent:""
        };
    }


    componentDidMount() {
        
        this.setState({talent:this.props.talent[0].talent})

      }

    deleteTalent = () => {

        fetch('http://localhost:8000/api/talents/'+this.props.talent[0].id + '/', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
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
                title={"Are you sure you want to delete " + this.props.talent[0].talent + "?"}
                content={
                  <form>
                   <ButtonToolbar>
                        <Button onClick = {this.deleteTalent} type="button" bsStyle="default" round fill>
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

export default DeleteTalentPopup;