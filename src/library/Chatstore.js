/* need of zustand */
/* zustand is a small, fast and scaleable bearbones state-management solution. It has a tiny footprint and has no dependencies. */
/* it is used to avoid prop drilling and to avoid using context api */


import { toast } from 'react-toastify';
import { create } from 'zustand'
import { db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import useUserStore from './Userstore';
// when ever login the user id is fetch and passed on to here to get the user details


  const ChatStore = create((set) => 
    ({  chatId: null,
        user: null,
        isCurrentUserBlocked: false,
        isRecieverBlocked: false,
        isLoading: true,
        ischatClicked:true,
        isSettingsClicked:true,
        isUserchat:true,
        isWindowsize:false,
        changeChat: async (chatId, user) => {
          const CurrentUser = useUserStore.getState().currentUser;
          const isCurrentUserBlocked = user.blockedUsers.includes(CurrentUser.id);
          const isReceiverBlocked = CurrentUser.blockedUsers.includes(user.id);
          
          if (isCurrentUserBlocked) {
            set({
              user: null,
              isCurrentUserBlocked: true,
              isRecieverBlocked: false,
            });
          } else {
            set({
              chatId: chatId,
              user: user,
              isCurrentUserBlocked: false,
              isRecieverBlocked: isReceiverBlocked,
              isLoading: false,
              isClicked:true,


            });
          }
        },

       changeBlock: async (id) => {
         set(state => ({ ...state, isRecieverBlocked: !state.isRecieverBlocked}));
         const CurrentUser = useUserStore.getState().currentUser;
         const userRef = doc(db, 'users', CurrentUser.id);
         try {
           const userDoc = await getDoc(userRef);
           if (userDoc.exists()) {
             const userData = userDoc.data();
             const updatedBlockedUsers = userData.blockedUsers || [];
             set({ user: { ...userData, blockedUsers: updatedBlockedUsers } })
     
             if (updatedBlockedUsers.includes(id)) {
               const index = updatedBlockedUsers.indexOf(id);
               updatedBlockedUsers.splice(index, 1);
             } else {
               updatedBlockedUsers.push(id);
             }
             await updateDoc(userRef, { blockedUsers: updatedBlockedUsers });
           }
         } catch (error) {
           toast.error('Error in blocking user');
         }
       },
  })
);


export default ChatStore;