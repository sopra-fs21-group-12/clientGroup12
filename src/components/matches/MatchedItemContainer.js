import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import {Modal, Panel} from "rsuite";
import {Grid, Button, makeStyles} from "@material-ui/core";
import styled from 'styled-components';
import Picture from "../pictures/Picture";
import PictureSliderItem from "../pictures/PictureSilderItem";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import {DoneOutline} from "@material-ui/icons";
import {api, handleError} from "../../helpers/api";



const Label = styled.label`
  position: static;
  left: 14.95%;
  right: 75.81%;
  top: 27.34%;
  bottom: 60.16%;
  
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  /* identical to box height, or 133% */
  text-align: center;

  color: #000000;
`;

const ItemTitle = styled.title`
  position: static;
  left: 14.95%;
  right: 57.2%;
  top: 39.84%;
  bottom: 28.91%;
  
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 40px;

  /* identical to box height, or 167% */

  /* Colors / Black */
  color: #18191F;
`;

const useStyles = makeStyles((theme) => ({
    swipingButton: {
        marginLeft: theme.spacing(3),
        background: "#FFBB12",
    },
    cancel: {
        marginLeft: theme.spacing(2),
    },
    matchesButton: {
        background: "#6FCF97",
    },
    confirmedButton: {
        background: "#6FCF97",
        marginLeft: theme.spacing(3),
    },
}));

export default function MatchedItemContainer(props) {
    const history = useHistory();
    const classes = useStyles();
    const [modal, setModal] = useState({show: false})
    const [modalConfirm, setModalConfirm] = useState({show: false})
    const [swap, setSwap] = useState();

    useEffect(async () => {
        try {
            const response = await api.get(`/swap/check/${props.chatId}/${props.item.id}`)
            setSwap(response.data);

        } catch (error) {
            alert(`Something went wrong while fetching the matches: \n${handleError(error)}`);
        }

    }, [])

    async function swapConfirm(){
        try {
            const requestBody = JSON.stringify({
                itemID1: props.chatId,
                itemID2: props.item.id,
            });
            await api.post(`/swap`, requestBody)
            setSwap(true);
            close();

        } catch (error) {
            alert(`Something went wrong while fetching the matches: \n${handleError(error)}`);
        }
    }

    function close() {
        setModal({show: false});
    }

    function open() {
        setModal({show: true});
    }

    function openConfirm() {
        setModalConfirm({show: true});
    }

    function closeConfirm() {
        setModalConfirm({show: false});
    }

    return (
        <Grid container justify="center" spacing={4}>
            <Grid item xs={12}>
                <Panel shaded collapsible
                       header={
                           <Grid container justify="flex-start" alignItems="center" spacing={4}>
                               <Grid item xs={2}>
                                   <PictureSliderItem id={props.item.id}/>
                               </Grid>
                               <Grid item xs={5}>
                                   <Label>Matched with</Label>
                                   <h3>{props.item.title}</h3>
                               </Grid>
                               <Grid item xs={1}>
                                   <Button
                                       variant="contained"
                                       color="primary"
                                       onClick={() => history.push('/chat/' + props.chatId)}
                                   >
                                       Chat
                                   </Button>
                               </Grid>
                               <Grid item xs={4}>
                                   {swap ? (
                                       <Button
                                           variant="contained"
                                           className={classes.confirmedButton}
                                           endIcon={<DoneOutline>ok</DoneOutline>}
                                           onClick={openConfirm}
                                       >
                                           Swap Confirmed
                                       </Button>
                                   ):(
                                       <Button
                                           variant="contained"
                                           className={classes.swipingButton}
                                           endIcon={<ThumbUpIcon>ok</ThumbUpIcon>}
                                           onClick={open}
                                       >
                                           Confirm Swap
                                       </Button>
                                   )}
                               </Grid>

                               <Modal show={modal.show} onHide={close}>
                                   <Modal.Header>
                                       <Modal.Title>Confirm Swap</Modal.Title>
                                   </Modal.Header>
                                   <Modal.Body>
                                       <p>THIS ACTION IS NOT REVERSIBLE!</p>
                                       <p>ONLY CLICK ON CONFIRM SWAP IF THE SWAP ALSO HAPPENED IN REAL LIFE!</p>
                                       <p>If both users confirm that the swap happened in real life, you will see the swapped item in your inventory.</p>
                                       <p>If the button changes to SWAP CONFIRMED you have to wait until the other users also confirms the swap.</p>
                                       <p>Best Practice is to confirm the swap at the same moment when you meet with the other user and receive the other item.</p>
                                   </Modal.Body>
                                   <Modal.Footer>
                                       <Button
                                           className={classes.matchesButton}
                                           variant="contained"
                                           size="small"
                                           endIcon={<DoneOutline>ok</DoneOutline>}
                                           onClick={swapConfirm}
                                       >
                                           Confirm Swap
                                       </Button>
                                       <Button
                                           className={classes.cancel}
                                           variant="contained"
                                           color="default"
                                           size="small"
                                           onClick={close}
                                       >
                                           Cancel
                                       </Button>
                                   </Modal.Footer>
                               </Modal>

                               <Modal show={modalConfirm.show} onHide={closeConfirm}>
                                   <Modal.Header>
                                       <Modal.Title>Swap Already Confirmed</Modal.Title>
                                   </Modal.Header>
                                   <Modal.Body>
                                       <p>You are waiting for the confirmation of the other user.</p>
                                       <p>If the other user also confirms the swap happened, you will see the item in your Inventory</p>
                                   </Modal.Body>
                                   <Modal.Footer>
                                       <Button
                                           variant="contained"
                                           color="primary"
                                           size="small"
                                           onClick={() => history.push('/inventory')}
                                       >
                                           Go To Inventory
                                       </Button>
                                       <Button
                                           className={classes.cancel}
                                           variant="contained"
                                           size="small"
                                           onClick={closeConfirm}
                                       >
                                           OK
                                       </Button>
                                   </Modal.Footer>
                               </Modal>

                           </Grid>
                       }>
                    <h6>{props.item.description}</h6>
                </Panel>
            </Grid>
        </Grid>
    )
}
