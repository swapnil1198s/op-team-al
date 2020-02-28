import React, { Component } from "react";
import { Card } from "../components/Card/Card.jsx";
import FindTalentSearch from "../components/FindTalentSearch/FindTalentSearch.jsx"
import TalentResults from "../components/TalentResults/TalentResults.jsx"
import Button from "../components/CustomButton/CustomButton.jsx";
import {
  Grid,
  Row,
  Col,
  Table,
  ButtonToolbar,
  OverlayTrigger,
  Tooltip,


} from "react-bootstrap";

class FindTalent extends Component {
  constructor() {
    super();
    this.state = {
      showResults: false,
      titles_needed:[],
      talents_needed:[],
      locations_needed:[]
    };
}
toggleSearch(titles_needed, talents_needed, locations_needed) {  
  this.setState({  
       showResults: !this.state.showResults
  });
  if (typeof titles_needed != "undefined"  
                        && titles_needed != null  
                        && titles_needed.length != null  
                        && titles_needed.length > 0) 
                this.setState({titles_needed})
  if (typeof talents_needed != "undefined"  
                && talents_needed != null  
                && talents_needed.length != null  
                && talents_needed.length > 0) 
                    this.setState({talents_needed})
  if (typeof locations_needed != "undefined"  
        && locations_needed != null  
        && locations_needed.length != null  
        && locations_needed.length > 0) 
            this.setState({locations_needed})

  
} 

  render() {

    return (
      <div className="content">
          <Grid fluid>
            {!this.state.showResults  ?
            <Col xsOffset={4} md={4}> 
                <Row>     
                    <Card
                        title="Find Talent"
                        category={""}
                        ctTableFullWidth
                        ctTableResponsive
                        content={    
                          <div className=""> 
                          <FindTalentSearch closePopup={this.toggleSearch.bind(this)}/>
                          </div>  
                        }
                    />
                </Row>

            </Col>
            : null
            }
            {this.state.showResults ? 
              <div>
                <TalentResults closePopup={this.toggleSearch.bind(this)}
                              titles_needed ={this.state.titles_needed}
                              talents_needed={this.state.talents_needed}
                              locations_needed = {this.state.locations_needed}
                />
              </div>
            : null
            }
        </Grid>
      </div>
    );
  }
}

export default FindTalent;
