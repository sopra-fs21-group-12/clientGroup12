import React, { useEffect, useState, useCallback, useRef } from "react";
import { Modal} from 'rsuite'
import { Button } from "@material-ui/core";

  
const GoToChatModal = (props) => {
  const [gotToChatModal, setGoToChat] = useState({show: false});


  useEffect(() =>{
    setGoToChat({show: props.goToChat.show})
  }, [props.goToChat]);
    
  return (
    <>
    <Modal show={gotToChatModal.show} onHide={() => {setGoToChat({show: false})}} backdrop="static">
      <Modal.Header>
          <Modal.Title>{props.goToChat.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {props.goToChat.description}
        <Button
          variant="outlined"
          color="default"
          onClick={async() => {
            setGoToChat({show: false});
            props.setContact(props.goToChat.contact);
          }}
        > 
          Go To Chat
        </Button>
        <Button
          variant="outlined"
          color="default"
          onClick={() => setGoToChat({show: false})}
        > 
          Cancel
        </Button>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    </>

  );
};

export default GoToChatModal;
