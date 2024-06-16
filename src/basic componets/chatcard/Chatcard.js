import './ChatCard.css'
import React from 'react';

export default function ChatCard(props) {
    // Extracting props
    const { title, content, className,img } = props;
    const placeholderImage = 'https://via.placeholder.com/150';
    const imageSrc = img ? img : placeholderImage;
    const cardClasses = `chat-card ${className}`;
    
    return (
        <div className={cardClasses}>
            <div className='chat-card-header row'>
            <img src={imageSrc} alt={title} className='chat-card-image' />
                <h2 className='chat-card-title'>{title}</h2>
            </div>
            <div className='chat-card-body'>
                <p className='chat-card-content'>{content}</p>
            </div>
        </div>
    );
}
