import React, { useEffect, useState, useCallback, useRef } from "react";
import { Modal, Panel, Uploader} from 'rsuite'
import {Grid, Typography, TextField, Button, makeStyles} from '@material-ui/core'
import { getDomain } from '../../helpers/getDomain';
import {FaRegHandPaper, FaRegHandRock, FaRegHandScissors} from "react-icons/all";
var stompClient2 = null;

const useStyles = makeStyles((theme) => ({
    red: {
        margin: theme.spacing(1),
        background: "#EB5757",
    },
    yellow: {
        margin: theme.spacing(2),
        background: "#FFBB12",
    },
    green: {
        margin: theme.spacing(1),
        background: "#6FCF97",
    },
    game: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        background: "#FFBB12",
        boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)"

    },
}));

const Game = (props) => {
    const classes = useStyles();
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
        //const message = "";
        let message = "";
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
          <Modal.Title>Choose Wisely</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
            className={classes.yellow}
            variant="contained"
            endIcon={<FaRegHandRock/>}
          onClick={() => sendType("Rock")}
        > 
          Rock
        </Button>
        <Button
            className={classes.yellow}
            variant="contained"
            endIcon={<FaRegHandPaper/>}
          onClick={() => sendType("Paper")}
        > 
          Paper
        </Button>
        <Button
            className={classes.yellow}
            variant="contained"
            endIcon={<FaRegHandScissors/>}
          onClick={() => sendType("Scissor")}
        > 
          Scissors
        </Button>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    <Modal show={modal.show} onHide={close} backdrop="static">
      <Modal.Header>
          <Modal.Title>You got asked to play a game of Rock Paper Scissors</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <p>Winner decides where and how the exchange of the items will happen.</p>
          <p>Winner will be announced directly in the chat.</p>
          <br/>
          <p>To start the game click on ACCEPT</p>
      </Modal.Body>
      <Modal.Footer>
          <Button
              variant="contained"
              color="default"
              onClick={close}
          >
              Cancel
          </Button>
          <Button
              className={classes.green}
              variant="contained"
              onClick={()=>sendAccept(activeContact.id)}
          >
              Accept
          </Button>
      </Modal.Footer>
    </Modal>
    <Modal show={gameSetupModal.show} onHide={() => {setGameSetupModal({show: false})}} backdrop="static">
      <Modal.Header>
          <Modal.Title>Play Rock Paper Scissors</Modal.Title>
      </Modal.Header>
        <Modal.Body>
            <p>Winner decides where and how the exchange of the items will happen.</p>
            <p>Winner will be announced directly in the chat.</p>
            <br/>
            <p>The other user has to be in the chat window, so communicate before sending the request!</p>
            <p>Clicking on "request" will close this window, as soon as your opponent accepts a new game window will be opened</p>
      </Modal.Body>
      <Modal.Footer>
          <Button
              variant="contained"
              color="default"
              onClick={() => {setGameSetupModal({show: false})}}
          >
              Close
          </Button>
          <Button
              className={classes.green}
              variant="contained"
              onClick={()=> {
                  sendGame();
                  setGameSetupModal({show: false});
              }
              }
          >
              Send Request
          </Button>
      </Modal.Footer>
    </Modal>
    <Modal show={otherChat.show} onHide={() => setOhterchat({show: true})} backdrop="static">
      <Modal.Header>
          <Modal.Title>You got asked to play a game of Rock Paper Scissors from: {otherChat.senderName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <p>Winner decides where and how the exchange of the items will happen.</p>
          <p>Winner will be announced directly in the chat.</p>
          <br/>
          <p>Click on ACCEPT if you want to switch to the chat and play.</p>
      </Modal.Body>
      <Modal.Footer>
          <Button
              variant="contained"
              color="default"
              onClick={() => setOhterchat({show: false})}
          >
              close
          </Button>
          <Button
              className={classes.green}
              variant="contained"
              onClick={() => {
                  setOhterchat({show: false});
                  props.setContact(otherChat.senderId);
                  sendAccept(otherChat.senderId);}
              }
          >
              Accept
          </Button>
      </Modal.Footer>
    </Modal>
        <Button
            className={classes.game}
            onClick={() => {setGameSetupModal({show: true})}}
        >
            <Grid container justify="center">
                <Grid item xs={12}>
                    <h5>Rock</h5>
                </Grid>
                <Grid item xs={12}>
                    <h5>Paper</h5>
                </Grid>
                <Grid item xs={12}>
                    <h5>Scissors</h5>
                </Grid>
                <Grid item xs={3}>
                    <FaRegHandRock/>
                </Grid>
                <Grid item xs={3}>
                    <FaRegHandPaper/>
                </Grid>
                <Grid item xs={3}>
                    <FaRegHandScissors/>
                </Grid>
            </Grid>
        </Button>
    </>

  );
}

export default Game;