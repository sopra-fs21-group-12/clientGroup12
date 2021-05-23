import { useState,useEffect } from "react";
import { withRouter } from "react-router";
import { api, handleError } from '../../helpers/api';
import ReactSlidy from 'react-slidy';
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";




export default function PictureSliderItem(props){

    const [slides, setSlides] = useState([0]);


    // This function firstly does a GET Request to the backend and grabs all the pictures under

    useEffect(() => {
        axios
            .get(`http://sopra-fs21-group-12-server.herokuapp.com/items/${props.id}/pictures/download`)
            .then(response => setSlides(response.data.map((picture)=>picture.url)));
    }, []);

    const slidesToRender = slides.map((image, index) => (
        <img style={{width: "96px", height: "96px", objectFit:"cover", borderRadius: "9px"}} src={image} key={index} num={index} />
    ))

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item xs={12}>
                <ReactSlidy>{slidesToRender}</ReactSlidy>
            </Grid>
        </Grid>
    )

}
