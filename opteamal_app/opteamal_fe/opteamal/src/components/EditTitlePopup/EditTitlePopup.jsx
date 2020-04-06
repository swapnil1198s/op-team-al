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



class EditTitlePopup extends Component {
    constructor() {
        super();
        this.textInput = React.createRef();
        this.state = { 
          title:"",
          talents:[],
          talentGroups:[],
          possible_talents:[],
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
            if(group.title.id == this.props.title[0].id){
              this.state.talentGroups.push({"value":group.talent.id, "label":group.id})
              this.state.talents.push({"value":group.talent.id, "label":group.talent.talent})
            }
          })
      })
      .catch(console.log)

      fetch('http://localhost:8000/api/talents/')
      .then(res => res.json())
      .then((data) => {
          let talents = data.map(opt => ({ value: opt.id, label: opt.talent }));
          this.setState({possible_talents:talents}); 
      })
      .catch(console.log)
      
      this.setState({title: this.props.title[0].title})
    }

    handleText() {
        this.setState({title:this.title_name.value});
     }

     handleTalents = (talents) => {
      this.setState({talents})
    }

    createTalentGroups = (title) => {
        
      const new_talents = this.state.talents
      const current_groups = this.state.talentGroups
      let add_groups = []
      let delete_groups = []
      let already_exist = false
      let not_deleted = false

      


      new_talents.forEach(function(new_talent){
          
          already_exist = false
          current_groups.forEach(function(old_group){
              if(new_talent.value == old_group.value){
                  already_exist = true
              }
          });
          if(!already_exist){
              add_groups.push(new_talent)
          }    
      });

      current_groups.forEach(function(old_group){

          not_deleted = false
          new_talents.forEach(function(new_talent){
              if(new_talent.value == old_group.value){
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
                  talent_id: add_groups[i].value,
                  title_id : title.id
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

    saveTitle() {
    

        fetch('http://localhost:8000/api/titles/'+this.props.title[0].id + '/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title
            })
        }).then(res => res.json())
        
        .then((data) => {
          this.createTalentGroups(data)
        })
            
        .catch(console.log)
      };


      handleValidation(title){
        const errors = []
        var errorCount = 0

        if (title.length == 0){
            errors["title"]="*Title required"
            errorCount++
        }else{
            errors["title"]="No Error"
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

        const title = this.state.title;

        const errors = this.handleValidation(title)

        if (errors["errorCount"] > 0) {
            this.setState({ errors });
            return;
        }else{
            this.saveTitle();
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
                title="Edit Title"
                content={
                  <form>
                   <Row>
                        <div className="col-md-12">
                        <FormGroup>
                          <ControlLabel>Title</ControlLabel>
                            <FormControl 
                                style={this.handleStyle("title")}
                                type="text"
                                placeholder= "Title"
                                defaultValue= {this.props.title[0].title}
                                inputRef={(ref) => {this.title_name = ref}}
                                onChange={() => this.handleText()}
                            />
                            {this.handleError("title")}
                        </FormGroup>
                        <FormGroup className="col-md-12">
                            <ControlLabel>Talents</ControlLabel>
                            <Select
                                defaultValue={[]}
                                isMulti
                                name="talents"
                                options={this.state.possible_talents}
                                onChange={this.handleTalents}
                                value={this.state.talents}
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

export default EditTitlePopup;