import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table,ButtonToolbar,OverlayTrigger,Tooltip, Button } from "react-bootstrap";
import { EmployeeTable } from "../components/EmployeeTable/EmployeeTable.jsx"
import { Card } from "../components/Card/Card.jsx";
import { StatsCard } from "../components/StatsCard/StatsCard.jsx";
import { EmployeeAlerts } from "../components/EmployeeAlerts/EmployeeAlerts.jsx"
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "../variables/Variables.jsx";

class Dashboard extends Component {

  state = {
    employeeDashboard: true,
    projectDashboard: false,
    employeeCount:null,
    projectCount:null,
    employees_need_project:null

  }

  componentDidMount() {
    const url = 'http://localhost:8000/api/employee-count'; 
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      this.setState({employeeCount:data.employee_count})
    })
    .catch(console.log)
  };


  componentDidMount() {
    var tempDate = new Date();
    var date =   + (tempDate.getMonth()+1) + '/' +tempDate.getDate() + '/' + tempDate.getFullYear();
        Promise.all([fetch('http://localhost:8000/api/employee-count'),
                     fetch('http://localhost:8000/api/project-count')])

      .then(([res1, res2,res3]) => { 
         return Promise.all([res1.json(), res2.json()]) 
      })
      .then(([res1, res2]) => {

        this.setState({employeeCount:res1.employee_count})
        this.setState({projectCount:res2.project_count})
        
      });
}


  employeeDashboard() {  
    this.setState({  
      employeeDashboard: true,
      projectDashboard:false
      });  
    } 
  projectDashboard() {  
      this.setState({  
        employeeDashboard: false,
        projectDashboard:true
        });  
  } 
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    let btn_class_employee = this.state.employeeDashboard ? "card card-stats-active" : "card card-stats";
    let btn_class_project = this.state.projectDashboard ? "card card-stats-active" : "card card-stats";
    return (
      
      <div className="content">
        <Grid fluid>
          <div class = "container">
          <div class = "row">
            <Col md = {6}>
              <StatsCard
                bigIcon={<i className="material-icons employee-icon">group</i>}
                statsText="Employee Count"
                statsValue={this.state.employeeCount}
                statsIcon={<i className="material-icons">bar_chart</i>}
                statsIconText="Click to see Employee Dashboard"
                switchDashboard={this.employeeDashboard.bind(this)}
                btn_class={btn_class_employee}

              />
            </Col>
            
            <Col md = {6}>
              <StatsCard
                bigIcon={<i className="material-icons project-icon">work</i>}
                statsText="Project Count"
                statsValue={this.state.projectCount}
                statsIcon={<i className="material-icons">bar_chart</i>}
                statsIconText="Click to see Project Dashboard"
                switchDashboard={this.projectDashboard.bind(this)}
                btn_class={btn_class_project}
              />
            </Col>
            
          </div>
          
          </div>
          
          
          {this.state.employeeDashboard ?  

            <div>
              <Row>
            <div class = "col align-self-center"  >
              <Card
                title="Employee Alerts"
                category="Employee Related Alerts"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <EmployeeAlerts/>
                    </table>
                  </div>
                }
              />
            </div>
          </Row>
          <Row>
          
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Employees Over Time"
                category="Employees Over Time"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Employee Statistics"
                category="Employees by titles"
                stats="Updated just now"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>
          <Row>
          <Col md={6}>
            <Card
              id="chartActivity"
              title="Employess Over Time"
              category="Active employees at a point in time"
              stats="Data information certified"
              statsIcon="fa fa-check"
              content={
                <div className="ct-chart">
                  <ChartistGraph
                    data={dataBar}
                    type="Bar"
                    options={optionsBar}
                    responsiveOptions={responsiveBar}
                  />
                </div>
              }
              legend={
                <div className="legend">{this.createLegend(legendBar)}</div>
              }
            />
          </Col>
          <Col md={6}>
              <Card
                title="Available employees"
                category={"Employees ("+this.state.employees_count+")"}
                ctTableFullWidth
                ctTableResponsive
                content={                  
                  <Table hover>
                    <thead>
                        <tr>
                          
                          <th>Name</th>
                          <th>Email</th>
                          <th>Management Level</th>
                          <th>Title</th>
                          <th>Start Date</th> 
                          <th>Next Availability</th> 
                          <th>Location</th>
                          
                          <th>Talents</th> 
                        </tr>
                    </thead>
                      
                  </Table>
                }
              />
            </Col>
            

        </Row>
        </div>
         
        : null
        }
        {this.state.projectDashboard ?  
          <div>
          <Row>
          <Col md={12}>
            <Card
              title="Project Alerts"
              category="Project Related Alerts"
              stats="Updated 3 minutes ago"
              statsIcon="fa fa-history"
              content={
                <div className="table-full-width">
                  <table className="table">
                    <EmployeeAlerts />
                  </table>
                </div>
              }
            />
          </Col>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Project"
                category="Projects over time"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Project Statistics"
                category="Last Campaign Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>
          <Row>
          <Col md={6}>
            <Card
              id="chartActivity"
              title="Project Start vs Finish"
              category="All Projects"
              stats="Data information certified"
              statsIcon="fa fa-check"
              content={
                <div className="ct-chart">
                  <ChartistGraph
                    data={dataBar}
                    type="Bar"
                    options={optionsBar}
                    responsiveOptions={responsiveBar}
                  />
                </div>
              }
              legend={
                <div className="legend">{this.createLegend(legendBar)}</div>
              }
            />
          </Col>
          <Col md={6}>
              <Card
                title="Projects near finishing"
                category={"Projects (" +this.state.projects_count +")"}
                ctTableFullWidth
                ctTableResponsive
                content={
                <Table hover>
                  <thead>
                      <tr>
                        <th></th>
                        <th>Project Name</th>
                        <th>Project Lead</th>
                        <th>Location</th>
                        <th>Start Date</th> 
                        <th>Due Date</th> 
                        <th>Client</th>   
                      </tr>
                  </thead>
                    
                </Table>
                }
              />
            </Col>

        </Row>
        </div>
          
         
        : null
        }  
        </Grid>
      </div>
    );
  }
}

export default Dashboard;