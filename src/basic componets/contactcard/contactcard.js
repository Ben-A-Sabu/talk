// ContactCard.js
import React from 'react';
import './contactcard.css'; // Import your CSS file for styling

const ContactCard = ({ name, lastMessage,onClick }) => {
    return (
        <div className='ContactCard row' onClick={onClick}>
            <img src='https://via.placeholder.com/150' alt='profile' className='image' />
            <div className='ContactInfo'>
                <h3>{name}</h3>
                <p>Last message: {lastMessage}</p>
            </div>
        </div>
    );
}

export default ContactCard;
