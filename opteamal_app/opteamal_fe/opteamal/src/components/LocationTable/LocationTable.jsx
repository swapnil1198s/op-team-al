
import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Checkbox from "../CustomCheckbox/CustomCheckbox.jsx";
import Button from "../CustomButton/CustomButton.jsx";

export class LocationTable extends Component {


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
    const location = this.props.locations.filter(obj => (obj.id==id))
    this.props.closePopupDel(location);
  };

  onEditClick = event => {

    const id = event.currentTarget.getAttribute("data-rowid");
    const location = this.props.locations.filter(obj => (obj.id==id))
    this.props.closePopupEdit(location);
  };

  render() {
    const edit = <Tooltip id="edit_tooltip">Edit Location</Tooltip>;
    const remove = <Tooltip id="remove_tooltip">Remove Location</Tooltip>;
    const locations = this.props.locations;
    var all_location_rows = [];
    var number;
    for (var i = 0; i < locations.length; i++) {
      number = "checkbox" + i;
      all_location_rows.push(
        <tr key={i} >
          <td>
            <Checkbox
              number={number}
              isChecked={false}
            />
          </td>
          <td>{locations[i].building}</td>
          <td>{locations[i].city_name}</td>
          <td>{locations[i].state}</td>
          <td>{locations[i].country}</td>
          <td>{locations[i].continent}</td>
          <td className="td-actions">
            <OverlayTrigger placement="top" overlay={edit}>
              <Button data-rowid={locations[i].id} onClick={this.onEditClick} bsStyle="info" simple type="button" bsSize="xs">
              <i className="material-icons">edit</i>
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={remove}>
              <Button data-rowid={locations[i].id} onClick={this.onDeleteClick} bsStyle="danger" simple type="button" bsSize="xs">
              <i className="material-icons">delete</i>
              </Button>
            </OverlayTrigger>
          </td>
        </tr>
      );
    }
    return <tbody>{all_location_rows}</tbody>;
  }
}

export default LocationTable;
