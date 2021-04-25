import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Button, Link } from '@material-ui/core'
import { Panel } from 'rsuite'

import TagPickerRS from '../tagPicker/TagPickerRS'
import {api, handleError} from "../../helpers/api";
import User from "../shared/models/User";

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

function ItemUpload() {
    const history = useHistory();
    const classes = useStyles();
    const [state, setState] = useState({
        title: "",
        description: ""
    }
    );
    const [image, setImage] = useState();
    const [selectedTags, setTags] = useState();

    function handleTags(newValue){
        setTags(newValue);
    }

    const handleChange = (e) => {
        const{id, value} = e.target
        setState(prevState => ({
          ...prevState,
          [id] : value
      }))
    }

    useEffect(() =>{
        sessionStorage.setItem("selectedTags", selectedTags);
      }, [selectedTags]);


    async function handleSave() {
        try {
            // What we send back to the backend
            const requestBody = JSON.stringify({
                userId: localStorage.getItem("id"),
                title: state.title,
                description: state.description,
                tagsItem: selectedTags
            });
            // We create a Put Request to the backend to /login
            const response = await api.post('/{}', requestBody);

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
        <Grid container justify="center" spacing={4}>
        <Grid item xs={12}/>
        <Grid item xs={12}/>

        <Grid item xs={6}>
          <Panel shaded>
            <Typography variant="h5">Add new Item to your Inventory</Typography>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Item Title"
              name="title"
              autoFocus
              onChange={handleChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="description"
              label="Item Description"
              id="description"
              rows={5}
              multiline
              onChange={handleChange}
            />

              <TagPickerRS value={selectedTags} onChange={handleTags}/>

            <Grid container justify="flex-start" alignItems="stretch">
              <Grid item xs={12}>
                <Button
                  disabled={!state.title || !state.description || !selectedTags}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                Save
                </Button>
              </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        color="default"
                    >
                        Cancel
                    </Button>
                </Grid>
            </Grid>
          </Panel>
        </Grid>
  
      </Grid>
    )
}

export default withRouter(ItemUpload);
