
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Table,
  ButtonToolbar,
  OverlayTrigger,
  Tooltip

} from "react-bootstrap";

import { Card } from "../components/Card/Card.jsx";
import { TalentTable } from "../components/TalentTable/TalentTable.jsx"
import { TitleTable } from "../components/TitleTable/TitleTable.jsx"
import { LocationTable } from "../components/LocationTable/LocationTable.jsx"
import Button from "../components/CustomButton/CustomButton.jsx";

import AddTalentPopup from "../components/AddTalentPopup/AddTalentPopup.jsx"
import EditTalentPopup from "../components/EditTalentPopup/EditTalentPopup.jsx"
import DeleteTalentPopup from "../components/DeleteTalentPopup/DeleteTalentPopup.jsx"
import AddTitlePopup from "../components/AddTitlePopup/AddTitlePopup.jsx"
import EditTitlePopup from "../components/EditTitlePopup/EditTitlePopup.jsx"
import DeleteTitlePopup from "../components/DeleteTitlePopup/DeleteTitlePopup.jsx"
import AddLocationPopup from "../components/AddLocationPopup/AddLocationPopup.jsx"
import EditLocationPopup from "../components/EditLocationPopup/EditLocationPopup.jsx"
import DeleteLocationPopup from "../components/DeleteLocationPopup/DeleteLocationPopup.jsx"




class System extends Component {

  state = {
    talents: [],
    titles: [],
    locations: [],
    talents_count: 0,
    titles_count: 0,
    locations_count: 0,

    showAddTalentPopup: false,
    showAddTitlePopup: false,
    showAddLocationPopup: false,
    showEditTalentPopup: false,
    showEditTitlePopup: false,
    showEditLocationPopup: false,
    showDeleteTalentPopup: false,
    showDeleteTitlePopup: false,
    showDeleteLocationPopup: false,
    selectedTalent: null,
    selectedTitle: null,
    selectedLocation: null
  }

  toggleAddTalent() {
    this.setState({  
      showAddTalentPopup: !this.state.showAddTalentPopup  
   }); 
  }

  toggleAddTitle() {
    this.setState({  
      showAddTitlePopup: !this.state.showAddTitlePopup  
   });  
  }

  toggleAddLocation() {
    this.setState({  
      showAddLocationPopup: !this.state.showAddLocationPopup  
   });  
  }

  toggleEditTalent(talent) {
    console.log(talent)
    if (typeof talent != "undefined"){
        this.setState({ selectedTalent: talent})
    }
    this.setState({showEditTalentPopup: !this.state.showEditTalentPopup})
  }

  toggleEditTitle(title) {
    console.log(title)
    if (typeof title != "undefined"){
        this.setState({ selectedTitle: title})
    }
    this.setState({showEditTitlePopup: !this.state.showEditTitlePopup})
  }

  toggleEditLocation(location) {
    console.log(location)
    if (typeof location != "undefined"){
        this.setState({ selectedLocation: location})
    }
    this.setState({showEditLocationPopup: !this.state.showEditLocationPopup})
  }

  toggleDeleteTalent(talent) {
    console.log(talent)
    if (typeof talent != "undefined"){
        this.setState({ selectedTalent: talent})
    }
    this.setState({showDeleteTalentPopup: !this.state.showDeleteTalentPopup})
  }

  toggleDeleteTitle(title) {
    console.log(title)
    if (typeof title != "undefined"){
        this.setState({ selectedTitle: title})
    }
    this.setState({showDeleteTitlePopup: !this.state.showDeleteTitlePopup})
  }

  toggleDeleteLocation(location) {
    console.log(location)
    if (typeof location != "undefined"){
        this.setState({ selectedLocation: location})
    }
    this.setState({showDeleteLocationPopup: !this.state.showDeleteLocationPopup})
  }
  
  componentDidMount() {
    const talentURL = 'http://localhost:8000/api/talents'; 
    fetch(talentURL)
    .then(res => res.json())
    .then((data) => {
      this.setState({talents: data })
      this.setState({talents_count: this.state.talents.length})
    })

    const titleURL = 'http://localhost:8000/api/titles'; 
    fetch(titleURL)
    .then(res => res.json())
    .then((data) => {
      this.setState({titles: data })
      this.setState({titles_count: this.state.titles.length})
    })

    const locationURL = 'http://localhost:8000/api/locations'; 
    fetch(locationURL)
    .then(res => res.json())
    .then((data) => {
      this.setState({locations: data })
      this.setState({locations_count: this.state.locations.length})
    })
    .catch(console.log)
  };


