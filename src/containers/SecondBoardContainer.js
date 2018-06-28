import React from 'react';
import {connect} from 'react-redux';
import {SecondBoard} from '../components/index';

class SecondBoardContainer extends React.Component {

  componentDidMount() {
    const {model_id, layer_name } = this.props;
  }



  render() {
    const {model_id, layer_name, filters} = this.props;

    return (
      <div>
        {
          <SecondBoard model_id={model_id} layer_name={layer_name} filters={filters}/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  model_id: state.models.get('model_id'),
  layer_name: state.board.layer_name,
  filters:state.board.filters
});


const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondBoardContainer);
