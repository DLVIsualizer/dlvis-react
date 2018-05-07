import { connect } from 'react-redux';
import { Sidenav } from '../components/index';

const mapStateToProps = (state) => ({
  isSidenavOpen: state.sidenav.isSidenavOpen
});

const SidenavContainer = connect(
  mapStateToProps,
  null
)(Sidenav);

export default SidenavContainer;