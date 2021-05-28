import React, { useEffect, useState, useCallback, useRef } from "react";
import {unmatch} from "../../helpers/api";
import { Modal, Paragraph} from 'rsuite'
import {Button, makeStyles} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  unmatch: {
    margin: theme.spacing(1),
    background: "#EB5757",
  },
}));

const UnmatchModal = (props) => {
  const [unmatchModal, setUnmatchModal] = useState({show: false});
  const classes = useStyles();


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
        <p>Are you sure you want to unmatch this item?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
            className={classes.unmatch}
            variant="contained"
            size="small"
            color="secondary"
            onClick={async() => {
              await unmatch(props.unmatch.id);
              setUnmatchModal({show: false})
              props.loadContacts();
            }}
        >
          Unmatch
        </Button>
        <Button
            variant="contained"
            color="default"
            size="small"
            onClick={() => setUnmatchModal({show: false})}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
    </>

  );
};

export default UnmatchModal;
