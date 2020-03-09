
import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "../CustomCheckbox/CustomCheckbox.jsx";
import Button from "../CustomButton/CustomButton.jsx";

export class TitleTable extends Component {


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
    const title = this.props.titles.filter(obj => (obj.id==id))
    this.props.closePopupDel(title);
  };

  onEditClick = event => {

    const id = event.currentTarget.getAttribute("data-rowid");
    const title = this.props.titles.filter(obj => (obj.id==id))
    this.props.closePopupEdit(title);
  };

  render() {
    const edit = <Tooltip id="edit_tooltip">Edit Title</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove Title</Tooltip>;
    const titles = this.props.titles;
    var all_title_rows = [];
    var number;
    for (var i = 0; i < titles.length; i++) {
      number = "checkbox" + i;
      all_title_rows.push(
        <tr key={i} >
          <td>
            <Checkbox
              number={number}
              isChecked={false}
            />
          </td>
          <td>{titles[i].title}</td>
          <td className="td-actions">
            <OverlayTrigger placement="top" overlay={edit}>
              <Button data-rowid={titles[i].id} onClick={this.onEditClick} bsStyle="info" simple type="button" bsSize="xs">
              <i className="material-icons">edit</i>
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={remove}>
              <Button data-rowid={titles[i].id} onClick={this.onDeleteClick} bsStyle="danger" simple type="button" bsSize="xs">
              <i className="material-icons">delete</i>
              </Button>
            </OverlayTrigger>
          </td>
        </tr>
      );
    }
    return <tbody>{all_title_rows}</tbody>;
  }
}

export default TitleTable;
