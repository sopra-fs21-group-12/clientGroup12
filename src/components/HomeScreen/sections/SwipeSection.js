import {useHistory, withRouter} from "react-router-dom";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

function SwipeSection () {
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4">
            ... and start swiping right away, your next match is just a swipe away!
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}
export default withRouter(SwipeSection);
