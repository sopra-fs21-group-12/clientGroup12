import { withRouter } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {api, handleError} from "../../helpers/api";



function Profile(){
    const [state, setState] = useState({
        id: localStorage.getItem("id"),
        username: "",
        name:"",
        status: "",
        timestamp: "",
        birthday: ""
    })
    useEffect(async () => {
        try {
            //@GetMapping("/users/{userId}")
            const response = await api.get(/users/ + state.id)
            //await new Promise(resolve => setTimeout(resolve, 1000))
            //setState({[key]: value })
            


        }catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }

    }, [])


    return (
        <div>hello</div>
    )
}
export default withRouter(Profile)