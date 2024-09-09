import React from 'react';
import { FaCog } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">My Wallet</div>
      <div className="navbar-menu">
        <button className="settings-button">
          <FaCog />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;