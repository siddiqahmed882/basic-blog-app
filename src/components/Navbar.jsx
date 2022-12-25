import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
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
								<NavLink to="/users" className="nav__link">
									users
								</NavLink>
							</li>
							<li className="nav__item">
								<NavLink to="/manage" className="nav__link">
									manage
								</NavLink>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
