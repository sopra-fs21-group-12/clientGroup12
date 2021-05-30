import {useHistory, withRouter} from "react-router-dom";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

function GameSection () {
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4">
            ...and if you can't decide on how to exchange your items, just play a game of rock-paper-scissors :). The winner decides, pick wisely!
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}
export default withRouter(GameSection);
