import logo from './logo.svg';
import './App.css';
import React, { useState,useEffect,useRef } from 'react';
import connection  from './utils/signalr';
import axios from 'axios';
import { HOST,SEND_PRODUCE_PREFIX } from './constraints/connection-const';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './styles/ListItem.css';
import './styles/ListItemText.css';


const Chat = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [messages, setMessages] = useState([]);


  useEffect(() => {
      connection.on("ReceiveMessage", (sendJsonMessage) => {
          setMessages(messages => [...messages, { sendJsonMessage }]);
      });

      connection.start().catch(err => console.error(err.toString()));

      return () => {
          connection.off("ReceiveMessage");
      };
  }, []);

  const sendMessage = async () => {
      try {
          await axios.post(`${HOST}/${SEND_PRODUCE_PREFIX}`, {
              kafkaJsonMessage: jsonInput
          });
      } catch (error) {
          console.error('There was an error sending the message!', error);
      }
  };

  return (
      <div>
          <input type="text" value={jsonInput} onChange={e => setJsonInput(e.target.value)} placeholder="User" />
          <button onClick={sendMessage}>Send</button>
          <ul>
          <List
            sx={{
              width: '100%',
              maxWidth: '90%',
              bgcolor: 'background.paper',
              border: '1px solid black',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }}
            subheader={<ul />}
          >
              {messages.map((msg, index) => (
                <div className="list-item">
              <ListItem>
              <div className="list-item-text">
                <ListItemText secondary={msg.sendJsonMessage} />
                </div>
              </ListItem>     
              </div>
              ))}
             </List>         
          </ul>
      </div>
  );
};

export default Chat;