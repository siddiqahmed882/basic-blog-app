import React from 'react';
import PageHeader from '~/components/PageHeader';

import { posts } from '~/data';
import Post from '~/components/Post';

const Posts = () => {
	return (
		<main className="mb-4">
			<div className="wrapper">
				<PageHeader title="Posts" btnPath="/posts/create" />
				<ul className="posts">
					{posts.map((post) => (
						<Post post={post} key={post.id} />
					))}
				</ul>
			</div>
		</main>
	);
};

export default Posts;
