import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Grid,
  makeStyles,
  Card,
  CardActions
} from "@material-ui/core";
import TagPickerRS from "../tagPicker/TagPickerRS";
import { useHistory } from "react-router-dom";

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
  function logout() {
    //log the user out
  }

  const goToChat = () =>{
    history.push('/itemsToChat')
  }

  const classes = useStyles();
  return (
    <Grid
      container
      component="main"
      maxWidth="xs"
      className={classes.root}
    >
      <Grid item xs={5}>
        <header> My Inventory </header>
      </Grid>
      <Grid item xs={2}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={goToChat}
          className={classes.submit}>
          Chat
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}>
          My Profile
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}>
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
        <CardActions>
          <Button> Edit </Button>
          <Button className={classes.buttonMatches}> Matches </Button>
          <Button> Start swiping </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
export default withRouter(MyInventory);
