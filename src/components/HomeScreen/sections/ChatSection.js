import {useHistory, withRouter} from "react-router-dom";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

function ChatSection () {
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4">
            No need to sign-up with your E-Mail, chat directly with other users on finder...
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}
export default withRouter(ChatSection);
