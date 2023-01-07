import usePostConext from '../../hooks/usePostContext';
import PageHeader from '../../components/PageHeader';

import Post from '../../components/Post';

const Posts = () => {
	const { isLoading, error, posts, reactionsEmojis } = usePostConext();

	const content =
		isLoading || !reactionsEmojis || !posts ? (
			<p>Loading</p>
		) : !isLoading && error ? (
			<p>{error}</p>
		) : !isLoading && posts.length === 0 ? (
			<p>No posts to show</p>
		) : (
			<ul className="posts">
				{posts.map((post) => (
					<Post post={post} key={post.id} />
				))}
			</ul>
		);

	return (
		<main className="mb-4">
			<div className="wrapper">
				<PageHeader title="Posts" btnPath="/posts/create" />
				{content}
			</div>
		</main>
	);
};

export default Posts;
