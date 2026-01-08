import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="page">
      <h1>Page not found</h1>
      <p>
        The page you are looking for does not exist. Go back to{' '}
        <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
          home page
        </Link>
        .
      </p>
    </section>
  );
}

export default NotFound;
