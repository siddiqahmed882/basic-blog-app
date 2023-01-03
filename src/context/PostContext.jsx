import { createContext, useReducer, useEffect, useCallback } from 'react';

import { postReducerActions } from '../actions/postActions';

import postsApi from '../api/postsApi';

const reducer = (state, action) => {
	switch (action.type) {
		case postReducerActions.LOADING:
			return { ...state, isLoading: true };
		case postReducerActions.POSTS_SUCCESS:
			return { ...state, isLoading: false, error: '', posts: action.payload };
		case postReducerActions.USERS_POSTS_SUCCESS:
			return { ...state, isLoading: false, error: '', postsForUser: action.payload };
		case postReducerActions.POST_SUCCESS:
			return { ...state, isLoading: false, error: '', post: action.payload };
		case postReducerActions.ERROR:
			return { ...state, isLoading: false, error: action.payload };
		default:
			return state;
	}
};

const initialState = {
	isLoading: false,
	posts: [],
	postsForUser: [],
	post: null,
	error: '',
};

const PostContext = createContext(initialState);

export const PostProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		fetchAllPosts();
	}, []);

	const fetchAllPosts = useCallback(async () => {
		dispatch({ type: postReducerActions.LOADING });

		const response = await postsApi.fetchAllPosts();
		if (response.success)
			return dispatch({
				type: postReducerActions.POSTS_SUCCESS,
				payload: response.data.sort((a, b) => b.id - a.id),
			});

		return dispatch({ type: postReducerActions.ERROR, payload: response.data });
	}, []);

	const fetchPostsByUser = useCallback(async (userId) => {
		dispatch({ type: postReducerActions.LOADING });

		const response = await postsApi.fetchPostByUserId(userId);

		console.log({ userId, response });

		if (response.success)
			return dispatch({
				type: postReducerActions.USERS_POSTS_SUCCESS,
				payload: response.data.sort((a, b) => b.id - a.id),
			});

		return dispatch({ type: postReducerActions.ERROR, payload: response.data });
	}, []);

	const createPost = useCallback(async (data) => {
		const response = await postsApi.createPost(data);

		if (response.success) return await fetchAllPosts();

		return response.data;
	}, []);

	const deletePost = useCallback(async (id, userId) => {
		const response = await postsApi.deletePost(id);
		if (response.success) {
			await fetchAllPosts();
			await fetchPostsByUser(userId);
			return;
		}
		dispatch({ type: postReducerActions.ERROR, payload: response.data });
	}, []);

	return (
		<PostContext.Provider value={{ state, createPost, deletePost, fetchPostsByUser }}>
			{children}
		</PostContext.Provider>
	);
};

export default PostContext;
