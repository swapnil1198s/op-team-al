
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Table
} from "react-bootstrap";

import { Card } from "../components/Card/Card.jsx";
import CustomButton from "../components/CustomButton/CustomButton.jsx"
import { employeeThArray, employeeTdArray } from "../variables/Variables.jsx";

class Employees extends Component {

  state = {
    employees: []
  }


  componentDidMount() {
    const url = 'http://localhost:8000/api/employees'; 
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      this.setState({ employees: data })
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
                content={
                  <div><CustomButton block pullRight></CustomButton></div>
                }
              />

              <Card
                title="Employee Overview"
                category=""
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {employeeThArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.employees.map((employee) => (
                          <tr>
                              <td>{employee.first_name} {employee.last_name}</td>
                              <td>{employee.email}</td>
                              <td>{employee.title}</td>
                              <td>{employee.start_date}</td>
                              <td>{employee.skills}</td>
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

export default Employees;
