import { create } from "zustand";

const useGlobalState = create((set) => ({
  conversations: [],
  setConversations: (conversations) => set({ conversations }),  
  setRemoveConversation: (id) =>
    set((state) => {
      // Check if state.conversations is actually an array before applying filter
      if (!Array.isArray(state.conversations)) {
        return { conversations: [] }; // Default to an empty array if it's not an array
      }
      return {
        conversations: state.conversations.filter((convo) => convo._id !== id),
      };
    }),
  setAddConversation  : (user)=>set((state)=>({
   conversations : Array.isArray(state.conversations) ? [user,...state.conversations] : [user]
  })),

  friends: [],
  setFriends: (friends) => set({ friends }),
  // setAddFriend: (user) =>
  //   set((state) => ({
  //     friends: Array.isArray(state.friends) ? [...state.friends, user] : [user], // Check if friends is an array before adding
  //   })),
  // setRemoveFriend: (id) =>
  //   set((state) => ({
  //     friends: Array.isArray(state.friends)
  //       ? state.friends.filter((friend) => friend._id !== id)
  //       : [], // If not an array, reset to empty array
  //   })),

  friendRequests: [],
  setFriendRequests: (friendRequests) => set({ friendRequests }),
  setHandleFriendRequest : (id) => set((state)=>({
    friendRequests : state.friendRequests.filter((user)=> user._id !== id)
  })),

  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),

  messages: [],
  setMessages: (messages) => set({ messages }),

  lastMessage: [],
  setLastMessage: (lastMessage) => set({ lastMessage }),

  loadingState: false,
  setLoadingState: (loadingState) => set({ loadingState }),
}));

export default useGlobalState;
