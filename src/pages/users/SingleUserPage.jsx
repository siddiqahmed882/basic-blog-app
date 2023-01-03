import { useEffect, useRef } from 'react';

import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

import useUserContext from '../../hooks/useUserContext';
import Post from '../../components/Post';
import usePostContext from '../../hooks/usePostContext';

const SingleUserPage = () => {
	const firstMount = useRef(true);

	const { userId } = useParams();

	const {
		error: postsError,
		isLoading: postLoading,
		postsForUser: posts,
		fetchPostsByUser,
	} = usePostContext();

	const {
		currentUser,
		fetchUserById,
		user,
		isLoading: userLoading,
		error: userError,
	} = useUserContext();

	const self = currentUser ? userId === String(currentUser.id) : false;

	useEffect(() => {
		if (firstMount.current) {
			fetchPostsByUser(userId);
			fetchUserById(userId);
		}

		() => {
			firstMount.current = false;
		};
	}, []);

	const renderedPosts = postLoading ? (
		<p>Loading...</p>
	) : postsError ? (
		<p>{postsError}</p>
	) : posts.length === 0 ? (
		<p>No posts to show</p>
	) : (
		<ul className="posts">
			{posts.map((post) => (
				<Post post={post} key={post.id} self={self} />
			))}
		</ul>
	);

	const userData = userLoading ? (
		<p>Loading user...</p>
	) : userError ? (
		<p>{userError}</p>
	) : (
		<PageHeader title={user.name} />
	);

	return (
		<main className="mb-4">
			<div className="wrapper">
				{userData}
				{renderedPosts}
			</div>
		</main>
	);
};

export default SingleUserPage;
