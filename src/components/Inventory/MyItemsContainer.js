import React  from 'react'
import { useHistory } from "react-router-dom";
import {Panel} from "rsuite";
import {Grid, Button, makeStyles} from "@material-ui/core";
import ItemEdit from "../item/ItemEdit";
import Picture from "../pictures/Picture";

const useStyles = makeStyles((theme) => ({
  matchesButton: {
    background: "#6FCF97",
  },
  swipingButton: {
    background: "#FFBB12",
  }
}));

export default function MyItemsContainer(props) {
  const itemId = props.item.id;

  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={6}>
      <Grid item xs={12}>
        <Panel
          shaded
          collapsible
          header={
            <Grid container justify="flex-start" alignItems="center" spacing={10}>
              <Grid container item xs={5} justify="center" alignItems="center" spacing={1}>
                <Grid item xs={4}>
                  <Picture itemId={props.item.id}/>
                </Grid>
                <Grid item xs={8}>
                  <h3>{props.item.title}</h3>
                </Grid>
              </Grid>
              <Grid item xs={2}>
              <Button
                variant="contained"
                className={classes.itemEdit}
                onClick={() => history.push('/edit/' + props.item.id)}
              >
                Edit Item
              </Button>
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
