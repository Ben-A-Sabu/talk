import React, { useEffect } from 'react';
import './ChatArea.css';
import Navbar from '../basic componets/navbar/navbar';
import Chatcard from '../basic componets/chatcard/Chatcard';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faCamera, faMicrophone, faImage } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../library/firebase';
import { doc } from 'firebase/firestore';
import useUserStore from '../library/Userstore';
import ChatStore from '../library/Chatstore';

export default function ChatArea() {
  const [TypedMessage, setTypedMessage] = useState('');
  const [MessageArray, setMessageArray] = useState([]); 
  const [emoji, setEmoji] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef(null);
  const { currentUser } = useUserStore();
  const {user,chatId , isCurrentUserBlocked, isRecieverBlocked} = ChatStore();

  console.log(isCurrentUserBlocked,isRecieverBlocked)
  
 
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }
    , [MessageArray]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'chats', chatId), (response) => {
      const messages = response.data().messages;

      setMessageArray(messages);
    });
    return () => {
      unsubscribe();
    };
  }, [chatId]);



  function addEmoji(emojie) {
    setEmoji(emojie);
    setTypedMessage(TypedMessage + emoji);

  }

  function viewEmoji() {
    setShowEmoji(!showEmoji);
  }

  const sendMessage = async(TypedMessage) => {

    // Trim the input value to remove leading and trailing spaces
    const trimmedMessage = TypedMessage.trim();
    // Check if the trimmed message is not empty
    if (trimmedMessage !== '') {
      // If not empty, add the message to the MessageArray
      //setMessageArray([...MessageArray, { message: trimmedMessage, sender: 'me' }]);


      await updateDoc(doc(db, 'chats', chatId), {
       messages:arrayUnion({
        senderId:currentUser.id,
        message:trimmedMessage,
        createdAt:new Date().toISOString(),
       }) 
      });
 
      const UserIds=[currentUser.id,user.id];

      // below method is used to simultaneously update the last message of the chat in both the user's chat list
      // the idea is  that based on the chatId we can get the chat object and update the last message of the chat
      UserIds.forEach(async(userId)=>{
        const userchatRef = doc(db,'userchats',userId);
        const userchatSnap = await getDoc(userchatRef);
        
        if (userchatSnap.exists()) {
          const userchatData = userchatSnap.data();
          const chatIndex = userchatData.chats.findIndex((chat) => chat.chatId === chatId);
          userchatData.chats[chatIndex].lastMessage = trimmedMessage;
          userchatData.chats[chatIndex].isSeen = userId === currentUser.id?true:false;
          userchatData.chats[chatIndex].updatedAt = new Date().toISOString();
          await updateDoc(userchatRef,{
            chats:userchatData.chats
            
          });
        }
  
      });

    }

    if (emoji !== '') {
      viewEmoji();
      setEmoji('');
    }
    setTypedMessage('');

  }



  return (
    <div className='ChatEnv'>
      <Navbar user={user} />
      <div className='chat-area'>
     {
        MessageArray.map((message, index) => {
      if (message.senderId === currentUser.id) {
          return <Chatcard key={index} title={currentUser.Username} className='sent-message' content={message.message} img={currentUser.Avatar} />
      }
       else{
          return <Chatcard key={index} title={user.name} className='left' content={message.message}  img={user.avatar}/>
       } 
         
        })
     }
       
        <div ref={messagesEndRef} />
      </div>

      
       
    
      <footer className='footer'>
        <div className='footer-content'>
          <button className='icon-button'><FontAwesomeIcon icon={faImage} /></button>
          <button className='icon-button'><FontAwesomeIcon icon={faCamera} /></button>
          <button className='icon-button'><FontAwesomeIcon icon={faMicrophone} /></button>
          <input type='text' placeholder='Type a message' className='message-input' value={TypedMessage} onChange={(e) => setTypedMessage(e.target.value)} disabled={isCurrentUserBlocked || isRecieverBlocked }  />
          <button className='send-button' onClick={() => sendMessage(TypedMessage)}>Send</button>
          <button className='icon-button ' onClick={() => viewEmoji()} > <FontAwesomeIcon icon={faSmile} /></button>
        </div>
           
        {showEmoji && <EmojiPicker className='picker' onEmojiClick={(e) => addEmoji(e.emoji)} />
        }
        
      </footer>

      
    </div>
  );
}


