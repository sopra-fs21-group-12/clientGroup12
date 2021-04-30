import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';

import { Grid, Paper,} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Panel } from 'rsuite';
import SwipingGame from "./SwipingGame";
import MatchedItemContainer from "../matches/MatchedItemContainer";
import {api, handleError} from "../../helpers/api";
import Loader from "rsuite/es/Loader";
import UserItemContainer from "./UserItemContainer";

const useStyles = makeStyles((theme) => ({
    description: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 50,
        padding: 20,
        height: "40em"
    },
    swipe: {
        height: "30em"
    },
    userItem:{
        height: "10em"
    },
}));

function SwipePage(props) {
    const {id} = props.match.params
    const classes = useStyles();
    const [userItem, setUserItem] = useState();

    useEffect(async () => {
        try {
            //await new Promise(resolve => setTimeout(resolve, 2000));
            // get matches of item
            const response = await api.get(`/items/${id}`)
            setUserItem(response.data);
            console.log(response.data)

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }

    }, [])

    return (
<div>
        {!userItem ? (
        <Loader/>
    ) : (
        <Grid container justify="center" spacing={4}>
            <Grid item xs={12}/>
            <Grid item xs={12}/>

            <Grid item xs={4}>
                <Panel shaded>
                    <Paper className={classes.description} elevation={0}>
                        <h2>
                            Title of Item
                        </h2>
                    </Paper>
                </Panel>
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Panel shaded>
                            <Paper className={classes.swipe} elevation={0}>
                            </Paper>
                        </Panel>
                    </Grid>
                    <Grid item xs={12}>
                        <UserItemContainer item={userItem}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )}
</div>
    );

}

export default withRouter(SwipePage);