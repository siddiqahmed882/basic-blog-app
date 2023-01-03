import usePostConext from '../../hooks/usePostContext';
import PageHeader from '../../components/PageHeader';

import Post from '../../components/Post';

const Posts = () => {
	const { isLoading, error, posts } = usePostConext();

	let content;

	if (isLoading) {
		content = <p>Loading</p>;
	} else if (!isLoading && error.length) {
		content = <p>{error}</p>;
	} else if (!isLoading && !error.length) {
		content = (
			<ul className="posts">
				{posts.map((post) => (
					<Post post={post} key={post.id} />
				))}
			</ul>
		);
	}

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
