import React, {useCallback, useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {api} from "../../helpers/api";
import Loader from "rsuite/es/Loader";
import MatchedItemContainer from "./MatchedItemContainer";
import {Grid} from "@material-ui/core";
import {Panel} from "rsuite";
import styled from "styled-components";
import Picture from "../pictures/Picture";
import BackToInventory from "../RedirectButtons/BackToInventory";
import PictureSliderItem from "../pictures/PictureSilderItem";
import Navbar from "../Navbar/Navbar";

import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

import {GoogleMap, useJsApiLoader, Marker, InfoWindow} from "@react-google-maps/api";
require('dotenv').config();
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const containerStyle = {
    height: '400px'
};

const Label = styled.label`
  position: static;
  left: 14.95%;
  right: 75.81%;
  top: 27.34%;
  bottom: 60.16%;
  
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  /* identical to box height, or 133% */
  text-align: center;

  color: #000000;
`;

function MyMatches(props) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY,
    });

    const {id} = props.match.params
    const [itemData, setItemData] = useState();
    const [matchedItems, setMatchedItems] = useState();
    const [usersOfMatchedItem, setUsersOfMatchedItem] = useState();
    const [uniqueUsers, setUniqueUsers] = useState();
    const [map, setMap] = useState(null);
    const center = {lat: 47.36667, lng: 8.55}

    useEffect(async () => {
        try {
            // fetching item that has been clicked to show matches with
            const matchedItemsList = []
            const getOwnItem = await api.get(/items/ + id)
            setItemData(getOwnItem.data)

            const getMatchesOfItem = await api.get(`/${id}/showmatches`)


            // extract id of matched items
            let arr = getMatchesOfItem.data.map(id => id.itemIdTwo);
            for (const i in arr) {
                const response2 = await api.get(`/items/${arr[i]}/`)
                matchedItemsList.push(response2.data);
            }
            await setMatchedItems(matchedItemsList);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }, [])

    useEffect(async () => {
        if(matchedItems){
            let arr2 = matchedItems.map(id => id.userId);
            const usersList = []
            for (const i in arr2) {
                const response3 = await api.get(`users/${arr2[i]}`)
                usersList.push(response3.data)
            }
            setUsersOfMatchedItem(usersList);
        }

    }, [matchedItems])

    useEffect(async () => {
        if(usersOfMatchedItem){
            const uniqueUsersArr = [];
            let doNotAdd = false;
            for (const user of usersOfMatchedItem) {
                doNotAdd = false;
                for ( const uniqueUser of uniqueUsersArr) {
                    if (uniqueUser.id == user.id) {
                        doNotAdd = true;
                    }
                }
                uniqueUsersArr.forEach(uniqueUser => {
                    if (uniqueUser.id == user.id) {
                        doNotAdd = true;
                    }
                })
                if(!doNotAdd) {
                    uniqueUsersArr.push(user);
                }
            }
            setUniqueUsers(uniqueUsersArr);
            }
    }, [usersOfMatchedItem])

    const onLoad = useCallback(function callback(map) {
        setMap(map)
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, []);

    return isLoaded ?(
        <div>
            <Navbar/>
            <br/>
            <br/>
            {!matchedItems ||!itemData ? (
                <Loader/>
            ) : (
                <Grid container justify="center" spacing={10}>
                    <Grid item xs={5}>
                        <Panel shaded>
                        <Grid container justify="center" alignItems="center" spacing={4}>
                                <Grid item xs={4}>
                                    <PictureSliderItem id={itemData.id}/>
                                </Grid>
                                <Grid item xs={8}>
                                        <Label>Matches with your</Label>
                                        <h3>{itemData.title}</h3>
                                </Grid>
                        </Grid>
                        </Panel>
                    </Grid>
                    <Grid item xs={9}>
                        {!matchedItems.length ? (
                            <no-match>No Matches with this item</no-match>
                        ) : (
                            matchedItems.map(item => {
                                    return (
                                        <div key={item.id}>
                                            <Grid item>
                                                <MatchedItemContainer item={item} chatId={id}/>
                                            </Grid>
                                        </div>
                                    );
                                })
                        )}
                        <br/>
                        <Panel shaded
                               collapsible
                               header={<h4>Locations on Map</h4>}>
                            {uniqueUsers && <GoogleMap
                                center={center}
                                mapContainerStyle={containerStyle}
                                zoom={6}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                            >
                                {
                                    uniqueUsers && uniqueUsers.map(user => {
                                        return (
                                            <div>
                                                <InfoWindow
                                                    key={user.name}
                                                    position={{lat: user.latitude, lng: user.longitude}}
                                                >
                                                    <div>
                                                        <h6>{user.username}</h6>
                                                    </div>
                                                </InfoWindow>
                                            </div>
                                        )
                                    })
                                }
                            </GoogleMap>}
                        </Panel>
                    </Grid>
                </Grid>
            )}
        </div>
    ): <></>;
}
export default withRouter(MyMatches);
