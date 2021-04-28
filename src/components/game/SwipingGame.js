import { withRouter } from 'react-router-dom';
import React, {useCallback, useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";
import Loader from "rsuite/es/Loader";
import Edit from "../profilepage/Edit";
import {Typography} from "@material-ui/core";
import User from "../shared/models/User";
import FadePanel from "./FadePanel"
import {Button, ButtonToolbar} from "rsuite";

const loader = (
    <div>
        <Loader size="md" backdrop content="loading..." vertical />
    </div>);

function SwipingGame(){
    const [loading, setLoading] = useState(false)
    const [counter, setCounter] = useState(null)
    const [index, setIndex] = useState(1)
    const [ownItem, setOwnItem] = useState()
    const [items, setItems] = useState({})
    const [currItem, setCurrItem] = useState({
        id: "",
        userId: "",
        description: "",
        title: "",
        tagsItem: "",
    })
    useEffect(async () => {
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
            const response = await api.get("/items/2/proposal")
            setItems(response.data)
            setCurrItem(response.data[0])
            setCounter(response.data.length)
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
                "itemIDSwiper": 2,                      //localStorage.getItem("id"),
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
                "itemIDSwiper": 2,                      //localStorage.getItem("id"),
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
            <Typography component="h1" variant="h5">
                {loading ? loader :
                    index <= counter ?
                        <div>

                            <h1>{currItem.title}</h1>
                            <h3>{currItem.description}</h3>
                            <h5>ItemId: {currItem.id}</h5>
                            <h5>UserId: {currItem.userId}</h5>

                            <ButtonToolbar>
                                <Button onClick={dislike}> dislike</Button>
                                <Button onClick={like}> like</Button>
                            </ButtonToolbar>

                        </div>
                        : <Button onClick={() => fetch()}>Load more</Button>
                }
            </Typography>
        </div>
    );

}
export default withRouter(SwipingGame);