  render() {
    const editTalent = <Tooltip id="edit_tooltip">Edit Talent</Tooltip>;
    const editTitle = <Tooltip id="edit_tooltip">Edit Title</Tooltip>;
    const editLoca = <Tooltip id="edit_tooltip">Edit Location</Tooltip>;
    const removeTalent = <Tooltip id="remove_tooltip">Delete Talent</Tooltip>;
    const removeTitle = <Tooltip id="remove_tooltip">Delete Title</Tooltip>;
    const removeLoca = <Tooltip id="remove_tooltip">Delete Location</Tooltip>;
    return (
      <div className="content">
        <Grid fluid>
        {!this.state.showAddTalentPopup && !this.state.showEditTalentPopup && !this.state.showDeleteTalentPopup && !this.state.showAddTitlePopup && !this.state.showEditTitlePopup && !this.state.showDeleteTitlePopup && !this.state.showAddLocationPopup  && !this.state.showEditLocationPopup && !this.state.showDeleteLocationPopup  ?
        <Row>
        
          <div>
            <Col md={12}>
              <Row>
                <Col xsOffset={0} md={3}>
                    <Button onClick={this.toggleAddTalent.bind(this)} bsStyle="default" round fill>Add Talent</Button>
                  </Col>
                
                <Col md={3}>
                  <Button onClick={this.toggleAddTitle.bind(this)} bsStyle="default" round fill>Add Title</Button>
                </Col>

                <Col md={3}>
                <Button onClick={this.toggleAddLocation.bind(this)} bsStyle="default" round fill>Add Location</Button>
                </Col>
              </Row>
              <br></br>
            </Col>
            </div>
            <br></br>
            <Col md={3}>
              <Card
                title="Talent Overview"
                category={"Talents ("+this.state.talents_count+")"}
                ctTableFullWidth
                ctTableResponsive
                content={                  
                  <Table hover>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Talent</th> 
                      </tr>
                  </thead>
                      <TalentTable talents={this.state.talents} closePopupEdit={this.toggleEditTalent.bind(this)} selectedTalentId ={this.state.selectedTalentId} closePopupDel={this.toggleDeleteTalent.bind(this)} selectedTalentId ={this.state.selectedTalentId}/>
                  </Table>
                }
              />
            </Col>
            <Col md={3}>
              <Card
                title="Title Overview"
                category={"Titles ("+this.state.titles_count+")"}
                ctTableFullWidth
                ctTableResponsive
                content={                  
                  <Table hover>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Title</th> 
                      </tr>
                  </thead>
                      <TitleTable titles={this.state.titles} closePopupEdit={this.toggleEditTitle.bind(this)} selectedTitleId ={this.state.selectedTitleId} closePopupDel={this.toggleDeleteTitle.bind(this)} selectedTitleId ={this.state.selectedTitleId}/>
                  </Table>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                title="Location Overview"
                category={"Locations ("+this.state.locations_count+")"}
                ctTableFullWidth
                ctTableResponsive
                content={                  
                  <Table hover>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Building</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th> 
                        <th>Continent</th>   
                      </tr>
                  </thead>
                      <LocationTable locations={this.state.locations} closePopupEdit={this.toggleEditLocation.bind(this)} selectedLocationId ={this.state.selectedLocationId} closePopupDel={this.toggleDeleteLocation.bind(this)} selectedLocationId ={this.state.selectedLocationId}/>
                  </Table>
                }
              />
            </Col>
            
          </Row>
          : null
        }

        </Grid>
        {this.state.showAddTalentPopup ?  
        <Row>
          <AddTalentPopup  
            closePopup={this.toggleAddTalent.bind(this)}  
          />
        </Row>  
        : null  
        }
        {this.state.showEditTalentPopup ?  
        <Row>
          <EditTalentPopup  
            closePopup={this.toggleEditTalent.bind(this)} talent={this.state.selectedTalent}  
          />
        </Row>  
        : null  
        }
        {this.state.showDeleteTalentPopup ?  
        <Row>
          <DeleteTalentPopup 
            closePopup={this.toggleDeleteTalent.bind(this)} talent={this.state.selectedTalent}  
          />
        </Row>  
        : null  
        }    
        {this.state.showAddTitlePopup ?  
        <Row>
          <AddTitlePopup  
            closePopup={this.toggleAddTitle.bind(this)}  
          />
        </Row>  
        : null  
        }
        {this.state.showEditTitlePopup ?  
        <Row>
          <EditTitlePopup  
            closePopup={this.toggleEditTitle.bind(this)} title={this.state.selectedTitle}  
          />
        </Row>  
        : null  
        }
        {this.state.showDeleteTitlePopup ?  
        <Row>
          <DeleteTitlePopup 
            closePopup={this.toggleDeleteTitle.bind(this)} title={this.state.selectedTitle}  
          />
        </Row>  
        : null  
        }    
        {this.state.showAddLocationPopup ?  
        <Row>
          <AddLocationPopup  
            closePopup={this.toggleAddLocation.bind(this)}  
          />
        </Row>  
        : null  
        }
        {this.state.showEditLocationPopup ?  
        <Row>
          <EditLocationPopup  
            closePopup={this.toggleEditLocation.bind(this)} location={this.state.selectedLocation}  
          />
        </Row>  
        : null  
        }
        {this.state.showDeleteLocationPopup ?  
        <Row>
          <DeleteLocationPopup 
            closePopup={this.toggleDeleteLocation.bind(this)} location={this.state.selectedLocation}  
          />
        </Row>  
        : null  
        }    
      </div>
    );
  }
}

export default System;
