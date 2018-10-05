import React from 'react';
import PropTypes from 'prop-types';
import {Badge, Button, ButtonGroup, ButtonToolbar} from 'reactstrap';
import styles from './SecondBoard.scss';
import ReactEcharts from 'echarts-for-react';
import Slider, {createSliderWithTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';
import {MODEL_NAMES} from "../../constants";
import nj from 'numjs';
import {FILTER_VISUAL_MODE} from '../../constants';
import 'echarts-gl'

var secondEchartInstance;
const SliderWithTooltip = createSliderWithTooltip(Slider);

function depthIndexFormatter(v) {
  return `Depth ${v}`;
}

///////////////////////////

const SecondBoard = ({model_id, layer_name, filterResponse, depth, mode, container}) => {
  console.log('Reload SecondBoard')
  if (mode == 0) {
    return GetImageBoard(model_id, layer_name, filterResponse, depth, mode, container);
  } else {
    return GetEchartBoard(model_id, layer_name, filterResponse, depth, mode, container);
  }
};


function GetImageBoard(model_id, layer_name, filterResponse, depth, mode, container) {

  const onChangeMode = (value) => {
    if (container) {
      if (mode == value) return;

      container.changeMode(value);
    }
  }
  const onChangeSlider = (value) => {
    if (container) {
      if (depth == value) return;

      container.changeDepth(value);
    }
  }

  var kDepthNum = 1;
  const emptyOption = {};
  var xData = [];
  var yData = [];


  // SecondBoard의 폭 얻어오기
  var boardWidth = 600;
  if (document.getElementById('SecondBoard')) {
    boardWidth = document.getElementById('SecondBoard').offsetWidth;
  }

  if (secondEchartInstance)
    secondEchartInstance.clear();

  var image;
  const kUI_BoxWidth = styles.BoxWidth;
  const kUI_BoxHeight = styles.BoxHeight;
  const kUI_RowSpace = styles.RowSpace;
  const kUI_ColSpace = styles.ColSpace;
  const kUI_BoxValidArea = (kUI_BoxWidth - kUI_RowSpace) * (kUI_BoxHeight - kUI_ColSpace);
  // Get Data And Option
  if (filterResponse != undefined) {


    const header = filterResponse.headers;
    const kFilterNum = parseInt(filterResponse.headers.filternum);
    kDepthNum = parseInt(filterResponse.headers.depthnum);
    const kWidth = parseInt(filterResponse.headers.vwidth);
    const kHeight = parseInt(filterResponse.headers.vheight);
    const valMin = parseFloat(filterResponse.headers.valmin);
    const valMax = parseFloat(filterResponse.headers.valmax);
    const kArea = kWidth * kHeight;

    const kUI_FilterWidth = parseInt(Math.sqrt(kUI_BoxValidArea / kFilterNum));
    const kUI_FilterHeight = kUI_FilterWidth;

    const maxColNum = parseInt((kUI_BoxWidth - kUI_RowSpace) / kUI_FilterWidth);
    const maxRowNum = parseInt((kFilterNum - 1) / maxColNum) + 1;

    // 실제 keras모델에서 weight value들은 float32이지만
    //  numjs로 읽을 시에는 64로 해야함..?!
    const arrBuff = filterResponse.data;
    image = Buffer.from(arrBuff, 'binary').toString('base64')
    image = 'data:image/jpg;base64,' + image;

  }
  return (
    <div className="SecondBoard" id='SecondBoard'>
      <div className="board-section layer">
        <div>Layer Name</div>
        <div>{layer_name}</div>
      </div>
      <div className="board-section mode">
        <div>Mode</div>
        <ButtonGroup size="sm">
          {
            FILTER_VISUAL_MODE.map((model_name, idx) => {
              return (
                <Button key={idx}>
                  <div onClick={() => onChangeMode(idx)}>{FILTER_VISUAL_MODE[idx]}</div>
                </Button>);
            })
          }
        </ButtonGroup>
      </div>
      <div className="board-section depth">
        <div>Depth</div>
        <SliderWithTooltip
          min={0}
          max={kDepthNum - 1}
          dots step={1} value={depth}
          tipFormatter={depthIndexFormatter}
          tipProps={{overlayClassName: 'foo'}}
          onChange={onChangeSlider}
        />

        <img className='test-input' src={image} align="center" width={kUI_BoxWidth - 20} height={kUI_BoxHeight - 20}/>
        <ReactEcharts id='filter'
                      option={emptyOption}
                      showLoading={false}
                      ref={(e) => {
                        if (e) {
                          secondEchartInstance = e.getEchartsInstance();
                          secondEchartInstance.hideLoading();

                        }
                      }}/>
      </div>
    </div>
  );

}

function GetEchartBoard(model_id, layer_name, filterResponse, depth, mode, container) {

  const onChangeMode = (value) => {
    if (container) {
      if (mode == value) return;

      container.changeMode(value);
    }
  }
  const onChangeSlider = (value) => {
    if (container) {
      if (depth == value) return;

      container.changeDepth(value);
    }
  }

  const emptyOption = {};
  var option = {};
  var xData = [];
  var yData = [];


  // SecondBoard의 폭 얻어오기
  var boardWidth = 600;
  if (document.getElementById('SecondBoard')) {
    boardWidth = document.getElementById('SecondBoard').offsetWidth;
  }

  if (secondEchartInstance)
    secondEchartInstance.clear();

  var kDepthNum = 1;
  // Get Data And Option
  if (filterResponse != undefined) {


    const starttime = performance.now();

    const kUI_BoxWidth = styles.BoxWidth;
    const kUI_BoxHeight = styles.BoxHeight;
    const kUI_RowSpace = styles.RowSpace;
    const kUI_ColSpace = styles.ColSpace;
    const kUI_BoxValidArea = (kUI_BoxWidth - kUI_RowSpace) * (kUI_BoxHeight - kUI_ColSpace);

    const header = filterResponse.headers;
    const kFilterNum = parseInt(filterResponse.headers.filternum);
    kDepthNum = parseInt(filterResponse.headers.depthnum);
    const kWidth = parseInt(filterResponse.headers.vwidth);
    const kHeight = parseInt(filterResponse.headers.vheight);
    const valMin = parseFloat(filterResponse.headers.valmin);
    const valMax = parseFloat(filterResponse.headers.valmax);
    const kArea = kWidth * kHeight;

    const kUI_FilterWidth = parseInt(Math.sqrt(kUI_BoxValidArea / kFilterNum));
    const kUI_FilterHeight = kUI_FilterWidth;

    const maxColNum = parseInt((kUI_BoxWidth - kUI_RowSpace) / kUI_FilterWidth);
    const maxRowNum = parseInt((kFilterNum - 1) / maxColNum) + 1;

    // 축 눈금 설정
    for (var i = 0; i < kWidth * maxColNum; i++) {
      xData.push(i);
    }
    for (var j = 0; j < kHeight * maxRowNum; j++) {
      // for (var j = kHeight * maxRowNum - 1; j >= 0; j--) {
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


    // 기타 옵션
    const depthIdx = depth;
    const symbolSizeWidth = parseInt(430 / (kWidth * (maxColNum - 1)));
    const symbolSizeHeight = parseInt(430 / (kHeight * (maxRowNum - 1)));

    if (mode === 1) {
      // HeatMap 옵션
      option = {
        visualMap: {
          orient: 'horizontal',
          bottom: 0,
          right: 'center',
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
          left: kUI_RowSpace * 2,
          top: kUI_ColSpace * 2,
          right: 0,
          bottom: 0,
          width: kUI_BoxWidth * 0.7,
          height: kUI_BoxHeight * 0.7
        },
        xAxis: {
          type: 'category',
          data: xData,

          min: 0,
          interval: kWidth - 1,

          axisTick: {
            interval: kWidth - 1,
            alignWithLabel: true,

            inside: true,
            length: kUI_BoxHeight * 0.7,
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
          // left: 'right',
          inverse: true,

          min: 0,
          interval: kHeight - 1,

          axisTick: {
            interval: kHeight - 1,
            alignWithLabel: true,

            inside: true,
            length: kUI_BoxHeight * 0.7,
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

    if (mode === 2) {
      // Bar 3d 옵션
      option = {

        visualMap: {
          orient: 'horizontal',
          bottom: 0,
          right: 'center',
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
          position: 'top',
          formatter: function (p) {
            return 'Filter : ' + parseInt(p.dataIndex / kArea) +
              '</br>';
            // '</br>' +
            // ' pos: (' + p.data[0] + ',' + p.data[1] + ')';
          }
        },

        grid3D: {
          boxHeight: 1,

          viewControl: {
            panMouseButton: 'left',
            rotateMouseButton: 'right',
            damping: 0.5,
            panSensitivity: 0.5,
            rotateSensitivity: 0,
            zoomSensitivity: 2,
            projection: 'orthographic',
            alpha: -90,
            beta: 0,
            center: [0, 0, 0]
          }
        },
        xAxis3D: {
          type: 'value',
          data: xData,
          gridIndex: 0,

          min: 0,
          max: 'dataMax',
          interval: kWidth,
        },
        yAxis3D: {
          type: 'value',
          data: yData,
          gridIndex: 0,

          min: 0,
          max: 'dataMax',
          interval: kHeight,

        },
        zAxis3D: {
          type: 'value',
          name: '',
          min: 0,
          max: 0,
          axisLabel: {
            show: false
          },
        },

        series: (
          {
            name: 'depth' + depthIdx,
            type: 'bar3D',
            data: dataInDepth[depthIdx],
            xAxisIndex: 0,
            yAxisIndex: 0,
            label: {
              show: false,
              formatter: function (param) {
                return '';
              }
            },
            barSize: [symbolSizeWidth / 4.3, symbolSizeHeight / 4.3],

            animation: false,
          }
        )
      }
    }

  }


  return (
    <div className="SecondBoard" id='SecondBoard'>
      <div className="board-section layer">
        <div>Layer Name</div>
        <div>{layer_name}</div>
      </div>
      <div className="board-section mode">
        <div>Mode</div>
        <ButtonGroup size="sm">
          {
            FILTER_VISUAL_MODE.map((model_name, idx) => {
              return (
                <Button key={idx}>
                  <div onClick={() => onChangeMode(idx)}>{FILTER_VISUAL_MODE[idx]}</div>
                </Button>);
            })
          }
        </ButtonGroup>
      </div>
      <div className="board-section depth">
        <div>Depth</div>
        <SliderWithTooltip
          min={0}
          max={kDepthNum - 1}
          dots step={1} value={depth}
          tipFormatter={depthIndexFormatter}
          tipProps={{overlayClassName: 'foo'}}
          onChange={onChangeSlider}
        />
        <ReactEcharts id='filter'
                      option={option}
                      showLoading={true}
                      ref={(e) => {
                        if (e) {
                          secondEchartInstance = e.getEchartsInstance();
                          secondEchartInstance.hideLoading();
                        }
                      }}
        />
      </div>
      <b>Depth</b>
    </div>
  );
}

export default SecondBoard;
export {secondEchartInstance};
