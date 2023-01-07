import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

import useUserContext from '../../hooks/useUserContext';
import Post from '../../components/Post';
import usePostContext from '../../hooks/usePostContext';

import helperFunctions from '../../lib/helperFunctions';

const SingleUserPage = () => {
	const { userId } = useParams();

	const {
		error: postsError,
		isLoading: postLoading,
		posts,
		reactionsEmojis,
	} = usePostContext();

	const { isLoading: userLoading, users, error: userError } = useUserContext();

	const postsForUser = posts ? helperFunctions.selectPostsByUserId(posts, userId) : null;

	let renderedPosts;

	if (postLoading || !posts || !reactionsEmojis) {
		renderedPosts = <p>Loading...</p>;
	} else if (!postLoading && postsError) {
		renderedPosts = <p>{postsError}</p>;
	} else if (!postLoading && posts && reactionsEmojis) {
		if (postsForUser.length === 0) {
			renderedPosts = <p>No posts to show</p>;
		} else {
			renderedPosts = (
				<ul className="posts">
					{postsForUser.map((post) => (
						<Post post={post} key={post.id} />
					))}
				</ul>
			);
		}
	}

	const userData =
		userLoading || !users ? (
			<p>Loading user...</p>
		) : !userLoading && userError ? (
			<p>{userError}</p>
		) : !userLoading && !userError && users ? (
			<PageHeader title={users[userId].name} />
		) : null;

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
