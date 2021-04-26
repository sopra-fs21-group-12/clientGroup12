import React, {useState} from "react";
import {Modal, ButtonToolbar, Button} from "rsuite";
import {TextField} from "@material-ui/core";
import {api, handleError} from "../../helpers/api";


export default function Edit(props) {
    const id = localStorage.getItem("id")
    const [modal, setModal] = useState({show: false})
    const [edit, setEdit] = useState({
        username: props.userdata.username,
        birthday: props.userdata.birthday,
    })

    const handleChange = (e) => {
        const {id, value} = e.target
        setEdit((prevState) => ({...prevState, [id]: value}));
    }
    async function handleEdit() {
        try {
            // What we send back to the backend
            const requestBody = JSON.stringify({
                username: edit.username,
                birthday: edit.birthday
            });
            // We create a Put Request to the backend to /users/{id}
            await api.put('/users/' + id, requestBody);
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
        <div className="modal-container">
            <ButtonToolbar>
                <Button onClick={open}> Edit Profile</Button>
            </ButtonToolbar>

            <Modal show={modal.show} onHide={close}>
                <Modal.Header>
                    <Modal.Title>Edit your Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        defaultValue={edit.username}
                        label="username"
                        name="username"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="birthday"
                        defaultValue={edit.birthday}
                        label="birthday"
                        id="birthday"
                        onChange={handleChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleEdit}
                        appearance="primary">
                        Ok
                    </Button>
                    <Button onClick={close} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        );
}