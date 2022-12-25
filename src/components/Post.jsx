import React from 'react';

const REACTION_EMOJIS = {
	thumbsUp: '👍',
	wow: '😲',
	heart: '❤',
	rocket: '🚀',
	coffee: '☕',
};

const Post = ({ post }) => {
	return (
		<li className="post flow" key={post.id}>
			<h2 className="post__title">{post.title}</h2>
			<p className="post__body">{post.body}</p>
			<div className="post__reactions">
				{Object.entries(REACTION_EMOJIS).map(([key, value]) => (
					<button className="post__reaction" key={`${post}-${key}`}>
						{value} <span>0</span>
					</button>
				))}
			</div>
		</li>
	);
};

export default Post;
