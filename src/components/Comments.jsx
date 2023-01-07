import React from 'react';
import CommentItem from './CommentItem';

const Comments = ({ post: { comments }, owner }) => {
	const commentsLength = comments.length;
	return (
		<section>
			<p>
				{commentsLength} {commentsLength === 1 ? 'comment' : 'comments'}
			</p>
			<ul className="comments">
				{comments.map((comment) => (
					<CommentItem key={comment.id} comment={comment} owner={owner} />
				))}
			</ul>
		</section>
	);
};

export default Comments;
