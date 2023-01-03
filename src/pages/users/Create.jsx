import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import useUserContext from '../../hooks/useUserContext';

const nameRegex = /^[A-z]{3,}(\s)?([A-z]{3,})?$/;
const usernameRegex = /^\w{3,}$/;
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const Create = () => {
	const [userData, setUserData] = useState({ name: '', username: '', email: '' });
	const [userDataError, setUserDataError] = useState({
		name: '',
		username: '',
		email: '',
	});

	const { createUser } = useUserContext();

	const navigate = useNavigate();

	const handleChange = (e) => {
		const value = e.target.value;
		const inputField = e.target.name;

		setUserData((prev) => ({ ...prev, [inputField]: value }));
		setUserDataError((prev) => ({ ...prev, [inputField]: '' }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let hasErrors = false;

		// Basic Validation
		if (!nameRegex.test(userData.name)) {
			setUserDataError((prev) => ({
				...prev,
				name: 'Please enter a valid name. It must have atleast three letters',
			}));
			hasErrors = true;
		}

		if (!usernameRegex.test(userData.username)) {
			setUserDataError((prev) => ({
				...prev,
				username: 'Please enter a valid username. It must have atleast three letters',
			}));
			hasErrors = true;
		}

		if (!emailRegex.test(userData.email)) {
			setUserDataError((prev) => ({
				...prev,
				email: 'Please enter a valid email. It must have atleast three letters',
			}));
			hasErrors = true;
		}

		if (hasErrors) return;

		const error = await createUser(userData);

		if (error) {
			alert(error);
		} else {
			alert('Created');
			navigate('/users');
		}
	};

	return (
		<main className="mb-4">
			<div className="wrapper">
				<PageHeader title="Create a new user" />
				<form className="user-form" onSubmit={handleSubmit}>
					<div className="input-group">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							name="name"
							className={userDataError.name.length !== 0 ? 'input-error' : null}
							placeholder="Enter your name..."
							value={userData.name}
							onChange={handleChange}
						/>
						<p>{userDataError.name}</p>
					</div>
					<div className="input-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							className={userDataError.username.length !== 0 ? 'input-error' : null}
							placeholder="Enter your username..."
							value={userData.username}
							onChange={handleChange}
						/>
						<p>{userDataError.username}</p>
					</div>
					<div className="input-group">
						<label htmlFor="email">Email</label>
						<input
							type="text"
							name="email"
							className={userDataError.email.length !== 0 ? 'input-error' : null}
							placeholder="Enter your email..."
							value={userData.email}
							onChange={handleChange}
						/>
						<p>{userDataError.email}</p>
					</div>
					<button className="btn btn-secondary">Create</button>
				</form>
			</div>
		</main>
	);
};

export default Create;
