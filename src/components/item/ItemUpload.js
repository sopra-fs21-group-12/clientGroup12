import { React, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Button, Link } from '@material-ui/core'
import { Panel } from 'rsuite'

import TagPickerRS from '../tagPicker/TagPickerRS'

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
    var selectedTags = sessionStorage.getItem("selectedTags");


    const handleChange = (e) => {
        const{id, value} = e.target
        setState(prevState => ({
          ...prevState,
          [id] : value
      }))
    }

    function allEntriesNonEmpty(){
        return (!state.title || !state.description || !selectedTags)
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
            <TagPickerRS/>
            <Grid container justify="flex-start" alignItems="flex-start">
              <Grid item xs={12}>
                <Button
                  disabled={allEntriesNonEmpty}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                Save
                </Button>
              </Grid>
            </Grid>
          </Panel>
        </Grid>
  
      </Grid>
    )
}

export default withRouter(ItemUpload);
