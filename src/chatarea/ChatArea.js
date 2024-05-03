import React from 'react';
import './ChatArea.css';
import Navbar from '../basic componets/navbar/navbar';
import Chatcard from '../basic componets/chatcard/Chatcard';
import { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faCamera, faMicrophone, faImage } from '@fortawesome/free-solid-svg-icons';

export default function ChatArea({ selectedUser }) {
   
    const [TypedMessage, setTypedMessage] = useState('');
    const [MessageArray, setMessageArray] = useState([]); // [ {message: 'Hello', sender: 'me'}, {message: 'Hi', sender: 'you'}

    console.log(selectedUser)
    
    function sendMessage(TypedMessage) {
        // Trim the input value to remove leading and trailing spaces
        const trimmedMessage = TypedMessage.trim();      
        // Check if the trimmed message is not empty
        if (trimmedMessage !== '') {
          // If not empty, add the message to the MessageArray
          setMessageArray([...MessageArray, { message: trimmedMessage, sender: 'me' }]);
        }

        setTypedMessage('');
      }
      
    return (
        <div className='ChatEnv'>
        <Navbar user={selectedUser}/>
        <div className='chat-area'>
            {selectedUser &&(
                MessageArray.map((message, index) => {
                    return <Chatcard key={index} title={message.sender} content={message.message}/>
                }))
            }   
        </div>
<footer className='footer'>
  <div className='footer-content'>
  <button className='icon-button'><FontAwesomeIcon icon={faImage} /></button>
    <button className='icon-button'><FontAwesomeIcon icon={faCamera} /></button>
    <button className='icon-button'><FontAwesomeIcon icon={faMicrophone} /></button>
    <input type='text' placeholder='Type a message' className='message-input' value={TypedMessage} onChange={(e) => setTypedMessage(e.target.value)} />
    <button className='send-button' onClick={() => sendMessage(TypedMessage)}>Send</button>
    <button className='icon-button'><FontAwesomeIcon icon={faSmile} /></button>
  </div>
</footer>

        </div>
    );
    }


