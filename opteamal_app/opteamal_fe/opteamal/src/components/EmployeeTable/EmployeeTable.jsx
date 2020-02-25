
import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "../CustomCheckbox/CustomCheckbox.jsx";
import Button from "../CustomButton/CustomButton.jsx";

export class EmployeeTable extends Component {

  
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
      displayTitles.push(<div className="td-card">{element.title_name.title}</div>)
    });

    return displayTitles

  }

  processTalents(array){

    let displayTalents = []
    array.forEach(element => {
      displayTalents.push(<div className="td-card">{element.talent_name.talent}</div>)
    });

    return displayTalents

  }

  render() {
    const edit = <Tooltip id="edit_tooltip">Edit Employee</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove Employee</Tooltip>;
    const employees = this.props.employees;
    var all_employee_rows = [];
    var number;
    for (var i = 0; i < employees.length; i++) {
      number = "checkbox" + i;
      all_employee_rows.push(
        <tr key={i}>
          <td>
            <Checkbox
              number={number}
              isChecked={i === 1 || i === 2 ? true : false}
            />
          </td>
          <td>{employees[i].f_name} {employees[i].l_name}</td>
          <td>{employees[i].email}</td>
          <td>{this.processTitles(employees[i].titles)}</td> 
          <td>{employees[i].start_date}</td>
          <td>{employees[i].availability}</td>
          <td>{employees[i].location.city_name}</td>
          <td>{employees[i].remote_work.toString()}</td>
          <td>{employees[i].relocate.toString()}</td>
          <td>{this.processTalents(employees[i].talents)}</td>
          <td className="td-actions">
            <OverlayTrigger placement="top" overlay={edit}>
              <Button bsStyle="info" simple type="button" bsSize="xs">
              <i className="material-icons">edit</i>
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={remove}>
              <Button bsStyle="danger" simple type="button" bsSize="xs">
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
