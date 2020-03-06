
import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "../CustomCheckbox/CustomCheckbox.jsx";
import Button from "../CustomButton/CustomButton.jsx";

export class ResultTable extends Component {

  
  handleCheckbox = event => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.checked
    });
  };


  processTalents(array){

    let displayTalents = []
    array.forEach(element => {
      displayTalents.push(<div className="td-talent-card">{element.talent}</div>)
    });

    return displayTalents

  }

  filterByTalent(employee_talents){
    let result = false
    let talents_needed = this.props.talents_needed
    
    employee_talents.forEach(talent => {
        if(talents_needed.some(item => item.value === talent.talent_id)){
            result = true
        };
      });
    return result

  }

  render() {
    const edit = <Tooltip id="edit_tooltip">Edit Employee</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove Employee</Tooltip>;
    const employees = this.props.employees;
    var all_employee_rows = [];
    var number;
    for (var i = 0; i < employees.length; i++) {
      number = "checkbox" + i;
      if(this.filterByTalent(employees[i].talents)){
            all_employee_rows.push(
                        <tr key={i}>
                        <td></td>
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
            );}
         }
    return <tbody>{all_employee_rows}</tbody>;
  }
}

export default ResultTable;
