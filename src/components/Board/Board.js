import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import './Board.scss';


const Board = ({model_id, model_graph}) => {
  const data = model_graph['graph']['data'];
  const links = model_graph['graph']['links'];
  const tooltip = model_graph['tooltip'];

  const colors = {
    'InputLayer': '#C9856B',
    'ZeroPadding2D': '#334552',
    'Conv2D': '#6F9FA7',
    'BatchNormalization': '#B34038',
    'Activation': '#9CC5B0',
    'MaxPooling2D': '#B9A39B'
  };

  const option = {
    tooltip: {
      formatter: (params) => {
        const style = '<div style="color:' + colors[params.value] + '"><b>';
        return style + params.value + "</b></div>" + tooltip[params.name];
      }
    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series : [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: [120,20],
        symbol: 'rect',
        roam: true,
        // PBW 0505_2018
        top: 80,
        label: {
          normal: {
            show: true,
            color: 'white',
            fontSize: 15
          },

        },
        itemStyle: {
          normal: {
            color: (params) => {
              return (colors[params.value])? colors[params.value] : '#6E7074';
            },
            borderColor: '#fff',
            borderWidth: 1,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
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
  model_id: PropTypes.string,
  model_graph: PropTypes.instanceOf(Map)
};

Board.defaultProps = {

};

export default Board;