import React from 'react';
import PropTypes from 'prop-types';
import './Board.scss';
import { List } from 'immutable';
import {Sigma, RandomizeNodePositions, RelativeSize} from 'react-sigma';

const Board = ({model_id, layers_info}) => {
  console.log("Board", model_id, layers_info);
  const layersList = layers_info.find(item => item.get('id') === model_id);
  const layers = (layersList)? layersList.get('layers').toArray() : [];
  // let myGraph = {nodes:[{id:"n1", label:"Alice"}, {id:"n2", label:"Rabbit"}], edges:[{id:"e1",source:"n1",target:"n2",label:"SEES"}]};

  const createGraph = (layers) => {
    let nodes = [], edges = [];

    for(let i=0; i<5; i++) {
      nodes.push({
        id: "n" + i.toString(),
        label: layers[i]
      });
      console.log("label", layers[i]);

      if(i !== 0) {
        edges.push({
          id: "e" + i.toString(),
          source: "n" + (i-1).toString(),
          target: "n" + i.toString(),
          label: "l" + i.toString()
        })
      }
    }

    return {
      nodes: nodes,
      edges: edges
    };
  };

  let myGraph = (layers.length === 0) ? {} : createGraph(layers);

  const counterList = layers.map(
    (layer) => (
      <div>
        {layer}
      </div>
    )
  );
  return (
    <div className="Board">
      {/*{counterList}*/}
      {console.log(myGraph)}
      {(layers.length !== 0) ?
        <Sigma graph={myGraph} settings={{drawEdges: true, clone: false}}>
          <RelativeSize initialSize={15}/>
          <RandomizeNodePositions/>
        </Sigma>
        : <div></div>
      }
    </div>
  );
};

Board.propTypes = {
  model_id: PropTypes.number,
  layers_info: PropTypes.instanceOf(List)
};

Board.defaultProps = {
};

export default Board;