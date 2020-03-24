import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import history from '../components/history';

import {DashboardTable} from "../components/DashboardTable/DashboardTable.jsx";
import { Card } from "../components/Card/Card.jsx";
import { StatsCard } from "../components/StatsCard/StatsCard.jsx";
import { Tasks } from "../components/Tasks/Tasks.jsx"
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
import { Link } from "react-router-dom";

class EmployeesDashboard extends Component {
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
    const estyle = {
      color: "black",
      backgroundColor: "lightgreen",
      padding: "10px",
      fontFamily: "Arial"
      
    };
    const pstyle = {
      color: "black",
      backgroundColor: "lightblue",
      padding: "10px",
      fontFamily: "Arial"
      
    };
    return (
      <div className="content">
        <Grid fluid>
          <Row style = {{marginTop: "0px"}}>
            <Link to = "EmployeesDashboard">
              <Col md = {6} style = {estyle} align = "center">
                <p>Employees Overview</p>
                </Col>
            </Link>
            <Link to = "ProjectsDashboard">
              <Col md = {6} style = {pstyle} align = "center">
                <p>Project Overview</p>
              </Col>
            </Link>
          </Row>
          <Row style = {{marginTop: "10px"}}>
            <Col lg={4} sm={6}>
              <StatsCard
                statsText="Total Employees"
                statsValue="1000"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Available Employees"
                statsValue="40"
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Additional Needed Employees"
                statsValue="20"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Needed Talent Distribution"
                category="Based on title"
                stats="Updated 1 day ago"
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
            <Col md={7}>
              {/* <DashboardTable/> */}
            </Col>
          </Row>

          <Row>
            <Col md={7}>
            <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Needed vs Available employees"
                category="over last 4 years"
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

            <Col md={5}>
              <Card
                title="Alerts"
                category="Employee"
                stats="Updated now"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default EmployeesDashboard;