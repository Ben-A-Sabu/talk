import React, { useState } from 'react';
import './Usersettings.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faDownload, faAngleUp } from '@fortawesome/free-solid-svg-icons';

export default function Usersettings({ selectedUser }) {
  const [showPhotos, setShowPhotos] = useState(false);

  function togglePhotos() {
    setShowPhotos(!showPhotos);
     
  }

  return (
    <div className="CurrentUserSetting">
      {selectedUser && (
        <div className="CurrentUserInfo">
          <img src={selectedUser.image} alt={selectedUser.name} className="CurrentUserImage" />
          <span className="CurrentUserName">{selectedUser.name}</span>
          <blockquote className="UserQuote">
            Just Keep Believing IN yourself
          </blockquote>
          <span>edit</span>
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
        <button className="Button" id='Block'>Block User</button>
        <button className="Button" id='logout'>LogOut</button>

      </div>
    </div>
  );
}
