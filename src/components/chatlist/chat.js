import React, { useEffect, useState, useCallback, useRef } from "react";
import Game from "./game";
import UnmatchModal from "../modals/unmatchModal"
import ReportModal from "../modals/reportModal"
import GoToChat from "../modals/goToChatModal";
import {
  findChatMessages,
  findChatMessage,
  findItemMatches,
  getItem,
} from "./ApiUtil";
import { getDomain } from '../../helpers/getDomain';
import BackToInventory from "../RedirectButtons/BackToInventory";
import Picture from "../pictures/Picture";
import {api, handleError} from "../../helpers/api";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Panel} from "rsuite";
import {
  Grid,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    rootList: {
      overflow: 'auto',
      height: 300,
      maxHeight: 300,
    }
  }));

  var stompClient = null;
  const Chat = ({match:{params:{id}}}) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [idNumber, setIdNumber] = useState(id);
  const [contacts, setContacts] = useState();
  const [activeContact, setActiveContact] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [curremtItem, setCurrentItem] = useState({});
  const [unmatchModal, setUnmatchModal] = useState({show: false, id: undefined});
  const [reportModal, setReportModal] = useState({show: false, id: undefined, itemId:undefined});
  const [goToChatModal, setGoToChat] = useState({show: false, contact: undefined});
  const stateRef = useRef();

  stateRef.current = activeContact;
  const chatRef = useRef();
  chatRef.current = messages;
  const scrollRef = useRef(null);
  const contactsRef = useRef();
  contactsRef.current = contacts;

  useEffect(() =>{
    loadContacts()
    return () => {stompClient=null}
  }, []);

  useEffect(() => {
    setMessages([]);
    if (activeContact === undefined) return;
    findChatMessages(activeContact.matchId).then((msgs) =>
      setMessages(msgs)
    );
  }, [activeContact]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  const connect = () => {
    const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");
    SockJS = new SockJS(getDomain() + "/ws");
    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, onConnected, onError);
    console.log(stompClient);
  };


  const onConnected = () => {
    stompClient.subscribe(
      "/user/" + idNumber + "/queue/messages",
      onMessageReceived
    );
  };
  const onError = (err) => {
    console.log(err);
  };

  const onMessageReceived = useCallback((msg) => {
    const notification = JSON.parse(msg.body);
    if (stateRef.current.id === notification.senderId) {
      findChatMessage(notification.id).then((message) => {
        const newMessages = [...chatRef.current];
        newMessages.push(message)
        setMessages(newMessages);
      });
    } else {
      contactsRef.current.forEach(contact =>{
        if(contact.id == notification.senderId){
          setGoToChat({show: true,
            contact,
            title: ("Message from: " + notification.senderName),
            description: ("Go to the chat of: " + notification.senderName)
          });
        }
      });
    }
  }, []);

  const report = async (id, matchid) =>{
    try {
      const response = await api.post(`/items/${id}/report`);
      unmatch(matchid)

    } catch (error) {
        alert(`Something went wrong during the Item creation: \n${handleError(error)}`);
    }
  }

  const unmatch = async(id) =>{
    try {
      console.log(stateRef.current.matchId);
      console.log(id);
      //const response = await api.put(`/${id}/unmatch`);
      //loadContacts();
    } catch (error) {
        alert(`Something went wrong during the Item creation: \n${handleError(error)}`);
    }
  }

  const loadContacts =  async() => {
    setMessages([]);
    setContacts([]);
    stompClient && stompClient.disconnect();
    getItem(id).then((item)=>{
      setCurrentItem(item);
      console.log(curremtItem);
    });
    connect();
    loadChats();
  }


  const sendMessage = (msg) => {
    console.log(msg);
    if (msg.trim() !== "") {
      const message = {
        senderId: idNumber,
        recipientId: stateRef.current.id,
        senderName: curremtItem.title,
        recipientName: stateRef.current.name,
        matchId: stateRef.current.matchId,
        content: msg,
        timestamp: new Date(),
      };
      stompClient.send("/app/chat", {}, JSON.stringify(message));

      const newMessages = [...messages];
      newMessages.push(message);
      setMessages(newMessages);
    }
  };

  const setContactById = (id) =>{
    contactsRef.current.forEach(contact =>{
      if(contact.id == id){
        setActiveContact(contact)
      }
    });
  }

  const loadChats = async () => {
    const contactItems = [];
    const matches = await findItemMatches(idNumber);
    for (let index = 0; index < matches.length; index++) {
      const match = matches[index];
      let otherItemId = undefined;
      if(match.itemIdOne != idNumber){
        otherItemId = match.itemIdOne;
      } else {
        otherItemId = match.itemIdTwo;
      }
      const item = await getItem(otherItemId);
      item.name = item.title;
      item.newMessages = 0;
      item.matchId = matches[index].id;
      contactItems.push(item);
    }
    setContacts(contactItems);
    if (activeContact === undefined && contactItems?.length > 0) {
      setActiveContact(contactItems[0]);
    }

  };
  

    return (
    <>
    <UnmatchModal unmatch={unmatchModal} loadContacts={loadContacts} />
    <ReportModal unmatch={reportModal} loadContacts={loadContacts} />
    <GoToChat goToChat={goToChatModal} setContact={setActiveContact}/>
    <Grid container justify="center" spacing={4}>
      <Grid item xs={12}/>
      <Grid item xs={12}/>
      <Grid item xs={4}>
          <Panel shaded>

            <List className={classes.rootList}
              aria-labelledby="nested-list-subheader"
            >
              {contacts && contacts.map((contact) => {
              return (
                <div key={contact.id}>
                    <ListItem 
                      button 
                      selected={contact.id === stateRef.current?.id}
                      onClick={(event) =>{
                        setActiveContact(contact)
                      }}
                    >
                      <ListItemText primary={contact.name} />
                      <Button
                        variant="contained"
                        color="default"
                        onClick={()=> setUnmatchModal({show: true, id: contact.matchId})}
                      >
                        Unmatch
                      </Button>
                      <Button
                        variant="contained"
                        color="default"
                        onClick={()=> setReportModal({show: true, id: contact.matchId, itemId: contact.id})}
                      >
                        Report
                      </Button>
                    </ListItem>
                </div>
              );
              })}
            </List>
          </Panel>
        </Grid>
        <Grid item xs={6}>
          <Panel shaded>
            <List className={classes.rootList}
              component="nav"
            >
              {messages.map((msg, index) => {
              return (
                <div key={index}>
                  <ListItem ref={scrollRef} >
                    <ListItemText style={{display:'flex', justifyContent: msg.senderId == idNumber ? 'flex-end' : 'flex-start'}} primary={msg.content}/>
                  </ListItem>
                </div>
              );
              })}
            </List>
          </Panel>
        </Grid>
        <Grid item xs={4}>
          <Panel shaded>
            <div>your current item</div>
            <div>Title: {curremtItem.title}</div>
            <div>Description: {curremtItem.description}</div>
            <Picture itemId={curremtItem.id}/>
          </Panel>
        </Grid>
        <Grid item xs={6}>
          <Panel shaded>
            <TextField 
              margin="normal"
              required
              fullWidth
              placeholder="send text"
              value={text}
              autoFocus
              onChange={(event) => setText(event.target.value)}
              onKeyPress={(event) => {
                if (contacts && event.key === "Enter") {
                  sendMessage(text);
                  setText("");
                }
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                if(contacts) {
                  sendMessage(text);
                  setText("");
                }
              }}
            >
              Send
            </Button>
            <Game stomp={stompClient} id={idNumber} activeContact={stateRef.current} curremtItem={curremtItem} sendMessage={sendMessage} setContact={setContactById}></Game>
          </Panel>
        </Grid>
    </Grid>
    <BackToInventory/>
    </>

  );
};

export default Chat;
