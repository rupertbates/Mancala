import React, { Component } from 'react';
import { Group, Ellipse, Rect, Text } from 'react-konva';

const dish1Index = 0;
const dish2Index = 7;
class Board extends Component {

    constructor(props) {
        super(props);
        const x = 150;
        const y = 150;
        const hSpacing = 15;
        const vSpacing = 25;
        const boardHMargin = 4 * hSpacing;
        const boardVMargin = 2 * vSpacing;
        const boxWidth = 100;
        const boxHeight = 120;
        const dishWidth = 120;
        const dishHeight = (2 * boxHeight) + vSpacing;
        const dish1Left = x + boardHMargin;
        const boxesLeft = dish1Left + dishWidth + hSpacing;
        this.state = {
            gameState: {
                player1Active: true,
                counters: [0, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5] //The number of counters in each cell, top left is 1
            },
        };
        this.layout = {
            x,
            y,
            width: 300,
            height: 200,
            hSpacing,
            vSpacing,
            boardHMargin,
            boardVMargin,
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
            boxesTop1: y + boardVMargin,
            boxesTop2: y + boardVMargin + boxHeight + vSpacing,
        }
    }

    createBox(i, offset, counters){
        return {
            layoutIndex: i,
            gameIndex: i + offset,
            counters: counters[i + offset],
        }
    }

    render() {
        this.logGame();
        const indexes = [...Array(6).keys()];
        const player1Boxes = indexes.map(i => this.generateBoxes(this.layout.boxesTop1, i, i + 1));
        const player2Boxes = indexes.map(i => this.generateBoxes(this.layout.boxesTop2, i, 13 - i));

        return (
            <Group>
                <Background {... this.layout} />
                {player1Boxes}
                {player2Boxes}
                <Dish
                    counters={this.state.gameState.counters[dish1Index].toString()}
                    x={this.layout.dish1Left}
                    y={this.layout.boxesTop1}
                    width={this.layout.dishWidth}
                    height={this.layout.dishHeight}
                    colour={this.layout.dishColour} />
                <Dish
                    counters={this.state.gameState.counters[dish2Index].toString()}
                    x={this.layout.dish2Left}
                    y={this.layout.boxesTop1}
                    width={this.layout.dishWidth}
                    height={this.layout.dishHeight}
                    colour={this.layout.dishColour} />
            </Group>
        );
    }

    handleClick(gameIndex) {
        if(this.wrongPlayerClicked(gameIndex)){
            alert('Wrong player!');
            return;
        }
        const ca = this.state.gameState.counters;
        const newCounters = Array.from(ca);

        //TODO: Be more functional!
        const numInBox = ca[gameIndex];
        newCounters[gameIndex] = 0;
        for(var i=numInBox;i>0;i--){
            const ci = this.circularIndex(i + gameIndex);
            newCounters[ci] = ca[ci] + 1;
        }
        this.setState({
            gameState: {
                player1Active: !this.state.gameState.player1Active,
                counters: newCounters,
            },
            player1Boxes: this.state.player1Boxes,
            player2Boxes: this.state.player2Boxes,
        })
    }

    wrongPlayerClicked(gameIndex){
        if(this.state.gameState.player1Active){
            return gameIndex > dish2Index;
        }
        return gameIndex < dish2Index;
    }

    circularIndex(i) {
        if(i < this.state.gameState.counters.length)
            return i;
        return i - this.state.gameState.counters.length;
    }

    generateBoxes(y, i, gameIndex) {
        const x = this.getX(i)
        return (
        <Group onClick={() => this.handleClick(gameIndex)}>
            <Rect
                key={i}
                x={x}
                y={y}
                width={this.layout.boxWidth}
                height={this.layout.boxHeight}
                cornerRadius={this.layout.boxWidth / 2}
                fill={this.layout.boxColour}
            />
            <CounterText
                text={this.state.gameState.counters[gameIndex].toString()}
                x={x}
                y={y + this.layout.boxHeight / 2.5} //Hack to get the text placing right
                width={this.layout.boxWidth}
                height={this.layout.boxHeight}
            />
        </Group>
        )
    }

    getX(i) {
        return this.layout.boxesLeft + (i * this.layout.boxWidth) + (i * this.layout.hSpacing);
    }

    logGame() {
        this.state.gameState.counters.forEach(e => console.log(e))
    }
}

function Background(props) {
    const width = (props.boxWidth * 6) + (props.hSpacing * 7) + (props.dishWidth * 2) + (props.boardHMargin * 2);
    const height = (2 * props.boxHeight) + (2 * props.boardVMargin) + props.vSpacing;
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
        <Group>
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
            <CounterText
                text={props.counters}
                x={props.x}
                y={props.y + props.height / 2} //Hack to get the text placing right
                width={props.width}
                height={props.height}
            />
        </Group>
    )
}

function CounterText(props) {
    return (
        <Text
            text={props.text}
            x={props.x}
            y={props.y} //Hack to get the text placing right
            width={props.width}
            height={props.height}
            fontSize={24}
            fill='white'
            align='center'
            fontFamily='Calibri'
        />
    );
}

export default Board;
