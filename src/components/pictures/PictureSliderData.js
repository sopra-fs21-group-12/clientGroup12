import { useState,useEffect } from "react";
import { withRouter } from "react-router";
import { api, handleError } from '../../helpers/api';
import ReactSlidy from 'react-slidy';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";




export default function PictureSliderData(props){

    const [slides, setSlides] = useState([0]);
    

    // This function firstly does a GET Request to the backend and grabs all the pictures under

    useEffect(() => {
        axios
          .get(`http://sopra-fs21-group-12-server.herokuapp.com/items/${props.id}/pictures/download`)
          .then(response => setSlides(response.data.map((picture)=>picture.url)));
      }, []);

    const slidesToRender = slides.map((image, index) => (
      <img src={image} key={index} num={index} />
    ))
    
    return (
      <Container>
        <Grid xs={12} sm={8} md={4} > 
          <Paper> 
          <ReactSlidy>{slidesToRender}</ReactSlidy>
          </Paper>
        </Grid>
       </Container>   
      )

}
