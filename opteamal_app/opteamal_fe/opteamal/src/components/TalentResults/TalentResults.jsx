
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

import { Card } from "../Card/Card.jsx";
import { ResultTable } from "./ResultTable.jsx"
import Button from "../CustomButton/CustomButton.jsx";

class TalentResults extends Component {

  state = {
    employees: [],
    employees_count: 0,
    showPopup: false,
    filtered_employees:[]
  }

  componentDidMount() {

    
    let url = 'http://localhost:8000/api/employees/?title_id_in='; 

    for(var i = 0; i < this.props.titles_needed.length; i++) {
        var obj = this.props.titles_needed[i];
        url += obj.value.toString() + ','
    }
    url += '&location_id_in='
    for(var j = 0; j < this.props.locations_needed.length; j++) {
        var obj1 = this.props.locations_needed[j];
        url += obj1.value.toString() + ','
    }
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      this.setState({ employees: data })
      this.setState({employees_count: this.state.employees.length})
      //console.log(data) 
    })
    .catch(console.log)
    
  };
  
  render() {
    return (
      <div className="content">
        
        <Grid fluid>
        <Row>
            <Col md={12}>
            
            {this.props.titles_needed.map(title => (
                <Card
                   key={title.value}
                   title={title.label + "'s"}
                   category={"Title"}
                   ctTableFullWidth
                   ctTableResponsive
                   content={                  
                     <Table hover>
                        <thead>
                            <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Titles</th>
                            <th>Start Date</th> 
                            <th>Next Availability</th> 
                            <th>Location</th>
                            <th>Remote Work</th>
                            <th>Relocation</th> 
                            <th>Talents</th> 
                            </tr>
                        </thead>
                       <ResultTable employees={this.state.employees.filter(obj => (obj.title.id==title.value))} talents_needed={this.props.talents_needed}/>
                     </Table>
                   }
                 />
               ))} 

            </Col>
            
          </Row>
          <ButtonToolbar>
                        <Button onClick = {this.createEmployee} bsStyle="default" round fill>
                             Add Employee
                        </Button>
                        <Button onClick={this.props.closePopup} bsStyle="default" round fill>
                             Close
                        </Button>
                    </ButtonToolbar>
         <div className="clearfix" />
        </Grid>
         
      </div>
    );
  }
}

export default TalentResults;
