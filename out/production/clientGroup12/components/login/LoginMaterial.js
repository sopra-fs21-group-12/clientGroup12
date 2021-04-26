import React from 'react';

import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Paper, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


class LoginMaterial extends React.Component {
  /**
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor given by username & name
   */
  constructor(props) {
    super(props);
    // Initial state is given
    this.state = {
      name: null,
      username: null,
    };
  }

  /**
   * After the user field out both username & password field and clicks on the login button -> login() is invoked
   * HTTP PUT request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end form of (UserGetDTO)
   * It's token, id, username & name is stored in the local storage
   */
  async login() {
    try {
      // What we send back to the backend
      const requestBody = JSON.stringify({
        username: this.state.username.toLowerCase(),
        password: this.state.password
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
      //this.props.history.push(`/game`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   */
  componentDidMount() {}

  render() {
    return (
<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar>
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
            onChange={e => {
              this.handleInputChange('username', e.target.value);
            }}
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
            onChange={e => {
              this.handleInputChange('password', e.target.value);
            }}
          />
            <Grid item xs>
            <Button
            disabled={!this.state.username || !this.state.password}
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => {
              this.login();
            }}
          >
            Login
          </Button>
            <Grid item>
              <Link href="/registration" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(LoginMaterial);
