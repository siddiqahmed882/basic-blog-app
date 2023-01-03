import useUserContext from '../hooks/useUserContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
	const { currentUser } = useUserContext();

	const location = useLocation();

	return currentUser ? (
		<Outlet />
	) : (
		<Navigate to="/users" state={{ from: location }} replace={true} />
	);
};

export default ProtectedRoute;
