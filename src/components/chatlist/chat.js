import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from 'axios';
import { Button, message } from "antd";
import {
  findChatMessages,
  findChatMessage,
  findItemMatches,
  getItem,
} from "./ApiUtil";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";


var stompClient = null;
const Chat = ({match:{params:{id}}}) => {
  const [text, setText] = useState("");
  const [idNumber, setIdNumber] = useState(id);
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [curremtItem, setCurrentItem] = useState({});
  const stateRef = useRef();
  stateRef.current = activeContact;
  const chatRef = useRef();
  chatRef.current = messages;

  useEffect(() =>{
    loadContacts()
  }, []);

  useEffect(() => {
    setMessages([]);
    if (activeContact === undefined) return;
    findChatMessages(activeContact.matchId).then((msgs) =>
      setMessages(msgs)
    );
  }, [activeContact]);

  const connect = () => {
    const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");
    SockJS = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, onConnected, onError);
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
    console.log(activeContact);
    const notification = JSON.parse(msg.body);
    console.log(notification);
    if (stateRef.current.id === notification.senderId) {
      findChatMessage(notification.id).then((message) => {
        console.log(chatRef.current);
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
    //setCurrentItem(getItem(idNumber))
    getItem(id).then((item)=>{
      console.log(item);
      setCurrentItem(item);
    });
    console.log(curremtItem);
    connect();
    loadChats();
  }

  
  const sendMessage = (msg) => {
    if (msg.trim() !== "") {
      const message = {
        senderId: idNumber,
        recipientId: activeContact.id,
        senderName: curremtItem.title,
        recipientName: activeContact.name,
        matchId: activeContact.matchId,
        content: msg,
        timestamp: new Date(),
      };
      console.log()
      stompClient.send("/app/chat", {}, JSON.stringify(message));

      const newMessages = [...messages];
      newMessages.push(message);
      setMessages(newMessages);
    }
  };
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' }
  });
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
    if (activeContact === undefined && contactItems.length > 0) {
      setActiveContact(contactItems[0]);
    }

  };

  return (
    <div id="frame">
      <div id="sidepanel">
        <div id="profile">
          <div class="wrap">

            <p>{curremtItem.title}</p>
            <p>{curremtItem.description}</p>
          </div>
        </div>
        <div id="search" />
        <div id="contacts">
          <ul>
            {contacts.map((contact) => (
              <div> 
                <li
                onClick={() => setActiveContact(contact)}
                class={
                  activeContact && contact.id === activeContact.id
                    ? "contact active"
                    : "contact"
                }
              >
                <div class="wrap">
                  <img id={contact.id} src={contact.profilePicture} alt="" />
                  <div class="meta">
                    <p class="name">{contact.name}</p>
                    {contact.newMessages !== undefined &&
                      contact.newMessages > 0 && (
                        <p class="preview">
                          {contact.newMessages} new messages
                        </p>
                      )}
                  </div>
                </div>
              </li>
                </div>
            ))}
          </ul>
        </div>
      </div>
      <div class="content">
        <div class="contact-profile">
          <img src={activeContact && activeContact.profilePicture} alt="" />
          <p>{activeContact && activeContact.name}</p>
        </div>
        <ScrollToBottom className="messages">
          <ul>
            {messages.map((msg) => (
              <li class={msg.senderId == idNumber ? "sent" : "replies"}>
                {msg.senderId !== idNumber && (
                  <img src={activeContact.profilePicture} alt="" />
                )}
                <p>{msg.content}</p>
              </li>
            ))}
          </ul>
        </ScrollToBottom>
        <div class="message-input">
          <div class="wrap">
            <input
              name="user_input"
              size="large"
              placeholder="Write your message..."
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  sendMessage(text);
                  setText("");
                }
              }}
            />
            <Button
              onClick={() => {
                sendMessage(text);
                setText("");
              }}
            >Send</Button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Chat;