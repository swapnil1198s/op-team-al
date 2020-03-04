
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
import EditEmployeeDialog from "../components/EditEmployeeDialog/EditEmployeeDialog.jsx"
import DeleteEmployeeDialog from "../components/DeleteEmployeeDialog/DeleteEmployeeDialog.jsx"



class Employees extends Component {

  state = {
    employees: [],
    employees_count: 0,
    showEmployeeDialog: false,
    showEditEmployeeDialog: false,
    showDeleteEmployeePopup: false,
    selectedEmployee: null
  }

  toggleAddEmployee() {  
    this.setState({  
         showEmployeeDialog: !this.state.showEmployeeDialog  
      });  
    } 

  toggleEditEmployee(employee) {  
    console.log(employee)
    if (typeof employee != "undefined" && employee != null){
        this.setState({ selectedEmployee: employee})
    }
    this.setState({showEditEmployeeDialog: !this.state.showEditEmployeeDialog})
  } 

  toggleDeleteEmployee(employee) {  
    console.log(employee)
    if (typeof employee != "undefined" && employee != null){
        this.setState({ selectedEmployee: employee})
    }
    this.setState({showDeleteEmployeePopup: !this.state.showDeleteEmployeePopup})
  } 
  
  componentDidMount() {
    const url = 'http://localhost:8000/api/employees'; 
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      this.setState({employees: data })
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
        {!this.state.showEmployeeDialog  && !this.state.showEditEmployeeDialog && !this.state.showDeleteEmployeePopup ?
        <Row>
        
          <div>
            <Col md={12}>
              <Row>
                <Col xsOffset={0} md={12}>
                  <ButtonToolbar>
                        <Button onClick={this.toggleAddEmployee.bind(this)} bsStyle="default" round fill>Add Employee</Button>
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
                          <th>Management Level</th>
                          <th>Title</th>
                          <th>Start Date</th> 
                          <th>Next Availability</th> 
                          <th>Location</th>
                          <th>Remote Work</th>
                          <th>Relocation</th> 
                          <th>Talents</th> 
                        </tr>
                    </thead>
                      <EmployeeTable employees={this.state.employees} closePopupEdit={this.toggleEditEmployee.bind(this)} selectedEmployeeId ={this.state.selectedEmployeeId} closePopupDel={this.toggleDeleteEmployee.bind(this)} selectedEmployeeId ={this.state.selectedEmployeeId}/>
                  </Table>
                }
              />
            </Col>
            
          </Row>
          : null
        }
        </Grid>
        {this.state.showEmployeeDialog ?  
        <Row>
          <AddEmployeeDialog   
            closePopup={this.toggleAddEmployee.bind(this)}  
          />
        </Row>  
        : null  
        }
        {this.state.showEditEmployeeDialog ?  
        <Row>
          <EditEmployeeDialog   
            closePopup={this.toggleEditEmployee.bind(this)} employee={this.state.selectedEmployee}  
          />
        </Row>  
        : null  
        }
        {this.state.showDeleteEmployeePopup ?  
        <Row>
          <DeleteEmployeeDialog   
            closePopup={this.toggleDeleteEmployee.bind(this)} employee={this.state.selectedEmployee}  
          />
        </Row>  
        : null  
        }    
      </div>
    );
  }
}

export default Employees;
