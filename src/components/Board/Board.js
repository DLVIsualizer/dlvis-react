import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import './Board.scss';



const Board = ({model_id, model_graph, container}) => {
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
      },
      showDelay:0,
      hideDelay:0,
      transitionDelay:0
    },
    animation: false,
    animationDurationUpdate: 1500,
    animationDelay: 0,
    animationEasingUpdate: 'quinticInOut',
    series : [
      {
        type: 'graph',
        layout: 'none',
        // symbolSize: [120,20],
        symbolSize: [165,20],
        symbol: 'rect',
        // roam: true,
        roam: false,
        // PBW 0505_2018
        top: 100,
        left: 100,
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

  //차트이벤트///////////
  const onEvents = {
    /*
    params.data
      name : "max_pooling2d_1"
      value:"MaxPooling2D"
      x:0
      y:991.2
     */
    'click': function (params) {
      const layerName = params.data.name
      container.clickLayer(model_id, layerName);
    },
    'legendselectchanged': this.onChartLegendselectchanged
  }

  return (
    <div className="Board">
      <ReactEcharts
        option={option}
        onEvents={onEvents}
      />
    </div>
  );
};


Board.propTypes = {
  model_id: PropTypes.number,
  model_graph: PropTypes.object
};

Board.defaultProps = {
  model_id: 0,
  model_graph: {}
};

export default Board;


