import { withRouter} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";
import Loader from "rsuite/es/Loader";
import { Grid, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import { Panel} from 'rsuite';
import Edit from "./Edit";
import BackToInventory from "../RedirectButtons/BackToInventory";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20
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
    const [userData, setUserData] = useState({
        id: "",
        name: "",
        username: "",
        status: "",
        timestamp: "",
        token: "",
        password: "",
        address: "",
        city: "",
        postcode: 0,
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

    const classes = useStyles();

    return (
        <div>
            <Grid container>
                <Grid item xs={10}>
                    <header> Your Profile Page </header>
                </Grid>
                <Grid item xs={2}>
                    <BackToInventory/>
                </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              component="main"
            >
                <Panel
                  shaded
                  bordered
                >
                    <Paper
                    elevation={0}
                    className={classes.root}
                    >
                        <Typography component="h1" variant="h5">
                        {loading ? loader :
                            <div>
                                <Grid
                                  container
                                  justify="center"
                                >
                                    <Grid
                                      item xs={6}
                                      className={classes.profileFields}
                                    >
                                    <h4>Username:</h4>
                                    </Grid>
                                    <Grid
                                      item xs={6}
                                      className={classes.profileFields}
                                    >
                                    <TextField
                                      value={userData.username}
                                      disabled
                                    >
                                    </TextField>
                                    </Grid>
                                </Grid>
                                <Grid
                                  container
                                  justify="center"
                                >
                                    <Grid item xs={6}
                                          className={classes.profileFields}
                                    >
                                        <h4>Name:</h4>
                                    </Grid>
                                    <Grid item xs={6}
                                          className={classes.profileFields}
                                    >
                                        <TextField
                                          value={userData.name}
                                          disabled
                                        >
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid
                                  container
                                  justify="center"
                                >
                                    <Grid item xs={6}
                                          className={classes.profileFields}
                                    >
                                        <h4>Address:</h4>
                                    </Grid>
                                    <Grid item xs={6}
                                          className={classes.profileFields}
                                    >
                                        <TextField
                                          value={userData.address}
                                          disabled
                                        >
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid
                                  container
                                  justify="center"
                                >
                                    <Grid item xs={6}
                                          className={classes.profileFields}
                                    >
                                        <h4>City:</h4>
                                    </Grid>
                                    <Grid item xs={6}
                                          className={classes.profileFields}
                                    >
                                        <TextField
                                          value={userData.city}
                                          disabled
                                        >
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid
                                  container
                                  justify="center"
                                >
                                    <Grid item xs={6}
                                          className={classes.profileFields}
                                    >
                                        <h4>Postal Code:</h4>
                                    </Grid>
                                    <Grid item xs={6}
                                          className={classes.profileFields}
                                    >
                                        <TextField
                                          value={userData.postcode}
                                          disabled
                                        >
                                        </TextField>
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
        </div>
    );
}
export default withRouter(Profile);
