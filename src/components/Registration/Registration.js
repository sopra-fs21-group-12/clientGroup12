import React from 'react';
import {useHistory, withRouter} from 'react-router-dom';
import {Avatar, Button, Container, Grid, makeStyles, TextField, Typography, Paper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
}))

function Registration() {
  const classes = useStyles();
  const history = useHistory();
  function handleRegistration() {
    history.push('/inventory')
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <div className={classes.paper}>
        <Avatar
          className={classes.avatar}
        />
        <Typography
          component="h1"
          variant="h5">
          Register to upload your first item and start swiping
        </Typography>
        <TextField
          id="outlined-basic"
          margin="normal"
          label="Username"
          variant="outlined"
          fullWidth
          required
        >
        </TextField>
        <TextField
          id="outlined-basic"
          margin="normal"
          label="Name"
          variant="outlined"
          fullWidth
          required
        >
        </TextField>
        <TextField
          id="outlined-basic"
          margin="normal"
          label="Address"
          variant="outlined"
          fullWidth
          required
        >
        </TextField>
        <TextField
          id="outlined-basic"
          margin="normal"
          label="City"
          variant="outlined"
          fullWidth
          required
        >
        </TextField>
        <TextField
          id="outlined-basic"
          margin="normal"
          label="Postcode"
          variant="outlined"
          fullWidth
          required
        >
        </TextField>
        <TextField
          id="outlined-basic"
          margin="normal"
          label="Password"
          type="password"
          variant= "outlined"
          fullWidth
          required
        >
        </TextField>
        <TextField
          id="outlined-basic"
          margin="normal"
          label="Password verification"
          variant="outlined"
          type="password"
          fullWidth
          required
        >
        </TextField>
      </div>
      <Button
        className={classes.submit}
        size="medium"
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleRegistration}
      >
        Register
      </Button>
    </Container>
  )
}


export default withRouter(Registration);
