import React, {useState, useMemo, useEffect, useCallback, useRef} from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'
import "./swipe.css";
import {api, handleError} from "../../helpers/api";
import Loader from "rsuite/es/Loader";
import PictureForSwipe from "../pictures/PictureForSwipe";

const db = [
    {
        name: 'Richard Hendricks',
        url: './img/richard.jpg'
    },
    {
        name: 'Erlich Bachman',
        url: './img/erlich.jpg'
    },
    {
        name: 'Monica Hall',
        url: './img/monica.jpg'
    },
    {
        name: 'Jared Dunn',
        url: './img/jared.jpg'
    },
    {
        name: 'Dinesh Chugtai',
        url: './img/dinesh.jpg'
    }
]

const alreadyRemoved = []
let charactersState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

function SwipePanel () {
    const [lastDirection, setLastDirection] = useState()

    const [index, setIndex] = useState(1);
    const [items, setItems] = useState([]);
    const indexRef = useRef();
    indexRef.current = index;

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
            //@GetMapping("/items/{itemId}/proposal")
            const response = await api.get(`/items/266/proposal`)
            setItems(response.data)
            console.log("test")

        } catch (error) {
            alert(`Something went wrong while fetching the items: \n${handleError(error)}`);
        }

    }

    /*
    const swiped = (direction, idToDelete) => {
        console.log('removing: ' + idToDelete)
        setLastDirection(direction)
        alreadyRemoved.push(idToDelete)
    }

    const outOfFrame = (id) => {
        console.log(id + ' left the screen!')
        charactersState = charactersState.filter(character => character.id !== id)
        setCharacters(charactersState)
    }*/


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
            setIndex(indexRef.current + 1)
            console.log("newindex " + indexRef.current)
            console.log("itemsleft:" + (items.length - index))
            if(index === 6) {
                console.log("test like")
                fetch();
            }

        }catch (error){
            alert(`Something went wrong during the like request: \n${handleError(error)}`);
        }
    }

    const test = () =>{
        console.log(index);
    }

    return (
        <div>
            {!items ? (
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
                </div>
            )}
            <button onClick={()=>{test()}}>index</button>
        </div>
    )
}

export default SwipePanel