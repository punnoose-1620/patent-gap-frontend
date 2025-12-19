import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="brand">Patent Gap AI</div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
