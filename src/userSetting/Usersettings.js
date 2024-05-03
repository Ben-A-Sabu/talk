import './Usersettings.css';

export default function Usersettings({ selectedUser }) {
  console.log(selectedUser)

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
      <button className='dropdown'>v</button>
      </div>  
      <div className="settings">Shared Files
      <button className='dropdown'>v</button>
      </div>
      <div className="settings">Shared Photos
      <button className='dropdown'>v</button>
      </div>
    </div>

    <button className="BlockButton">Block User</button>
 
</div>);}


