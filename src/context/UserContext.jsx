import { createContext, useReducer, useCallback, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';

import usersApi from '../api/usersApi';

import userReducerActions from '../actions/userActions';

import userReducer from '../reducers/userReducer';

const initialState = {
	isLoading: true,
	error: '',
	currentUser: null,
	users: null,
};

const UserContent = createContext(initialState);

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initialState);
	const firstMount = useRef(true);

	useEffect(() => {
		if (firstMount.current) fetchAllUsers();

		return () => {
			firstMount.current = false;
		};
	}, []);

	const activateUser = (id) => {
		if (state.currentUser?.id === id) return;
		deactivateUser();
		dispatch({ type: userReducerActions.USER_ACTIVATE, payload: id });
	};

	const deactivateUser = () => {
		dispatch({ type: userReducerActions.USER_DEACTIVATE });
	};

	const deleteUser = useCallback(async (id) => {
		const response = await usersApi.deleteUser(id);
		if (response.success) return fetchAllUsers();
		dispatch({ type: userReducerActions.ERROR, payload: response.data });
	}, []);

	const createUser = useCallback(async (data) => {
		data = { ...data, id: uuid() };
		const response = await usersApi.createUser(data);
		if (response.success) {
			await fetchAllUsers();
			dispatch({ type: userReducerActions.USER_CREATE, payload: response.data });
			return;
		}
		return response.data;
	}, []);

	const fetchAllUsers = useCallback(async () => {
		dispatch({ type: userReducerActions.LOADING });

		const response = await usersApi.fetchAllUsers();
		if (response.success)
			return dispatch({
				type: userReducerActions.USERS_SUCCESS,
				payload: response.data,
			});

		return dispatch({ type: userReducerActions.ERROR, payload: response.data });
	}, []);

	return (
		<UserContent.Provider
			value={{
				state,
				activateUser,
				deactivateUser,
				deleteUser,
				createUser,
			}}
		>
			{children}
		</UserContent.Provider>
	);
};

export default UserContent;
