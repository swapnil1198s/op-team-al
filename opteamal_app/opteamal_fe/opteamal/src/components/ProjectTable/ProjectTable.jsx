
import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "../CustomCheckbox/CustomCheckbox.jsx";
import Button from "../CustomButton/CustomButton.jsx";

export class ProjectTable extends Component {
  handleCheckbox = event => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.checked
    });
  };
  render() {
    const edit = <Tooltip id="edit_tooltip">Edit Project</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove Project</Tooltip>;
    const projects = this.props.projects;
    var all_projects_rows = [];
    var number;
    for (var i = 0; i < projects.length; i++) {
      number = "checkbox" + i;
      all_projects_rows.push(
        <tr key={i}>
          <td>
            <Checkbox
              number={number}
              isChecked={i === 1 || i === 2 ? true : false}
            />
          </td>
          <td>{projects[i].project_name}</td>
          <td>{projects[i].project_lead_fname} {projects[i].project_lead_lname}</td>
          <td>{projects[i].project_start}</td>
          <td>{projects[i].project_due}</td>
          <td>{projects[i].client}</td>
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
    return <tbody>{all_projects_rows}</tbody>;
  }
}

export default ProjectTable;
