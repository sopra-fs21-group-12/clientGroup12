import React, { useEffect, useState, useCallback, useRef } from "react";
import { report } from "../../helpers/api";
import { Modal} from 'rsuite'
import {Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  report: {
    margin: theme.spacing(1),
    background: "#EB5757",
  },
}));
  
const ReportModal = (props) => {
  const [unmatchModal, setUnmatchModal] = useState({show: false});
  const classes = useStyles();


  useEffect(() =>{
      setUnmatchModal({show: props.unmatch.show})
  }, [props.unmatch]);
    
  return (
    <>
    <Modal show={unmatchModal.show} onHide={() => {setUnmatchModal({show: false})}} backdrop="static">
      <Modal.Header>
          <Modal.Title>Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to report this item?</p>
        <p>The item will also get unmatched</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
            className={classes.report}
            variant="contained"
            color="secondary"
            size="small"
            onClick={async() => {
              await report(props.unmatch.itemId ,props.unmatch.id, );
              setUnmatchModal({show: false})
              props.loadContacts();
            }}
        >
          Report
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

export default ReportModal;
