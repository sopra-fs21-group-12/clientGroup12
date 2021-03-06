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
export default function Picture(props){

    const [pictureData,setPictureData] = useState([]);
    // This function firstly does a GET Request to the backend and grabs all the pictures under
    // the ID.
    useEffect(async () => {
        try {
            // Replace `/items/${props.id}/pictures/download  "http://sopra-fs21-group-12-server.herokuapp.com/items/15/pictures/download" to check out
            // the functionality

            const response = await api.get( `/items/${props.itemId}/pictures/download`)
            setPictureData(response.data[0])

        } catch (error) {
            console.error(`Something went wrong while fetching the pictures: \n${handleError(error)}`);
        }

    }, [])


/*
        <div>
            <img src={pictureData.url} alt=""/>
        </div>
        <Box column={6} paddingX={2}>
  <Image
    alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
    color="rgb(231, 186, 176)"
    naturalHeight={496}
    naturalWidth={496}
    src="https://i.ibb.co/FY2MKr5/stock6.jpg"
    loading="lazy"
  />
</Box>
 */
    const classes = useStyles();
    return(
                    <img style={{
                        width: "96px", height: "96px",
                        borderRadius: "9px",
                        objectFit: "cover",
                        backgroundColor: "#dbdcdb"
                    }}
                         src={pictureData?.url} alt=""/>
    );
}