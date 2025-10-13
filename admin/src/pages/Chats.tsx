import { CircleDashed, Clock, Send, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import {
	formatDateTime,
	formatHours,
	formatMinutes,
	whichMeridian,
} from '../utils';
import { useChat } from '../hooks/useChat';
import { useUser } from '../hooks/useUser';
import { ChatCard, ChatMessage } from '../types';
import { sendMessageRequest } from '../api/chat';
import { useSocket } from '../hooks/useSocket';

function UserChatCard({
	setChatSelected,
	chatSelected,
	chat,
	lastChat,
}: {
	setChatSelected: (id: string) => void;
	chatSelected: string | null;
	chat: ChatCard;
	lastChat: ChatMessage;
}) {
	const date = new Date(lastChat.created_at + ' UTC');
	const { users } = useUser();
	const { setUserCardToSeen } = useChat();
	const { emitSeen } = useSocket();

	return (
		<div
			key={chat.id}
			className={`flex h-16 min-w-80 w-full md:w-80 justify-between items-center px-3 py-1 hover:shadow-lg cursor-pointer transition-[scale,box-shadow] bg-white border-2 ${
				chatSelected == chat.id ? 'border-amber-300' : 'border-gray-400'
			} rounded-md shadow-md`}
			onClick={() => {
				setChatSelected(chat.id);
				setUserCardToSeen(chat.id);
				emitSeen(chat.id);
			}}
		>
			<div className='flex max-w-[calc(100%-66px)] h-full flex-col justify-between items-start'>
				<p className='text-lg  select-none'>
					{users != null && users.findIndex(el => el.id == chat.userId) != -1
						? users[users.findIndex(el => el.id == chat.userId)].username
						: ''}
				</p>
				<p className='text-md text-gray-600 overflow-ellipsis overflow-hidden max-w-full text-nowrap whitespace-nowrap select-none'>
					{lastChat.isMessageFromUser == 'false' && 'Tu: '}
					{lastChat.message}
				</p>
			</div>
			<div className='flex h-full flex-col justify-between items-end'>
				<p className=' select-none'>{`${formatHours(
					date.getHours()
				)}:${formatMinutes(date.getMinutes())} ${whichMeridian(
					date.getHours()
				)}`}</p>
				<div
					className={`${
						chat.seen && 'hidden'
					} w-4 h-4 rounded-full bg-green-400 m-1`}
				></div>
			</div>
		</div>
	);
}

function ChatMessageCard({ chat }: { chat: ChatMessage }) {
	const date = new Date(chat.created_at + ' UTC');
	const { loadingMessage, errorMessage } = useChat();
	const id = `${chat.id}-${chat.created_at}`;
	return (
		<div
			key={id}
			className={`relative flex max-w-sm min-h-max h-fit w-fit ${
				chat.isMessageFromUser == 'false' && 'self-end'
			} p-2 border rounded-md border-gray-300 bg-gray-50`}
		>
			<p
				className='flex justify-start text-start'
				key={id + '-1'}
			>
				{chat.message} &emsp;&emsp; &emsp;
			</p>
			<p
				className='text-sm absolute right-1 bottom-1 text-gray-500'
				key={id + '-2'}
			>{`${formatHours(date.getHours())}:${formatMinutes(
				date.getMinutes()
			)} ${whichMeridian(date.getHours())}`}</p>

			{loadingMessage.find(el => el.id == chat.id) && (
				<div
					className='absolute top-1 right-1 items-end justify-end'
					key={id + '-3'}
				>
					<Clock
						className='text-gray-500'
						width={13}
						height={13}
					></Clock>
				</div>
			)}
			{errorMessage.find(el => el.id == chat.id) && (
				<div
					className='absolute top-1 right-1 items-end justify-end'
					key={id + '-4'}
				>
					<X
						className='text-gray-500'
						width={13}
						height={13}
					></X>
				</div>
			)}
		</div>
	);
}

function DateDivisor({ dateS }: { dateS: string }) {
	const date = new Date(dateS + ' UTC');
	return (
		<div
			key={date.getTime()}
			className={`relative flex w-full justify-center items-center`}
		>
			<div
				className='border-b w-[80%] absolute border-gray-300'
				key={date.getTime() + '1'}
			></div>
			<p
				className='bg-white z-10 px-4 text-gray-400'
				key={date.getTime() + '2'}
			>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</p>
		</div>
	);
}

export function Chats() {
	const [chatSelected, setChatSelected] = useState<string | null>(null);
	const [message, setMessage] = useState<string>('');
	const {
		chat: chats,
		userChat: userChats,
		loadingChat,
		loadingUserChat,
		addMessageToChat,
		addLoadingMessage,
		removeLoadingMessage,
		addErrorMessage,
	} = useChat();
	const { users } = useUser();
	const { connectAdmin } = useSocket();

	const scrollChat = () => {
		const div = document.getElementById('chatBox');
		if (div) div.scrollTop = 9999;
	};

	useEffect(() => {
		scrollChat();
	}, [chatSelected, chats]);

	useEffect(() => {
		connectAdmin();
	}, []);

	const userChatCards = useCallback(() => {
		return userChats.length != 0 ? (
			userChats.reverse().map(user => {
				const lastMessage = chats.filter(el => el.userId == user.userId)[
					chats.filter(el => el.userId == user.userId).length - 1
				];

				return (
					<UserChatCard
						key={user.id}
						setChatSelected={setChatSelected}
						chatSelected={chatSelected}
						chat={user}
						lastChat={
							lastMessage
								? lastMessage
								: ({
										isMessageFromUser: 'true',
										created_at: `${new Date().getTime()}`,
								  } as ChatMessage)
						}
					/>
				);
			})
		) : (
			// <div className='flex justify-center items-center gap-3'>
			// 	<span className='text-3xl'>No hay chats disponibles</span>
			// </div>
			<UserChatCard
				key={'123'}
				setChatSelected={setChatSelected}
				chatSelected={chatSelected}
				chat={{
					id: '4123',
					userId: '123',
					seen: false,
				}}
				lastChat={
					{
						isMessageFromUser: 'true',
						created_at: `${new Date().getTime()}`,
					} as ChatMessage
				}
			/>
		);
	}, [chatSelected, chats, userChats]);

	const messageCards = useCallback(() => {
		return chats
			.filter(
				el => el.userId == userChats.find(el => el.id == chatSelected)?.userId
			)
			.map((c, i, arr) => {
				if (i == 0) {
					return (
						<>
							<DateDivisor dateS={`${new Date(c.created_at)}`}></DateDivisor>
							<ChatMessageCard
								chat={c}
								key={'cht-' + c.id}
							></ChatMessageCard>
						</>
					);
				}
				const dayPrev = new Date(arr[i - 1].created_at + ' UTC').toDateString();
				const dayActual = new Date(arr[i].created_at + ' UTC').toDateString();
				if (dayPrev !== dayActual) {
					return (
						<>
							<DateDivisor
								dateS={`${new Date(arr[i].created_at)}`}
							></DateDivisor>
							<ChatMessageCard
								chat={c}
								key={'cht-' + c.id}
							></ChatMessageCard>
						</>
					);
				}
				return (
					<ChatMessageCard
						chat={c}
						key={'cht-' + c.id}
					></ChatMessageCard>
				);
			});
	}, [chatSelected, chats, userChats]);

	const handleChatSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const dateA = new Date();
		const date = new Date(
			dateA.getFullYear(),
			dateA.getMonth(),
			dateA.getDate(),
			dateA.getHours() + 5,
			dateA.getMinutes()
		);

		const uuid = window.crypto.randomUUID();

		const userId = userChats.find(el => el.id == chatSelected)?.userId;
		console.log(userId);
		if (userId == undefined) return;

		addMessageToChat({
			id: uuid,
			userId: userId,
			isMessageFromUser: 'false',
			message: message,
			created_at: `${formatDateTime(date)}`,
		} as ChatMessage);

		addLoadingMessage({ id: uuid });

		setMessage('');

		try {
			const req = await sendMessageRequest(`${userId}`, message);
			if (req.success && req.response?.status == 200) {
				console.log('Mensaje recibido');
			}
		} catch (error) {
			addErrorMessage({ id: uuid });
			console.log(error);
		} finally {
			removeLoadingMessage({ id: uuid });
		}
	};

	return (
		<div className='w-full h-full flex flex-col items-center '>
			<div
				className={`w-full max-w-[81.25rem] py-13 h-full px-3 lg:px-6  flex flex-row justify-between items-start relative`}
			>
				<div
					className={`w-full ${
						chatSelected != null ? 'hidden' : ''
					} md:w-fit flex flex-col justify-start md:flex gap-4 max-h-[42.12rem] pr-2 pb-4 pt-0 overflow-auto`}
				>
					{!loadingUserChat ? (
						userChatCards()
					) : (
						<div className='flex justify-center items-center gap-3 min-w-80 w-80'>
							<CircleDashed className='w-10 h-10 loader'></CircleDashed>
							<span className='text-3xl'>Cargando chats...</span>
						</div>
					)}
				</div>
				<div
					className={`relative md:flex flex-col overflow-hidden bg-white border-2 transition-transform duration-300 ease-out right-0 ${
						chatSelected != null ? '' : 'hidden'
					} rounded-lg min-w-0 w-full md:w-auto grow h-full border-gray-300`}
				>
					<div
						className={`flex w-full border-b-2 relative border-gray-300 h-12 items-center p-2`}
					>
						{chatSelected != null && (
							<p className='text-xl'>
								{
									users?.find(
										el =>
											el.id ==
											userChats.find(el => el.id == chatSelected)?.userId
									)?.username
								}
							</p>
						)}
						{chatSelected != null && (
							<button
								className='p-1 absolute right-1.5 rounded-md border  items-center justify-center border-gray-300 text-gray-600 cursor-pointer hover:border-gray-400 transition-colors flex md:hidden'
								onClick={() => {
									setChatSelected(null);
								}}
							>
								<X className='w-5 h-5' />
							</button>
						)}
					</div>
					<div
						className='flex min-h-0 flex-col p-3 max-h-[calc(100%-96px)] overflow-auto gap-2'
						key={'chatBox'}
						id={'chatBox'}
					>
						{chatSelected != null &&
							userChats &&
							!loadingChat &&
							messageCards()}
					</div>
					<div
						className={`flex w-full border-t-2 ${
							chatSelected != null ? 'border-gray-300' : 'border-gray-300'
						} h-12 items-center`}
					>
						<form
							action=''
							className='flex h-full w-full'
							onSubmit={handleChatSubmit}
						>
							<div className='flex w-full'>
								<input
									type='text'
									name='message'
									id='message'
									value={message}
									disabled={chatSelected == null}
									onChange={e => setMessage(e.target.value)}
									className='w-full rounded-bl-md focus:z-30 focus:outline-indigo-500 text-lg p-1 px-2'
								/>
								<button
									disabled={
										chatSelected == null ||
										message == undefined ||
										message.length == 0
									}
									className={`h-full w-12 flex justify-center items-center ${
										chatSelected == null || message == undefined
											? 'hover:text-gray-500'
											: 'hover:text-indigo-600 hover:bg-indigo-100'
									} rounded-br-md`}
								>
									<Send className='flex justify-center items-center w-8 h-8'></Send>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
