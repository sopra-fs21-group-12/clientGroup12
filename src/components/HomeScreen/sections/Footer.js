import {useHistory, withRouter} from "react-router-dom";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

function Footer () {
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </div>
  )
}
export default withRouter(Footer);
