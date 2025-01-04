import {create} from 'zustand';

const useGlobalState = create((set) => ({
    conversations : [],
    setConversations : (conversations) => set({conversations}),
    friends : [],
    setFriends : (friends) => set({friends}),
    friendRequests : [],
    setFriendRequests : (friendRequests) => set({friendRequests}),
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
    messages : [],
    setMessages : (messages) => set({messages}),
    lastMessage : [],
    setLastMessage : (lastMessage) => set({lastMessage}),
    loadingState : false,
    setLoadingState : (loadingState) => set({loadingState}),
}));

export default useGlobalState;