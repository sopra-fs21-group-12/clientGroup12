import { withRouter } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";
import Loader from "rsuite/es/Loader";
import {Button} from "rsuite";
import {TextField, Typography} from "@material-ui/core";
import User from "../shared/models/User";

const loader = (
    <div>
         <Loader size="md" backdrop content="loading..." vertical />
    </div>);

function Profile() {
    const id = localStorage.getItem("id")
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
        id: '',
        name: "",
        username: "",
        status: "",
        timestamp: "",
        birthday: "",
        token: "",
    })
    const [edit, setEdit] = useState({
        username: "",
        birthday: "",
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

    const handleChange = (e) => {
        const {id, value} = e.target
        setEdit((prevState) => ({...prevState, [id]: value}));
    }
    async function handleEdit() {
        try {
            // What we send back to the backend
            const requestBody = JSON.stringify({
                username: edit.username,
                birthday: edit.birthday
            });
            console.log(id)
            console.log(edit.username)

            // We create a Put Request to the backend to /users/{id}
            await api.put('/users/' + id, requestBody);

            //useEffect();

        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    return (
        <div>{loading ? loader : "hello " + userData.username + ' ' + id + ' ' + edit.username}
            <Typography component="h1" variant="h5">
                Login to Finder
            </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="change your Username"
                name="username"
                autoFocus
                onChange={handleChange}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="birthday"
                label="fill in your Birthday"
                id="birthday"
                onChange={handleChange}
            />
            <Button
                //disabled={!state.username || !state.birthday}
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleEdit}
            >
                save changes
            </Button>
        </div>
    )
}

export default withRouter(Profile);