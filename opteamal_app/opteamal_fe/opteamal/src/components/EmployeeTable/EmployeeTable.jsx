
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
          <td>{employees[i].first_name} {employees[i].last_name}</td>
          <td>{employees[i].email}</td>
          <td>{employees[i].title}</td>
          <td>{employees[i].start_date}</td>
          <td>{employees[i].skills}</td>
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
