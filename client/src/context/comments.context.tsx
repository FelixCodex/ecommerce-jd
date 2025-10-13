import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Comment } from '../types';
import { createCommentRequest, getCommentsRequest } from '../Api/comment';
import { log_data, log_error } from '../utils';

interface CommentContextType {
	comments: Comment[];
	loadingComments: boolean;
	addComment: (comment: Comment) => void;
	clearComments: () => void;
	createComment: (comment: Comment) => void;
	commentsLoading: Comment[];
	commentsError: Comment[];
}

interface CommentProviderProps {
	children: import('react').ReactElement;
}

export const CommentContext = createContext<CommentContextType>({
	comments: [],
	loadingComments: true,
	addComment: () => {},
	clearComments: () => {},
	createComment: () => {},
	commentsLoading: [],
	commentsError: [],
});

export function CommentProvider({ children }: CommentProviderProps) {
	const [comments, setComments] = useState<Comment[]>([]);
	const [loadingComments, setLoadingComments] = useState(true);
	const [commentsLoading, setCommentsLoading] = useState<Comment[]>([]);
	const [commentsError, setCommentsError] = useState<Comment[]>([]);

	const addComment = useCallback((comment: Comment) => {
		setComments(prevComm => [comment, ...prevComm]);
	}, []);

	const createComment = async (comment: Comment) => {
		try {
			addCommentToLoading(comment);
			const req = await createCommentRequest({
				message: comment.comment,
				productId: comment.productId,
			});

			log_data('Response from create comment: ', req);

			if (!req.success) throw new Error('Create Comment request failed');

			if (req.response?.status === 200) {
				addComment(comment);
			} else {
				addCommentToError(comment);
			}

			removeCommentToLoading(comment.id);
		} catch (error) {
			log_error('Error creating comment data: ', error);
		}
	};

	const clearComments = () => {
		setComments([] as Comment[]);
		return [];
	};

	const addCommentToLoading = (comment: Comment) => {
		setCommentsLoading(prev => [...prev, comment]);
	};

	const removeCommentToLoading = (id: string) => {
		setCommentsLoading(prev => prev.filter(el => el.id != id));
	};

	const addCommentToError = (comment: Comment) => {
		setCommentsError(prev => [...prev, comment]);
	};

	const loadComments = async () => {
		setLoadingComments(true);
		try {
			const req = await getCommentsRequest();
			log_data('Response from comment: ', req);
			if (!req.success) throw new Error('Comment request failed');
			if (req.response?.status === 200) {
				setComments(req.response?.data);
			} else {
				setComments([] as Comment[]);
			}
		} catch (error) {
			log_error('Error fetching comment data: ', error);
			setComments([] as Comment[]);
		} finally {
			setLoadingComments(false);
		}
	};

	useEffect(() => {
		loadComments();
	}, []);

	return (
		<CommentContext.Provider
			value={{
				comments,
				loadingComments,
				addComment,
				clearComments,
				commentsError,
				commentsLoading,
				createComment,
			}}
		>
			{children}
		</CommentContext.Provider>
	);
}

export const useComment = () => {
	const context = useContext(CommentContext);
	if (context == undefined) {
		throw new Error('useComment must be used within a CommentProvider');
	}
	return context;
};
