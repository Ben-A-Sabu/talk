
import './ChatCard.css'
import React from 'react';

export default function Chatcard(props) {
    return (
        <div className='chat-card'>
            <div className='chat-card-header'>
                <h2 className='chat-card-title'>{props.title}</h2>
            </div>
            <div className='chat-card-body'>
                <p className='chat-card-content'>{props.content}</p>
            </div>
        </div>
    );
}