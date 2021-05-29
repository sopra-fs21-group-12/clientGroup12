import React, { useEffect, useState, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
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
import { Grid, makeStyles, TextField, Button, Divider } from "@material-ui/core";

import styled from 'styled-components';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import PictureAvatar from "../pictures/PictureAvatar";

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

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    rootList: {
      overflow: 'auto',
      height: 300,
      maxHeight: 300,
    },
    unmatch: {
      margin: theme.spacing(1),
      background: "#EB5757",
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
    },
    report: {
      background: "#EB5757",
    },
    swipingButton: {
      marginTop: theme.spacing(5),
      background: "#FFBB12",
    },
    title:{
      marginBottom: theme.spacing(2),
    },
    matchesButton: {
      background: "#6FCF97",
    },
      list: {
          whiteSpace: "nowrap",
          width: "100%",
          overflow: "hidden",
          textOverflow: "clip ellipsis",
          marginLeft: theme.spacing(1)
      },
      listMargin: {
          paddingLeft: theme.spacing(1)
      },
  }));

  var stompClient = null;
  const Chat = ({match:{params:{id}}}) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [idNumber, setIdNumber] = useState(id);
  const [contacts, setContacts] = useState();
  const [activeContact, setActiveContact] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [unmatchModal, setUnmatchModal] = useState({show: false, id: undefined});
  const [reportModal, setReportModal] = useState({show: false, id: undefined, itemId:undefined});
  const [goToChatModal, setGoToChat] = useState({show: false, contact: undefined});
  const stateRef = useRef();
  const history = useHistory();

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
      console.log(currentItem);
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
        senderName: currentItem.title,
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
            <div>
              <h5>Matched Items</h5>
            {!activeContact ? (
                <Grid className={classes.rootList} container justify="center" alignItems="center">
                  <Grid item xs={6}>
                    <h3 className={classes.title}>No Matches for this item</h3>
                  </Grid>
                </Grid>
            ):(
                <List className={classes.rootList}
                      aria-labelledby="nested-list-subheader"
                >
                  {contacts && contacts.map((contact) => {
                    return (
                        <div key={contact.id}>
                          <ListItem
                              className={classes.listMargin}
                              button
                              selected={contact.id === stateRef.current?.id}
                              onClick={(event) =>{
                                setActiveContact(contact)
                              }}
                          ><PictureAvatar itemId={contact.id}/>
                            <ListItemText className={classes.list} primary={contact.name}/>
                            <Button
                                className={classes.unmatch}
                                variant="contained"
                                size="small"
                                color="secondary"
                                onClick={()=> setUnmatchModal({show: true, id: contact.matchId})}
                            >
                              Unmatch
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                                onClick={()=> setReportModal({show: true, id: contact.matchId, itemId: contact.id})}
                            >
                              Report
                            </Button>
                          </ListItem>
                        </div>
                    );
                  })}
                </List>
            )}
            </div>
          </Panel>
        </Grid>
        <Grid item xs={6}>
          <Panel shaded>
            {!activeContact ? (
                <Grid className={classes.rootList} container justify="center" alignItems="center" spacing={3}>
                  <Grid item xs={6}>
                    <h3>Start swiping and create matches first</h3>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                        variant="contained"
                        className={classes.swipingButton}
                        onClick={() => history.push('/swipe/' + idNumber)}
                    >
                      Start Swiping
                    </Button>
                  </Grid>
                </Grid>
            ):(
                <div>
                    <h5>Chat with: {activeContact.name}</h5>
                    <Divider/>
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
                </div>
            )}
          </Panel>
        </Grid>

        <Grid item xs={4}>
          <Panel shaded>
            <Grid container justify="flex-start" alignItems="center">
              <Grid item xs={4}>
                {currentItem.id && <Picture itemId={currentItem.id}/>}
              </Grid>
              <Grid item xs={6}>
                <Label>Chatting with your</Label>
                <h3>{currentItem.title}</h3>
              </Grid>
            </Grid>
          </Panel>
        </Grid>

      <Grid item xs={6}>
        {activeContact ? (
            <Grid container justify="flex-start" alignItems="center" spacing={4}>
              <Grid item xs={9}>
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
                      className={classes.matchesButton}
                      variant="contained"
                      disabled={!activeContact}
                      onClick={() => {
                        if(contacts) {
                          sendMessage(text);
                          setText("");
                        }
                      }}
                  >
                    Send
                  </Button>
                </Panel>
              </Grid>
              <Grid item xs={3}>
                <Game
                    stomp={stompClient}
                    id={idNumber}
                    activeContact={stateRef.current}
                    currentItem={currentItem}
                    sendMessage={sendMessage}
                    setContact={setContactById}>
                </Game>
              </Grid>
            </Grid>
        ):(
            <div/>
        )}
      </Grid>
    </Grid>
    <BackToInventory/>
    </>

  );
};

export default Chat;
