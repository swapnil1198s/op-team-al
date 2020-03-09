
import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "../CustomCheckbox/CustomCheckbox.jsx";
import Button from "../CustomButton/CustomButton.jsx";

export class TalentTable extends Component {


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
    const talent = this.props.talents.filter(obj => (obj.id==id))
    this.props.closePopupDel(talent);
  };

  onEditClick = event => {

    const id = event.currentTarget.getAttribute("data-rowid");
    const talent = this.props.talents.filter(obj => (obj.id==id))
    this.props.closePopupEdit(talent);
  };

  render() {
    const edit = <Tooltip id="edit_tooltip">Edit Talent</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove Talent</Tooltip>;
    const talents = this.props.talents;
    var all_talent_rows = [];
    var number;
    for (var i = 0; i < talents.length; i++) {
      number = "checkbox" + i;
      all_talent_rows.push(
        <tr key={i} >
          <td>
            <Checkbox
              number={number}
              isChecked={false}
            />
          </td>
          <td>{talents[i].talent}</td>
          <td className="td-actions">
            <OverlayTrigger placement="top" overlay={edit}>
              <Button data-rowid={talents[i].id} onClick={this.onEditClick} bsStyle="info" simple type="button" bsSize="xs">
              <i className="material-icons">edit</i>
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={remove}>
              <Button data-rowid={talents[i].id} onClick={this.onDeleteClick} bsStyle="danger" simple type="button" bsSize="xs">
              <i className="material-icons">delete</i>
              </Button>
            </OverlayTrigger>
          </td>
        </tr>
      );
    }
    return <tbody>{all_talent_rows}</tbody>;
  }
}

export default TalentTable;
