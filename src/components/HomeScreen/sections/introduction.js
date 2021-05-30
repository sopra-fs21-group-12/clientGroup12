import {useHistory, withRouter} from "react-router-dom";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

function Introduction () {
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4">
            Trade items that have been laying around with potentialy something that will bring new life into your home!
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}
export default withRouter(Introduction);
