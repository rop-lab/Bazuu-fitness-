import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you're using React Router

function Header() {
  return (
    <header className="header">
      <div className="header-section">
        <h1 className="header-title">
          Bazuu Fitness
          <span className="logo" role="img">
            🏋️‍♂️
          </span>
        </h1>
      </div>
      <div className="head-right-section">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/sign-up" className="nav-link">Sign Up</Link>
      </div>
    </header>
  );
}

export default Header;
