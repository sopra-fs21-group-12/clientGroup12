import React, {useState} from "react";
import {Modal} from "rsuite";
import {Button, makeStyles} from "@material-ui/core"
import {api, handleError} from "../../helpers/api";

const useStyles = makeStyles((theme) => ({
    report: {
        margin: theme.spacing(1),
        background: "#EB5757",
    },
}));

export default function ReportButton(props) {
    const [modal, setModal] = useState({show: false})
    const classes = useStyles();

    async function report() {
        try {
            await api.post(`/items/${props.itemId}/report`);
            props.dislike("left", props.itemId)
            close()
            window.location.reload(false);

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
                <Button size="small"
                        color="secondary"
                        onClick={open}
                >
                    Report Item</Button>

            <Modal show={modal.show} onHide={close}>
                <Modal.Header>
                    <Modal.Title>Report Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to report this item?</p>
                    <Button
                        className={classes.report}
                        variant="contained"
                        size="small"
                        onClick={report}
                    >
                        Report
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        size="small"
                        onClick={close}
                    >
                        Cancel
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
