import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">AMRR TechSols</div>
      <div className="navbar__links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'navbar__link active' : 'navbar__link'}>
          View Items
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => isActive ? 'navbar__link active' : 'navbar__link'}>
          Add Item
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;