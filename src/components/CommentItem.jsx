import { useNavigate } from 'react-router-dom';
import useUserContext from '../hooks/useUserContext';
import usePostContext from '../hooks/usePostContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const CommentItem = ({ comment, owner }) => {
	const navigate = useNavigate();
	const { users, currentUser } = useUserContext();
	const { deleteComment } = usePostContext();

	const self = currentUser ? comment.userId === currentUser.id : false;

	const onDeleteComment = () => {
		if (owner || currentUser.id === comment.userId) {
			deleteComment(comment);
			return;
		}

		alert('Unauthorized');
		navigate('/');
	};

	return (
		<li className="comment">
			<div className="comments__cta">
				{(self || owner) && (
					<div className="post__ctas">
						<button className="post__btn post__btn--delete" onClick={onDeleteComment}>
							<FontAwesomeIcon icon={faTrashAlt} />
						</button>
					</div>
				)}
			</div>
			<p className="comment__body">{comment.body}</p>
			<div className="comment__meta">
				<small className="comment__username">By: {users[comment.userId].name}</small>
			</div>
		</li>
	);
};

export default CommentItem;
