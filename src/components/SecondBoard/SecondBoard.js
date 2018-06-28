import React from 'react';
import PropTypes from 'prop-types';
import {Badge} from 'reactstrap';
import './SecondBoard.scss';
import ReactEcharts from 'echarts-for-react';
import {MODEL_NAMES} from "../../constants";
// import 'echarts-gl'


const SecondBoard = ({model_id, layer_name, filters}) => {


  const emptyOption = {};
  var option = {};
  var xData = [];
  var yData = [];

  const kBOX_WIDTH = 100;
  const kBOX_HEIGHT = 100;
  const kROW_SPACE = 30;
  const kCOL_SPACE = 30;

  // SecondBoard의 폭 얻어오기
  var width = 600;
  if (document.getElementById('SecondBoard')) {
    width = document.getElementById('SecondBoard').offsetWidth;
  }

  // Get Data And Option
  if (filters != null && filters != "" && typeof filters[0] != "number") {
    // var valMin = Infinity;
    // var valMax = -Infinity;
    var data = [];
    var valMin = -1;
    var valMax = 1;

    // data(3차원 배열 선언)
    data = Array(filters.length);
    for (var f = 0; f < filters.length; f++) {
      data[f] = Array(filters[0].length);
      for (var d = 0; d < filters[0].length; d++) {
        data[f][d] = [];
      }
    }

    // 축 눈금 설정
    for (var i = 0; i < filters[0][0].length; i++) {
      xData.push(i);
    }
    for (var j = 0; j < filters[0][0][0].length; j++) {
      yData.push(j);
    }

    // Max,Min, Echart가 표시할 데이터 설정
    for (var f = 0; f < filters.length; f++) {
      for (var d = 0; d < filters[0].length; d++) {
        for (var i = 0; i < filters[0][0].length; i++) {
          for (var j = 0; j < filters[0][0][0].length; j++) {
            const value = filters[f][d][i][j];
            valMax = Math.max(valMax, value);
            valMin = Math.min(valMin, value);
            data[f][d].push([i,j,value]);
          }
        }
      }
    }

    // boxWidth는 고정시키고 그에 따라 symbolSize 설정
    const symbolSize = kBOX_WIDTH / filters[0][0].length;

    //기본 옵션 설정
    option = {
      legend: {
        left: 'right',
        type: 'scroll',
        orient: 'vertical',
        selectedMode: 'single',
      },
      visualMap: {
        top: 0,
        right: 80,
        min: valMin,
        max: valMax,
        seriesIndex: [0],
        inRange: {
          // color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          color: ['#000000', '#ffffff']
        }
      },
      brush: {
        brushLink: 'all',
        xAxisIndex: [],
        yAxisIndex: [],
        inBrush: {
          opacity: 1
        }
      },
      tooltip: {
        position: 'right'
      },
      grid: [],
      xAxis: [],
      yAxis: [],
      series: []
    }

    // f 개의 grid,xAxis,yAxis 추가
    // f * d개의 series 추가
    for (var filterIdx = 0; filterIdx < filters.length; filterIdx++) {
      const maxColNum = parseInt(((width - kBOX_WIDTH) - kROW_SPACE) / (kROW_SPACE + kBOX_WIDTH));
      const rowIdx = parseInt(filterIdx / maxColNum);
      const colIdx = filterIdx - rowIdx * maxColNum;
      var left = kROW_SPACE + (kROW_SPACE + kBOX_WIDTH) * colIdx;
      var top = rowIdx * (kCOL_SPACE + kBOX_HEIGHT);


      option.grid.push({
        left: left,
        right: 0,
        top: top,
        bottom: 0,
        width: kBOX_WIDTH,
        height: kBOX_HEIGHT
      });
      option.brush.xAxisIndex && option.brush.xAxisIndex.push(filterIdx);
      option.brush.yAxisIndex && option.brush.yAxisIndex.push(filterIdx);

      option.xAxis.push({
        type: 'category',
        data: xData,
        gridIndex: filterIdx,
      });
      option.yAxis.push({
        type: 'category',
        data: yData,
        gridIndex: filterIdx,
      });
      for (var depthIdx = 0; depthIdx < filters[0].length; depthIdx++) {
        option.series.push(
          {
            name: 'depth'+depthIdx,
            type: 'heatmap',
            data: data[filterIdx][depthIdx],
            xAxisIndex: filterIdx,
            yAxisIndex: filterIdx,

            itemStyle: {
              emphasis: {
                borderColor: '#333',
                borderWidth: 1
              }
            },
            progressive: 1000,
            animation: false
          }
        )
        option.visualMap.seriesIndex.push(option.series.length - 1);
      }
    }
  }

  return (
    <div className="SecondBoard" id='SecondBoard'>
      <h3><Badge color="secondary">LayerName</Badge> {layer_name}</h3>
      <ReactEcharts id='filter'
                    ref={(e) => {
                      this.echarts_react = e;
                      if (e) {
                        let echarts_instance = e.getEchartsInstance();
                        echarts_instance.clear();
                        echarts_instance.setOption(option);
                      }
                    }}
                    option={emptyOption}
      />
    </div>
  );
};

