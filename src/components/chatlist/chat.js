import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, message } from "antd";
import {
  findChatMessages,
  findChatMessage,
  findItemMatches,
  getItem,
} from "./ApiUtil";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";
import { getDomain } from '../../helpers/getDomain';
import BackToInventory from "../RedirectButtons/BackToInventory";


var stompClient = null;
const Chat = ({match:{params:{id}}}) => {
  const [text, setText] = useState("");
  const [idNumber, setIdNumber] = useState(id);
  const [contacts, setContacts] = useState();
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
    SockJS = new SockJS(getDomain() + "/ws");
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
    //setCurrentItem(getItem(idNumber))
    getItem(id).then((item)=>{
      setCurrentItem(item);
    });
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
    <div id="frame">
      <div id="sidepanel">
        <div id="profile">
          <div class="wrap">
            <div>your current item</div>
            <div>Title: {curremtItem.title}</div>
            <div>Description: {curremtItem.description}</div>
          </div>
        </div>
        <div id="search" />
        <div id="contacts">
          <ul>
          {!contacts && <div>you have no matches for this item</div>}
            {contacts && contacts.map((contact) => (
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
                    <div class="meta">
                      <p class="name">{contact.name}</p>
                    </div>
                  </div>
                </li>
                  <div onClick={() => alert("unmatch this item")}>unmatch</div>
                  <div onClick={() => alert("report this item")}>report</div>
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
                if (contacts && event.key === "Enter") {
                  sendMessage(text);
                  setText("");
                }
              }}
            />
            <Button
              onClick={() => {
                if(contacts) {
                  sendMessage(text);
                  setText("");
                }
              }}
            >Send</Button>
          </div>
        </div>
      </div>
      <BackToInventory/>
    </div>

  );
};

export default Chat;
