import {useHistory, withRouter} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";
import Loader from "rsuite/es/Loader";
import {Button, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import {Modal, Panel} from 'rsuite';
import User from "../shared/models/User";
import Edit from "./Edit";
import BackToInventory from "../RedirectButtons/BackToInventory";
import MyItemsContainer from "../Inventory/MyItemsContainer";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles((theme) => ({
      root: {
          paddingLeft: 50
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
              className={classes.root}
            >
                <Panel
                  shaded
                  bordered
                >
                <Typography component="h1" variant="h5">
                {loading ? loader :
                    <div>
                        <h4>Username: {userData.username}</h4>
                        <h4>Name: {userData.name}</h4>
                        <h4>Address: {userData.address}</h4>
                        <h4>City: {userData.city}</h4>
                        <h4>Postal Code: {userData.postcode}</h4>
                        <Edit userdata={userData}>
                        </Edit>
                    </div>
                }
                </Typography>
                </Panel>
            </Grid>
        </div>
    );
}
export default withRouter(Profile);
