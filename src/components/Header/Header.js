import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

const Header = ({onToggleSidenav}) => {
  return (
    <div className="Header">
      <div className='menu-icon hvr-grow' onClick={onToggleSidenav}>
        <i className="fas fa-align-justify"></i>
      </div>
      <div className='logo'>
        DLVIS
      </div>
    </div>
  );
};

Header.propTypes = {
  onToggleSidenav: PropTypes.func
};

Header.defaultProps = {
  onToggleSidenav: () => console.warn('onSidenavToggle not defined')
};

export default Header;