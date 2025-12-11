import { Clock } from 'lucide-react';
import { useChat } from '../../context/chat.context';
import { ChatMessage } from '../../types';
import { formatHours, formatMinutes, whichMeridian } from '../../utils';

export function ChatMessageCard({ chat }: { chat: ChatMessage }) {
	const date =
		chat.created_at == 'null' ? null : new Date(chat.created_at + ' UTC');
	const { loadingMessage } = useChat();
	return (
		<div
			className={`relative rounded-lg flex max-w-80 min-h-max h-fit w-fit ${
				chat.isMessageFromUser == 'true'
					? 'self-end !rounded-br-none bg-[--light_600] border-[--light_400] shadow-[--light_800]'
					: '!rounded-bl-none bg-[--light_600] border-[--light_500] shadow-[--light_800]'
			} p-2 border shadow-md`}
		>
			<p className={` text-[--light_50] flex justify-start text-start text-sm`}>
				{chat.message} {date && <>&emsp;&emsp;&emsp;&emsp;</>}
			</p>
			{date && (
				<p
					className={`text-[--light_300] text-sm absolute right-1 bottom-1`}
				>{`${formatHours(date.getHours())}:${formatMinutes(
					date.getMinutes() + 2
				)} ${whichMeridian(date.getHours())}`}</p>
			)}
			{loadingMessage.find(el => el.id == chat.id) && (
				<div className='absolute top-1 right-1 items-end justify-end'>
					<Clock
						className='text-[--light_300]'
						width={13}
						height={13}
					></Clock>
				</div>
			)}
		</div>
	);
}
