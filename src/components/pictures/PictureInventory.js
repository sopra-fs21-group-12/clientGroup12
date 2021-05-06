import {useEffect,useState, React} from "react";
import {withRouter} from "react-router";
import axios from "axios";
// Styling imports:
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField } from '@material-ui/core'
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




// Overview Page to upload new pictures and see + Delete other pictures
export default function PictureInventory() {
    const classes = useStyles();
    // Keeps the URL of all pictures
    const [picturesstate, setpictures] = useState([]);

    // Similar to whenComponent Mounts will get us all the different pictures, per ID
    useEffect(() => {
        axios
          .get(`http://sopra-fs21-group-12-server.herokuapp.com/items/100/pictures/download`)
          .then(response => setpictures(response.data.map((picture)=>picture.url)));
      }, []);




    return (

        <Grid container justify="center" spacing={1}>
             <Grid item xs={12}/>
            <Grid item xs={12}/>
            <Grid item xs={6}>
            <Panel shaded>
             <Typography variant="h5">Overview of all Pictures</Typography>

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
                     key = {index}
                     title={"Picture " + index}/>
                     <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                    {"Picture " + (index+1) + " of your Item"}
                 </Typography>
                 </CardContent>
                 </CardActionArea>
                 </Card>
                 </Grid> 
            ))}
            </Grid>
            </Panel>
            </Grid>
            </Grid>
            
        
            )
} 
