import React, {useCallback, useEffect, useState} from 'react';
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
    const [loading, setLoading] = useState(false)
    const [sizeItems, setSizeItems] = useState(null)
    const [index, setIndex] = useState(1)
    const [items, setItems] = useState({})
    const [currItem, setCurrItem] = useState({
        id: "",
        userId: "",
        description: "",
        title: "",
        tagsItem: "",
    })

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
            setLoading(true)
            setIndex(1)
            //await new Promise(resolve => setTimeout(resolve, 2000));
            //@GetMapping("/items/{itemId}/proposal")
            const response = await api.get(`/items/${id}/proposal`)
            setItems(response.data)
            setCurrItem(response.data[0])
            setSizeItems(response.data.length)
            setLoading(false)

        } catch (error) {
            alert(`Something went wrong while fetching the items: \n${handleError(error)}`);
        }

    }

    const increment = useCallback(() =>{
        setIndex(i => i+1)
    },[])

    async function like(like){
        try {
            setLoading(true)
            const requestBody = JSON.stringify({
                "itemIDSwiper": userItem.id,                      
                "itemIDSwiped": currItem.id,
                "liked": like
            })
            await api.post('/likes', requestBody);
            setIndex(index+1)
            setCurrItem(items[index])
            setLoading(false)
            if(index == items.length) {
                fetch();
            }
        }catch (error){
            alert(`Something went wrong during the like request: \n${handleError(error)}`);
        }
    }

    return (
<div>
        {!userItem || !currItem ? (
            !currItem? (
                <Grid container justify="center" alignItems="center" spacing={5}>
                    <Grid item xs={12}/>
                    <Grid item xs={3}>
                        <h1>No items to swipe on left</h1>
                    </Grid>
                    <BackToInventory/>
                </Grid>
                ) :
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
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Panel shaded>
                            <Paper className={classes.swipe} elevation={0}>
                                {loading ? loader :
                                        <Grid container alignItems="center" justify="center" spacing={4}>
                                            <Grid item xs={12}>
                                                <PictureForSwipe itemId={currItem.id}/>
                                            </Grid>
                                            <Grid>
                                                <Button onClick={() => like(false)}> dislike</Button>
                                                <Button onClick={() => like(true)}> like</Button>
                                            </Grid>

                                        </Grid>
                                }
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