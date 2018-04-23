import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import './Board.scss';


const Board = ({model_id, model_graph}) => {
  const data = model_graph['data'];
  const links = model_graph['links'];

  const option = {
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series : [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: [120,20],
        symbol: 'roundRect',
        roam: true,
        label: {
          normal: {
            show: true,
            fontSize: 20
          },

        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [1, 2],
        data: data,
        // links: [],
        links: links
      }
    ]
  };

  return (
    <div className="Board">
      <ReactEcharts
        option={option}
      />
    </div>
  );
};

Board.propTypes = {
  model_id: PropTypes.number,
  model_graph: PropTypes.instanceOf(Map)
};

Board.defaultProps = {

};

export default Board;