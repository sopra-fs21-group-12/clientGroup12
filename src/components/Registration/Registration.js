import React, {useState} from 'react';
import {useHistory, withRouter} from 'react-router-dom';
import {Avatar, Button, Container, Grid, makeStyles, TextField, Typography, Paper} from "@material-ui/core";
import {api, handleError} from "../../helpers/api";
import User from "../shared/models/User";
import {Panel} from "rsuite";
import Navbar from "../Navbar/Navbar";
import RegistrationMap from "../map/RegistrationMap";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    display: 'center',
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
}))

function Registration() {
  const classes = useStyles();
  const history = useHistory();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (input) => {
    const username = input.target.value;
    setUsername(username);
  };

  const onChangeName = (input) => {
    const name = input.target.value;
    setName(name);
  };

  const onChangePassword = (input) => {
    const password = input.target.value;
    setPassword(password);
  }

  const handleRegistration = async () => {
    try {
      // What we want to send back to the backend
      const location = JSON.parse(localStorage.getItem("latLng"))
      console.log(location)
      const requestBody = JSON.stringify({
        username: username,
        name: name,
        password: password,
        longitude: location.lng,
        latitude: location.lat,
      });
      // Post request to the backend with given data
      console.log(requestBody);
      const response = await api.post('/users', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token, id, username & name into the local storage.
      localStorage.setItem('token', user.token);
      localStorage.setItem('id',user.id);
      localStorage.setItem('username',user.username);
      localStorage.setItem('name',user.name);
      // registration successfully  --> navigate to the route /inventory ,
      history.push('/inventory')
      // If something went wrong send the user back to the registration
    } catch (error) {
      alert(`Something went wrong during the registration: \n${handleError(error)}`);
    }
  }

  return (
    <Grid container justify="center" spacing={0}>
    <Navbar/>
    <Grid container justify="center" spacing={10}>
    <Grid item xs={12}/>
    <Container maxWidth="sm"
    >
        <Panel shaded>
          <Typography
            variant="h5">
            Register to upload your first item and start swiping
          </Typography>
        <Avatar
          className={classes.avatar}
        />
          <TextField
            id=""
            margin="normal"
            label="Username"
            variant="outlined"
            fullWidth
            required
            onChange={onChangeUsername}
          >
          </TextField>
          <TextField
            id="outlined-basic"
            margin="normal"
            label="Name"
            variant="outlined"
            fullWidth
            required
            onChange={onChangeName}
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
            onChange={onChangePassword}
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
          <RegistrationMap/>
        </Panel>
        <Button
        disabled={!username || !name || !password}
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
    </Grid>
    </Grid>


  )
}


export default withRouter(Registration);
