import { Link } from 'react-router';

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Pagina pe care o cauți nu există.</p>
      <Link to="/" className="btn btn-orange">← Înapoi acasă</Link>
    </div>
  );
}

export default NotFound;
