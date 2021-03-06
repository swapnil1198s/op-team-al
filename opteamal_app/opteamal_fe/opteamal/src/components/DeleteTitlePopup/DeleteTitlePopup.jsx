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



class DeleteTitlePopup extends Component {
    constructor() {
        super();
        this.textInput = React.createRef();
        this.state = {
          title:"",
          error:""
        };
    }


    componentDidMount() {
        
        this.setState({title:this.props.title[0].title})

      }

    deleteTitle = () => {

        fetch('http://localhost:8000/api/titles/'+this.props.title[0].id + '/', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(() => {
            fetch('http://localhost:8000/api/titles/'+this.props.title[0].id + '/', {
            }).then(res => res.json())
            .then((data) => {
              if(data.id != null){
                this.setState({error: "Error: Instances depend on this. Edit/delete those instances first."})
              }else{
                window.location.reload();
              }
            })
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
                title={"Are you sure you want to delete " + this.props.title[0].title + "?"}
                content={
                  <form>
                   <ButtonToolbar>
                        <Button onClick = {this.deleteTitle} type="button" bsStyle="default" round fill>
                             Yes
                        </Button>
                        <Button onClick={this.props.closePopup} bsStyle="default" round fill>
                             No
                        </Button>
                    </ButtonToolbar>
                    <div className="clearfix" />
                    <br></br><text style={{color: "red"}}>{this.state.error}</text>
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

export default DeleteTitlePopup;