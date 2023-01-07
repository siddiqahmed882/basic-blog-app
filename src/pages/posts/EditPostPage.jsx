import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

import usePostContext from '../../hooks/usePostContext';
import useUserContext from '../../hooks/useUserContext';

const EditPostPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	const { fetchPostById, editPost, post, isLoading } = usePostContext();
	const { currentUser } = useUserContext();

	const [postData, setPostData] = useState({
		title: '',
		body: '',
	});

	const [postDataError, setPostDataError] = useState({
		title: '',
		body: '',
	});

	const firstMount = useRef(true);

	useEffect(() => {
		if (firstMount.current) fetchPostById(id);

		return () => {
			firstMount.current = false;
		};
	}, [id]);

	useEffect(() => {
		if (!isLoading && post) setPostData(() => ({ ...post }));
	}, [isLoading, post]);

	const handleChange = (e) => {
		const inputField = e.target.name;
		const value = e.target.value;

		setPostData((prev) => ({ ...prev, [inputField]: value }));
		setPostDataError((prev) => ({ ...prev, [inputField]: '' }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let hasErrors = false;

		if (!currentUser) navigate('/users', { state: { from: location } });

		if (currentUser.id !== post.userId) {
			alert('unauthorized');
			navigate('/');
			return;
		}

		// Basic Validation
		if (postData.title.trim().length < 20) {
			setPostDataError((prev) => ({
				...prev,
				title: 'Title should be atleast 20 characters long',
			}));
			hasErrors = true;
		}

		if (postData.body.trim().length < 40) {
			setPostDataError((prev) => ({
				...prev,
				body: 'Body should be atleast 40 characters long',
			}));
			hasErrors = true;
		}

		if (hasErrors) return;

		// post edit request

		const { id, title, body, createdAt, userId } = postData;

		const error = await editPost({ id, title, body, createdAt, userId });

		if (error) {
			alert(error);
		} else {
			alert('Updated...');
			navigate('/');
		}
	};

	return (
		<main className="mb-4">
			<div className="wrapper">
				<PageHeader title="Edit a Post" />
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<form className="post-form" onSubmit={handleSubmit}>
						<div className="input-group">
							<label htmlFor="name">Title</label>
							<input
								type="text"
								name="title"
								className={postDataError.title.length !== 0 ? 'input-error' : null}
								placeholder="Please enter a title..."
								minLength={20}
								value={postData.title}
								onChange={handleChange}
							/>
							<p>{postDataError.title}</p>
						</div>
						<div className="input-group">
							<label htmlFor="email">Body</label>
							<textarea
								name="body"
								className={postDataError.body.length !== 0 ? 'input-error' : null}
								placeholder="Enter post body..."
								minLength={40}
								value={postData.body}
								onChange={handleChange}
							/>
							<p>{postDataError.body}</p>
						</div>
						<button className="btn btn-secondary">Update</button>
					</form>
				)}
			</div>
		</main>
	);
};

export default EditPostPage;
