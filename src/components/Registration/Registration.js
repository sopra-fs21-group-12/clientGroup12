import React, {useState, useRef} from 'react';
import {register} from "../../actions/AAuth";
import {useHistory, withRouter} from 'react-router-dom';
import {Avatar, Button, Container, Grid, makeStyles, TextField, Typography, Paper} from "@material-ui/core";
import {api, handleError} from "../../helpers/api";
import User from "../shared/models/User";

const required = (value) => {
  if(!value) {
    return (
      <div className={"alert alert-danger"} role="alert">
        This field is required!
      </div>
    )
  }
}

const validUsername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        this username must be between 3 and 20 characters.
      </div>
    )
  }
}

const validPassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
}))

function Registration() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState();
  const [successful, setSuccessful] = useState(false);

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
  const history = useHistory();
  const handleRegistration = async () => {
    try {
      // What we want to send back to the backend
      const requestBody = JSON.stringify({
        username: username.toLowerCase(),
        name: name,
        password: password,
        address: address,
        city: city,
        postCode: postCode,
      });
      // Post request to the backend with given data
      const response = await api.post('/users', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token, id, username & name into the local storage.
      localStorage.setItem('token', user.token);
      localStorage.setItem('id',user.id);
      localStorage.setItem('username',user.username);
      localStorage.setItem('name',user.name);

      // registration successfully  --> navigate to the route /game in the GameRouter,
      // If something went wrong send the user back to the registration
      // TODO: tobe refactored
    } catch (error) {
      alert(`Something went wrong during the registration: \n${handleError(error)}`);
    }
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
        >
        </TextField>
        <TextField
          id="outlined-basic"
          margin="normal"
          label="City"
          variant="outlined"
          fullWidth
        >
        </TextField>
        <TextField
          id="outlined-basic"
          margin="normal"
          label="Postcode"
          variant="outlined"
          fullWidth
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
