import {useHistory, withRouter} from "react-router-dom";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

function InventorySection () {
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4">
            Upload items to your inventory and choose filters for what you're ready to trade yours against...
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}
export default withRouter(InventorySection);
