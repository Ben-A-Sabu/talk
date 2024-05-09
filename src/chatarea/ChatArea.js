import React, { useEffect } from 'react';
import './ChatArea.css';
import Navbar from '../basic componets/navbar/navbar';
import Chatcard from '../basic componets/chatcard/Chatcard';
import { useState,useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faCamera, faMicrophone, faImage } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';

export default function ChatArea({ selectedUser }) {   
    const [TypedMessage, setTypedMessage] = useState('');
    const [MessageArray, setMessageArray] = useState([
        { message: 'Hello', sender: 'me' },
        { message: 'Hi', sender: 'yousaf'},
        {message: 'How are you', sender: 'yousaf' },
        {message: 'I am fine', sender: 'me'},
        {message: 'How about you', sender: 'me'},
        {message: 'I am also fine', sender: 'yousaf'},  
    ]); // [ {message: 'Hello', sender: 'me'}, {message: 'Hi', sender: 'you'}   
    const [emoji, setEmoji] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    ,[MessageArray]);

    function addEmoji(emojie) {
      setEmoji(emojie);
      setTypedMessage(TypedMessage + emoji);

      }

    function viewEmoji() {
      setShowEmoji(!showEmoji);
    }  


    
    function sendMessage(TypedMessage) {
        // Trim the input value to remove leading and trailing spaces
        const trimmedMessage = TypedMessage.trim();      
        // Check if the trimmed message is not empty
        if (trimmedMessage !== '') {
          // If not empty, add the message to the MessageArray
          setMessageArray([...MessageArray, { message: trimmedMessage, sender: 'me' }]);
        }
        
        if (emoji !== '') {
          viewEmoji();
          setEmoji('');
        }

        setTypedMessage('');
       
        
      }
      
    return (
        <div className='ChatEnv'>
        <Navbar user={selectedUser}/>
        <div className='chat-area'>
        {selectedUser &&
                    MessageArray.map((message, index) => (
                        <Chatcard
                            key={index}
                            title={message.sender}
                            content={message.message}
                            className={message.sender === 'me' ? 'sent-message' : 'received-message'}
                        />
                    ))
                }

         <div ref={messagesEndRef} />
        </div>
        
        <footer className='footer'>
  <div className='footer-content'>
    <button className='icon-button'><FontAwesomeIcon icon={faImage} /></button>
    <button className='icon-button'><FontAwesomeIcon icon={faCamera} /></button>
    <button className='icon-button'><FontAwesomeIcon icon={faMicrophone} /></button>
    <input type='text' placeholder='Type a message' className='message-input' value={TypedMessage} onChange={(e) => setTypedMessage(e.target.value)} />
    <button className='send-button' onClick={() => sendMessage(TypedMessage)}>Send</button>
    <button className='icon-button ' onClick={()=> viewEmoji()} > <FontAwesomeIcon icon={faSmile} /></button>
  </div>
  {showEmoji && <EmojiPicker className='picker' onEmojiClick={(e)=>addEmoji(e.emoji)}/>
  }
</footer>


        </div>
    );
    }


