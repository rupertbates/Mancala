import React, { Component } from 'react';
import { Stage, Group, Layer, Ellipse, Rect, Text } from 'react-konva';
import Konva from 'konva';

class Board extends Component {

    constructor(props) {
        super(props);
        const x = 30;
        const y = 50;
        const hSpacing = 15;
        const vSpacing = 15;
        const boxWidth = 100;
        this.state = {
            x,
            y,
            width: 300,
            height: 200,
            player1Cells: [...Array(6).keys()],
            player2Cells: [...Array(6).keys()],
            dishes: [...Array(2).keys()],
            boxHeight: 80,
            boxWidth,
            hSpacing,
            vSpacing: 15,
            cellsLeft: x + boxWidth + (2 * hSpacing) // space for the dish on the left side
        };
    }

    render() {
        const player1Boxes = this.state.player1Cells.map(i => this.generateBoxes(this.state.y, i));
        const player2Boxes = this.state.player2Cells.map(i => this.generateBoxes((this.state.y + this.state.boxHeight + this.state.vSpacing), i));

        return (
            <Group
                x={this.state.x}
                y={this.state.y}
                width={this.state.width}
                height={this.state.height}
                visible={true}
            >
                <Background {... this.state} />
                {player1Boxes}
                {player2Boxes}
                <Dish x={this.state.x + this.state.hSpacing} y={this.state.y} width={this.state.boxWidth} height={this.state.height - (2 * this.state.vSpacing)} />
            </Group>
        );
    }

    

    generateBoxes(y, i) {
        return (<Rect
            key={i}
            x={this.getX(i)}
            y={y}
            width={this.state.boxWidth}
            height={this.state.boxHeight}
            cornerRadius={this.state.boxWidth / 2}
            fill={'#aaa'}
        />)
    }

    getX(i) {
        return this.state.cellsLeft + (i * this.state.boxWidth) + (i * this.state.hSpacing);
    }
}

function Background(props) {
    const width = 8 * (props.boxWidth + props.hSpacing)
    const height = 2.3 * (props.boxHeight + props.vSpacing)
    return (
        <Rect 
            x={props.x}
            y={props.y - props.vSpacing}
            cornerRadius={100}
            width={width}
            height={height}
            fill={'#444'}
        />
    );
}
function Dish(props)  {
    return (
        <Rect
            x={props.x}
            y={props.y}
            width={props.width}
            height={props.height}
            cornerRadius={props.height / 2}
            fill={'#aaa'}
        />
    )
}

export default Board;