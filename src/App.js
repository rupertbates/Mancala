import React, { Component } from 'react';
import { Stage, RegularPolygon, Group, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import Board from './Board';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      width: 1600, 
      height: 600,
    }
  }
  render() {
    return (
      <Stage width={this.state.width} height={this.state.height}>
        <Layer>
          <Board />
        </Layer>
      </Stage>
    );
  }

  // resize(){
  //   this.setState({
  //     width: window.innerWidth, 
  //     height: window.innerHeight,
  //   });
  // }

  // componentDidMount(){
  //   window.addEventListener("resize", this.resize.bind(this));
  // }
}

function Test2() {
  return (
    <Rect
      x={200}
      y={200}
      width={400}
      height={400}
      cornerRadius={150}
      fillRadialGradientStartPoint={{
        x: 200,
        y: 200,
      }}
      fillRadialGradientStartRadius={22}
      fillRadialGradientEndPoint={{
        x: 200,
        y: 200,
      }}
      fillRadialGradientEndRadius={160}
      fillRadialGradientColorStops={[0, '#222', 0.5, '#444', 1, '#777']}
    />
  )
}

function Test() {
  return (
    <RegularPolygon
      x={500}
      y={500}
      sides={4}
      radius={70}
      fillRadialGradientStartPoint={0}
      fillRadialGradientStartRadius={0}
      fillRadialGradientEndPoint={0}
      fillRadialGradientEndRadius={70}
      fillRadialGradientColorStops={[0, 'red', 0.5, 'yellow', 1, 'blue']}
      stroke={'black'}
      strokeWidth={4}
      draggable={true}
    />
  )
}

export default App;
