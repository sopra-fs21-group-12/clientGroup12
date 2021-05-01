import React, {useEffect, useState} from "react";
import {useHistory, withRouter} from "react-router-dom";
import {api, handleError} from "../../helpers/api";
import Loader from "rsuite/es/Loader";
import Player from "../../views/Player";
import MatchedItemContainer from "./MatchedItemContainer";
import {Button, Grid} from "@material-ui/core";
import {Panel} from "rsuite";
import styled from "styled-components";


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
    const {id} = props.match.params
    const [matchedItems, setMatchedItems] = useState([]);
    const [itemData, setItemData] = useState();

    useEffect(async () => {
        try {

            const response = await api.get(/items/ + id)
            setItemData(response.data)

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }

    }, [])

    useEffect(async () => {
        try {
            //await new Promise(resolve => setTimeout(resolve, 2000));

            // get matches of item
            const response1 = await api.get(`/${id}/showmatches`)

            // extract id of matched items
            let arr = response1.data.map(id => id.itemIdTwo);


            for (const i in arr) {
                const response2 = await api.get(`/items/${arr[i]}/`)
                setMatchedItems(matchedItems => [...matchedItems, response2.data])
            }

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }

    }, [])


    return (
        <div>
            {!matchedItems ||!itemData ? (
                <Loader/>
            ) : (
                <Grid container justify="center" spacing={10}>
                    <Grid item xs={6}>
                        <Panel shaded>
                            <Label>Matches with your</Label>
                            <h3>{itemData.title}</h3>
                        </Panel>
                    </Grid>
                    <Grid item xs={8}>
                    {matchedItems.map(item => {
                        return (
                            <div key={item.id}>
                                <Grid item>
                                <MatchedItemContainer item={item}/>
                                </Grid>
                            </div>
                        );
                    })}
                    </Grid>
                </Grid>
            )}
        </div>
    );
}
export default withRouter(MyMatches);
