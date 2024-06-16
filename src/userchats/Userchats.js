import './Userchats.css';
import ContactCard from '../basic componets/contactcard/contactcard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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

  const handleSelect = (chatId,chats) => {
    changeChat(chatId,chats);
    console.log(chats);

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
    return () => {
      unsub();
    };
  }
    , [currentUser.id]);


  function ShowAddUser() {
    setAddUser(!showAddUser);
  }

  return (
    <div className='UserchatsEnv'>
      <div className="UserInfo">
        <div className='user'>
          <img src={currentUser.Avatar || 'https://via.placeholder.com/150'} alt="namae" className="UserImage" />
          <span className="UserName">{currentUser.Username}</span>
        </div>
        <span>edit</span>
      </div>
      <div className='SearchBar'>
        <div className='search-container'>
          <button className='search-button'><FontAwesomeIcon icon={faSearch} /></button>
          <input type='text' placeholder='Search...' className='search-input' />
        </div>
        <button className="AddButton" onClick={() => ShowAddUser()} >+</button>
      </div>
      {showAddUser && <AddUser />}
      <div className='Userchats'>
        {chats.map((chat, index) => {
          return <ContactCard key={index} chats={chat.userDoc} onClick={
            () => {
              handleSelect(chat.chatId,chat.userDoc)
            }
          } />;
        })}
      </div>
    </div>
  );
}