//
///////////////////////////////////////////////////////////////////////
// const SecondBoard = ({model_id, layer_name, filters}) => {
//
//
//   const emptyOption = {};
//   var option = {};
//   var dataByDepths = [];
//   var optionByDepths = [];
//   var xData = [];
//   var yData = [];
//
//   const kBOX_WIDTH = 100;
//   const kBOX_HEIGHT = 100;
//   const kROW_SPACE = 30;
//   const kCOL_SPACE = 30;
//
//   var width = 600;
//   if (document.getElementById('SecondBoard')) {
//     width = document.getElementById('SecondBoard').offsetWidth;
//   }
//
//   // Get Data And Option
//   if (filters != null && filters != "" && typeof filters[0] != "number") {
//     var valMin = Infinity;
//     var valMax = -Infinity;
//
//     const target = filters[0];
//
//     for (var i = 0; i < target.length; i++) {
//       xData.push(i);
//     }
//     for (var j = 0; j < target[0].length; j++) {
//       yData.push(j);
//     }
//
//     for (var k = 0; k < target[0][0].length; k++) {
//       var data = [];
//
//       for (var i = 0; i < target.length; i++) {
//         for (var j = 0; j < target[i].length; j++) {
//           const value = target[i][j][k];
//           valMax = Math.max(valMax, value);
//           valMin = Math.min(valMin, value);
//           data.push([i, j, value]);
//         }
//       }
//       dataByDepths.push(data);
//     }
//
//     const symbolSize = kBOX_WIDTH / target.length;
//
//     option = {
//       legend: {
//         left: 'right',
//         type: 'scroll',
//         orient: 'vertical',
//         selectedMode: 'single',
//       },
//       visualMap: {
//         top:0,
//         right:80,
//         min: valMin,
//         max: valMax,
//         seriesIndex: [0],
//         inRange: {
//           // color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
//           color: ['#000000', '#ffffff']
//         }
//       },
//       brush: {
//         brushLink: 'all',
//         xAxisIndex: [],
//         yAxisIndex: [],
//         inBrush: {
//           opacity: 1
//         }
//       },
//       tooltip: {
//         position: 'right'
//       },
//       // grid: [],
//       // xAxis: [],
//       // yAxis: [],
//       // series: []
//       grid: [],
//       xAxis: [],
//       yAxis: [],
//       series: []
//     }
//
//
//     for (var idx = 0; idx < dataByDepths.length; idx++) {
//       const maxColNum = parseInt(((width - kBOX_WIDTH) - kROW_SPACE) / (kROW_SPACE + kBOX_WIDTH));
//       const rowIdx = parseInt(idx / maxColNum);
//       const colIdx = idx - rowIdx * maxColNum;
//       var left = kROW_SPACE + (kROW_SPACE + kBOX_WIDTH) * colIdx;
//       var top = rowIdx * (kCOL_SPACE + kBOX_HEIGHT);
//
//       console.log('maxCol:' + maxColNum);
//
//       option.grid.push({
//         left: left,
//         right: 0,
//         top: top,
//         bottom: 0,
//         width: kBOX_WIDTH,
//         height: kBOX_HEIGHT
//       });
//       option.brush.xAxisIndex && option.brush.xAxisIndex.push(idx);
//       option.brush.yAxisIndex && option.brush.yAxisIndex.push(idx);
//
//       option.xAxis.push({
//         type: 'category',
//         data: xData,
//         gridIndex: idx,
//       });
//       option.yAxis.push({
//         type: 'category',
//         data: yData,
//         gridIndex: idx,
//       });
//       option.series.push(
//         {
//           name: 'depth' + idx,
//           type: 'heatmap',
//           data: dataByDepths[idx],
//           xAxisIndex: idx,
//           yAxisIndex: idx,
//
//           itemStyle: {
//             emphasis: {
//               borderColor: '#333',
//               borderWidth: 1
//             }
//           },
//           progressive: 1000,
//           animation: false
//         }
//       )
//       option.visualMap.seriesIndex.push(option.series.length - 1);
//     }
//   }
//
//   return (
//     <div className="SecondBoard" id='SecondBoard'>
//       <h3><Badge color="secondary">LayerName</Badge> {layer_name}</h3>
//       <ReactEcharts id='filter'
//                     ref={(e) => {
//                       this.echarts_react = e;
//                       if (e) {
//                         let echarts_instance = e.getEchartsInstance();
//                         echarts_instance.clear();
//                         echarts_instance.setOption(option);
//                       }
//                     }}
//                     option={emptyOption}
//       />
//     </div>
//   );
// }

