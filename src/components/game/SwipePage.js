import React, {useCallback, useEffect, useRef, useState} from 'react';
import { withRouter } from 'react-router-dom';

import {Grid, Paper, Typography,} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Button, ButtonToolbar, Panel} from 'rsuite';
import MatchedItemContainer from "../matches/MatchedItemContainer";
import {api, handleError} from "../../helpers/api";
import Loader from "rsuite/es/Loader";
import UserItemContainer from "./UserItemContainer";
import PictureForSwipe from "../pictures/PictureForSwipe";
import BackToInventory from "../RedirectButtons/BackToInventory";
import TinderCard from "react-tinder-card";

const useStyles = makeStyles((theme) => ({
    description: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 0,
        padding: 20,
        height: "40em"
    },
    swipe: {
        height: "29em"
    },
    userItem:{
        height: "10em"
    },
}));


const loader = (
    <div>
        <Loader size="md" backdrop content="loading..." vertical />
    </div>);



function SwipePage(props) {
    const {id} = props.match.params
    const classes = useStyles();
    const [userItem, setUserItem] = useState();

    const [index, setIndex] = useState(5)
    const indexRef = useRef();
    indexRef.current = index;

    const [items, setItems] = useState([])
    const itemsRef = useRef();
    itemsRef.current = items;

    const [currItem, setCurrItem] = useState()

    // fetch itemData
    useEffect(async () => {
        try {
            //await new Promise(resolve => setTimeout(resolve, 2000));

            // get matches of item
            const response = await api.get(`/items/${id}`)
            setUserItem(response.data);

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }

    }, [])


    // fetch proposal
    useEffect(() => {
        try {
            fetch()

        } catch (error) {
            alert(`Something went wrong while fetching the items: \n${handleError(error)}`);
        }

    }, [])

    async function fetch() {
        try {
            console.log("fetching data")
            const response = await api.get(`/items/${id}/proposal`)
            setItems(response.data)
            console.log(itemsRef.current[itemsRef.current.length-1])
            console.log(itemsRef.current.length-1)
            setCurrItem(itemsRef.current[itemsRef.current.length-1])
            setIndex([itemsRef.current.length-1])

        } catch (error) {
            alert(`Something went wrong while fetching the items: \n${handleError(error)}`);
        }

    }


    async function like(like, itemTitle){
        try {
            /*
            setLoading(true)
            const requestBody = JSON.stringify({
                "itemIDSwiper": userItem.id,
                "itemIDSwiped": currItem.id,
                "liked": like
            })
            await api.post('/likes', requestBody);
             */
            console.log('removing: ' + itemTitle + " with direction: " + like)
            setIndex(indexRef.current - 1)
            console.log("newindex " + indexRef.current)
            setCurrItem(items[indexRef.current])
            console.log("itemsleft:" + (itemsRef.current.length - 1 + " vs " + indexRef.current))
            if(indexRef.current === -1) {
                console.log("will fetch data")
                fetch();
            }
        }catch (error){
            alert(`Something went wrong during the like request: \n${handleError(error)}`);
        }
    }

    return (
<div>
        {!userItem || !currItem ? (
                <Loader/>
    ) : (
        <Grid container justify="center" spacing={4}>
            <Grid item xs={12}/>
            <Grid item xs={12}/>

            <Grid item xs={4}>
                <Panel shaded>
                    <Paper className={classes.description} elevation={0}>
                        <Grid container justify="left" spacing={3}>
                            <Grid item xs={9}/>
                            <Grid item xs={2}>
                                <Button
                                    appearance="subtle"
                                >
                                    Report item
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <h2>
                                    {currItem.title}
                                </h2>
                            </Grid>
                            <Grid item xs={12}>
                                <h5>
                                    {currItem.description}
                                </h5>
                            </Grid>
                        </Grid>
                    </Paper>
                </Panel>
            </Grid>

            <Grid item xs={6}>
                <Grid container spacing={4} justify="space-between">
                    <Grid item xs={12}>
                        <Panel shaded>
                            <Paper className={classes.swipe} elevation={0}>

                                <Grid container spacing={4} justify="center" alignItems="center">
                                    <Grid item xs={6}>
                                        <div className='cardContainer'>
                                            {items.map((item, index) =>
                                                <TinderCard className='swipe' key={item.id} onSwipe={(dir) => like(dir, item.title)}>
                                                    <div className='card'>
                                                        <PictureForSwipe itemId={item.id}/>
                                                    </div>
                                                </TinderCard>
                                            )}
                                        </div>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={4} justify="flex-end" alignItems="center">
                                    <Grid item xs={6}>
                                        left
                                    </Grid>
                                    <Grid item xs={6}>
                                        right
                                    </Grid>
                                </Grid>

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