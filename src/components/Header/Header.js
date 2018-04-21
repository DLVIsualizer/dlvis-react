import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavItem, Icon } from 'react-materialize';
import './Header.scss';

const Header = ({onToggleSidenav}) => {
  return (
    <div className="Header">
      <Navbar brand='DLVIS' right>
        <NavItem href='get-started.html' className='menu-icon' onClick={onToggleSidenav}><Icon>subject</Icon></NavItem>
        <NavItem href='get-started.html'><Icon>search</Icon></NavItem>
        <NavItem href='get-started.html'><Icon>view_module</Icon></NavItem>
        <NavItem href='get-started.html'><Icon>refresh</Icon></NavItem>
        <NavItem href='get-started.html'><Icon>more_vert</Icon></NavItem>
      </Navbar>
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