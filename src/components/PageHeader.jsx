import { Link } from 'react-router-dom';

const PageHeader = ({ title = 'Page Title', btnPath = null }) => {
	return (
		<header className="page-header mb-4">
			<h1>{title}</h1>
			{btnPath ? (
				<Link to={btnPath} className="btn btn-primary">
					Create
				</Link>
			) : null}
		</header>
	);
};

export default PageHeader;
