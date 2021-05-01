import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import {Button as RsuiteButton, Modal, Panel, Uploader} from 'rsuite'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid, Typography, TextField, Button, Link } from '@material-ui/core'


class MyItemsList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      items: undefined,
      matches: []
    };
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }
  async getMyitems() {
    try {
      const response = await api.get(`/users/${this.state.id}/items`);
      const myItems = response.data;
      this.setState({ 
          items: myItems
        });
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  
  handleClick() {

  }
  async componentDidMount() {
    // add try catch
    const id = localStorage.getItem("id");
    const response = await api.get(`/users/${id}/items`);
      const myItems = response.data;
      this.setState({ 
        items: myItems
    });
  }


  render() {
    return (
      <>
      <Grid container justify="center" spacing={4}>
      <Grid item xs={12}/>
      <Grid item xs={12}/>

      <Grid item xs={6}>
        <Panel shaded>
          <Typography variant="h5">Click on an item to go to the chat</Typography>

          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {this.state.items && this.state.items.map(user => {
            return (
                <>
                  <ListItem button onClick={() =>{
                    this.props.history.push(`/chat/${user.id}`)
                  }}>
                    <ListItemText primary={user.title} />
                  </ListItem>
              </>
            );
            })}
            {!this.state.items &&
              <ListItem button>
                <ListItemText primary="You have no items" />
              </ListItem>
            }
          </List>
        </Panel>
      </Grid>      
  </Grid>
  </>
    );
  }
}

export default withRouter(MyItemsList);
