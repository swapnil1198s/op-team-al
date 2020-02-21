
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Table,
  ButtonToolbar,
  OverlayTrigger,
  Tooltip

} from "react-bootstrap";

import { Card } from "../components/Card/Card.jsx";
import { EmployeeTable } from "../components/EmployeeTable/EmployeeTable.jsx"
import Button from "../components/CustomButton/CustomButton.jsx";
import AddEmployeeDialog from "../components/AddEmployeeDialog/AddEmployeeDialog.jsx"



class Employees extends Component {

  state = {
    employees: [],
    employees_count: 0,
    showPopup: false
  }

  togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
     } 

  callEmployeeApi(){




    
  }


  componentDidMount() {
    const url = 'http://localhost:8000/api/employees'; 
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      this.setState({ employees: data })
      this.setState({employees_count: this.state.employees.length})
    })
    .catch(console.log)
  };


  render() {
    const edit = <Tooltip id="edit_tooltip">Edit Employee</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Delete Employee</Tooltip>;
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
                        <Button onClick={this.togglePopup.bind(this)} bsStyle="default" round fill>Add Employee</Button>
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
                title="Employee Overview"
                category={"Employees ("+this.state.employees_count+")"}
                ctTableFullWidth
                ctTableResponsive
                content={                  
                  <Table hover>
                    <thead>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Titles</th>
                          <th>Start Date</th> 
                          <th>Next Availability</th> 
                          <th>Location</th>
                          <th>Remote Work</th>
                          <th>Relocation</th>  
                        </tr>
                    </thead>
                      <EmployeeTable employees={this.state.employees}/>
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
          <AddEmployeeDialog   
            closePopup={this.togglePopup.bind(this)}  
          />
        </Row>  
: null  
}  
      </div>
    );
  }
}

export default Employees;
