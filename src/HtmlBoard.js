import React, { Component } from 'react';
import { Stage, Group, Layer, Ellipse, Rect, Text } from 'react-konva';
import Konva from 'konva';
import { css } from 'emotion';
import Layout from './layout';
import { ArrowUp, ArrowDown } from './Arrows';

const player2DishIndex = 0;
const player1DishIndex = 7;
class HtmlBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameState: {
                player1Active: true,
                counters: [0, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5] //The number of counters in each cell, top left is 1
            },
        };
    }

    render() {
        //this.logGame();
        const indexes = [...Array(6).keys()];
        const player1Boxes = indexes.map(i => this.generateBox(i, i + 1));
        const player2Boxes = indexes.map(i => this.generateBox(i, 13 - i));
        const player1Active = this.state.gameState.player1Active;
        return (
            <div className="wrapper">
                <div className={`player-indicator player-1 ${player1Active ? '' : 'hidden'}`}>
                    <span className="player-name">▼ Player 1 ▼</span>
                </div>
                <Board>
                    <Dish
                        index={0}
                        counters={this.state.gameState.counters[player2DishIndex]}
                    />
                    <div className="both-rows">
                        <div className="row">
                            {player1Boxes}
                        </div>
                        <div className="row">
                            {player2Boxes}
                        </div>
                    </div>
                    <Dish
                        index={1}
                        counters={this.state.gameState.counters[player1DishIndex]}
                    />
                </Board>
                <div className={`player-indicator player-2 ${player1Active ? 'hidden' : ''}`}>
                    <span className="player-name">▲ Player 2 ▲</span>
                </div>
            </div>
        );
    }

    generateBox(i, gameIndex) {
        const value = this.state.gameState.counters[gameIndex];
        return (
            <div id={`box-${gameIndex}`} className={`box box-${i}`} onClick={() => this.handleClick(gameIndex)}>
                <CounterBall counters={value} hover={true} />
            </div>
        )
    }

    handleClick(selectedIndex) {
        if (this.wrongPlayerClicked(selectedIndex)) {
            alert('Wrong player!');
        } else {
            this.doMove(selectedIndex);
        }
        
    }

    doMove(selectedIndex) {
        const counters = this.state.gameState.counters;
        const newCounters = Array.from(counters);
        const numInBox = counters[selectedIndex];
        newCounters[selectedIndex] = 0; //empty the selected box
        counters[selectedIndex] = 0;

        //Add a counter to each of the following boxes
        for (var i = numInBox; i > 0; i--) {
            const ci = this.circularIndex(i + selectedIndex);
            newCounters[ci] = counters[ci] + 1;
        }

        const playerActive = this.finishedInHomeDish(selectedIndex, numInBox) ? this.state.gameState.player1Active : !this.state.gameState.player1Active;

        this.setState({
            gameState: {
                player1Active: playerActive,
                counters: newCounters,
            },
        })
    }

    finishedInHomeDish(selectedIndex, numInBox) {
        const ci = this.circularIndex(selectedIndex + numInBox)
        if(this.state.gameState.player1Active){
            return ci === player1DishIndex
        }
        else return ci === player2DishIndex
    }

    wrongPlayerClicked(gameIndex) {
        if (this.state.gameState.player1Active) {
            return gameIndex > player1DishIndex;
        }
        return gameIndex < player1DishIndex;
    }

    circularIndex(i) {
        if (i < this.state.gameState.counters.length)
            return i;
        return i - this.state.gameState.counters.length;
    }

    logGame() {
        this.state.gameState.counters.forEach(e => console.log(e))
    }
}

function Dish(props) {
    return (
        <div id={`dish-${props.index}`} className='dish'>
            <CounterBall counters={props.counters} hover={false} />
        </div>
    )
}

function CounterBall(props) {
    const hidden = props.counters == 0 ? 'hidden' : '';
    const hoverClass = props.hover ? 'ball-hover' : '';
    return (
        <div className={hidden}>
            <section className="stage">
            <figure className={`ball ${hoverClass}`}>
                <span className="shadow" />
                <span className="counter-text">{props.counters.toString()}</span>
            </figure>
            </section>
        </div>
    )
}

function Board(props) {
    return (
        <div id='background' className='board'>
            {props.children}
        </div>
    )
}

export default HtmlBoard;