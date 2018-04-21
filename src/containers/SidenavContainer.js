import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Sidenav } from '../components/index';

const mapStateToProps = (state) => ({
  isSidenavOpen: state.sidenavData.isSidenavOpen
});

const mapDispatchToProps = (dispatch) => ({
  onToggleSidenav: () => dispatch(actions.toggleSidenav())
});

const SidenavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidenav);

export default SidenavContainer;