//3d///////////////////////////////
// const SecondBoard = ({model_id, layer_name, filters}) => {
//   var data = [];
//   var valMin = Infinity;
//   var valMax = -Infinity;
//
//
//   var option= {};
//   if (filters != null && filters != "" && typeof filters[0] != "number") {
//
//     const target = filters[0];
//
//     for (var i = 0; i < target.length; i++) {
//       for (var j = 0; j < target[i].length; j++) {
//         for (var k = 0; k < target[i][j].length; k++) {
//           const value = target[i][j][k];
//           valMax = Math.max(valMax, value);
//           valMin = Math.min(valMin, value);
//           data.push([i+1, k+1, j+1, value]);
//         }
//       }
//     }
//     const symbolSize=10;
//     const boxWidth =  symbolSize*target.length;
//     const boxHeight=  symbolSize*target[0].length;
//     const boxDepth=  symbolSize*target[0][0].length;
//
//     option = {
//       visualMap: {
//         show: false,
//         min: valMin,
//         max: valMax,
//         inRange: {
//           symbolSize: symbolSize,
//           symbol: 'rect',
//           // color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
//           color: ['#000000', '#ffffff'],
//           // color: ['#ffffff', '#000000'],
//         }
//       },
//       grid3D: {
//         boxWidth:boxWidth,
//         boxHeight:boxHeight,
//         boxDepth:boxDepth,
//         viewControl:{
//           panMouseButton:'left',
//           rotateMouseButton:'right',
//           center:[boxWidth/2,boxHeight/2,boxDepth/2]
//         }
//       },
//       xAxis3D: {
//         interval: 1,
//         scale:true,
//         axisTick:{
//           show:false,
//           interval: 1,
//         },
//       },
//
//       yAxis3D: {
//         interval: 1,
//         name:'depth',
//         scale:true,
//         axisTick:{
//           show:false,
//           interval: 1,
//         },
//       },
//       zAxis3D: {
//         interval: 1,
//         name:'Y',
//         scale:true,
//         axisTick:{
//           show:false,
//           interval: 1,
//         },
//       },
//       series: [{
//         type: 'scatter3D',
//         data: data
//       }]
//     }
//   }
//
//   return (
//     <div className="SecondBoard">
//       <h3><Badge color="secondary">LayerName</Badge> {layer_name}</h3>
//       <ReactEcharts
//         option={option}
//       />
//     </div>
//   );
// };


export default SecondBoard;
