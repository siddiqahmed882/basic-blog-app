import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { UserProvider } from './context/UserContext';
import { PostProvider } from './context/PostContext';

import Layout from './components/Layout';

import Posts from './pages/posts/Posts';
import CreatePost from './pages/posts/Create';

import Users from './pages/users/Users';
import CreateUser from './pages/users/Create';

import ProtectedRoute from './components/ProtectedRoute';
import SingleUserPage from './pages/users/SingleUserPage';

const App = () => {
	return (
		<UserProvider>
			<PostProvider>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Navigate to="/posts" replace />} />
						<Route path="posts">
							<Route index element={<Posts />} />
							<Route element={<ProtectedRoute />}>
								<Route path="create" element={<CreatePost />} />
							</Route>
						</Route>
						<Route path="users">
							<Route index element={<Users />} />
							<Route path="create" element={<CreateUser />} />
							<Route path=":userId" element={<SingleUserPage />} />
						</Route>
					</Route>
				</Routes>
			</PostProvider>
		</UserProvider>
	);
};

export default App;
