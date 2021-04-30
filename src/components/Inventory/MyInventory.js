import React, {useState} from 'react';
import {useHistory, withRouter} from 'react-router-dom';
import {
  Button,
  Grid,
  makeStyles,
  Card,
  CardActions
} from "@material-ui/core";
import TagPickerRS from "../tagPicker/TagPickerRS";
import { api, handleError } from '../../helpers/api';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 50,
  },
  inventoryText: {
    textAlign: "left",
    color: 'dimgray',
    fontSize: "25px",
    fontWeight: "bold",
  },
  submit: {
    margin: theme.spacing(10, 3),
  },
  tags: {
    paddingTop: "20px",
    textAlign: "left",
  },
  buttonMatches: {
    backgroundColor: "#73D997",
  },
  itemSection: {
    paddingTop: "50px",
    textAlign: "left",
    color: 'dimgray',
    fontSize: "25px",
    fontWeight: "bold",
  },
  itemContainer: {
    marginTop: "20px",
    minWidth: 900,
    minHeight: 275,
  },
}))

function MyInventory() {
  const history = useHistory();
  const id = localStorage.getItem('id');
  const [title, useTitle] = useState("");
  const [picture, setPicture] = useState();

  async function logOut() {
    const requestBody = JSON.stringify({
      username: localStorage.getItem('username'),
      name: localStorage.getItem('name'),
      id: localStorage.getItem('id'),
    });
    await api.put('/logout', requestBody);
    localStorage.clear();
    history.push('/login');
  }

  const getMyItems = async () => {
    try {
      const response = await api.get('/users/' + id + '/items')
      console.log(response);
    } catch (error) {
      alert(`Something went wrong, make sure you have an item stored or try again later: \n${handleError(error)}`)
    }
  }

  const classes = useStyles();
  return (
    <Grid
      container
      component="main"
      className={classes.root}
    >
      <Grid item xs={8}>
        <header> My Inventory </header>
      </Grid>
      <Grid item xs={2}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={getMyItems}
        >
          My Profile
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={logOut}
        >
          Logout
        </Button>
      </Grid>
      <Grid item xs={2}/>
      <Grid
        item
        xs={10}
        className={classes.inventoryText}
      >
        Choose filter for swiping
      </Grid>
      <Grid item xs={2}/>
      <Grid item xs={10} className={classes.tags}>
        <TagPickerRS></TagPickerRS>
      </Grid>
      <Grid item xs={2}/>
      <Grid
        item
        xs={10}
        className={classes.itemSection}
      >
        Here are your items you have put on Finder.
      </Grid>
      <Grid item xs={2}/>
      <Card
        className={classes.itemContainer}
        variant="outlined"
      >
        <CardActions
          onLoad={getMyItems}
        >
          <Button> Edit </Button>
          <Button className={classes.buttonMatches}> Matches </Button>
          <Button> Start swiping </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
export default withRouter(MyInventory);
