import './AddUser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faAdd } from '@fortawesome/free-solid-svg-icons';
export default function AddUser() {

    let searchArray=[
        {
            name:'John Doe',
        },
        {
            name:'Jane Doe',
        },
        {
            name:'John Smith',
        },
        {
            name:'Jane Smith',
        },
        {
            name:'John Johnson',
        },
        {
            name:'Jane Johnson',
        },
    ]

    return (
        <div id="AddUser-Page" className='col'>
          
                <form id='adduser-info' className='row'>
                    <input type="text" placeholder="Name" className='input-detail' />
                    <button type="submit" className='send-button'>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>

                <div id='adduser-result' className='col'>
             
             {
                    searchArray.map((user,index)=>{
                        return(
                            <div key={index} className='ContactCard row' id='searchcard'>
                                <img src='https://via.placeholder.com/150' alt='profile' className='image' />
                                <h3>{user.name}</h3>
                                <button className='send-button'>
                                    <FontAwesomeIcon icon={faAdd} />
                                </button>
                            </div>
                        )
                    })
             }

                </div>    

      
        </div>
    );
}

