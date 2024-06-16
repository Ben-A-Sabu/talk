import React, { useState } from 'react';
import Login from './Login/Login';
import Notification from './basic componets/notification/Notification';
import './App.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './library/firebase';
import useUserStore from './library/Userstore';


import ChatArea from './chatarea/ChatArea';
import Userchats from './userchats/Userchats';
import Usersettings from './userSetting/Usersettings';
import ChatStore from './library/Chatstore';


function App() {

  const [selectedUser, setSelectedUser] = useState(
    { name: 'Ben', image: '../assets/m1.webp' }
  );

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { user, isCurrentUserBlocked } = ChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid);
      } else {
        fetchUserInfo(null);
      }
    });
    return () => {
      unSub();

    }
  }
    , [fetchUserInfo]);

  if (isLoading) {
    return <div className='loading'>Loading...</div>
  }

  return (
    <div className="Layout">
      <div>

        {currentUser ?

          (
            <div className='Layout-container row'>
              <Userchats onSelectUser={setSelectedUser} />
              {
                user ? (
                  <>
                    <ChatArea selectedUser={selectedUser} />
                    <Usersettings selectedUser={selectedUser} />
                  </>
                ) : (
                  isCurrentUserBlocked ? (
                    <div className='no-chat-selected'>You have been Blcoked by the user</div>
                  ) : (
                    <div className='no-chat-selected'>Select a chat to start messaging</div>
                  )
                )
              }
            </div>

          ) : (
            <Login />

          )

        }

        <Notification />
      </div>
    </div>
  );
}

export default App;
