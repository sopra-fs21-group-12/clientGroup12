import React, {useEffect, useState} from 'react';
import {useHistory, withRouter} from 'react-router-dom';
import {
  Button,
  Grid,
  makeStyles,
} from "@material-ui/core";
import TagPickerRS from "../tagPicker/TagPickerRS";
import { api, handleError } from '../../helpers/api';
import MyItemsContainer from "./MyItemsContainer";

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
  const [items, setItem] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
    try {
      const response = await api.get('/users/' + id + '/items');
      setItem(response.data);
    } catch (error) {
      alert(`Something went wrong, make sure you have an item stored or try again later: \n${handleError(error)}`)
    }}
    fetchData();
  }, []);

  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
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
          onClick={() => history.push('/profile')}
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
      </Grid>
      <Grid item xs={2}/>
      <Grid
        item
        xs={10}
        className={classes.itemSection}
      >
        Here are your items you have put on Finder so far
      </Grid>
      <Grid
        item
        xs={10}
      >
        {items.map(item => {
          return(
            <div key={item.id}>
              <Grid item>
                <MyItemsContainer item={items}/>
              </Grid>
            </div>
          )})}
      </Grid>
      <Grid container justify="center">
        <Grid item xs={1}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => history.push('/upload')}
          >
            Add item
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default withRouter(MyInventory);
