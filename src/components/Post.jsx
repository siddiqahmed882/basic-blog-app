import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import usePostContext from '../hooks/usePostContext';
import useUserContext from '../hooks/useUserContext';

const REACTION_EMOJIS = {
	thumbsUp: '👍',
	wow: '😲',
	heart: '❤',
	rocket: '🚀',
	coffee: '☕',
};

const Post = ({ post }) => {
	const { currentUser } = useUserContext();

	const self = currentUser ? post.userId === currentUser.id : false;

	const { deletePost } = usePostContext();

	return (
		<li className="post flow">
			{self && (
				<div className="post__ctas">
					<button className="post__btn post__btn--edit">
						<FontAwesomeIcon icon={faEdit} />
					</button>
					<button
						className="post__btn post__btn--delete"
						onClick={() => deletePost(post.id, currentUser.id)}
					>
						<FontAwesomeIcon icon={faTrashAlt} />
					</button>
				</div>
			)}
			<h2 className="post__title">{post.title}</h2>
			<p className="post__body">{post.body.substring(0, 40)}....</p>
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
