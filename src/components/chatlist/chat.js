import React, { useEffect, useState, useCallback, useRef} from "react";
import { useHistory } from "react-router-dom";
import Game from "./game";
import {
  findChatMessages,
  findChatMessage,
  findItemMatches,
  getItem,
} from "./ApiUtil";
import "./Chat.css";
import { getDomain } from '../../helpers/getDomain';
import BackToInventory from "../RedirectButtons/BackToInventory";
import Picture from "../pictures/Picture";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Panel} from "rsuite";
import {
  Grid,
  makeStyles,
  TextField,
  Button, Divider,
} from "@material-ui/core";
import styled from 'styled-components';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

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
  const stateRef = useRef();
  const history = useHistory();

  stateRef.current = activeContact;
  const chatRef = useRef();
  chatRef.current = messages;
  const scrollRef = useRef(null);

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
      alert("Received a new message from " + notification.senderName);
    }
  }, []);

  const loadContacts =  async() => {
    setMessages([]);
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
        recipientId: activeContact.id,
        senderName: currentItem.title,
        recipientName: activeContact.name,
        matchId: activeContact.matchId,
        content: msg,
        timestamp: new Date(),
      };
      stompClient.send("/app/chat", {}, JSON.stringify(message));

      const newMessages = [...messages];
      newMessages.push(message);
      setMessages(newMessages);
    }
  };

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
      contactItems.push(item);
      item.matchId = matches[index].id;
    }
    setContacts(contactItems);
    if (activeContact === undefined && contactItems?.length > 0) {
      setActiveContact(contactItems[0]);
    }

  };
  

    return (
    <Grid container justify="center" spacing={4}>
      <Grid item xs={12}/>
      <Grid item xs={12}/>

      <Grid item xs={4}>
          <Panel shaded>
            {activeContact ? (
                <div>
                  <h5>Matched Items</h5>
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
                                  className={classes.unmatch}
                                  variant="contained"
                                  size="small"
                                  color="secondary"
                              >
                                Unmatch
                              </Button>
                              <Button
                                  color="default"
                                  size="small"
                                  color="secondary"
                              >
                                Report
                              </Button>
                            </ListItem>
                          </div>
                      );
                    })}
                  </List>
                </div>
            ):(
                <Grid className={classes.rootList} container justify="center" alignItems="center">
                  <Grid item xs={6}>
                    <h3 className={classes.title}>No Matches for this item</h3>
                  </Grid>
                </Grid>
            )}
          </Panel>
      </Grid>

      <Grid item xs={6}>
          <Panel shaded>
            {activeContact ? (
                <div>
                  <h5>Chat with {activeContact.name}</h5>
                  <Divider />
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
            ):(
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
            <Grid item xs={8}>
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
            <Grid item xs={4}>
              <Game
                  stomp={stompClient}
                  id={idNumber}
                  activeContact={stateRef.current}
                  currentItem={currentItem}
                  sendMessage={sendMessage}>
              </Game>
              <Button
                  size="large"
                  variant="contained"
                  className={classes.swipingButton}
                  endIcon={<ThumbUpIcon>ok</ThumbUpIcon>}
              >
                Confirm Swap
              </Button>
            </Grid>
          </Grid>
      ):(
          <div/>
      )}
    </Grid>

      <Grid item xs={12}>
        <BackToInventory/>
      </Grid>

    </Grid>
  );
};

export default Chat;
