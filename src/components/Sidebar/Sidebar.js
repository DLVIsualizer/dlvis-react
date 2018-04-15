import React, { Component } from 'react';
import './Sidebar.scss';
import { SideNav, SideNavItem, Button } from 'react-materialize';

class Sidebar extends Component {
  render() {
    return (
      <div className="Sidebar">
        <SideNav
          trigger={<Button>SIDE NAV DEMO</Button>}
          options={{ closeOnClick: true }}
          >
          <SideNavItem href='#!icon' icon='cloud'>First Link With Icon</SideNavItem>
          <SideNavItem href='#!second'>Second Link</SideNavItem>
          <SideNavItem divider />
          <SideNavItem subheader>Subheader</SideNavItem>
          <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
        </SideNav>
      </div>
    );
  }
}

export default Sidebar;