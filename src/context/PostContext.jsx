import { createContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { v4 as uuid } from 'uuid';

import postReducerActions from '../actions/postActions';

import postsApi from '../api/postsApi';
import commentsApi from '../api/commentsApi';
import reactionsApi from '../api/reactionsApi';

import postReducer from '../reducers/postReducer';

const initialState = {
	isLoading: false,
	posts: null,
	post: null,
	reactionsEmojis: null,
	error: '',
};

const PostContext = createContext(initialState);

export const PostProvider = ({ children }) => {
	const [state, dispatch] = useReducer(postReducer, initialState);
	const firstMount = useRef(true);

	useEffect(() => {
		if (firstMount.current) {
			fetchAllPosts();
			reactionsApi.getReactionEmojis().then((response) => {
				if (response.success)
					dispatch({
						type: postReducerActions.FETCH_REACTION_EMOJIS,
						payload: response.data,
					});
				else console.log(response.data);
			});
		}

		return () => {
			firstMount.current = false;
		};
	}, []);

	const fetchAllPosts = useCallback(async () => {
		dispatch({ type: postReducerActions.LOADING });

		const response = await postsApi.fetchAllPosts();

		if (response.success)
			return dispatch({
				type: postReducerActions.POSTS_FETCH_SUCCESS,
				payload: response.data,
			});

		return dispatch({ type: postReducerActions.ERROR, payload: response.data });
	}, []);

	const fetchPostById = useCallback(async (id) => {
		dispatch({ type: postReducerActions.LOADING });

		const response = await postsApi.fetchPostById(id);

		if (response.success)
			return dispatch({
				type: postReducerActions.SINGLE_POST_FETCH_SUCCESS,
				payload: response.data,
			});

		return dispatch({ type: postReducerActions.ERROR, payload: response.data });
	}, []);

	const createPost = useCallback(async (data) => {
		data = { ...data, id: uuid(), createdAt: new Date().toISOString() };

		const response = await postsApi.createPost(data);

		if (response.success) {
			return dispatch({
				type: postReducerActions.POST_CREATE,
				payload: { ...response.data, comments: [], reactions: [] },
			});
		}

		return response.data;
	}, []);

	const editPost = useCallback(async (data) => {
		data = { ...data, updatedAt: new Date().toISOString() };
		const response = await postsApi.editPost(data.id, data);

		if (response.success) return await fetchAllPosts();

		return response.data;
	}, []);

	const deletePost = useCallback(async (id, userId) => {
		const response = await postsApi.deletePost(id);
		if (response.success) {
			return dispatch({ type: postReducerActions.POST_DELETE, payload: { id, userId } });
		}
		dispatch({ type: postReducerActions.ERROR, payload: response.data });
	}, []);

	const addComment = useCallback(async (data) => {
		data = { ...data, id: uuid(), createdAt: new Date().toDateString() };
		const response = await commentsApi.create(data);
		if (response.success) {
			return dispatch({
				type: postReducerActions.COMMENT_ADDED,
				payload: response.data,
			});
		}
		return response.data;
	}, []);

	const deleteComment = useCallback(async (comment) => {
		const response = await commentsApi.destroy(comment.id);
		if (response.success) {
			return dispatch({
				type: postReducerActions.COMMENT_DELETED,
				payload: comment,
			});
		}
		return response.data;
	}, []);

	const addReaction = useCallback(async (reaction) => {
		reaction = { ...reaction, id: uuid() };
		dispatch({ type: postReducerActions.REACTION_ADDED, payload: reaction });
		const response = await reactionsApi.create(reaction);
		if (response.success) return;
		dispatch({ type: postReducerActions.REACTION_REMOVED, payload: reaction });
		return response.data;
	}, []);

	const removeReaction = useCallback(async (reaction) => {
		dispatch({ type: postReducerActions.REACTION_REMOVED, payload: reaction });
		const response = await reactionsApi.destroy(reaction);
		if (response.success) return;
		dispatch({ type: postReducerActions.REACTION_ADDED, payload: reaction });
		return response.data;
	}, []);

	const updateReaction = useCallback(async (reaction) => {
		dispatch({ type: postReducerActions.REACTION_UPDATED, payload: reaction });
		const response = await reactionsApi.update(reaction);
		if (response.success) return;
		dispatch({ type: postReducerActions.REACTION_REVERTED, payload: reaction });
		return response.data;
	}, []);

	return (
		<PostContext.Provider
			value={{
				state,
				createPost,
				deletePost,
				fetchPostById,
				editPost,
				fetchAllPosts,
				addComment,
				deleteComment,
				addReaction,
				removeReaction,
				updateReaction,
			}}
		>
			{children}
		</PostContext.Provider>
	);
};

export default PostContext;
