import './App.css';
import Login from './Login/Login';
import Notification from './basic componets/notification/Notification';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './library/firebase';
import useUserStore from './library/Userstore';
import ChatStore from './library/Chatstore';
import ChatArea from './chatarea/ChatArea';
import Userchats from './userchats/Userchats';
import Usersettings from './userSetting/Usersettings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
function App() {

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { user, isCurrentUserBlocked,ischatClicked,isUserchat,isSettingsClicked,isWindowsize } = ChatStore();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth < 600) {
        ChatStore.setState({ ischatClicked: false, isSettingsClicked: false, isUserchat: true ,isWindowsize:true});
      }
      else {
        ChatStore.setState({ ischatClicked: true, isSettingsClicked: true, isUserchat: true ,isWindowsize:false});
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },);

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
  }, [fetchUserInfo]);

  if (isLoading) {
    return <div className='loading'>Loading...</div>
  }

  return (
    <div className="Layout">


      {currentUser ? (
        <div className="Layout-container">
          {isWindowsize &&
                 
        <span className="sidemenu"><FontAwesomeIcon icon={faCommentAlt}
        onClick={() => {
          ChatStore.setState({ischatClicked:false,isSettingsClicked:false,
          isUserchat:true,isWindowsize:true
          })
        }}
        /></span>

}
         {isUserchat && <Userchats />}
          {user ? (
            <>
            {ischatClicked && <ChatArea />}
            {isSettingsClicked && <Usersettings />}
            </>
          ) : (
        
            <div className="no-chat-selected">
              {isCurrentUserBlocked ? 'You have been blocked by the user' : 'Select a chat to start messaging'}
            </div>
            
          )}
        </div>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
  
  
}

export default App;
