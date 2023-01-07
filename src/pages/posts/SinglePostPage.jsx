import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import Comments from '../../components/Comments';
import PageHeader from '../../components/PageHeader';

import usePostContext from '../../hooks/usePostContext';
import useUserContext from '../../hooks/useUserContext';
import ReactionBtns from '../../components/ReactionBtns';

import helperFunctions from '../../lib/helperFunctions';

const SinglePostPage = () => {
	const { id } = useParams();

	const [newComment, setNewComment] = useState('');

	const firstMount = useRef(true);

	const {
		fetchPostById,
		post,
		isLoading,
		error,
		addComment,
		deletePost,
		reactionsEmojis,
	} = usePostContext();
	const { currentUser, users } = useUserContext();

	useEffect(() => {
		if (firstMount.current) fetchPostById(id);

		return () => {
			firstMount.current = false;
		};
	}, [id]);

	const handleCommentInputChange = (e) => {
		// if input is enter key, post the comment
		setNewComment(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const error = await addComment({
			userId: currentUser.id,
			postId: post.id,
			body: newComment,
		});

		if (error) {
			alert(error);
		} else {
			setNewComment('');
		}
	};

	const self = currentUser && post ? post.userId === currentUser.id : false;

	const dateTimeString = post
		? post.updatedAt
			? `Updated At: ${helperFunctions.formatDateForPost(post.updatedAt)}`
			: `Created At: ${helperFunctions.formatDateForPost(post.createdAt)}`
		: null;

	const renderedContent =
		isLoading || !post || !reactionsEmojis ? (
			<p>Loading...</p>
		) : error ? (
			<p>{error}</p>
		) : (
			<>
				<PageHeader title={post?.title} />
				<div className="post flow mb-2">
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
					<div className="post__meta">
						<p className="post__owner">
							By:{' '}
							<Link to={`/users/${post.userId}`}>
								{users[post.userId]?.name ?? 'Unknown'}
							</Link>
						</p>
						<p>{dateTimeString}</p>
					</div>
					<p className="post__body">{post?.body}</p>
					<ReactionBtns post={post} />
				</div>
				{currentUser?.id ? (
					<form className="comment-form mb-2" onSubmit={handleSubmit}>
						<div className="input-group">
							<textarea
								name="newComment"
								id="newComment"
								placeholder="Please Add a comment"
								value={newComment}
								onChange={handleCommentInputChange}
								className="comment-area"
							/>
						</div>
						<button className={`btn btn-secondary`}>comment</button>
					</form>
				) : null}
				<Comments post={post} owner={self} />
			</>
		);

	return (
		<main className="mb-4">
			<div className="wrapper wrapper--narrow">{renderedContent}</div>
		</main>
	);
};

export default SinglePostPage;
