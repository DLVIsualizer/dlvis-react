import {connect} from 'react-redux';
import * as sidenavActions from '../store/modules/sidenav';
import {Header, Board, SecondBoard,ModelDropdown} from '../components/index';
import React from "react";

function wrapOnToggleSidenav() {
  var board = document.getElementsByClassName("Board")[0];
  var secondBoard = document.getElementsByClassName("SecondBoard")[0];
  var modelDrop = document.getElementsByClassName("ModelDropdown")[0];
  if (board.style.left == "6px") {
    board.style.left = "5px";
    board.style.transform = "translate(0,0)";
    board.style.transition= "all 0.5s";
    secondBoard.style.transform = "translate(0,0)";
    secondBoard.style.transition= "all 0.5s";
    modelDrop.style.transform = "translate(0,0)";
    modelDrop.style.transition= "all 0.5s";
  } else {
    board.style.left = "6px";
    board.style.transform = "translate(300px,0)";
    board.style.transition= "all 0.5s";
    secondBoard.style.transform = "translate(300px,0)";
    secondBoard.style.transition= "all 0.5s";
    modelDrop.style.transform = "translate(300px,0)";
    modelDrop.style.transition= "all 0.5s";
  }
}

const mapStateToProps = (state) => ({
  isSidenavOpen: state.sidenav.isSidenavOpen
});

const mapDispatchToProps = (dispatch) => ({
  onToggleSidenav: () => {
    wrapOnToggleSidenav();
    dispatch(sidenavActions.toggleSidenav())
  }
});

const HeaderContainer = connect(
  null,
  mapDispatchToProps
)(Header);

export default HeaderContainer;