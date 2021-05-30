import {useEffect,useState, React} from "react";
import {useParams} from "react-router";
import { api, handleError } from '../../helpers/api';
import { useHistory } from "react-router-dom";
import {TextField, Button, makeStyles} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';



import axios from "axios";
// Styling imports:
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core'
import { Modal, Panel, Uploader, Notification} from 'rsuite'
import Navbar from "../Navbar/Navbar";


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
    delete: {
        margin: theme.spacing(1),
        background: "#EB5757",
    },
    cancel:{
        margin: theme.spacing(1),
    }
  }));

  const dropzone = {
    lineHeight: '200px'
};

// Overview Page to upload new pictures and see + Delete other pictures
export default function EditItemPictures() {
    const {id} = useParams(); 
    const classes = useStyles();
    // Keeps the URL of all pictures
    const history = useHistory();
    const [picturesstate, setpictures] = useState([]);
    const [pictureNames,setpicturesNames] = useState([]);
    const [deletionId,setDeletionId] = useState(0);
    const [itemData, setItemData] = useState([]);
    const [modal, setModal] = useState({show: false});
    const [modal2, setModal2] = useState({show: false});
    const [modalDelete, setModalDelete] = useState({show: false});
    const [stateTitle, setStateTitle] = useState();
    const [stateDescription, setStateDescription] = useState();
    


// Sends the information to the Backend, when data has been saved
    async function handleSave() {
        try {
            console.log(stateTitle.title);
            console.log(stateDescription.description)
            // What we send back to the backend          
            const requestBody = JSON.stringify({
                title: stateTitle,
                description: stateDescription,
            });
            await api.put(`/items/${id}`, requestBody);
            ///window.location.reload(false);
            changesSaved("bottomEnd");
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

    // Get the information from the backend (Description and Item Title)
    // fetch item data
    useEffect(async () => {
        try {

            const response = await api.get(`/items/${id}`)
            setItemData(response.data)
            setStateTitle(response.data.title)
            setStateDescription(response.data.description);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }

    }, [])


    // Similar to whenComponent Mounts will get us all the different pictures, per ID
    useEffect(() => {
        axios
          .get(`http://sopra-fs21-group-12-server.herokuapp.com/items/${id}/pictures/download`)
          .then(response => setpictures(response.data.map((picture)=>picture.url))&(setpicturesNames(response.data.map((picture)=>picture.name))));
      }, []);


      const handleChangeTitle = (e) => {
        setStateTitle(e.target.value)
    }

    const handleChangeDescription = (e) => {
        setStateDescription(e.target.value)
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
        history.push(`/edit/${id}`)
    }
     
    function close(e){
        setModal({show: false});
        history.push(`/edit/${id}`)
    }

    function open() {
        setModal2({show: true});
    }
    function close2(e){
        setModal2({show: false});
        window.location.reload(false);
        history.push(`/edit/${id}`)
    }

    function closeDelete() {
        setModalDelete({show: false});
        //history.push('/inventory')
    }

    function openAlert(placement) {
        Notification['success']({
            title: 'Item deleted successfully',
            placement,
        });
    }

    function changesSaved(placement) {
        Notification['success']({
            title: 'Changes saved',
            placement,
        });
    }

    function cancel(){
          history.push("/inventory")
    }

    async function handleDeleteItem() {
        try {
            await api.delete(`/items/${id}`);
            history.push('/inventory')
            openAlert('bottomEnd')


        } catch (error) {
            alert(`Something went wrong during picture deletion: \n${handleError(error)}`);
        }
    }

    function openDelete() {
        setModalDelete({show: true});
    }

    return (
        <Grid justify="center" spacing={0}>
            <Navbar/>
        <Grid container justify="center" spacing={3}>
            <Panel shaded>
                <Typography variant="h6">Change your Items title, description or upload new pictures</Typography>

                <br/>
                <InputLabel><h6>Item Title:</h6></InputLabel>
                <TextField
                    defaultValue={itemData.title}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    rowsMax={1}
                    name="title"
                    id="title"
                    onChange={handleChangeTitle}
                />
                <br/>
                <br/>
                <InputLabel><h6>Item Description:</h6></InputLabel>

                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="description"
                    id="description"
                    defaultValue={itemData.description}
                    rows={4}
                    multiline
                    onChange={handleChangeDescription}
                />


                <br/>
                <br/>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSave}>
                    Save Changes
                </Button>
                <Button
                    className={classes.cancel}
                    variant="contained"
                    color="default"
                    onClick={cancel}>
                    Cancel
                </Button>
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
                                objectFit: "cover",
                                borderRadius: "9px"}}
                                  src={picturesstate[localStorage.getItem('PictureId')]} />}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={classes.delete}
                                variant="contained"
                                color="secondary"
                                onClick={handleDeleteBackend}
                            >
                                Delete
                            </Button>
                            <Button
                                className={classes.cancel}
                                variant="contained"
                                color="default"
                                onClick={close}
                            >
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={modal2.show} onHide={close2} backdrop="static">
                        <Modal.Header closeButton={false}>
                            <Modal.Title>Set picture for your item (required)</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Uploader
                                action={`http://sopra-fs21-group-12-server.herokuapp.com/items/${id}/pictures/upload`}
                                draggable
                                onSuccess={close2}
                            >
                                <div style={dropzone}>Click or Drag files to this area to upload
                                </div>
                            </Uploader>
                            <Button onClick={close2}>Cancel</Button>

                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>

                </Grid>
                <br/>
                <Grid container justify="space-between">
                    <Grid item>
                        <Button
                            type="open"
                            variant="contained"
                            color="primary"
                            onClick={open}>
                            Upload More Pictures
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            onClick={openDelete}
                        >
                            Delete Item
                        </Button>
                    </Grid>
                </Grid>

                <Modal show={modalDelete.show} onHide={closeDelete} backdrop="static">
                    <Modal.Header closeButton={false}>
                        <Modal.Title>Delete Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete this item?</p>
                        <p>This action cannot be reversed!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className={classes.delete}
                            onClick={handleDeleteItem}
                            variant="contained"
                            color="secondary"
                        >
                            Delete Item
                        </Button>
                        <Button
                            onClick={closeDelete}
                            variant="contained"
                            color="default"
                        >
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Panel>
        </Grid>
        </Grid>
    )
} 
