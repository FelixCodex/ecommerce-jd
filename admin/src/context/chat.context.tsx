import { createContext, useEffect, useState } from 'react';
import { ChatCard, ChatMessage } from '../types';
import { getChatsRequest, getMessagesRequest } from '../api/chat.ts';
import { log_data, log_error } from '../utils.ts';

interface ChatContextType {
	loadingChat: boolean;
	loadingUserChat: boolean;
	chat: ChatMessage[];
	addMessageToChat: (chatMesssage: ChatMessage) => void;
	addChatToUserChats: (chat: ChatCard) => void;
	loadMessages: () => void;
	loadingMessage: LoadingMessage[];
	errorMessage: LoadingMessage[];
	setUserCardToNotSeen: (uuid: string) => void;
	setUserCardToSeen: (uuid: string) => void;
	addLoadingMessage: (message: LoadingMessage) => void;
	removeLoadingMessage: (message: LoadingMessage) => void;
	addErrorMessage: (message: LoadingMessage) => void;
	removeErrorMessage: (message: LoadingMessage) => void;
	userChat: ChatCard[];
}

interface ChatProviderProps {
	children: import('react').ReactElement;
}

interface LoadingMessage {
	id: string;
}

export const ChatContext = createContext<ChatContextType>({
	loadingChat: true,
	loadingMessage: [] as LoadingMessage[],
	errorMessage: [] as LoadingMessage[],
	loadingUserChat: true,
	chat: [] as ChatMessage[],
	addMessageToChat: () => {},
	addChatToUserChats: () => {},
	loadMessages: () => {},
	setUserCardToNotSeen: () => {},
	setUserCardToSeen: () => {},
	addLoadingMessage: () => {},
	removeLoadingMessage: () => {},
	addErrorMessage: () => {},
	removeErrorMessage: () => {},
	userChat: [] as ChatCard[],
});

export function ChatProvider({ children }: ChatProviderProps) {
	const [loadingChat, setLoadingChat] = useState(true);
	const [loadingUserChat, setLoadingUserChat] = useState(true);
	const [chat, setChat] = useState([] as ChatMessage[]);
	const [userChat, setUserChat] = useState([] as ChatCard[]);
	const [loadingMessage, setLoadingMessage] = useState([] as LoadingMessage[]);
	const [errorMessage, setErrorMessage] = useState([] as LoadingMessage[]);

	const addMessageToChat = (chatMessage: ChatMessage) => {
		const newState = [...chat, chatMessage];
		setChat(newState);
		return newState;
	};

	const addChatToUserChats = (chat: ChatCard) => {
		const newState = [...userChat, chat];
		setUserChat(newState);
		return newState;
	};

	const setUserCardToNotSeen = (uuid: string) => {
		const index = userChat.findIndex(el => el.userId == uuid);
		console.log(index);
		if (index != -1) {
			userChat[index].seen = false;
		}
	};

	const setUserCardToSeen = (uuid: string) => {
		const index = userChat.findIndex(el => el.id == uuid);
		if (index != -1) {
			userChat[index].seen = true;
		}
	};

	const addLoadingMessage = (message: LoadingMessage) => {
		const newState = [...loadingMessage, message];
		setLoadingMessage(newState);
		return newState;
	};

	const removeLoadingMessage = (message: LoadingMessage) => {
		const newState = loadingMessage.filter(el => el.id != message.id);
		setLoadingMessage(newState);
		return newState;
	};

	const addErrorMessage = (message: LoadingMessage) => {
		const newState = [...errorMessage, message];
		setErrorMessage(newState);
		return newState;
	};

	const removeErrorMessage = (message: LoadingMessage) => {
		const newState = errorMessage.filter(el => el.id != message.id);
		setErrorMessage(newState);
		return newState;
	};

	const loadMessages = async () => {
		setLoadingChat(true);
		try {
			log_data('Starting message request');

			const req = await getMessagesRequest();

			log_data('Response from messages: ', req);

			if (!req.success) throw new Error('Request failed');
			if (req.response?.status == 200) {
				setChat(req.response.data);
			} else {
				setChat([] as ChatMessage[]);
			}
		} catch (error) {
			log_error('Error fetching messages: ', error);
		} finally {
			setLoadingChat(false);
		}
	};

	const loadChats = async () => {
		setLoadingUserChat(true);
		try {
			log_data('Starting chats request');

			const req = await getChatsRequest();

			log_data('Response from chats: ', req);

			if (!req.success) throw new Error('Request failed');
			if (req.response?.status == 200) {
				const newChatsState = req.response.data.map((c: ChatCard) => {
					return { ...c, seen: JSON.parse(`${c.seen}`) };
				});
				setUserChat(newChatsState);
			} else {
				setUserChat([] as ChatCard[]);
			}
		} catch (error) {
			log_error('Error fetching chat data: ', error);
		} finally {
			setLoadingUserChat(false);
		}
	};

	useEffect(() => {
		loadMessages();
		loadChats();
	}, []);

	return (
		<ChatContext.Provider
			value={{
				loadingChat,
				chat,
				addMessageToChat,
				loadMessages,
				addLoadingMessage,
				loadingMessage,
				removeLoadingMessage,
				loadingUserChat,
				userChat,
				addErrorMessage,
				removeErrorMessage,
				errorMessage,
				addChatToUserChats,
				setUserCardToSeen,
				setUserCardToNotSeen,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
}
