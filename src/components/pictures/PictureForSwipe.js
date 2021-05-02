import { withRouter } from "react-router";
import { React, useState,useEffect} from 'react';
import { api, handleError } from '../../helpers/api';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Paper, Card, CardContent,CircularProgress } from '@material-ui/core';
import { Image } from 'gestalt';
import {Panel} from "rsuite";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    image: {
        width: 1,
        height: 96
    },
}));


// You need to hand the id as props, otherwise it will not work!
export default function PictureForSwipe(props){

    const [pictureData,setPictureData] = useState([]);
    // This function firstly does a GET Request to the backend and grabs all the pictures under
    // the ID.
    useEffect(async () => {
        try {
            // Replace `/items/${props.id}/pictures/download  "http://sopra-fs21-group-12-server.herokuapp.com/items/15/pictures/download" to check out
            // the functionality

            const response = await api.get( `/items/${props.id}/pictures/download`)
            setPictureData(response.data[0])
            console.log(pictureData.url)

        } catch (error) {
            alert(`Something went wrong while fetching the pictures: \n${handleError(error)}`);
        }

    }, [])


    /*
            <div>
                <img src={pictureData.url} alt=""/>
            </div>
     */
    const classes = useStyles();
    return(
        <img style={{
            width: "300px", height: "300px",
            display: "block",
            borderRadius: "9px"
        }}
             src={pictureData.url} alt=""/>
    );
}