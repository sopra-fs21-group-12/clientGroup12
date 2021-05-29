import React, {useEffect, useState} from 'react';
import { api, handleError } from '../../helpers/api';
import {useHistory, withRouter} from 'react-router-dom';
import { Panel } from 'rsuite'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Grid, Typography, makeStyles} from '@material-ui/core'
import PictureAvatar from "../pictures/PictureAvatar";
import Navbar from "../Navbar/Navbar";

const useStyles = makeStyles((theme) => ({
  list: {
    whiteSpace: "nowrap",
    width: "100%",
    overflow: "hidden",
    textOverflow: "clip ellipsis",
    marginLeft: theme.spacing(1)
  },
  listMargin: {
    paddingLeft: theme.spacing(1)
  },
}));

function MyItemsList() {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState({id: null, items: undefined, matches: []});

  useEffect(async() => {
    try {
      const id = localStorage.getItem("id");
      const response = await api.get(`/users/${id}/items`);
      const myItems = response.data;
      setState({items: myItems});
    } catch (error) {
      alert(`Something went wrong, make sure you have an item stored or try again later: \n${handleError(error)}`)
    }
  }, []);

    return (
      <>
       <Grid container justify="center" spacing={0}>
        <Navbar/>
      <Grid container justify="center" spacing={4}>
      <Grid item xs={12}/>
      <Grid item xs={12}/>
   

      <Grid item xs={6}>
        <Panel shaded>
          <Typography variant="h5">Choose one of your items to chat with its matches</Typography>

          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {state.items && state.items.map(user => {
            return (
                <>
                  <ListItem button onClick={() =>{
                    history.push(`/chat/${user.id}`)
                  }}>
                    <PictureAvatar itemId={user.id}/>
                    <ListItemText className={classes.list} primary={user.title} />
                  </ListItem>
              </>
            );
            })}
            {!state.items &&
              <ListItem button>
                <ListItemText primary="You have no items" />
              </ListItem>
            }
          </List>
        </Panel>
      </Grid>
  </Grid>
  </Grid>
  </>
    );
}

export default withRouter(MyItemsList);
