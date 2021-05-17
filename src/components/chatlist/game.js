import React, { useEffect, useState, useCallback, useRef } from "react";
import { Modal, Panel, Uploader} from 'rsuite'
import { Grid, Typography, TextField, Button } from '@material-ui/core'
import { getDomain } from '../../helpers/getDomain';
var stompClient2 = null;
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

      useEffect(() =>{
        connect();
        return () => {
          stompClient2=null;
          setMyChoice(null);
          setOpChoice(null);
        }
      }, []);

      useEffect(() => {
        //setActiveContact(props.activeContact);
        setIdNumber(props.id)
        /*console.log(props.stomp?.connected)
        if(props.stomp && props.stomp?.connected && !connected){
          props.stomp.subscribe(
            "/user/" + idNumber + "/queue/game",
            onGameStuff
          )
          setConnected(true);
        }*/
        }, [myStomp?.connected, props.stomp, activeContact, myStomp]);
    
    
    useEffect(()=>{
      setActiveContact(props.activeContact);
      setStromp(props.stomp);
    }, [props.stomp, myStomp?.connected]);

    useEffect(()=>{
      return () => setStromp(null);
    }, []);

    const onGameStuff= useCallback((game) => {
        const notification = JSON.parse(game.body);

        if(notification.request){
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
          if(myChoiceRef.current) {
            gameLogic();
          }
        }
      });
    
      const gameLogic = async() => { 
        console.log("my choice " + myChoiceRef.current);
        console.log("your choice " + opChoiceRef.current);
        console.log("decide who won");
        let decession = false;
        const message = "";
        if(myChoiceRef.current === opChoiceRef.current){
          message = message + "no winner"
          decession = true;
        }
        const mylocalChoice = await myChoiceRef.current
        console.log(myChoice);
        if((myChoiceRef.current === "Paper" && opChoiceRef.current === "Rock")
        || (myChoiceRef.current === "Scissor" && opChoiceRef.current === "Paper")
        || (myChoiceRef.current === "Rock" && opChoiceRef.current === "Scissor")){
          message = message + "i won, you sucker";
          decession = true;
        }
        if(!decession){
          message = message + "you won, you fucking cheater";
        }

        props.sendMessage(myChoiceRef.current + " vs " + opChoiceRef.current + " " + message);
        setMyChoice(null);
        setOpChoice(null);
        setGameModal({show: false});
      };
  
    const connect = async () => {
      const Stomp = require("stompjs");
      var SockJS = require("sockjs-client");
      SockJS = new SockJS(getDomain() + "/ws");
      stompClient2 = Stomp.over(SockJS);
      await stompClient2.connect({}, onConnected2, onError);
    };
  
  
    const onConnected2 = () => {
      stompClient2.subscribe(
        "/user/" + idNumber + "/queue/game",
        onGameStuff
      );
    };    

    const onError = (err) => {
      console.log(err);
    };
  const sendGame = () => {
    const message = {
      senderId: idNumber,
      recipientId: activeContact.id,
      senderId: props.curremtItem.id,        
      request: true,
    };
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

  const sendType= async(type) => {
    await setMyChoice(type);
    console.log(myChoiceRef.current)
    const message = {
      senderId: idNumber,
      recipientId: activeContact.id,
      type: type,
    };
    props.stomp.send("/app/game", {}, JSON.stringify(message));
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