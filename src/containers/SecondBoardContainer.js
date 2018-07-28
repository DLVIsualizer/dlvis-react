import React from 'react';
import {connect} from 'react-redux';
import {SecondBoard} from '../components/index';
import * as boardActions from "../store/modules/board";
import {secondEchartInstance} from "../components/SecondBoard/SecondBoard";


class SecondBoardContainer extends React.Component {

  componentDidMount() {
    const {model_id, layer_name} = this.props;
  }

  changeMode(mode){
    const {onChangeMode} = this.props;

    onChangeMode(mode);
  }

  changeDepth(depth){
    const {model_id, onChangeDepth} = this.props;
    onChangeDepth(depth);
  }

  render() {
    const {model_id, layer_name, filterResponse,depth,mode} = this.props;

    return (
      <div>
        {
          <SecondBoard model_id={model_id}
                       layer_name={layer_name}
                       filterResponse={filterResponse}
                       depth = {depth}
                       mode = {mode}
                       container={this}/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  model_id: state.models.get('model_id'),
  layer_name: state.board.layer_name,
  filterResponse: state.board.filterResponse,
  mode:state.board.mode,
  depth:state.board.depth
});


const mapDispatchToProps = (dispatch) => ({
  onChangeMode: (mode) => dispatch(boardActions.onChangeMode(mode)),
  onChangeDepth: (depth) => dispatch(boardActions.onChangeDepth(depth)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondBoardContainer);

