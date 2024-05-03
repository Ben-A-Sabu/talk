import React, { useState } from 'react';
import ChatArea from './chatarea/ChatArea';
import Userchats from './userchats/Userchats';
import Usersettings from './userSetting/Usersettings';
import './App.css';

function App() {
  const [selectedUser, setSelectedUser] = useState(
    { name: 'Ben', image: '../assets/m1.webp' }
  );

  return (
    <div className="Layout">
      <Userchats onSelectUser={setSelectedUser} />
      <ChatArea selectedUser={selectedUser} />
      <Usersettings selectedUser={selectedUser} />
    </div>
  );
}

export default App;
