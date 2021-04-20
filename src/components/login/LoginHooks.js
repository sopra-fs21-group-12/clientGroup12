import { React, useState, Redirect } from 'react';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import Registration from "../Registration/Registration";
import { useHistory } from "react-router-dom";

import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Paper, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginHooks() {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState({
      username: "",
      password: ""
  }
  );

  const handleChange = (e) => {
      const{id, value} = e.target
      setState(prevState => ({
        ...prevState,
        [id] : value
    }))
  }

  async function handleLogin() {
      try {
        // What we send back to the backend
        const requestBody = JSON.stringify({
          username: state.username,
          password: state.password
        });
        // We create a Put Request to the backend to /login
        const response = await api.put('/login', requestBody);

        // Get the returned user and update a new object (UserGetDTO)
        const user = new User(response.data);

        // Store the token, the username,id, token and name into the local storage.
        localStorage.setItem('token', user.token);
        localStorage.setItem('id',user.id);
        localStorage.setItem('username',user.username);
        localStorage.setItem('name',user.name);


        // Login successfully worked --> navigate to the route /game in the GameRouter
        // Otherwise an error is displayed
        // Hooks version of this.props.history.push(`/game`);?
        history.push('/game')
      } catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
      }
  }



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Login to Finder
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={handleChange}
        />
      </div>
      <Grid justify="flex-start" alignItems="flex-start">
        <Button
        disabled={!state.username || !state.password}
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleLogin}
        >
          Login
        </Button>
        <Grid item justify="flex-start" >
          <Link href="/registration" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
      <Box mt={8}>
      </Box>
    </Container>
  );
}

export default withRouter(LoginHooks);
