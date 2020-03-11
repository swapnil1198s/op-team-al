
import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "../CustomCheckbox/CustomCheckbox.jsx";
import Button from "../CustomButton/CustomButton.jsx";

export class ManagementLevelTable extends Component {


  constructor() {
    super();
    this.state = {
      clicked_id: null,
    };
  }
  
  handleCheckbox = event => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.checked
    });
  };

  onDeleteClick = event => {
    const id = event.currentTarget.getAttribute("data-rowid");
    const managementLevel = this.props.managementLevels.filter(obj => (obj.id==id))
    this.props.closePopupDel(managementLevel);
  };

  onEditClick = event => {

    const id = event.currentTarget.getAttribute("data-rowid");
    const managementLevel = this.props.managementLevels.filter(obj => (obj.id==id))
    this.props.closePopupEdit(managementLevel);
  };

  render() {
    const edit = <Tooltip id="edit_tooltip">Edit Management Level</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove Management Level</Tooltip>;
    const managementLevels = this.props.managementLevels;
    var all_management_level_rows = [];
    var number;
    for (var i = 0; i < managementLevels.length; i++) {
      number = "checkbox" + i;
      all_management_level_rows.push(
        <tr key={i} >
          <td>
            <Checkbox
              number={number}
              isChecked={false}
            />
          </td>
          <td>{managementLevels[i].level}</td>
          <td className="td-actions">
            <OverlayTrigger placement="top" overlay={edit}>
              <Button data-rowid={managementLevels[i].id} onClick={this.onEditClick} bsStyle="info" simple type="button" bsSize="xs">
              <i className="material-icons">edit</i>
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={remove}>
              <Button data-rowid={managementLevels[i].id} onClick={this.onDeleteClick} bsStyle="danger" simple type="button" bsSize="xs">
              <i className="material-icons">delete</i>
              </Button>
            </OverlayTrigger>
          </td>
        </tr>
      );
    }
    return <tbody>{all_management_level_rows}</tbody>;
  }
}

export default ManagementLevelTable;
