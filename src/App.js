import React, { useState } from 'react';
import ChatArea from './chatarea/ChatArea';
import Userchats from './userchats/Userchats';
import Usersettings from './userSetting/Usersettings';
import Login from './Login/Login';
import Notification from './basic componets/notification/Notification';
import './App.css';

function App() {
  const [selectedUser, setSelectedUser] = useState(
    { name: 'Ben', image: '../assets/m1.webp' }
  );

  return (
    <div className="Layout">
      <div className='Layout-container row'>
     <Login />
{/* 
      <Userchats onSelectUser={setSelectedUser} />
      <ChatArea selectedUser={selectedUser} />
      <Usersettings selectedUser={selectedUser} />
      */}
      <Notification />
      </div>
    </div>
  );
}

export default App;
