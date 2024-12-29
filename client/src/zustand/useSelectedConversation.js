import {create} from 'zustand';

const useSelectedConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
}));

export default useSelectedConversation;