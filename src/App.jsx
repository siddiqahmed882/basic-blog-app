import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { UserProvider } from './context/UserContext';

import Layout from './components/Layout';

import Posts from './pages/posts/Posts';

import Users from './pages/users/Users';
import CreateUser from './pages/users/Create';
import Manage from './pages/users/Manage';

const App = () => {
	return (
		<UserProvider>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Navigate to="/posts" replace />} />
					<Route path="posts">
						<Route index element={<Posts />} />
					</Route>
					<Route path="users">
						<Route index element={<Users />} />
						<Route path="create" element={<CreateUser />} />
					</Route>
					<Route path="manage" element={<Manage />} />
				</Route>
			</Routes>
		</UserProvider>
	);
};

export default App;
