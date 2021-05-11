import axios from 'axios';
import React, {useState,useEffect,useCallback} from 'react';

import { withRouter } from 'react-router-dom';
import {useDropzone} from 'react-dropzone';
import ReactSlidy from 'react-slidy';
import 'react-slidy/lib/styles.css';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Paper, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ItemEdit from "./components/item/ItemEdit";
import RegistrationMap from "./components/map/RegistrationMap";
import {SearchControl} from "leaflet-geosearch";
/*


// Will return all Items from our backend -> Functional component
  const Items = () => {

    const [userItems,setUserItems] = useState([]);

    const fetchAllItemsFromUser = () => {
      axios.get("http://sopra-fs21-group-12-server.herokuapp.com/users/1/items").then(res=> {
        setUserItems(res.data);
      });

    }
    // Executes fetch all items and maps the elements
    useEffect(()=> {
      fetchAllItemsFromUser();
    }, [])
    return userItems.map((item,index)=>{
      return(
        <div key = {index}>
          <br/>
          <ItemImages {...item}/>
          <br/>
          <MyDropzone {...item}/>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <br/>
        </div>
      )
    })
  }


  // We will implement DropZone to send files to our Server!
function MyDropzone({id}) {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    // Send the file in the correct format to our backend
    const formData = new FormData();
    formData.append("file",file);
    axios.post(`http://sopra-fs21-group-12-server.herokuapp.com/items/${id}/pictures/upload`,formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(()=>{alert("Upload successfull")}).catch(err => {alert("Something went wrong during the Upload!")});
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the image here ...</p> :
          <p>Drag 'n' drop the item image here</p>
      }
    </div>
  )
}

// Fetching all images
const ItemImages = ({id}) => {

  const [itemImages,setItemImages] = useState([]);
  const fetchPicturesFromAws = () => {
    axios.get(`http://sopra-fs21-group-12-server.herokuapp.com/items/${id}/pictures/download`).then(res=> {
      setItemImages(res.data);
      console.log(res.data)
    });
  }
  useEffect(()=> {
    fetchPicturesFromAws();
  }, [])
  return(
    <Grid container justify="center">
      <Grid item xs={3}>
      <ReactSlidy itemImages>
  <img src={itemImages[1]} />
  <img src={itemImages[3]}/>
  <img src={itemImages[5]}/>
  <img src={itemImages[7]}/>
  <img src={itemImages[9]}/>
</ReactSlidy>
<Grid item xs={9}/>
</Grid>
    </Grid>



  )
}
*/


function TestPage(){
  return (
    <RegistrationMap>

    </RegistrationMap>
  )
}


export default withRouter(TestPage);
