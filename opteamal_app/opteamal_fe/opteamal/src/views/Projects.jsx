
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Table,
  ButtonToolbar,
} from "react-bootstrap";

import { Card } from "../components/Card/Card.jsx";
import Button from "../components/CustomButton/CustomButton.jsx";
import ProjectTable from "../components/ProjectTable/ProjectTable.jsx";
import AddProjectDialog from "../components/AddProjectDialog/AddProjectDialog.jsx"

class Projects extends Component {

  state = {
    projects: [],
    projects_count: 0,
    showPopup: false
  }


  togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
     } 

  componentDidMount() {
    const url = 'http://localhost:8000/api/projects'; 
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      this.setState({ projects: data })
      this.setState({projects_count: this.state.projects.length})
    })
    .catch(console.log)
  };
  render() {
    return (
      <div className="content">
        <Grid fluid>
        {!this.state.showPopup  ?  
        <Row>
        <div>
            <Col md={12}>
              <Row>
                <Col xsOffset={0} md={12}>
                  <ButtonToolbar>
                        <Button onClick={this.togglePopup.bind(this)} bsStyle="default" round fill>Add Project</Button>
                        <Button bsStyle="default" round fill>Export</Button>
                        <Button bsStyle="default" round fill>Print</Button>
                    </ButtonToolbar>
                  </Col>
              </Row>
              <br></br>
            </Col>
            </div>
            <br></br>
            <Col md={12}>
              <Card
                title="Projects Overview"
                category={"Projects (" +this.state.projects_count +")"}
                ctTableFullWidth
                ctTableResponsive
                content={
                <Table hover>
                  <thead>
                      <tr>
                        <th></th>
                        <th>Project Name</th>
                        <th>Project Lead</th>
                        <th>Location</th>
                        <th>Start Date</th> 
                        <th>Due Date</th> 
                        <th>Client</th>   
                      </tr>
                  </thead>
                    <ProjectTable projects={this.state.projects}/>
                </Table>
                }
              />
            </Col>
          </Row>
          : null
        }
        </Grid>
        {this.state.showPopup ?  
        <Row>
          <AddProjectDialog
            closePopup={this.togglePopup.bind(this)}  
          />
        </Row>  
: null  
}  
      </div>
    );
  }
}

export default Projects;
