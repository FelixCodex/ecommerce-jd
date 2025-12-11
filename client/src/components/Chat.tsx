import {
	HelpCircleIcon,
	MessageSquare,
	MessageSquareIcon,
	Send,
	X,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { formatDateTime, log_data, log_error } from '../utils';
import { ChatMessage } from '../types';
import { sendMessageRequest } from '../Api/chat';
import { DropDownTab } from './DropDownTab';
import { useChat } from '../context/chat.context';
import { useAuth } from '../context/auth.context';
import { DateDivisor } from './chat/DateDivisor';
import { ChatMessageCard } from './chat/ChatMessageCard';
import { LANGUAGE, SUPPORT_EMAIL } from '../consts';
import { usePreferences } from '../hooks/usePreferences';
import { EllipsisAnimated } from './Elements/EllipsisAnimated';

export function Chat() {
	const [message, setMessage] = useState('');
	const {
		isChatOpen,
		setIsChatOpen,
		isInChat,
		setIsInChat,
		chat: chats,
		loadingChat,
		addMessageToChat,
		addLoadingMessage,
		removeLoadingMessage,
		addErrorMessage,
		notSeenMessages,
		setNotSeenMessagesToSeen,
	} = useChat();
	const { logged } = useAuth();
	const [currentQuestion, setCurrentQuestion] = useState('');
	const { preferences } = usePreferences();

	const scrollChat = () => {
		const div = document.getElementById('chatBox');
		if (div) div.scrollTop = 9999;
	};

	useEffect(() => {
		scrollChat();
	}, [chats, isChatOpen]);

	const handleChatSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (message.length == 0) return;

		const dateA = new Date();
		const date = new Date(
			dateA.getFullYear(),
			dateA.getMonth(),
			dateA.getDate(),
			dateA.getHours() + dateA.getTimezoneOffset() / 60,
			dateA.getMinutes() - 2,
			dateA.getSeconds()
		);

		const uuid = window.crypto.randomUUID();

		addMessageToChat({
			id: uuid,
			userId: '',
			isMessageFromUser: 'true',
			message: message,
			created_at: `${formatDateTime(date)}`,
		} as ChatMessage);

		addLoadingMessage({ id: uuid });

		setMessage('');

		try {
			const req = await sendMessageRequest(message);
			if (!req) return;
			if (req.response?.status == 200) {
				log_data('Mensaje recibido');
			}
		} catch (error) {
			log_error(error);
			addErrorMessage({ id: uuid });
		} finally {
			removeLoadingMessage({ id: uuid });
		}
	};

	const messageCards = useCallback(() => {
		return chats.map((c, i, arr) => {
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
			const datePrev = new Date(arr[i - 1].created_at + ' UTC').toDateString();
			const dateActual = new Date(arr[i].created_at + ' UTC').toDateString();
			if (datePrev !== dateActual) {
				return (
					<>
						<DateDivisor dateS={arr[i].created_at}></DateDivisor>
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
	}, [chats]);

	return (
		<div
			className={`${
				logged ? 'fixed' : 'hidden'
			} bottom-0 right-0 mr-4 mb-[5.6rem] w-[90%] sm:w-auto z-50`}
		>
			<div
				className={`${
					isChatOpen && ''
				} flex items-end flex-col w-full sm:w-[26.5rem] gap-2 rounded-lg`}
			>
				<div
					className={`${
						isChatOpen ? 'flex border border-[--light_500]' : 'hidden'
					} flex-col bg-[--light_600] rounded-lg overflow-hidden w-full h-[37.5rem] max-h-[37.5rem] shadow-m shadow-[--light_600]`}
				>
					<div
						className={`flex w-full border-b border-[--light_500] rounded-t-md h-12 items-center justify-center gap-3 p-2`}
					>
						<button
							className={`${
								isInChat ? 'bg-[--light_500]' : 'hover:bg-[--light_500]'
							} flex flex-row text-[--light_50] justify-center items-center gap-1 rounded-md px-3 py-1 text-sm font-medium`}
							onClick={() => setIsInChat(true)}
						>
							<MessageSquare className='w-4 h-4'></MessageSquare>
							Chat
						</button>
						<button
							className={`${
								isInChat ? 'hover:bg-[--light_500]' : 'bg-[--light_500]'
							} flex flex-row text-[--light_50] justify-center items-center gap-1 rounded-md px-3 py-1 text-sm font-medium`}
							onClick={() => setIsInChat(false)}
						>
							<HelpCircleIcon className='w-4 h-4'></HelpCircleIcon>Help
						</button>
					</div>
					<div
						className={`${
							isInChat ? 'flex' : 'hidden'
						} h-full bg-[--bg_sec] flex-col p-3 max-h-full overflow-auto gap-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[--light_400] [&::-webkit-scrollbar-thumb]:rounded-md`}
						id='chatBox'
					>
						<ChatMessageCard
							chat={{
								id: 'welcome_message',
								userId: 'admin',
								isMessageFromUser: 'false',
								message:
									'Comienza una conversación con nosotros y cuentanos si tienes algun problema',
								created_at: 'null',
							}}
							key={'cht-' + 'welcomeChat'}
						></ChatMessageCard>
						{loadingChat ? (
							<div className='flex justify-center mt-4 items-end gap-1 text-lg'>
								<span className='text-[--light_200] font-medium'>
									{LANGUAGE.LOADING[preferences.language]}
								</span>
								<EllipsisAnimated />
							</div>
						) : (
							messageCards()
						)}
					</div>
					<div
						className={`${
							isInChat ? 'hidden' : 'flex'
						} h-full flex-col p-3 max-h-full overflow-auto gap-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[--light_200] [&::-webkit-scrollbar-thumb]:rounded-md`}
					>
						<Questions
							currentQuestion={currentQuestion}
							setCurrentQuestion={setCurrentQuestion}
						/>
					</div>

					<div
						className={`w-full bg-[--bg_sec]  ${
							isInChat ? 'flex' : 'hidden'
						} h-16 px-3 pb-3 items-center`}
					>
						<form
							className='flex h-full w-full shadow-md shadow-[--light_800] rounded-lg overflow-hidden'
							onSubmit={handleChatSubmit}
						>
							<div className='flex w-full'>
								<input
									type='text'
									name='message'
									id='message'
									autoComplete='off'
									value={message}
									onChange={e => setMessage(e.target.value)}
									className='w-full rounded-l-lg focus:z-30 focus:outline-none focus:border text-[--light_50]
											   focus:border-[--brand_color] border border-r-transparent border-[--light_500] text-md p-1 px-2 bg-[--light_600]'
									placeholder='Escribe algo...'
								/>
								<button
									className={`h-full w-12 flex justify-center transition-colors -ml-px rounded-r-lg items-center border border-l-0 border-[--light_500] text-[--light_200] bg-[--light_600] ${
										message.length == 0
											? 'hover:text-[--light_400]'
											: 'hover:text-[--brand_color]'
									}`}
								>
									<Send className='flex justify-center items-center w-7 h-7'></Send>
								</button>
							</div>
						</form>
					</div>
				</div>
				<button
					className={`absolute border -bottom-[4.6rem] cursor-pointer right-0 border-[--light_500] bg-[--bg_sec] w-16 h-16 rounded-full flex justify-center items-center transition-transform`}
					onClick={() => {
						setIsChatOpen(!isChatOpen);
						setNotSeenMessagesToSeen();
					}}
				>
					{notSeenMessages > 0 && !isChatOpen && (
						<div className='absolute -top-3 right-0 rounded-full w-6 h-6 bg-[--brand_color] border border-[--bg_prim]'>
							<div className='w-full h-full flex justify-center items-center text-[--light_100]'>
								{notSeenMessages}
							</div>
						</div>
					)}
					<MessageSquareIcon
						className={`absolute w-9 h-9 transition-[opacity] text-[--brand_color] ${
							isChatOpen ? 'opacity-0 rotate-0' : 'opacity-1 -rotate-12'
						}`}
						fill='var(--brand_color)'
					></MessageSquareIcon>

					<X
						className={`absolute text-[--brand_color] w-10 h-10 transition-[opacity] ${
							isChatOpen ? 'opacity-1 rotate-0' : ' opacity-0 -rotate-12'
						}`}
					></X>
				</button>
			</div>
		</div>
	);
}

function Questions({
	currentQuestion,
	setCurrentQuestion,
}: {
	currentQuestion: string;
	setCurrentQuestion: React.Dispatch<React.SetStateAction<string>>;
}) {
	return (
		<>
			<DropDownTab
				id='metodos'
				question='¿Qué métodos de pago aceptan?'
				answer='Actualmente los pagos se realizan a travéz de la plataforma de pagos Tropipay que acepta pagos con Visa, MasterCard y saldo de Tropipay'
				currentQuestion={currentQuestion}
				setCurrentQuestion={setCurrentQuestion}
			></DropDownTab>
			<DropDownTab
				id='formato'
				question='¿En qué formato están disponibles los modelos 3D?'
				answer='Los modelos se entregan en formato stl'
				currentQuestion={currentQuestion}
				setCurrentQuestion={setCurrentQuestion}
			></DropDownTab>
			<DropDownTab
				id='resolucion'
				question='¿Se incluyen archivos en diferentes resoluciones o tamaños?'
				answer='No, el modelo esta en una sola resolucion y tamaño'
				currentQuestion={currentQuestion}
				setCurrentQuestion={setCurrentQuestion}
			></DropDownTab>
			<DropDownTab
				id='comoDescargar'
				question='¿Cómo descargo un modelo después de comprarlo?'
				answer='En tu perfil estan todos los modelos que has comprado'
				currentQuestion={currentQuestion}
				setCurrentQuestion={setCurrentQuestion}
			></DropDownTab>
			<DropDownTab
				id='tiempo'
				question='¿Cuánto tiempo tengo para descargar un modelo después de la compra?'
				answer='No tienes un tiempo limitado, una vez comprado lo puedes descargar en cualquier momento en tu perfil'
				currentQuestion={currentQuestion}
				setCurrentQuestion={setCurrentQuestion}
			></DropDownTab>
			<DropDownTab
				id='variasDescargas'
				question='¿Puedo descargar el modelo más de una vez?'
				answer='Si, puedes descargar los modelos que has comprado cuantas veces quieras'
				currentQuestion={currentQuestion}
				setCurrentQuestion={setCurrentQuestion}
			></DropDownTab>
			<DropDownTab
				id='problemaAlDescargar'
				question='¿Qué hago si tengo problemas para descargar mi archivo?'
				answer={`Escribenos en el chat incorporado en la pestaña de chat o escribenos un correo a ${SUPPORT_EMAIL} e intentaremos solucionar su problema`}
				currentQuestion={currentQuestion}
				setCurrentQuestion={setCurrentQuestion}
			></DropDownTab>
		</>
	);
}
