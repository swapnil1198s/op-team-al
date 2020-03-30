
import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "../CustomCheckbox/CustomCheckbox.jsx";
import Button from "../CustomButton/CustomButton.jsx";

export class EmployeeTable extends Component {


  constructor() {
    super();
    this.state = {
      clicked_id: null
    };
  }
  
  handleCheckbox = event => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.checked
    });
  };

  processTitles(array){

    let displayTitles = []
    array.forEach(element => {
      displayTitles.push(<div className="td-card">{element.title}</div>)
    });

    return displayTitles

  }

  processTalents(array){

    let displayTalents = []
    array.forEach(element => {
      displayTalents.push(<div className="td-talent-card">{element.talent}</div>)
    });

    return displayTalents

  }

  onDeleteClick = event => {
    const id = event.currentTarget.getAttribute("data-rowid");
    const employee = this.props.employees.filter(obj => (obj.id==id))
    this.props.closePopupDel(employee);
  };

  onEditClick = event => {

    const id = event.currentTarget.getAttribute("data-rowid");
    const employee = this.props.employees.filter(obj => (obj.id==id))
    this.props.closePopupEdit(employee);
  };

  render() {
    const edit = <Tooltip id="edit_tooltip">Edit Employee</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove Employee</Tooltip>;
    const employees = this.props.employees;
    var all_employee_rows = [];
    var number;
    for (var i = 0; i < employees.length; i++) {
      number = "checkbox" + i;
      all_employee_rows.push(
        <tr key={i} >
          <td>
            <Checkbox
              number={number}
              isChecked={false}
            />
          </td>
          <td>{employees[i].f_name} {employees[i].l_name}</td>
          <td>{employees[i].email}</td>
          <td><div className="td-level-card">{employees[i].management_level.level}</div></td>
          <td><div className="td-title-card">{employees[i].title.title}</div></td> 
          <td>{employees[i].start_date}</td>
          <td>{employees[i].availability}</td>
          <td>{employees[i].location.city_name}</td>
          <td>{employees[i].remote_work.toString()}</td>
          <td>{employees[i].relocate.toString()}</td>
          <td>{this.processTalents(employees[i].talents)}</td>
          <td className="td-actions">
            <OverlayTrigger placement="top" overlay={edit}>
              <Button data-rowid={employees[i].id} onClick={this.onEditClick} bsStyle="info" simple type="button" bsSize="xs">
              <i className="material-icons">edit</i>
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={remove}>
              <Button data-rowid={employees[i].id} onClick={this.onDeleteClick} bsStyle="danger" simple type="button" bsSize="xs">
              <i className="material-icons">delete</i>
              </Button>
            </OverlayTrigger>
          </td>
        </tr>
      );
    }
    return <tbody>{all_employee_rows}</tbody>;
  }
}

export default EmployeeTable;
