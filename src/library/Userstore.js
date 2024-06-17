/* need of zustand */
/* zustand is a small, fast and scaleable bearbones state-management solution. It has a tiny footprint and has no dependencies. */
/* it is used to avoid prop drilling and to avoid using context api */  

import { toast } from 'react-toastify';
import { create } from 'zustand'
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
// when ever login the user id is fetch and passed on to here to get the user details

const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,// to show loading spinner when fetching user info
  fetchUserInfo: async (uid) => {
    if(!uid){
        set({currentUser:null,isLoading:false});
        toast.error('User not found');
        return;
    }
    try {
      const docRef = doc(db, 'users', uid);  
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      }
    }
    catch (error) {
        set({ currentUser: null, isLoading: false });
        toast.error('User not found');
    }
  },
}))

export default useUserStore;