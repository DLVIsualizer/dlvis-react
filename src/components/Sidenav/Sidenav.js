import React from 'react';
import PropTypes from 'prop-types';
import {slide as Sidebar} from 'react-burger-menu'
import './Sidenav.scss';
import bird from '../../img/bird.jpg';

const Sidenav = ({isSidenavOpen}) => {
  return (
    <div className="Sidenav">
      <Sidebar isOpen={isSidenavOpen} noOverlay disableOverlayClick>
        <img className='test-input' src={bird} align="center"/>
      </Sidebar>
    </div>
  );
};

Sidenav.propTypes = {
  isSidenavOpen: PropTypes.bool
};

Sidenav.defaultProps = {
  isSidenavOpen: false
};

export default Sidenav;