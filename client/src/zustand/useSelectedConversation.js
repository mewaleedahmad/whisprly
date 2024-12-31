import {create} from 'zustand';

const useSelectedConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
    messages : [],
    setMessages : (messages) => set({messages}),
    lastMessage : [],
    setLastMessage : (lastMessage) => set({lastMessage}),
    loadingState : false,
    setLoadingState : (loadingState) => set({loadingState}),
}));

export default useSelectedConversation;