import { createContext, useReducer, useCallback, useEffect } from 'react';

import usersApi from '../api/usersApi';

import { userReducerActions } from '../actions/userActions';

const userReducer = (state, action) => {
	switch (action.type) {
		case userReducerActions.LOADING:
			return { ...state, isLoading: true };
		case userReducerActions.ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				error: action.payload,
			};
		case userReducerActions.USERS_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				error: '',
				currentUser: null,
				users: action.payload,
			};
		case userReducerActions.USER_ACTIVATE:
			return { ...state, currentUser: { id: action.payload } };
		case userReducerActions.USER_DEACTIVATE:
			return { ...state, currentUser: null };
		// case userReducerActions.USER_DELETE:
		// 	return {
		// 		...state,
		// 		users: state.users.filter((user) => user.id !== action.payload),
		// 		currentUser: state.currentUser?.id === action.payload ? null : state.currentUser,
		// 	};
		case userReducerActions.USER_CREATE:
			console.log(action);
			return {
				...state,
				// isLoading: false,
				// isError: false,
				// error: '',
				// users: [...state.users, action.payload],
				currentUser: { id: action.payload.id },
			};
	}
};

const initialState = {
	isLoading: true,
	isError: false,
	error: '',
	currentUser: null,
	users: [],
};

const UserContent = createContext(initialState);

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initialState);

	useEffect(() => {
		fetchAllUsers();
	}, []);

	const activateUser = useCallback((id) => {
		if (state.currentUser?.id === id) return;
		deactivateUser();
		dispatch({ type: userReducerActions.USER_ACTIVATE, payload: id });
	}, []);

	const deactivateUser = useCallback(() => {
		dispatch({ type: userReducerActions.USER_DEACTIVATE });
	}, []);

	const deleteUser = useCallback(async (id) => {
		const response = await usersApi.deleteUser(id);
		if (response.success) {
			// dispatch({ type: userReducerActions.USER_DELETE, payload: id });
			fetchAllUsers();
			return;
		}
		dispatch({ type: userReducerActions.ERROR, payload: response.data });
	}, []);

	const createUser = useCallback(async (data) => {
		// dispatch({ type: userReducerActions.LOADING });
		const response = await usersApi.createUser({ ...data });
		if (response.success) {
			await fetchAllUsers();
			dispatch({ type: userReducerActions.USER_CREATE, payload: response.data });
			return;
		}
		// dispatch({ type: userReducerActions.ERROR, payload: response.data });
		return response.data;
	}, []);

	const fetchAllUsers = useCallback(async () => {
		dispatch({ type: userReducerActions.LOADING });

		const response = await usersApi.fetchAllUsers();
		if (response.success)
			return dispatch({
				type: userReducerActions.USERS_SUCCESS,
				payload: response.data.sort((a, b) => b.id - a.id),
			});

		return dispatch({ type: userReducerActions.ERROR, payload: response.data });
	}, []);

	return (
		<UserContent.Provider
			value={{ state, activateUser, deactivateUser, deleteUser, createUser }}
		>
			{children}
		</UserContent.Provider>
	);
};

export default UserContent;
