import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {api, handleError} from "../../helpers/api";
import Loader from "rsuite/es/Loader";
import Player from "../../views/Player";

function MyMatches(props) {
    const {id} = props.match.params
    const [matchedItems, setMatchedItems] = useState([]);

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
            {!matchedItems ? (
                <Loader/>
            ) : (
                <div>
                    {matchedItems.map(item => {
                        return (
                            <h3>
                                {item.title}
                                {item.description}
                            </h3>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
export default withRouter(MyMatches);