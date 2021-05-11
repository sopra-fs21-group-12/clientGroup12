import React, {useCallback, useEffect, useRef, useState} from 'react';
import { withRouter } from 'react-router-dom';

import {Grid, Paper, Typography,} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Button, ButtonToolbar, Panel} from 'rsuite';
import MatchedItemContainer from "../matches/MatchedItemContainer";
import {api, handleError} from "../../helpers/api";
import Loader from "rsuite/es/Loader";
import PictureForSwipe from "../pictures/PictureForSwipe";
import BackToInventory from "../RedirectButtons/BackToInventory";
import TinderCard from "react-tinder-card";
import UserItemContainer from "../game/UserItemContainer";
import "./swipe.css";

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


function SwipePanel() {
    const id = 578
    //const {id} = props.match.params
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
                <div>
                    <div className='cardContainer'>
                        {items.map((item, index) =>
                            <TinderCard className='swipe' key={item.id} onSwipe={(dir) => like(dir, item.title)}>
                                <div className='card'>
                                    <PictureForSwipe itemId={item.id}/>
                                </div>
                            </TinderCard>
                        )}
                    </div>
                    <UserItemContainer item={userItem}/>
                </div>
            )}
        </div>
    );

}

export default SwipePanel;