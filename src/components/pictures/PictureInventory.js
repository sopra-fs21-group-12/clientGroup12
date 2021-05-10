import {useEffect,useState, React} from "react";
import {withRouter} from "react-router";
import { api, handleError } from '../../helpers/api';
import { useHistory } from "react-router-dom";
import {TextField, Button, makeStyles} from "@material-ui/core";
import Loader from "rsuite/es/Loader";


import axios from "axios";
// Styling imports:
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CardActionArea from '@material-ui/core/CardActionArea';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core'
import { Button  as RsuiteButton } from "rsuite";
import { Modal, Panel, Uploader} from 'rsuite'


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth:365,
       },

    media: {
         height: 140,
       },

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

let itemid;
// Overview Page to upload new pictures and see + Delete other pictures
export default function PictureInventory(props) {
    const classes = useStyles();
    // Keeps the URL of all pictures
    const history = useHistory();
    const [picturesstate, setpictures] = useState([]);
    const [pictureNames,setpicturesNames] = useState([]);
    const [deletionId,setDeletionId] = useState(0);
    const [itemData, setItemData] = useState();
    const [modal, setModal] = useState({show: false});
    const [modal2, setModal2] = useState({show: false});
    const [state, setState] = useState({
        title: "",
        description: ""
    }
);

// Sends the information to the Backend, when data has been saved
    async function handleSave() {
        try {
            // What we send back to the backend
            const requestBody = JSON.stringify({
                title: state.title,
                description: state.description,
            });
            await api.put(`/items/${props.id}`, requestBody);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    // Deleting Pictures in the Backend
    async function handleDeleteofPicture() {
        try {
            await api.delete(`/pictures/delete/${pictureNames[localStorage.getItem("PictureId")]}`);
            window.location.reload(false);
        

        } catch (error) {
            alert(`Something went wrong during picture deletion: \n${handleError(error)}`);
        }
    }



    // Similar to whenComponent Mounts will get us all the different pictures, per ID
    useEffect(() => {
        console.log("Test")
        axios
          .get(`http://sopra-fs21-group-12-server.herokuapp.com/items/16/pictures/download`)
          .then(response => setpictures(response.data.map((picture)=>picture.url))&(setpicturesNames(response.data.map((picture)=>picture.name))));
      }, []);


      const handleChange = (e) => {
        const{id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    // Function onClick will Delete the Item:
    function handleDelete(e) {
        localStorage.setItem('PictureId', e.target.id);
        console.log(localStorage.getItem('PictureId'))
        if(localStorage.getItem('PictureId')!=null){       
        setModal({show: true});
        }
    }
    function handleDeleteBackend(){
        setModal({show: false});

        handleDeleteofPicture();
        history.push('/test')
    }
     
    function close(e){
        setModal({show: false});
        history.push('/test')
    }

    function open() {
        setModal2({show: true});
    }
    function close2(e){
        setModal2({show: false});
        window.location.reload(false);
        history.push('/test')
    }

    return (
        <div>
            Test
        <Grid container justify="center" spacing={1}>
             <Grid item xs={12}/>
            <Grid item xs={12}/>
            <Grid item xs={6}>
            <Panel shaded>
             <Typography variant="h5">Item Edit Page</Typography> <br/>
             <Typography variant="h6">Item Title and Description</Typography>
             <br/>
             <RsuiteButton
                    type="open"
                    variant="contained"
                    color="primary"
                    onClick={open}>
                     Upload More Pictures
                    </RsuiteButton>
                    <br/>

             <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Item Title"
                  name="title"
                  // Needs to be edited (defaultValue={itemData.title})
                  autoFocus
                  onChange={handleChange}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="description"
                  // Needs to be added (defaultValue={itemData.description})
                  label="Item Description"
                  id="description"
                  rows={5}
                  multiline
                  onChange={handleChange}
                />

                <RsuiteButton
                    disabled={!state.title || !state.description}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSave}>
                     Save Changes
                    </RsuiteButton>
                <br/>
                <br/>
                    <Typography variant="h6">Overview of your Items Pictures</Typography>
                    <br/>
             <Grid container 
              spacing={1} 
             >
        {picturesstate.map((picture,index)=>(
                <Grid item  key={index}>
                <Card className={classes.root}>
                     <CardActionArea>
                     <CardMedia
                     className={classes.media}
                     image={picture}
                     title={"Picture " + index}/>
                     <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                    {"Picture " + (index+1) + " of your Item"}
                 </Typography>
                 </CardContent>
                 </CardActionArea>
                 <button  id={index}
                 onClick={handleDelete}>Delete</button>
                 </Card>
                 </Grid> 
            ))}
             <br/>
               <Modal show={modal.show} onHide={close} backdrop="static">
                <Modal.Header closeButton={false}>
                    <Modal.Title>Picture Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this picture?
                    {<img style={{ width: "360px", height: "360px",
                        display: "block",
                        borderRadius: "9px"}}
                        src={picturesstate[localStorage.getItem('PictureId')]} />}
                </Modal.Body>
                <Modal.Footer>
                <RsuiteButton
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={handleDeleteBackend}
                            >
                                Delete
                            </RsuiteButton>
                            <RsuiteButton
                                variant="outlined"
                                color="default"
                                onClick={close}
                            >
                                Cancel
                            </RsuiteButton>
                </Modal.Footer>
            </Modal>
            <Modal show={modal2.show} onHide={close2} backdrop="static">
                <Modal.Header closeButton={false}>
                    <Modal.Title>Set picture for your item (required)</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Uploader
                        action={`http://sopra-fs21-group-12-server.herokuapp.com/items/${16}/pictures/upload`}
                        draggable
                        onSuccess={close2}
                    >
                        <div style={dropzone}>Click or Drag files to this area to upload</div>
                    </Uploader>

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

            </Grid>
            </Panel>
            </Grid>
            </Grid>
            </div>
            
        
            )
} 
