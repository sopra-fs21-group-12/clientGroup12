import React, {useEffect, useState} from "react";
import {Modal, ButtonToolbar,} from "rsuite";
import {TextField, Button} from "@material-ui/core";
import {api, handleError} from "../../helpers/api";
import Loader from "rsuite/es/Loader";
import { Button  as RsuiteButton } from "rsuite";


export default function ItemEdit(props) {
    const [itemData, setItemData] = useState();
    const [modal, setModal] = useState({show: false});
    const [state, setState] = useState({
            title: "",
            description: ""
        }
    );


    const handleChange = (e) => {
        const{id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    // fetch item data
    useEffect(async () => {
        try {

            const response = await api.get(/items/ + props.id)
            setItemData(response.data)

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }

    }, [])



    // send item data to the backend
    async function handleSave() {
        try {
            // What we send back to the backend
            const requestBody = JSON.stringify({
                title: state.title,
                description: state.description,
            });
            await api.put(`/items/${props.id}`, requestBody);
            window.location.reload(false);
            close()

        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    function close() {
        setModal({show: false});
    }

    function open() {
        setModal({show: true});
    }

    return (
        <div>
            {!itemData ? (
                <Loader/>
            ) : (
                <div className="modal-container">
                    <ButtonToolbar>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={open}
                        >
                            Edit Item
                        </Button>
                    </ButtonToolbar>

                    <Modal show={modal.show} onHide={close}>
                        <Modal.Header>
                            <Modal.Title>Edit Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Item Title"
                                defaultValue={itemData.title}
                                name="title"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="description"
                                label="Item Description"
                                id="description"
                                defaultValue={itemData.description}
                                rows={5}
                                multiline
                                onChange={handleChange}
                            />

                        </Modal.Body>
                        <Modal.Footer>
                            <RsuiteButton
                                disabled={!state.title || !state.description}
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={handleSave}
                            >
                                Save
                            </RsuiteButton>
                            <RsuiteButton
                                variant="outlined"
                                color="default"
                                onClick={close}
                            >
                                Cancel
                            </RsuiteButton>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
        </div>
            );
}