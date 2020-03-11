import React, { Component } from "react";
import Button from "../CustomButton/CustomButton.jsx";

import {
  Row,
  Col,
} from "react-bootstrap";

export class Card extends Component {
  render() {
    return (
      <div className={"card" + (this.props.plain ? " card-plain" : "")}>
        <div className={"header" + (this.props.hCenter ? " text-center" : "")}>
          <Row>
            <Col md={9}>
            <h4 className="title">{this.props.title}</h4>
            <p className="category">{this.props.category}</p>
            </Col>
            <Col md={3}>
            <div className="text-right">
            <p>{this.props.action}</p>
            </div>
            </Col>
          </Row>
        </div>
        <div
          className={
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          {this.props.content}

          <div className="footer">
            {this.props.legend}
            {this.props.stats != null ? <hr /> : ""}
            <div className="stats">
              <i className={this.props.statsIcon} /> {this.props.stats}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
