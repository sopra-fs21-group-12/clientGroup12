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
    
    
    const opChoiceRef = useRef();
    opChoiceRef.current = oponentChoice;
    const myChoiceRef = useRef();
    myChoiceRef.current = myChoice;
    const [modal, setModal] = useState({show: false});
    const [gameModal, setGameModal] = useState({show: false});
    const [gameSetupModal, setGameSetupModal] = useState({show: false});
    const [otherChat, setOhterchat] = useState({show: false});
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
        setIdNumber(props.id)
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
            setOhterchat({show: true , senderName: (notification.senderName), senderId: (notification.senderId)})
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
        let decession = false;
        const message = "";
        if(myChoiceRef.current === opChoiceRef.current){
          message = message + ": no winner"
          decession = true;
        }
        const mylocalChoice = await myChoiceRef.current
        if((myChoiceRef.current === "Paper" && opChoiceRef.current === "Rock")
        || (myChoiceRef.current === "Scissor" && opChoiceRef.current === "Paper")
        || (myChoiceRef.current === "Rock" && opChoiceRef.current === "Scissor")){
          message = message + ": i won";
          decession = true;
        }
        if(!decession){
          message = message + ": you won";
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
      //senderId: props.currentItem.id,
      request: true,
    };
    props.stomp.send("/app/game", {}, JSON.stringify(message));
  };

  const sendAccept = (id) => {
    const message = {
      senderId: idNumber,
      recipientId: id,
      accept: true,
    };
    props.stomp.send("/app/game", {}, JSON.stringify(message));
    close()
    setGameModal({show: true});
  }

  const sendType= async(type) => {
    await setMyChoice(type);
    const message = {
      senderId: idNumber,
      recipientId: activeContact.id,
      type: type,
    };
    props.stomp.send("/app/game", {}, JSON.stringify(message));
    if(opChoiceRef.current) {   
      gameLogic();
    }
    setGameModal({show: false});
  }

  function close() {
    setModal({show: false});
  }

  return (
    <>
    <Modal show={gameModal.show} onHide={() => {
      setGameModal({show: false});
      //setMyChoice(undefined);
      ///setOpChoice(undefined);
      }} backdrop="static">
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
          <Modal.Title>You got asked for to play a game of rock paper scissor</Modal.Title>
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
          onClick={()=>sendAccept(activeContact.id)}
        > 
          Accept
        </Button>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    <Modal show={gameSetupModal.show} onHide={() => {setGameSetupModal({show: false})}} backdrop="static">
      <Modal.Header>
          <Modal.Title>Play Rock Paper Sciccor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>The idea is who wins, decides where the swap will be executed</p>
        <p>Winner will be anounced directly in the chat</p>
        <p>You can play several times</p>
        <p>Clicking on "request" will close this window, as soon as your opponent accepts a new game window will be oponed</p>
        <Button
          variant="outlined"
          color="default"
          onClick={() => {setGameSetupModal({show: false})}}
        > 
          Close
        </Button>
        <Button
          variant="outlined"
          color="default"
          onClick={()=> {
              sendGame();
              setGameSetupModal({show: false});
            }
          }
        > 
          Request
        </Button>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    <Modal show={otherChat.show} onHide={() => setOhterchat({show: true})} backdrop="static">
      <Modal.Header>
          <Modal.Title>You got asked to play a game of rock paper scissor from: {otherChat.senderName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>To play a round of rock paper Siccors click on "Accept"</p>
        <Button
          variant="outlined"
          color="default"
          onClick={() => setOhterchat({show: false})}
        > 
          close
        </Button>
        <Button
          variant="outlined"
          color="default"
          onClick={() => {
            setOhterchat({show: false});
            props.setContact(otherChat.senderId);
            sendAccept(otherChat.senderId);
            }
          }
        > 
          Go To Chat And Accept
        </Button>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    <Button
          variant="outlined"
          color="default"
          onClick={() => {setGameSetupModal({show: true})}}
        > 
          Game
        </Button>
    </>

  );
}

export default Game;