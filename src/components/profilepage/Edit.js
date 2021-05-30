import React, {useState} from "react";
import {Modal, ButtonToolbar, Button} from "rsuite";
import {TextField} from "@material-ui/core";
import {api, handleError} from "../../helpers/api";
import {useJsApiLoader} from "@react-google-maps/api";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
require('dotenv').config();

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function Edit(props) {
    const id = localStorage.getItem("id")
    const [modal, setModal] = useState({show: false})
    const [edit, setEdit] = useState({
        username: props.userdata.username,
        name: props.userdata.name,
        password: props.userdata.password,
        address: props.userdata.address,
        city: props.userdata.city,
        postcode: props.userdata.postcode,
    });

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY,
    });

    const [address, setAddress] = useState();
    const [newLocation, setNewLocation] = useState();

    function handleInput(val) {
        setAddress(val);
    }

    function handleSelect(val) {
        setAddress(val);
        geocodeByAddress(address)
          .then(results => {
              getLatLng(results[0])
              console.log(results)
          })
          .then(latLng => setNewLocation(latLng))
          .catch(error => console.error('Error', error));
        console.log(newLocation);
        // api call set lng lat
    }
    const handleChange = (e) => {
        const {id, value} = e.target
        setEdit((prevState) => ({...prevState, [id]: value}));
    };

    async function handleEdit() {
        try {
            // What we send back to the backend
            const requestBody = JSON.stringify({
                username: edit.username,
                name: edit.name,
                password: edit.password,
                address: edit.address,
                city: edit.city,
                postcode: edit.postcode,
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

    return isLoaded ? (
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
                        name="name"
                        defaultValue={edit.name}
                        label="name"
                        id="name"
                        onChange={handleChange}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      defaultValue={edit.password}
                      label="Re-enter your Password or change it"
                      id="password"
                      onChange={handleChange}
                    />
                    <PlacesAutocomplete
                      value={address}
                      onChange={handleInput}
                      onSelect={handleSelect}
                    >
                        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                          <div>
                              <TextField
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                })}
                                id="outlined-basic"
                                margin="normal"
                                label="City/Street"
                                variant="outlined"
                                fullWidth
                                required
                              />
                              <div className="autocomplete-dropdown-container">
                                  {loading && <div>Loading...</div>}
                                  {suggestions.map(suggestion => {
                                      const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                      // inline style for demonstration purpose
                                      const style = suggestion.active
                                        ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                                        : {backgroundColor: '#ffffff', cursor: 'pointer'};
                                      return (
                                        <div
                                          {...getSuggestionItemProps(suggestion, {
                                              className,
                                              style,
                                          })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                      );
                                  })}
                              </div>
                          </div>
                        )}
                    </PlacesAutocomplete>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleEdit}
                        appearance="primary"
                        disabled={!edit.password}
                    >
                        Ok
                    </Button>
                    <Button
                      onClick={close}
                      appearance="subtle"
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        ) : <></> ;
}
