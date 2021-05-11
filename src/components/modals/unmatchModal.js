import React, { useEffect, useState, useCallback, useRef } from "react";
import {unmatch} from "../../helpers/api";
import { Modal, Paragraph} from 'rsuite'
import { Button } from "@material-ui/core";

  
const UnmatchModal = (props) => {
  const [unmatchModal, setUnmatchModal] = useState({show: false});


  useEffect(() =>{
      setUnmatchModal({show: props.unmatch.show})
  }, [props.unmatch]);
    
  return (
    <>
    <Modal show={unmatchModal.show} onHide={() => {setUnmatchModal({show: false})}} backdrop="static">
      <Modal.Header>
          <Modal.Title>Unmatch</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to unamacht this item?</p>
        <Button
          variant="outlined"
          color="default"
          onClick={async() => {
            await unmatch(props.unmatch.id);
            setUnmatchModal({show: false})
            props.loadContacts();
          }}
        > 
          Unmatch
        </Button>
        <Button
          variant="outlined"
          color="default"
          onClick={() => setUnmatchModal({show: false})}
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

export default UnmatchModal;
