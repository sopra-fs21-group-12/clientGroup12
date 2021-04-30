import {makeStyles, Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import React from "react";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(10, 3)
  }
}))

export default function BackToInventory() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={() => history.push('/inventory')}
      >
        My Inventory
      </Button>
    </div>
  )
}
