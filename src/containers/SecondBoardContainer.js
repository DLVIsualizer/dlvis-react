import React from 'react';
import {connect} from 'react-redux';
import {SecondBoard} from '../components/index';
import * as boardActions from "../store/modules/board";


class SecondBoardContainer extends React.Component {

  componentDidMount() {
    const {model_id, layer_name} = this.props;
  }

  changeDepth(depth){
    const {model_id, onChangeDepth} = this.props;
    onChangeDepth(depth);
  }

  render() {
    const {model_id, layer_name, filterResponse,depth} = this.props;

    return (
      <div>
        {
          <SecondBoard model_id={model_id} layer_name={layer_name} filterResponse={filterResponse} depth = {depth} container={this}/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  model_id: state.models.get('model_id'),
  layer_name: state.board.layer_name,
  filterResponse: state.board.filterResponse,
  depth:state.board.depth
});


const mapDispatchToProps = (dispatch) => ({
  onChangeDepth: (depth) => dispatch(boardActions.onChangeDepth(depth)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondBoardContainer);

