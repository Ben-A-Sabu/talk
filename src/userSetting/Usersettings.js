import React, { useState } from 'react';
import './Usersettings.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faDownload, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../library/firebase';
import ChatStore from '../library/Chatstore';
import useUserStore from '../library/Userstore';
export default function Usersettings() {

  const [showPhotos, setShowPhotos] = useState(false);
  const { changeBlock,user,isRecieverBlocked} = ChatStore();
  function togglePhotos() {
    setShowPhotos(!showPhotos);
     
  }

  function handleBlock(id) {
   
   changeBlock(id);
  }

  return (
    <div className="CurrentUserSetting">
      {user && (
        <div className="CurrentUserInfo">
          <img src={user.avatar} alt={user.name} className="CurrentUserImage" />
          <span className="CurrentUserName">{user.name}</span>
          <blockquote className="UserQuote"> Just Keep Believing in yourself </blockquote>
        </div>
      )}

      <div className="UserSettings">
        <div className="settings">Chat Settings
          <button className='dropdown'>
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </div>
        <div className="settings">Shared Files
          <button className='dropdown'>
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        </div>

<div className={`shared-photos ${showPhotos ? 'show' : ''}`}>
  {showPhotos && (
    <div>
      <div className="image-container">
        <img src='https://via.placeholder.com/150' alt="img" className='chat-card-image' />
        <span>Image 1.png</span>
        <button className="download-button">
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>
      <div className="image-container">
        <img src='https://via.placeholder.com/150' alt="img" className='chat-card-image' />
        <span>Image 2.png</span>
        <button className="download-button">
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>
      <div className="image-container">
        <img src='https://via.placeholder.com/150' alt="img" className='chat-card-image' />
        <span>Image 3.png</span>
        <button className="download-button">
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>
      <div className="image-container">
        <img src='https://via.placeholder.com/150' alt="img" className='chat-card-image' />
        <span>Image 4.png</span>
        <button className="download-button">
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>
    </div>
  )}
</div>


<div className="settings"> Shared Photos
          <button className='dropdown' onClick={togglePhotos}>
            {
              showPhotos ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />
            }
          </button>
        </div>

      </div>
      <div className='settingsbtn'>
        <button className="Button" id='Block' onClick={()=>handleBlock(user.id)} > {isRecieverBlocked ? 'Unblock User' : 'Block User'}</button>
        <button className="Button" id='logout' onClick={()=>auth.signOut()}>LogOut</button>
      </div>
    </div>
  );
}

