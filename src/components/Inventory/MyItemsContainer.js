import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import {Panel} from "rsuite";
import {Grid, Button, makeStyles} from "@material-ui/core";
import PictureSliderItem from "../pictures/PictureSilderItem";
import {api, handleError} from "../../helpers/api";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  matchesButton: {
    background: "#6FCF97",
  },
  swipingButton: {
    background: "#FFBB12",
  }
}));

export default function MyItemsContainer(props) {

  // fetch available tags from backend
  useEffect(async () => {
    try {
      const response = await api.get(`item/swapHistory/${props.item.id}`)
      setSwapHistory(response.data)
      console.log(swapHistory)

    } catch (error) {
      alert(`Something went wrong while fetching the tags: \n${handleError(error)}`);
    }

  }, [])

  const history = useHistory();
  const classes = useStyles();
  const [swapHistory, setSwapHistory] = useState([]);

  return (
    <Grid container justify="center" spacing={6}>
      <Grid item xs={12}>
        <Panel
          shaded
          collapsible
          header={
            <Grid container justify="flex-start" alignItems="center" spacing={10}>
              <Grid container item xs={5} justify="center" alignItems="center" spacing={4}>
                <Grid item xs={4}>
                  <PictureSliderItem id={props.item.id}/>
                </Grid>
                <Grid item xs={8}>
                  <h3>{props.item.title}</h3>
                </Grid>
              </Grid>
              <Grid item xs={2}>
              <Button
                variant="contained"
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
          <h6>Item Description:</h6>
           <h6>{props.item.description}</h6>
          <br/>
          <Divider/>
          <br/>
          <h6>Swap History:</h6>
          {!swapHistory ? (
              <div>
                <h7>This item was never swapped</h7>
              </div>
          ):(
              <div>
                {swapHistory.map(item => {
                  return (
                      <div key={item}>
                        <p>• {item}</p>
                      </div>
                  )
                })}
              </div>
          )}
        </Panel>
      </Grid>
    </Grid>
  )
}
