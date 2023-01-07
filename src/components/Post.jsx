import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import usePostContext from '../hooks/usePostContext';
import useUserContext from '../hooks/useUserContext';
import { Link } from 'react-router-dom';
import ReactionBtns from './ReactionBtns';
import { faComment } from '@fortawesome/free-regular-svg-icons';

import helperFunctions from '../lib/helperFunctions';

const Post = ({ post }) => {
	const { currentUser, users } = useUserContext();

	const self = currentUser && post ? post.userId === currentUser.id : false;

	const { deletePost } = usePostContext();

	const dateTimeString = post
		? post.updatedAt
			? `Updated At: ${helperFunctions.formatDateForPost(post.updatedAt)}`
			: `Created At: ${helperFunctions.formatDateForPost(post.createdAt)}`
		: null;

	return (
		<li className="post flow">
			{self && (
				<div className="post__ctas">
					<Link to={`/posts/${post.id}/edit`} className="post__btn post__btn--edit">
						<FontAwesomeIcon icon={faEdit} />
					</Link>
					<button
						className="post__btn post__btn--delete"
						onClick={() => deletePost(post.id, currentUser.id)}
					>
						<FontAwesomeIcon icon={faTrashAlt} />
					</button>
				</div>
			)}
			<h2 className="post__title">
				<Link to={`/posts/${post.id}`}>{post.title}</Link>
			</h2>
			<div className="post__meta">
				<p className="post__owner">
					By:{' '}
					<Link to={`/users/${post.userId}`}>
						{users[post.userId]?.name ?? 'Unknown'}
					</Link>
				</p>
				<p>{dateTimeString}</p>
			</div>
			<p className="post__body">{post.body.substring(0, 100)}....</p>
			<div className="post__meta">
				<ReactionBtns post={post} />
				<span className="post__comments-count">
					<FontAwesomeIcon icon={faComment} />
					{post?.comments}
				</span>
			</div>
		</li>
	);
};

export default Post;
