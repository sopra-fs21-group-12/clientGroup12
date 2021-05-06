import React, { useEffect, useState, useCallback, useRef } from "react";
import { Modal, Panel, Uploader} from 'rsuite'
import { Grid, Typography, TextField, Button } from '@material-ui/core'
const Game = (props) => {
    const [oponentChoice, setOpChoice] = useState(null);
    const [myChoice, setMyChoice] = useState(null);
    const [idNumber, setIdNumber] = useState(props.id);
    const [activeContact, setActiveContact] = useState(undefined);
    const [connected, setConnected] = useState(false);
    
    const opChoiceRef = useRef();
    opChoiceRef.current = oponentChoice;
    const myChoiceRef = useRef();
    myChoiceRef.current = myChoice;
    const [modal, setModal] = useState({show: false});
    const [gameModal, setGameModal] = useState({show: false});
    const [myStomp, setStromp] = useState(props.stomp)
    
    const stateRef = useRef();

    stateRef.current = activeContact;

    useEffect(() => {
      setIdNumber(props.id)
      setActiveContact(props.activeContact);
      }, [props.activeContact]);

      useEffect(() => {
        //setActiveContact(props.activeContact);
        setIdNumber(props.id)
        console.log(props.stomp?.connected)
        if(props.stomp && props.stomp?.connected && !connected){
          props.stomp.subscribe(
            "/user/" + idNumber + "/queue/game",
            onGameStuff
          )
          setConnected(true);
        }
        }, [myStomp?.connected]);
    
    
    useEffect(()=>{
      setActiveContact(props.activeContact);
      console.log(activeContact);
      setStromp(props.stomp);
    }, [props.stomp]);

    const onGameStuff= useCallback((game) => {
        console.log("hallo");
        const notification = JSON.parse(game.body);

        if(notification.request){
          console.log(stateRef.current.id)
          console.log(notification.senderId);
          if(notification.senderId != stateRef.current.id){
            alert("game request from " + notification.senderId)
          } else {
            setModal({show: true});
          }
        }
        
        if(notification.accept){
          setGameModal({show: true});
        }
    
        if(notification.type) {
          setOpChoice(notification.type);
          console.log(opChoiceRef.current);
          console.log(myChoiceRef.current);
          if(myChoiceRef.current) {
            gameLogic();
          }
        }
      });
    
      const gameLogic = () => { 
        console.log(myChoiceRef.current);
        console.log(opChoiceRef.current);
        console.log("decide who won");
        if(myChoiceRef.current === opChoiceRef.current){
          props.sendMessage("nobody won");
        }
      };
    
  const sendGame = () => {
    const message = {
      senderId: idNumber,
      recipientId: activeContact.id,
      senderId: props.curremtItem.id,        
      request: true,
    };
    console.log(message);
    props.stomp.send("/app/game", {}, JSON.stringify(message));
  };

  const sendAccept = () => {
    const message = {
      senderId: idNumber,
      recipientId: activeContact.id,
      accept: true,
    };
    props.stomp.send("/app/game", {}, JSON.stringify(message));
    close()
    setGameModal({show: true});
  }

  const sendType= (type) => {
    console.log(type);
    setMyChoice(type);
    console.log(myChoice);
    const message = {
      senderId: idNumber,
      recipientId: activeContact.id,
      type: type,
    };
    props.stomp.send("/app/game", {}, JSON.stringify(message));
    if(opChoiceRef.current) {
      console.log("from sendType");
      
      gameLogic();
    }
  }

  function close() {
    setModal({show: false});
  }

  return (
    <>
    <Modal show={gameModal.show} onHide={() => {setGameModal({show: false})}} backdrop="static">
      <Modal.Header>
          <Modal.Title>Rock paper scissor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          variant="outlined"
          color="default"
          onClick={() => sendType("Rock")}
        > 
          Rock
        </Button>
        <Button
          variant="outlined"
          color="default"
          onClick={() => sendType("Paper")}
        > 
          Paper
        </Button>
        <Button
          variant="outlined"
          color="default"
          onClick={() => sendType("Scissor")}
        > 
          Scissor
        </Button>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    <Modal show={modal.show} onHide={close} backdrop="static">
      <Modal.Header>
          <Modal.Title>Set picture for your item (required)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          variant="outlined"
          color="default"
          onClick={close}
        > 
          Cancel
        </Button>
        <Button
          variant="outlined"
          color="default"
          onClick={sendAccept}
        > 
          Accept
        </Button>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    <Button
          variant="outlined"
          color="default"
          onClick={sendGame}
        > 
          Game
        </Button>
    </>

  );
}

export default Game;