
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Table,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "../components/Card/Card.jsx";
import { FormInputs } from "../components/FormInputs/FormInputs.jsx";
import { UserCard } from "../components/UserCard/UserCard.jsx";
import Button from "../components/CustomButton/CustomButton.jsx";

import avatar from "../assets/img/faces/face-3.jpg";
import { projectTdArray, projectThArray } from "../variables/Variables.jsx";

class Projects extends Component {

  state = {
    projects: []
  }


  componentDidMount() {
    const url = 'http://localhost:8000/api/projects'; 
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      this.setState({ projects: data })
    })
    .catch(console.log)
  };
  render() {
    return (
      <div className="content">
        <Grid fluid>
        <Row>
            <Col md={12}>
              <Card
                title="Projects Overview"
                category=""
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {projectThArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.projects.map((project) => (
                          <tr>
                              <td>{project.project_name}</td>
                              <td>{project.project_lead_fname} {project.project_lead_lname}</td>
                              <td>{project.project_start}</td>
                              <td>{project.project_due}</td>
                              <td>{project.client}</td>
                          </tr>
                        
                      ))}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Projects;
