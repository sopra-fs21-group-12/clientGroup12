import { withRouter} from 'react-router-dom';
import axios from "axios";
import React, {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";
import Loader from "rsuite/es/Loader";
import { Grid, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import { Panel} from 'rsuite';
import Edit from "./Edit";
import Navbar from "../Navbar/Navbar";
require('dotenv').config();

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const useStyles = makeStyles((theme) => ({
    root: {
      margin: 20,
      },
    profileFields: {
      paddingTop: 30,
      justifyItems: "center",
    },
  })
)
const loader = (
    <div>
         <Loader size="md" backdrop content="loading..." vertical />
    </div>);

function Profile() {
  const id = localStorage.getItem("id")
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState();
  const [userData, setUserData] = useState({
      id: "",
      name: "",
      username: "",
      status: "",
      timestamp: "",
      token: "",
      password: "",
      latitude: 0,
      longitude: 0,
  })

  useEffect(async () => {
    try {
      setLoading(true)
      //@GetMapping("/users/{userId}")
      //await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await api.get(/users/ + id)
      setUserData(response.data)

      setLoading(false)
    } catch (error) {
        alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
  }, [])

  useEffect (() => {
    const axios = require('axios');
    if (userData?.id != "") {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${userData.latitude},${userData.longitude}&key=${API_KEY}`)
        .then((response) => setAddress(response.data.results[0].formatted_address))
        .catch(error => console.error('Error', error))
    }
  }, [userData])

  const classes = useStyles();

  return (
    <div>
       <Grid container justify="center" spacing={0}>
       <Navbar/>
        <Grid container>
            <Grid item xs={12}>
                <header> Your Profile Page </header>
            </Grid>
        </Grid>
        <Grid
          container
          justify="center"
        >
          <Grid item sm={10}>
            <Panel
              shaded
              bordered
            >
                <Paper
                elevation={0}
                className={classes.root}
                >
                    <Typography variant="h5">
                    {loading ? loader :
                        <div>
                            <Grid
                              container
                              justify="center"
                            >
                                <Grid
                                  item xs={4}
                                  className={classes.profileFields}
                                >
                                <h4>Username:</h4>
                                </Grid>
                                <Grid
                                  item sm={8}
                                  className={classes.profileFields}
                                >
                                <TextField
                                  value={userData.username}
                                  disabled
                                  fullWidth={true}
                                />
                                </Grid>
                            </Grid>
                            <Grid
                              container
                              justify="center"
                            >
                                <Grid item xs={4}
                                      className={classes.profileFields}
                                >
                                    <h4>Name:</h4>
                                </Grid>
                                <Grid item sm={8}
                                      className={classes.profileFields}
                                >
                                    <TextField
                                      value={userData.name}
                                      disabled
                                      fullWidth={true}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                              container
                              justify="center"
                            >
                                <Grid item xs={4}
                                      className={classes.profileFields}
                                >
                                    <h4>Address:</h4>
                                </Grid>
                                <Grid item sm={8}
                                      className={classes.profileFields}
                                >
                                    <TextField
                                      value={address}
                                      disabled
                                      fullWidth={true}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}
                                  className={classes.profileFields}>
                                <Edit userdata={userData}>
                                </Edit>
                            </Grid>
                        </div>
                    }
                    </Typography>
                </Paper>
            </Panel>
          </Grid>
        </Grid>
        </Grid>
    </div>
  );
}
export default withRouter(Profile);
