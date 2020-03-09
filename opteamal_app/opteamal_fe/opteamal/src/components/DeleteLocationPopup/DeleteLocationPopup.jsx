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



class DeleteLocationPopup extends Component {
    constructor() {
        super();
        this.textInput = React.createRef();
        this.state = {
          building:"",
          city_name:"",
          state:"",
          country:"",
          continent:""
        };
    }


    componentDidMount() {
        
        this.setState({building:this.props.location[0].building})
        this.setState({city_name:this.props.location[0].city_name})
        this.setState({state:this.props.location[0].state})
        this.setState({country:this.props.location[0].country})
        this.setState({continent:this.props.location[0].continent})

      }

    deleteLocation = () => {

        fetch('http://localhost:8000/api/locations/'+this.props.location[0].id + '/', {
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
                title={"Are you sure you want to delete " + this.props.location[0].building + "?"}
                content={
                  <form>
                   <ButtonToolbar>
                        <Button onClick = {this.deleteLocation} type="button" bsStyle="default" round fill>
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

export default DeleteLocationPopup;