import './ChatCard.css'
import React from 'react';

export default function ChatCard(props) {
    // Extracting props
    const { title, content, className } = props;

    // Concatenating custom class with default class
    const cardClasses = `chat-card ${className}`;


    return (
        <div className={cardClasses}>
            <div className='chat-card-header row'>
                <img src='https://via.placeholder.com/150' alt={title} className='chat-card-image' />
                <h2 className='chat-card-title'>{title}</h2>
            </div>
            <div className='chat-card-body'>
                <p className='chat-card-content'>{content}</p>
            </div>
        </div>
    );
}
