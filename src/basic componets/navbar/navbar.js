import React from 'react';
import './navbar.css'; // Import your CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faVideo ,faCog} from '@fortawesome/free-solid-svg-icons';
import ChatStore from '../../library/Chatstore';



const Navbar = ({ user }) => {
    const {isWindowsize} = ChatStore();
    return (
        <div className='ChatHeader'>    
            <div className="ContactUserInfo ">
            <img  src={user.avatar ? user.avatar : "../assets/m1.webp"} alt="user_profile" className="ContactUserImage" />

                <div className='col'>
                    <span className="ContactUserName">{user.name}</span>
                    <span className="ContactUserStatus">Online</span>
                </div>
            </div>
            <div className="CallIcons">
               <FontAwesomeIcon icon={faPhone} />
                <FontAwesomeIcon icon={faVideo} />
               {isWindowsize && 
                <FontAwesomeIcon icon={faCog}
                onClick={() => {
                    ChatStore.setState({ischatClicked:false,isSettingsClicked:true,isUserchat:false,})
                }}
                />
                }
            </div>
        </div>
    );
}

export default Navbar;
