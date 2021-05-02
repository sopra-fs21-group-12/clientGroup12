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
            console.log(response.data)

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

    async function like(){
        try {
            const requestBody = JSON.stringify({
                "itemIDSwiper": userItem.id,                      //localStorage.getItem("id"),
                "itemIDSwiped": currItem.id,
                "liked": true
            })
            await api.post('/likes', requestBody);
            setIndex(index+1)
            setCurrItem(items[index])
        }catch (error){
            alert(`Something went wrong during the like request: \n${handleError(error)}`);
        }
    }

    async function dislike(){
        try {
            const requestBody = JSON.stringify({
                "itemIDSwiper": userItem.id,                      //localStorage.getItem("id"),
                "itemIDSwiped": currItem.id,
                "liked": false
            })
            await api.post('/likes', requestBody);
            setIndex(index+1)
            setCurrItem(items[index])
        }catch (error){
            alert(`Something went wrong during the like request: \n${handleError(error)}`);
        }

    }


    return (
        <div>
            {!userItem ? (
                <Loader/>
            ) : (
                <Grid container justify="center" spacing={4}>
                    <Grid item xs={12}/>
                    <Grid item xs={12}/>
                    {currItem ? 
                        <>
                            <Grid item xs={4}>
                            <Panel shaded>
                                <Paper className={classes.description} elevation={0}>
                                    <h2>
                                        {currItem.title}
                                    </h2>
                                    <h5>
                                        {currItem.description}
                                    </h5>
                                </Paper>
                            </Panel>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Panel shaded>
                                        <Paper className={classes.swipe} elevation={0}>
                                            {loading ? loader :
                                                index <= sizeItems ?
                                                    <Grid container alignItems="center" justify="center" spacing={4}>
                                                        <Grid item xs={12}>
                                                            <PictureForSwipe key={currItem.id}/>
                                                        </Grid>
                                                        <Grid>
                                                            <Button onClick={dislike}> dislike</Button>
                                                            <Button onClick={like}> like</Button>
                                                        </Grid>

                                                    </Grid>
                                                    : <Button onClick={() => fetch()}>Load more</Button>
                                            }
                                        </Paper>
                                    </Panel>
                                </Grid>
                                <Grid item xs={12}>
                                    <UserItemContainer item={userItem}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                    : 
                    <div>no items for you to swipe</div>}
                </Grid>
            )}
        </div>
    );

}

export default withRouter(SwipePage);