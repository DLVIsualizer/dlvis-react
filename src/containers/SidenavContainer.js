import { connect } from 'react-redux';
import * as sidenavActions from '../store/modules/sidenav';
import { Sidenav } from '../components/index';

const mapStateToProps = (state) => ({
  isSidenavOpen: state.sidenav.isSidenavOpen
});

const mapDispatchToProps = (dispatch) => ({
  onToggleSidenav: () => dispatch(sidenavActions.toggleSidenav())
});

const SidenavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidenav);

export default SidenavContainer;