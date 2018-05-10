import React, { Component } from 'react';
import { Stage, Group, Layer, Ellipse, Rect, Text } from 'react-konva';
import Konva from 'konva';

class Board extends Component {

    constructor(props) {
        super(props);
        const x = 150;
        const y = 150;
        const hSpacing = 15;
        const vSpacing = 25;
        const boardHMargin = 4 * hSpacing;
        const boxWidth = 100;
        const boxHeight = 120;
        const dishWidth = 120;
        const dishHeight = (2 * boxHeight) + vSpacing;
        const dish1Left = x + boardHMargin;
        const boxesLeft = dish1Left + dishWidth + hSpacing;
        this.state = {
            x,
            y,
            width: 300,
            height: 200,
            hSpacing,
            vSpacing,
            boardHMargin,
            player1Boxes: [...Array(6).keys()],
            player2Boxes: [...Array(6).keys()],
            dishes: [...Array(2).keys()],
            boxWidth,
            boxHeight,
            boxColour: '#ced130',
            dishColour: '#ced130',
            backgroundColour: '#1d6a82',
            dishWidth,
            dishHeight,
            dish1Left,
            dish2Left: boxesLeft + (6 * boxWidth) + (6 * hSpacing),
            boxesLeft: dish1Left + dishWidth + hSpacing, // space for the dish on the left side
            boxesTop: y + vSpacing,
        };
    }

    render() {
        const player1Boxes = this.state.player1Boxes.map(i => this.generateBoxes(this.state.boxesTop, i));
        const player2Boxes = this.state.player2Boxes.map(i => this.generateBoxes((this.state.boxesTop + this.state.boxHeight + this.state.vSpacing), i));

        return (
            <Group>
                <Background {... this.state} />
                {player1Boxes}
                {player2Boxes}
                <Dish
                    x={this.state.dish1Left}
                    y={this.state.boxesTop}
                    width={this.state.dishWidth}
                    height={this.state.dishHeight}
                    colour={this.state.dishColour} />
                <Dish
                    x={this.state.dish2Left}
                    y={this.state.boxesTop}
                    width={this.state.dishWidth}
                    height={this.state.dishHeight}
                    colour={this.state.dishColour} />
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
            fill={this.state.boxColour}
        />)
    }

    getX(i) {
        return this.state.boxesLeft + (i * this.state.boxWidth) + (i * this.state.hSpacing);
    }
}

function Background(props) {
    const width = (props.boxWidth * 6) + (props.hSpacing * 7) + (props.dishWidth * 2) + (props.boardHMargin * 2);
    const height = (2 * props.boxHeight) + (3 * props.vSpacing);
    return (
        <Rect
            x={props.x}
            y={props.y}
            cornerRadius={width / 3}
            width={width}
            height={height}
            fill={props.backgroundColour}
        />
    );
}
function Dish(props) {
    return (
        <Ellipse
            offsetY={-(props.height / 2)}
            offsetX={-(props.width / 2)}
            x={props.x}
            y={props.y}
            width={props.width}
            height={props.height}
            cornerRadius={props.height / 2}
            fill={props.colour}
        />
    )
}

export default Board;