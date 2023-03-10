import { useLocation, useNavigate, Link } from 'react-router-dom';

import useUserContext from '../../hooks/useUserContext';

import PageHeader from '../../components/PageHeader';

const Users = () => {
	const location = useLocation();

	const from = location.state?.from?.pathname;

	const navigate = useNavigate();

	const {
		isLoading,
		error,
		users,
		currentUser,
		activateUser,
		deactivateUser,
		deleteUser,
	} = useUserContext();

	const handleActivateBtnClick = (id) => {
		if (id === currentUser?.id) return deactivateUser();

		activateUser(id);

		if (from) navigate(from, { replace: true });
	};

	let content;

	if (isLoading || !users) {
		content = <p>Loading</p>;
	} else if (!isLoading && error) {
		content = <p>{error}</p>;
	} else if (!isLoading && !error) {
		content = (
			<table className="users-table">
				<thead className="users-table__header">
					<tr className="users-table__row">
						<th className="users-table__cell text-left">Name</th>
						<th className="users-table__cell">Activate</th>
						<th className="users-table__cell">Delete</th>
					</tr>
				</thead>
				<tbody className="users-table__body">
					{Object.entries(users).map(([id, user]) => (
						<tr className="users-table__row" key={user.id}>
							<td className="users-table__cell text-left">
								<Link to={`/users/${id}`}>{user.name}</Link>
							</td>

							<td className="users-table__cell">
								<button
									className="btn btn-primary--inverse"
									onClick={() => handleActivateBtnClick(id)}
								>
									{user.id === currentUser?.id ? 'activated' : 'activate'}
								</button>
							</td>
							<td className="users-table__cell">
								{user.id === currentUser?.id ? (
									<button
										className="btn btn-danger--inverse"
										onClick={() => deleteUser(id)}
									>
										Delete
									</button>
								) : (
									'Unauthorized'
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}

	return (
		<main className="mb-4">
			<div className="wrapper">
				<PageHeader title="Users" btnPath="/users/create" />
				{content}
			</div>
		</main>
	);
};

export default Users;
