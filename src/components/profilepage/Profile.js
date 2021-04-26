import {useHistory, withRouter} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";
import Loader from "rsuite/es/Loader";
import {Button} from "rsuite";
import {TextField, Typography} from "@material-ui/core";
import { Modal } from 'rsuite';
import User from "../shared/models/User";
import Edit from "./Edit";

const loader = (
    <div>
         <Loader size="md" backdrop content="loading..." vertical />
    </div>);

function Profile() {
    const id = localStorage.getItem("id")
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
        id: "",
        name: "",
        username: "",
        status: "",
        timestamp: "",
        birthday: "",
        token: "",
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

    return (
        <div>
            <Typography component="h1" variant="h5">
            {loading ? loader :
                <div>
                    <h3>Username: {userData.username}</h3>
                    <h3>Creation Date: {userData.timestamp}</h3>

                    <Edit userdata={userData}>
                    </Edit>

                </div>
            }
            </Typography>
        </div>
    );
}
export default withRouter(Profile);