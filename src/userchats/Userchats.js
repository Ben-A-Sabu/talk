import './Userchats.css';
import ContactCard from '../basic componets/contactcard/contactcard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import AddUser from '../basic componets/addUser/AddUser';
import { useState } from 'react';

export default function Userchats({ onSelectUser }) {

  const [showAddUser, setAddUser] = useState(false);

  function ShowAddUser() {
    setAddUser(!showAddUser);
  }

  return (
    <div className='UserchatsEnv'>
      <div className="UserInfo">
        <div className='user'>
          <img src="../assets/m1.webp" alt="namae" className="UserImage" />
          <span className="UserName">Ben</span>
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
        <ContactCard name='Ben' lastMessage='Hello' onClick={() => onSelectUser({ name: 'Ben', image: '../assets/m1.webp' })} />
        <ContactCard name='John' lastMessage='Hi' onClick={() =>
          console.log('John') ||
          onSelectUser({ name: 'John', image: '../assets/m1.webp' })} />
        <ContactCard name='Doe' lastMessage='How are you' onClick={() => onSelectUser({ name: 'Doe', image: '../assets/m1.webp' })} />
        <ContactCard name='Jane' lastMessage='I am fine' onClick={() => onSelectUser({ name: 'Jane', image: '../assets/m1.webp' })} />
      </div>
    </div>
  );
}

