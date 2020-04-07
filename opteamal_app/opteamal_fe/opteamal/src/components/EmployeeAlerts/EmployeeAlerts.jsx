import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "../CustomCheckbox/CustomCheckbox.jsx";
import Button from "../CustomButton/CustomButton.jsx";

export class EmployeeAlerts extends Component {



  constructor() {
    super();
    this.state = {
      employees_need_project:[]
    };

}


  componentDidMount() {
    var tempDate = new Date();
    var date =   + (tempDate.getMonth()+1) + '/' +tempDate.getDate() + '/' + tempDate.getFullYear();
        Promise.all([fetch('http://localhost:8000/api/employees/?availability_lte='+ date)])

      .then(([res1]) => { 
         return Promise.all([res1.json()]) 
      })
      .then(([res1]) => {

        this.setState({employees_need_project:res1})
      });
  }

  handleCheckbox = event => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.checked
    });
  };

  getEmployeeNeedsProjectAlerts(){

    const need_project_alert = [];
    this.state.employees_need_project.forEach(function(employee) {

      need_project_alert.push(employee.f_name + " " + employee.l_name + " needs to be assigned to a project!")
    });
    return need_project_alert

  }


  render() {
    const edit = <Tooltip id="edit_tooltip">Edit Task</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove</Tooltip>;
    const tasks_title = this.getEmployeeNeedsProjectAlerts()
    var tasks = [];
    var number;
    for (var i = 0; i < tasks_title.length; i++) {
      number = "checkbox" + i;
      tasks.push(
        <tr key={i}>
          <td>
            <Checkbox
              number={number}
            />
          </td>
          <td>{tasks_title[i]}</td>
          <td className="td-actions text-right">
            <OverlayTrigger placement="top" overlay={edit}>
              <Button bsStyle="info" simple type="button" bsSize="xs">
                <i className="fa fa-edit" />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={remove}>
              <Button bsStyle="danger" simple type="button" bsSize="xs">
                <i className="fa fa-times" />
              </Button>
            </OverlayTrigger>
          </td>
        </tr>
      );
    }
    return <tbody>{tasks}</tbody>;
  }
}

export default EmployeeAlerts;