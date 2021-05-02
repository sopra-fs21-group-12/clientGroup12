import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Button } from '@material-ui/core'
import { Modal, Panel, Uploader} from 'rsuite'

import TagPickerRS from '../tagPicker/TagPickerRS'
import {api, handleError} from "../../helpers/api";
import BackToInventory from "../RedirectButtons/BackToInventory";

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

const dropzone = {
    lineHeight: '200px'
};


function ItemUpload() {
    const history = useHistory();
    const classes = useStyles();
    const id = localStorage.getItem("id")
    const [state, setState] = useState({
        title: "",
        description: ""
    }
    );
    const [image, setImage] = useState();
    const [selectedTags, setTags] = useState();
    const [tags, setAvailableTags] = useState([]);

    const [modal, setModal] = useState({show: false});
    const [itemId, setItemId] = useState();

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

    // fetch available tags from backend
    useEffect(async () => {
        try {
            const response = await api.get("/tags")

            // map response data for the TagPicker component
            const arr = response.data.map(obj => ({
                label: obj.description,
                value: obj.description
            }))
            setAvailableTags(arr)

        } catch (error) {
            alert(`Something went wrong while fetching the tags: \n${handleError(error)}`);
        }

    }, [])

    // save selected tags from user
    useEffect(() =>{
        sessionStorage.setItem("selectedTags", selectedTags);
      }, [selectedTags]);


    // send item data to the backend
    async function handleSave() {
        try {
            // What we send back to the backend
            const requestBody = JSON.stringify({
                userId: id,
                title: state.title,
                description: state.description,
                tagsItem: selectedTags
            });
            const response = await api.post(`/users/${localStorage.getItem("id")}/items`, requestBody);
            setItemId(response.data.id);
            open();

        } catch (error) {
            alert(`Something went wrong during the Item creation: \n${handleError(error)}`);
        }
    }

    function close() {
        setModal({show: false});
        history.push('/inventory')
    }

    function open() {
        setModal({show: true});
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

                <TagPickerRS value={selectedTags} onChange={handleTags} tags={tags}/>

                <Grid container justify="flex-start" alignItems="stretch">
                  <Grid item xs={12}>
                            <Button
                              disabled={!state.title || !state.description || !selectedTags}
                              type="submit"
                              variant="contained"
                              color="primary"
                              className={classes.submit}
                              onClick={handleSave}
                            >
                            Save
                            </Button>
                  </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            color="default"
                            onClick={close}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
              </Panel>
              <BackToInventory/>
            </Grid>

            <Modal show={modal.show} onHide={close} backdrop="static">
                <Modal.Header closeButton={false}>
                    <Modal.Title>Set picture for your item (required)</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Uploader
                        action={`http://sopra-fs21-group-12-server.herokuapp.com/items/${itemId}/pictures/upload`}
                        draggable
                        onSuccess={close}
                    >
                        <div style={dropzone}>Click or Drag files to this area to upload</div>
                    </Uploader>

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

      </Grid>
    )
}

export default withRouter(ItemUpload);
