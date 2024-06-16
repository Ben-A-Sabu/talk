// ContactCard.js
import React from 'react';
import './contactcard.css'; // Import your CSS file for styling
const ContactCard = ({ chats, onClick }) => {
  if (!chats) {
    return null; // or any other placeholder UI indicating loading
  }

  // Helper function to truncate the message
  const truncateMessage = (message, wordLimit) => {
    const words = message.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return message;
  };

  // Use the helper function to truncate the last message to 3 words
  const truncatedMessage = chats.lastMessage ? truncateMessage(chats.lastMessage, 3) : '';

  return (
    <div className='ContactCard row' onClick={onClick}>
      <img src={chats.avatar} alt='profile' className='image' />
      <div className='ContactInfo'>
        <h3>{chats.name}</h3>
        {
          chats.lastMessage !== undefined ?
          <p>Last message: {truncatedMessage}</p> : null
        }
        <p>{chats.time}</p>
      </div>
    </div>
  );
};

  
  export default ContactCard;