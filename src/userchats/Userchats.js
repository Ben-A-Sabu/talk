import './Userchats.css';
import ContactCard from '../basic componets/contactcard/contactcard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit } from '@fortawesome/free-solid-svg-icons';
import AddUser from '../basic componets/addUser/AddUser';
import { useEffect, useState } from 'react';
import useUserStore from '../library/Userstore';
import chatStore from '../library/Chatstore';
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from '../library/firebase';


export default function Userchats() {

  const { currentUser } = useUserStore();
  const [showAddUser, setAddUser] = useState(false);
  const [chats, setChats] = useState([]);
  const { changeChat } = chatStore();

  const handleSelect = (chatId, chats) => {
    changeChat(chatId, chats);
    if (window.innerWidth < 600) {
      chatStore.setState({ ischatClicked: true });
      chatStore.setState({ isSettingsClicked: false });
      chatStore.setState({ isUserchat: false });
      chatStore.setState({ isWindowsize: true });
    }
    else {
      chatStore.setState({ ischatClicked: true });
      chatStore.setState({ isSettingsClicked: true });
      chatStore.setState({ isUserchat: true });
      chatStore.setState({ isWindowsize: false });
    }
  }

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'userchats', currentUser.id), async (response) => {
      const items = response.data().chats;
      const Promises = items.map(async (item) => {
        const userDocRef = doc(db, 'users', item.recieverId);
        const userDocSnap = await getDoc(userDocRef);
        const userDoc = {
          id: userDocSnap.id,
          name: userDocSnap.data().Username,
          lastMessage: item.lastMessage,
          time: item.time,
          avatar: userDocSnap.data().Avatar,
          blockedUsers: userDocSnap.data().blockedUsers,
          chatId: item.chatId
        }
        return { ...item, userDoc };
      });
      const chatData = await Promise.all(Promises);
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });
    return () => { unsub();};
  }, [currentUser.id]);


  function ShowAddUser() {
    setAddUser(!showAddUser);
  }

  return (
    <div className='UserchatsEnv col'>
      <div className="UserInfo row">
        <img src={currentUser.Avatar || 'https://via.placeholder.com/150'} alt="namae" className="UserImage" />
        <span className="UserName">{currentUser.Username}</span>
        <span><FontAwesomeIcon icon={faEdit} className='Button' /></span>
      </div>
      <div className='search-container row'>
        <button className='search-button'><FontAwesomeIcon icon={faSearch} /></button>
        <input type='text' placeholder='Search...' className='search-input' />
        <button className="Button" id='AddUser' onClick={() => ShowAddUser()} >+</button>
      </div>
      {showAddUser && <AddUser />}
      <div className='Userchats col'>
       {chats.map((chat, index) => {
        return <ContactCard key={index} chats={chat.userDoc} onClick={() => { handleSelect(chat.chatId, chat.userDoc)}} />;
        })
       }
      </div>
    </div>
  );
}



