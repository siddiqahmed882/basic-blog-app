import useUserContext from '../hooks/useUserContext';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
	const { currentUser } = useUserContext();

	return (
		<header className="header mb-6">
			<div className="wrapper">
				<div className="nav-wrapper">
					<div className="logo">
						<NavLink to="/">React Blogs</NavLink>
					</div>
					<nav className="navbar">
						<ul className="nav__items">
							<li className="nav__item">
								<NavLink to="/posts" className="nav__link">
									posts
								</NavLink>
							</li>
							<li className="nav__item">
								<NavLink to="/users" className="nav__link" end>
									users
								</NavLink>
							</li>
							{currentUser ? (
								<li className="nav__item">
									<NavLink to={`/users/${currentUser.id}`} className="nav__link">
										manage
									</NavLink>
								</li>
							) : null}
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
