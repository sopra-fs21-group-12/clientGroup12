import React, {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import { withRouter } from 'react-router-dom';

import {Chip, Grid, Paper, Typography,} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Button, ButtonToolbar, Panel} from 'rsuite';
import MatchedItemContainer from "../matches/MatchedItemContainer";
import {api, handleError} from "../../helpers/api";
import Loader from "rsuite/es/Loader";
import UserItemContainer from "./UserItemContainer";
import PictureForSwipe from "../pictures/PictureForSwipe";
import BackToInventory from "../RedirectButtons/BackToInventory";
import TinderCard from "react-tinder-card";
import PictureSliderSwiping from "../pictures/PictureSliderSwiping";

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

    textLeft:{
        textAlign: 'center',
    },
    textRight:{
        textAlign: 'center',
    },
    tag: {
        margin: theme.spacing(0.4),
    },
}));

function SwipePage(props) {
    const {id} = props.match.params
    const classes = useStyles();
    const [userItem, setUserItem] = useState();
    const [indexCounter, setIndexCounter] = useState(0); 

    const [index, setIndex] = useState(5)
    const indexRef = useRef();
    indexRef.current = index;

    const [items, setItems] = useState([])
    const itemsRef = useRef();
    itemsRef.current = items;

    const [currItem, setCurrItem] = useState();
    const [noItems, setNoItems] = useState(false);

    // fetch itemData
    useEffect(() => {
        async function fetchItemData(){
            try {
                //await new Promise(resolve => setTimeout(resolve, 2000));

                // get matches of item
                const response = await api.get(`/items/${id}`)
                setUserItem(response.data);
                setIndexCounter(0);

            } catch (error) {
                alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
            }
        }
        fetchItemData()
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
            let swipeTag = sessionStorage.getItem("swipeTag")
            console.log("fetching data")
            console.log(swipeTag)
            let response;
            console.log(swipeTag === "undefined")

            if(swipeTag === "undefined"){
                console.log("no Tag")
                response = await api.get(`/items/${id}/proposal`);
            }else{
                console.log("with Tag")
                response = await api.get(`/items/${id}/proposal/${swipeTag}`)
            }

            setItems(response.data)
            if(response.data.length === 0){
                setNoItems(true)
            }
            setCurrItem(itemsRef.current[itemsRef.current.length-1])
            setIndex([itemsRef.current.length-1])

        } catch (error) {
            alert(`Something went wrong while fetching the items: \n${handleError(error)}`);
        }

    }


    async function like(dir, itemId){
        try {
            if(!dir.localeCompare("down") || !dir.localeCompare("up")){
                console.log("nope")
            }else{
                let like = false
                if(!dir.localeCompare("right")){
                    like = true;
                }

                const requestBody = JSON.stringify({
                "itemIDSwiper": id,
                "itemIDSwiped": itemId,
                "liked": like
                })

                await api.post('/likes', requestBody);


                console.log('removing: ' + itemId + " with direction: " + like)
                setIndex(indexRef.current - 1)
                console.log("newindex " + indexRef.current)
                setCurrItem(items[indexRef.current])
                console.log("itemsleft:" + (itemsRef.current.length - 1 + " vs " + indexRef.current))
                if(indexRef.current === -1) {
                    console.log("will fetch data")
                    fetch();
                }
            }
        }catch (error){
            alert(`Something went wrong during the like request: \n${handleError(error)}`);
        }
    }

    const buttonLike = (likes) =>{
        if(likes){
            like("right", currItem.id);
        } else {
            like("left", currItem.id);
        }
    }

    return (
        <div>
            {noItems ? (
                <Grid container justify="center" alignItems="center" spacing={5}>
                    <Grid item xs={12}/>
                    <Grid item xs={6}>
                        <h1>No items to swipe on left</h1>
                    </Grid>
                    <BackToInventory/>
                </Grid>

            ) : (
                <Grid container justify="center" spacing={4}>
                    <Grid item xs={12}/>
                    <Grid item xs={12}/>
      
                    <Grid item xs={4}>
                        <Panel shaded>
                            <Paper className={classes.description} elevation={0}>
                                {!currItem ? (
                                    <Loader/>
                                ):(
                                    <Grid container spacing={3}>
                                        <Grid item xs={3}>
                                            <Button appearance="subtle">Report item</Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h2>{currItem.title}</h2>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h5>{currItem.description}</h5>
                                        </Grid>
                                        <Grid item xs={12}/>
                                        {currItem.tagsItem.map(tag => {
                                          return(
                                            <div key={tag}>
                                              <Chip className={classes.tag} label={tag} variant="outlined"/>
                                            </div>
                                        )})}
                                    </Grid>
                                )}
                            </Paper>
                        </Panel>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid container spacing={4} justify="center">
                            <Grid item xs={12}>
                                <Panel shaded>
                                    <Paper className={classes.swipe} elevation={0}>
                                            {!currItem ? (
                                                <Loader/>
                                            ):(
                                                <Grid container spacing={4} justify="center" alignItems="center">
                                                    <Grid item xs={12}/>
                                                    <Grid item xs={2}>
                                                        <h5 onClick={()=>buttonLike(false)} className={classes.textLeft}>Swipe Left for NOPE ❌</h5>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <div className='cardContainer'>
                                                            {items.map((item, index) =>
                                                                <TinderCard onCardLeftScreen={() =>console.log(item.id)}  className='swipe' preventSwipe={["up","down"]} key={item.id} onSwipe={(dir) => like(dir, item.id)}>
                                                                    <div onKeyPress={(event) => {console.log(item.id)}} className='card'>
                                                                        <PictureSliderSwiping id={item.id}/>
                                                                    </div>
                                                                </TinderCard>
                                                            )}
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <h5 className={classes.textRight} onClick={()=>buttonLike(true)}>
                                                            Swipe Right for SWAP ✅
                                                        </h5>
                                                    </Grid>
                                                </Grid>
                                            )}
                                    </Paper>
                                </Panel>
                            </Grid>

                            <Grid item xs={12}>
                                {!userItem ? (
                                    <Loader/>
                                    
                                ):(
                                    <UserItemContainer item={userItem}/>
                                )}
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

export default withRouter(SwipePage);