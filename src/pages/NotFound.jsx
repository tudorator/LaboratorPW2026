import { Link } from 'react-router';

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Pagina pe care o cauti nu exista.</p>
      <Link to="/" className="btn btn-orange">Inapoi acasa</Link>
    </div>
  );
}

export default NotFound;
