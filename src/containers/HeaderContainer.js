import { connect } from 'react-redux';
import * as sidenavActions from '../store/modules/sidenav';
import { Header } from '../components/index';

const mapDispatchToProps = (dispatch) => ({
  onToggleSidenav: () => dispatch(sidenavActions.toggleSidenav())
});

const HeaderContainer = connect(
  null,
  mapDispatchToProps
)(Header);

export default HeaderContainer;