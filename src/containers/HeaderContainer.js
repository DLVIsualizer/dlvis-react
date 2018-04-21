import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Header } from '../components/index';


const mapDispatchToProps = (dispatch) => ({
  onToggleSidenav: () => dispatch(actions.toggleSidenav())
});

const HeaderContainer = connect(
  null,
  mapDispatchToProps
)(Header);

export default HeaderContainer;