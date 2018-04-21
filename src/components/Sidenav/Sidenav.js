import React from 'react';
import PropTypes from 'prop-types';
import {slide as Sidebar} from 'react-burger-menu'
import './Sidenav.scss';
import bird from '../../img/bird.jpg';

const Sidenav = ({isSidenavOpen, onToggleSidenav}) => {
  return (
    <div className="Sidenav">
      <Sidebar isOpen={isSidenavOpen} noOverlay disableOverlayClick>
        <img className='test-input' src={bird} align="center"/>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
      </Sidebar>
    </div>
  );
};

Sidenav.propTypes = {
  isSidenavOpen: PropTypes.bool,
  onToggleSidenav: PropTypes.func
};

Sidenav.defaultProps = {
  isSidenavOpen: false,
  onToggleSidenav: () => console.warn('onToggleSidenav not defined')
};

export default Sidenav;