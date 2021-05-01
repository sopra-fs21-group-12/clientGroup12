import React  from 'react'
import { useHistory } from "react-router-dom";
import {Panel} from "rsuite";
import {Grid, Button, makeStyles} from "@material-ui/core";
import ItemEdit from "../item/ItemEdit";

const useStyles = makeStyles((theme) => ({
  matchesButton: {
    background: "#6FCF97",
  },
  swipingButton: {
    background: "#FFBB12",
  }
}));

export default function MyItemsContainer(props) {

  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={6}>
      <Grid item xs={12}>
        <Panel
          shaded
          collapsible
          header={
            <Grid container justify="center" alignItems="center" spacing={2}>
              <Grid item xs={5}>
                <h3>{props.item.title}</h3>
              </Grid>
              <Grid item xs={2}>
                <ItemEdit id={props.item.id}/>
              </Grid>
                <Grid item xs={2}>
              <Button
                variant="contained"
                className={classes.matchesButton}
                onClick={() => history.push('/matches/' + props.item.id)}
              >
                Matches
              </Button>
                    </Grid>
                <Grid item xs={3}>
              <Button
                variant="contained"
                className={classes.swipingButton}
                onClick={() => history.push('/swipe/' + props.item.id)}
              >
                Start Swiping
              </Button>
                </Grid>
            </Grid>
            }>
           <h6>{props.item.description}</h6>
        </Panel>
      </Grid>
    </Grid>
  )
}
