import './Userchats.css';
import ContactCard from '../basic componets/contactcard/contactcard';

export default function Userchats({ onSelectUser }) {
    
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
                <input type='text' placeholder='Search...' />
                <button>Search</button>
                <button className="AddButton">+</button>
        </div>
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

