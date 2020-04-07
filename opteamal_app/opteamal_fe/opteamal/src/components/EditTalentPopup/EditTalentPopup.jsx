import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  Fade
} from "react-bootstrap";

import { Card } from "../Card/Card.jsx";
import { FormInputs } from "../FormInputs/FormInputs.jsx";
import Button from "../CustomButton/CustomButton.jsx";
import Select from 'react-select'
import Icon from '@material-ui/core/Icon';



class EditTalentPopup extends Component {
    constructor() {
        super();
        this.textInput = React.createRef();
        this.state = { 
          talent:"",
          titles:[],
          talentGroups:[],
          possible_titles:[],
          errors:[]
        };
    }

    customStyles = {
        invalidEntry: {
            borderColor: 'red'
        }
    }

    componentDidMount() {
        
      fetch('http://localhost:8000/api/talentgroup/')
      .then(res => res.json())
      .then((data) => {
          data.forEach(group => {
            if(group.talent.id == this.props.talent[0].id){
              this.state.talentGroups.push({"value":group.title.id, "label":group.id})
              this.state.titles.push({"value":group.title.id, "label":group.title.title})
            }
          })
      })
      .catch(console.log)

      fetch('http://localhost:8000/api/titles/')
      .then(res => res.json())
      .then((data) => {
          let titles = data.map(opt => ({ value: opt.id, label: opt.title }));
          this.setState({possible_titles:titles}); 
      })
      .catch(console.log)
      
      this.setState({talent: this.props.talent[0].talent})
    }
      

    handleText() {
        this.setState({talent:this.talent.value});
     }

     handleTitles = (titles) => {
      this.setState({titles})
    }

    createTalentGroups = (talent) => {
        
      const new_titles = this.state.titles
      const current_groups = this.state.talentGroups
      let add_groups = []
      let delete_groups = []
      let already_exist = false
      let not_deleted = false

      


      new_titles.forEach(function(new_title){
          
          already_exist = false
          current_groups.forEach(function(old_group){
              if(new_title.value == old_group.value){
                  already_exist = true
              }
          });
          if(!already_exist){
              add_groups.push(new_title)
          }    
      });

      current_groups.forEach(function(old_group){

          not_deleted = false
          new_titles.forEach(function(new_title){
              if(new_title.value == old_group.value){
                  not_deleted = true               
              }
          });
          if(!not_deleted){
              delete_groups.push(old_group)
          } 

      });

      console.log(delete_groups)
      console.log(add_groups)

      
      for (var i = 0; i < add_groups.length; i++) {
          fetch('http://localhost:8000/api/talentgroup/', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  talent_id: talent.id,
                  title_id : add_groups[i].value
              })
          }).then(res => res.json())
          .then((data) => {
              console.log(data)
          }).catch(console.log)

     }


     for (var i = 0; i < delete_groups.length; i++) {

          fetch('http://localhost:8000/api/talentgroup/'+ delete_groups[i].label, {
              method: 'DELETE',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              } 
          }).then().catch(console.log)

      }
      window.location.reload()
  
  }

    saveTalent() {
    

        fetch('http://localhost:8000/api/talents/'+this.props.talent[0].id + '/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                talent: this.state.talent
            })
        }).then(res => res.json())
        .then((data) => {
          this.createTalentGroups(data)
          
        })
            
        .catch(console.log)
      };


      handleValidation(talent){
        const errors = []
        var errorCount = 0

        if (talent.length == 0){
            errors["talent"]="*Talent required"
            errorCount++
        }else{
            errors["talent"]="No Error"
        }

        errors["errorCount"]=errorCount
        return errors;
    }

    handleStyle(type){
        if(this.state.errors[type]!="No Error" && this.state.errors[type]!=null){
            
            return this.customStyles.invalidEntry;

        }
    }

    handleError(type){
        if(this.state.errors[type]!="No Error" && this.state.errors[type]!=null){
            return <text style={{color: "red"}}>{this.state.errors[type]}</text>
        }
    }

    

    handleSubmit = (e) => {    
        e.preventDefault();

        const talent = this.state.talent;

        const errors = this.handleValidation(talent)

        if (errors["errorCount"] > 0) {
            this.setState({ errors });
            return;
        }else{
            this.saveTalent();
        }
    };

  render() {
    const {errors} = this.state;
    
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col xsOffset={4} md={4}>
              <Card
                title="Edit Talent"
                content={
                  <form>
                   <Row>
                        <div className="col-md-12">
                        <FormGroup>
                            <ControlLabel>Talent</ControlLabel>
                            <FormControl 
                                style={this.handleStyle("talent")}
                                type="text"
                                placeholder= "Talent"
                                defaultValue= {this.props.talent[0].talent}
                                inputRef={(ref) => {this.talent = ref}}
                                onChange={() => this.handleText()}
                            />
                            {this.handleError("talent")}
                        </FormGroup>
                        <FormGroup className="col-md-12">
                            <ControlLabel>Titles</ControlLabel>
                            <Select
                                defaultValue={[]}
                                isMulti
                                name="titles"
                                options={this.state.possible_titles}
                                onChange={this.handleTitles}
                                value={this.state.titles}
                            />
                        </FormGroup> 
                        </div>
                    </Row>

                    <ButtonToolbar>
                        <Button onClick = {this.handleSubmit} bsStyle="default" round fill>
                             Save
                        </Button>
                        <Button onClick={this.props.closePopup} bsStyle="default" round fill>
                             Close
                        </Button>
                    </ButtonToolbar>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default EditTalentPopup;