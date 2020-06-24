import React, { Component } from "react";
import { NavItem, Nav } from "react-bootstrap";

class AdminNavbarLinks extends Component {
  render() {
    return (
      <div>
        <Nav pullRight>
          <NavItem eventKey={3} href="#">
            Profile
          </NavItem>
          <NavItem eventKey={3} href="#">
            Logout
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
