
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
import { ManagementLevelTable } from "../components/ManagementLevelTable/ManagementLevelTable.jsx"
import Button from "../components/CustomButton/CustomButton.jsx";
import { Tabs } from "@yazanaabed/react-tabs";

import AddTalentPopup from "../components/AddTalentPopup/AddTalentPopup.jsx"
import EditTalentPopup from "../components/EditTalentPopup/EditTalentPopup.jsx"
import DeleteTalentPopup from "../components/DeleteTalentPopup/DeleteTalentPopup.jsx"
import AddTitlePopup from "../components/AddTitlePopup/AddTitlePopup.jsx"
import EditTitlePopup from "../components/EditTitlePopup/EditTitlePopup.jsx"
import DeleteTitlePopup from "../components/DeleteTitlePopup/DeleteTitlePopup.jsx"
import AddLocationPopup from "../components/AddLocationPopup/AddLocationPopup.jsx"
import EditLocationPopup from "../components/EditLocationPopup/EditLocationPopup.jsx"
import DeleteLocationPopup from "../components/DeleteLocationPopup/DeleteLocationPopup.jsx"
import AddManagementLevelPopup from "../components/AddManagementLevelPopup/AddManagementLevelPopup.jsx"
import EditManagementLevelPopup from "../components/EditManagementLevelPopup/EditManagementLevelPopup.jsx"
import DeleteManagementLevelPopup from "../components/DeleteManagementLevelPopup/DeleteManagementLevelPopup.jsx"




class System extends Component {

  state = {
    talents: [],
    titles: [],
    locations: [],
    managementLevels: [],
    talents_count: 0,
    titles_count: 0,
    locations_count: 0,
    manageLev_count:0,

    showAddTalentPopup: false,
    showAddTitlePopup: false,
    showAddLocationPopup: false,
    showAddLevelPopup: false,
    showEditTalentPopup: false,
    showEditTitlePopup: false,
    showEditLocationPopup: false,
    showEditLevelPopup: false,
    showDeleteTalentPopup: false,
    showDeleteTitlePopup: false,
    showDeleteLocationPopup: false,
    showDeleteLevelPopup: false,
    selectedTalent: null,
    selectedTitle: null,
    selectedLocation: null,
    selectedLevel: null
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

  toggleAddLevel() {
    this.setState({  
      showAddLevelPopup: !this.state.showAddLevelPopup  
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

  toggleEditLevel(level) {
    console.log(level)
    if (typeof level != "undefined"){
        this.setState({ selectedLevel: level})
    }
    this.setState({showEditLevelPopup: !this.state.showEditLevelPopup})
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

  toggleDeleteLevel(level) {
    console.log(level)
    if (typeof level != "undefined"){
        this.setState({ selectedLevel: level})
    }
    this.setState({showDeleteLevelPopup: !this.state.showDeleteLevelPopup})
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

    const manageLevURL = 'http://localhost:8000/api/managementlevel'; 
    fetch(manageLevURL)
    .then(res => res.json())
    .then((data) => {
      this.setState({managementLevels: data })
      this.setState({manageLev_count: this.state.managementLevels.length})
    })
    .catch(console.log)
  };


  render() {
    const editTalent = <Tooltip id="edit_tooltip">Edit Talent</Tooltip>;
    const editTitle = <Tooltip id="edit_tooltip">Edit Title</Tooltip>;
    const editLoca = <Tooltip id="edit_tooltip">Edit Location</Tooltip>;
    const editLevel = <Tooltip id="edit_tooltip">Edit Management Level</Tooltip>
    const removeTalent = <Tooltip id="remove_tooltip">Delete Talent</Tooltip>;
    const removeTitle = <Tooltip id="remove_tooltip">Delete Title</Tooltip>;
    const removeLoca = <Tooltip id="remove_tooltip">Delete Location</Tooltip>;
    const removeLevel = <Tooltip id="remove_tooltip">Delete Management Level</Tooltip>

    return (
      <div className="content">
        <Grid fluid>
        {!this.state.showAddTalentPopup && !this.state.showEditTalentPopup && !this.state.showDeleteTalentPopup && !this.state.showAddTitlePopup && !this.state.showEditTitlePopup && !this.state.showDeleteTitlePopup && !this.state.showAddLocationPopup  && !this.state.showEditLocationPopup && !this.state.showDeleteLocationPopup && !this.state.showAddLevelPopup && !this.state.showEditLevelPopup && !this.state.showDeleteLevelPopup  ?
        <div>
          <Col>
            <h3>System</h3>
          </Col>
        
        <Row>
        
        <Tabs
          activeTab={{
            id: "talents"
          }}
        >
          <Tabs.Tab id="talents" title="Talents">
            <div style={{ padding: 10 }}>
            <Col xsOffset={3} md={6}>
              <Card
                title="Talent Overview"
                action={
                  <Button onClick={this.toggleAddTalent.bind(this)} bsStyle="default" round fill>Add</Button>
                }
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
            </div>
          </Tabs.Tab>
          <Tabs.Tab id="titles" title="Titles">
            <div style={{ padding: 10 }}>
            <Col xsOffset={3} md={6}>
              <Card
                title="Title Overview"
                category={"Titles ("+this.state.titles_count+")"}
                action={
                  <Button onClick={this.toggleAddTitle.bind(this)} bsStyle="default" round fill>Add</Button>
                }
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
            </div>
          </Tabs.Tab>
          <Tabs.Tab id="locations" title="Locations">
            <div style={{ padding: 10 }}>
            <Col xsOffset={3} md={6}>
              <Card
                title="Location Overview"
                category={"Locations ("+this.state.locations_count+")"}
                action={
                  <Button onClick={this.toggleAddLocation.bind(this)} bsStyle="default" round fill>Add</Button>
                }
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
            </div>
          </Tabs.Tab>
          <Tabs.Tab id="managementLevels" title="Management Levels">
            <div style={{ padding: 10 }}>
            <Col xsOffset={3} md={6}>
              <Card
                title="Management Level Overview"
                category={"Management Levels ("+this.state.manageLev_count+")"}
                action={
                  <Button onClick={this.toggleAddLevel.bind(this)} bsStyle="default" round fill>Add</Button>
                }
                ctTableFullWidth
                ctTableResponsive
                content={                  
                  <Table hover>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Management Level</th> 
                      </tr>
                  </thead>
                      <ManagementLevelTable managementLevels={this.state.managementLevels} closePopupEdit={this.toggleEditLevel.bind(this)} selectedLevelId ={this.state.selectedLevelId} closePopupDel={this.toggleDeleteLevel.bind(this)} selectedLevelId ={this.state.selectedLevelId}/>
                  </Table>
                }
              />
              </Col>
            </div>
          </Tabs.Tab>
        </Tabs>
      
          
            
          </Row>
          </div>
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
        {this.state.showAddLevelPopup ?  
        <Row>
          <AddManagementLevelPopup 
            closePopup={this.toggleAddLevel.bind(this)} level={this.state.selectedLevel}  
          />
        </Row>  
        : null  
        }  
        {this.state.showEditLevelPopup ?  
        <Row>
          <EditManagementLevelPopup 
            closePopup={this.toggleEditLevel.bind(this)} level={this.state.selectedLevel}  
          />
        </Row>  
        : null  
        }
        {this.state.showDeleteLevelPopup ?  
        <Row>
          <DeleteManagementLevelPopup 
            closePopup={this.toggleDeleteLevel.bind(this)} level={this.state.selectedLevel}  
          />
        </Row>  
        : null  
        }        
      </div>
    );
  }
}

export default System;
