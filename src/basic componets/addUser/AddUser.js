import './AddUser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAdd } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { collection, query, where, getDocs, setDoc, serverTimestamp,doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from '../../library/firebase';
import { useEffect, useState } from 'react';
import useUserStore  from '../../library/Userstore';

export default function AddUser() {
    const [searchArray, setSearchArray] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const { currentUser } = useUserStore();

    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('username');
        try {
            const SearchedUserRef = collection(db, "users");
            const q = query(SearchedUserRef, where("Username", "==", name));
            const querySnapshot = await getDocs(q);
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({ name: doc.data().Username, avatar: doc.data().Avatar, id: doc.data().id});
            });
            setSearchArray(users);
        } catch (error) {
            toast.error('User not found');
        }
    }


    useEffect(() => {
        setSearchArray([]); // Clear searchArray when input changes

        return () => {
            setSearchArray([]);
        }
    }, [searchValue]);

    const handleAddUser = (id) => async () =>{
        const chatRef = collection(db, "chats");
        const AddUserRef= collection(db, "userchats");

        console.log(id);

      

        

        try { 
            const newChatRef = doc(chatRef)
            
           await setDoc(newChatRef, {
                createdAt:serverTimestamp(),
                messages: [],
            });
          
            await updateDoc(doc(AddUserRef,id),{
                chats:arrayUnion({
                    chatId:newChatRef.id,
                    lastMessage:'',
                    recieverId:currentUser.id,
                    updatedAt:Date.now(),
                })

            })

                      
            await updateDoc(doc(AddUserRef,currentUser.id),{
                chats:arrayUnion({
                    chatId:newChatRef.id,
                    lastMessage:'',
                    recieverId:id,
                    updatedAt:Date.now(),
                })

            })

            console.log(newChatRef.id);
         //   toast.success('User added successfully');
        } catch (error) {
            toast.error('Unable to add user');
        }
    }




    return (
        <div id="AddUser-Page" className='col'>
            <form id='adduser-info' className='row' onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="username"
                    className='input-detail'
                    name='username'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button type="submit" className='send-button'>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>

            <div id='adduser-result' className='col'>
                {searchArray.map((user, index) => (
                    <div key={index} className='ContactCard row' id='searchcard'>
                        <img src={user.avatar || 'https://via.placeholder.com/150'} alt='profile' className='image' />
                        <h3>{user.name}</h3>
                        {console.log(user)}
                        <button className='send-button' onClick={handleAddUser(user.id)}>
                            <FontAwesomeIcon icon={faAdd} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
