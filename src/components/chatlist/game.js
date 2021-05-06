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
    myChoiceRef.current = myChoiceRef;
    const [modal, setModal] = useState({show: false});
    const [gameModal, setGameModal] = useState({show: false});
    
    useEffect(() => {
      setActiveContact(props.activeContact);
      setIdNumber(props.id)
      console.log(activeContact)
      if(props.stomp && !connected){
        props.stomp.subscribe(
          "/user/" + idNumber + "/queue/game",
          onGameStuff
        )
        setConnected(true);
      }
      }, [props.activeContact]);
    
    // does not work
    useEffect(()=>{
     return () => setConnected(false)
    }, []);

    const onGameStuff= useCallback((game) => {
        console.log("hallo");
        const notification = JSON.parse(game.body);
      
        if(notification.request){
          setModal({show: true});
        }
        
        if(notification.accept){
          setGameModal({show: true});
        }
    
        if(notification.type) {
          console.log(notification.type);
          setOpChoice(notification.type);
          console.log(opChoiceRef.current);
          if(myChoiceRef.current) {
            gameLogic();
          }
        }
      });
    
      const gameLogic = () => {
        console.log("decide who won");
      };
    
  const sendGame = () => {
    const message = {
      senderId: idNumber,
      recipientId: activeContact.id,
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
    if(myChoice){
      console.log("who did win?")
    } 
    const message = {
      senderId: idNumber,
      recipientId: activeContact.id,
      type: type,
    };
    props.stomp.send("/app/game", {}, JSON.stringify(message));
    setMyChoice(type);
    if(opChoiceRef.current) {
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
    <div onClick={sendGame}>game</div>            
    </>

  );
}

export default Game;