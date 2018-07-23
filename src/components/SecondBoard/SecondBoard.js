import React from 'react';
import PropTypes from 'prop-types';
import {Badge} from 'reactstrap';
import styles from './SecondBoard.scss';
import ReactEcharts from 'echarts-for-react';
import Slider, {createSliderWithTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';
import {MODEL_NAMES} from "../../constants";
import nj from 'numjs';
// import 'echarts-gl'

var secondEchartInstance;
window.addEventListener('resize', function (event) {
  if (secondEchartInstance) {
    secondEchartInstance.resize();
  }
})

const SecondBoard = ({model_id, layer_name, filterResponse, depth, container}) => {


  console.log('called');
  console.log(depth);
  const emptyOption = {};
  var option = {};
  var xData = [];
  var yData = [];


  // SecondBoard의 폭 얻어오기
  var boardWidth = 600;
  if (document.getElementById('SecondBoard')) {
    boardWidth = document.getElementById('SecondBoard').offsetWidth;
  }

  var kDepthNum = 1;
  // Get Data And Option
  if (filterResponse != undefined) {


    const starttime = performance.now();

    secondEchartInstance.showLoading('default', {
      text: 'Converting...'
    });

    const kBoxWidth = styles.BoxWidth;
    const kBoxHeight = styles.BoxHeight;
    const kRowSpace = styles.RowSpace;
    const kColSpace = styles.ColSpace;
    const kBoxValidArea = (kBoxWidth - kRowSpace) * (kBoxHeight - kColSpace);

    const header = filterResponse.headers;
    const kFilterNum = parseInt(filterResponse.headers.filternum);
    kDepthNum = parseInt(filterResponse.headers.depthnum);
    const kWidth = parseInt(filterResponse.headers.vwidth);
    const kHeight = parseInt(filterResponse.headers.vheight);
    const valMin = parseFloat(filterResponse.headers.valmin);
    const valMax = parseFloat(filterResponse.headers.valmax);
    const kArea = kWidth * kHeight;

    const kFilterWidth = parseInt(Math.sqrt(kBoxValidArea / kFilterNum));
    const kFilterHeight = kFilterWidth;

    const maxColNum = parseInt((kBoxWidth - kRowSpace) / kFilterWidth);
    const maxRowNum = parseInt((kFilterNum - 1) / maxColNum) + 1;

    // 축 눈금 설정
    for (var i = 0; i < kWidth * maxColNum; i++) {
      xData.push(i);
    }
    for (var j = 0; j < kHeight * maxRowNum; j++) {
      yData.push(j);
    }

    const pointNum = kFilterNum * kWidth * kHeight;
    const flattenLen = kDepthNum * pointNum * 3;

    const arrBuff = filterResponse.data;

    // 실제 keras모델에서 weight value들은 float32이지만
    //  numjs로 읽을 시에는 64로 해야함..?!
    var floatTA = new Float64Array(arrBuff);
    var dataNj = nj.float64(floatTA);
    dataNj = dataNj.reshape(kDepthNum, pointNum, 3);


    // dataInDepth(2차원 배열 선언)
    const dataInDepth = dataNj.tolist();

    console.log('Layer:' + layer_name + '] Array shaping time : ' + ((performance.now() - starttime) / 1000) + 's');

    const depthIdx = depth;

    //기본 옵션 설정
    option = {
      // legend: {
      //   type: 'scroll',
      //   orient: 'vertical',
      //   // left:boardWidth-50,
      //   right: 5,
      //   top: 20,
      //   bottom: 200,
      //   selectedMode: 'single',
      // },
      visualMap: {
        top: 0,
        right: 90,
        min: valMin,
        max: valMax,
        text: [valMax.toPrecision(4).toString(), valMin.toPrecision(4).toString()],
        precision: 3,
        seriesIndex: [0],
        inRange: {
          color: ['#000000', '#ffffff']
        }
      },
      tooltip: {
        position: 'right',
        formatter: function (p) {
          return 'Filter : ' + parseInt(p.dataIndex / kArea) +
            '</br>' +
            ' data : ' + p.data;
        }
      },


      grid: {
        left: kRowSpace,
        top: kColSpace,
        right: 0,
        bottom: 0,
        width: kBoxWidth,
        height: kBoxHeight
      },
      xAxis: {
        type: 'category',
        data: xData,
        gridIndex: 0,

        min: 0,
        interval: kWidth - 1,

        axisTick: {
          interval: kWidth - 1,
          alignWithLabel: true,

          inside: true,
          length: kBoxHeight,
          lineStyle: {
            type: 'dotted',
          }
        },
        axisLabel: {
          interval: kWidth - 1,
        },
      },
      yAxis: {
        type: 'category',
        data: yData,
        left: 'right',
        gridIndex: 0,
        inverse: true,

        min: 0,
        interval: kHeight - 1,

        axisTick: {
          interval: kHeight - 1,
          alignWithLabel: true,

          inside: true,
          length: kBoxHeight,
          lineStyle: {
            type: 'dotted',
          }
        },
        axisLabel: {
          interval: kWidth - 1,
        },

      },
      series: (
        {
          name: 'depth' + depthIdx,
          type: 'heatmap',
          data: dataInDepth[depthIdx],
          xAxisIndex: 0,
          yAxisIndex: 0,

          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            opacity: 0.95
          },
          animation: false
        }
      )
    }
  }

  const onChangeSlider = (value) => {
    if (container) {
      container.changeDepth(value);
    }
  }
  return (
    <div className="SecondBoard" id='SecondBoard'>
      <h3><Badge color="secondary">LayerName</Badge> {layer_name}</h3>
      <h3><Badge color="secondary">Depth</Badge>
        <SliderWithTooltip
          min={0}
          max={kDepthNum - 1}
          dots step={1} value={depth}
          tipFormatter={depthIndexFormatter}
          tipProps={{overlayClassName: 'foo'}}
          onChange={onChangeSlider}
        /></h3>
      <ReactEcharts id='filter'
                    ref={(e) => {
                      if (e) {
                        secondEchartInstance = e.getEchartsInstance();
                        secondEchartInstance.clear();
                        secondEchartInstance.showLoading('default', {
                          text: 'Visualizing...'
                        });
                        secondEchartInstance.setOption(option);
                        secondEchartInstance.resize();
                        secondEchartInstance.hideLoading();
                      }
                    }}
                    option={emptyOption}
      />
    </div>
  );
}

const SliderWithTooltip = createSliderWithTooltip(Slider);

function depthIndexFormatter(v) {
  return `Depth ${v}`;
}


export default SecondBoard;
export {secondEchartInstance};
