import React, {useEffect, useState} from 'react';
import {useHistory, withRouter} from 'react-router-dom';
import {
  Button,
  Grid,
  makeStyles,
} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { api, handleError } from '../../helpers/api';
import MyItemsContainer from "./MyItemsContainer";
import {Panel} from "rsuite";
import InputPickerSwipe from "../tagPicker/InputPickerSwipe";

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
  addItem: {
    margin: theme.spacing(2),
    background: "#0E4DA4"
  },
  submit: {
    margin: theme.spacing(10, 3),
    background: "#FFFFFF"
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
}))

function MyInventory() {
  const history = useHistory();
  const id = localStorage.getItem('id');
  const [items, setItems] = useState([]);

  const [selectedTag, setTag] = useState();
  const [tags, setAvailableTags] = useState([]);

  async function logOut() {
    try {
      const requestBody = JSON.stringify({
        username: localStorage.getItem('username'),
        name: localStorage.getItem('name'),
        id: localStorage.getItem('id'),
      });
      await api.put('/logout', requestBody);
      localStorage.clear();
      history.push('/login');
    }catch (error) {
      alert(`Something went wrong during the logout \n${handleError(error)}`)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
    try {
      const response = await api.get('/users/' + id + '/items');
      setItems(response.data);
    } catch (error) {
      alert(`Something went wrong, make sure you have an item stored or try again later: \n${handleError(error)}`)
    }}
    fetchData();
  }, []);


  function handleTags(newValue){
    setTag(newValue);
  }

  // fetch available tags from backend
  useEffect(async () => {
    try {
      const response = await api.get("/tags")

      // map response data for the TagPicker component
      const arr = response.data.map(obj => ({
        label: obj.description,
        value: obj.description
      }))
      setAvailableTags(arr)

    } catch (error) {
      alert(`Something went wrong while fetching the tags: \n${handleError(error)}`);
    }

  }, [])

  // save selected tag for swiping
  useEffect(() =>{
    sessionStorage.setItem("swipeTag", selectedTag);
  }, [selectedTag]);

  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      component="main"
      className={classes.root}
    >
      <Grid item xs={6}>
        <header> My Inventory </header>
      </Grid>
      <Grid item xs={2}>
        <Button
          type="submit"
          variant="contained"
          className={classes.submit}
          onClick={() => history.push('/itemsToChat')}
        >
          Chat
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          type="submit"
          variant="contained"
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
          className={classes.submit}
          onClick={logOut}
        >
          Logout
        </Button>
      </Grid>
      <Grid
          item
          xs={10}
          className={classes.itemSection}
      >
        Choose a tag for filtered swiping
      </Grid>
      <Grid item xs={10}>
        <InputPickerSwipe value={selectedTag} onChange={handleTags} tags={tags}/>
      </Grid>
      <Grid
        item
        xs={10}
        className={classes.itemSection}
      >
        Here are your items you have put on Finder so far
      </Grid>
      <Grid item xs={10}>
        {items.map(item => {
          return(
            <div key={item.id}>
              <Grid item>
                <MyItemsContainer item={item}/>
              </Grid>
            </div>
          )})}
      </Grid>
      <Grid item xs={10}>
        <Panel
        shaded
        bordered
        header={<h3>Add new Item</h3>}
        style={{height: 200}}
        >
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              className={classes.addItem}
              startIcon={<AddCircleIcon />}
              onClick={() => history.push('/upload')}
            >
            </Button>
          </Grid>
        </Panel>
      </Grid>
    </Grid>
  )
}
export default withRouter(MyInventory);
