import React, { Component } from 'react';
import { moveAll, moveCounter } from './animations'
import CounterBall from './CounterBall';
import Dish from './Dish';
import Board from './Board';
import { circularIndex, finishedInHomeDish, getBallIdsToUpdate } from './helpers'
import { player1DishIndex, player2DishIndex } from './constants'

class HtmlBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameState: {
                player1Active: true,
                counters: [5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 0] //The number of counters in each cell, top left is 0
            },
            flashText: "Testing",
        };
    }

    render() {
        //this.logGame();
        const indexes = [...Array(6).keys()];
        const player1Boxes = indexes.map(i => this.generateBox(i, i));
        const player2Boxes = indexes.map(i => this.generateBox(i, 12 - i));
        const player1Active = this.state.gameState.player1Active;
        return (
            <div className="wrapper">
                <div className={`player-indicator player-1 ${player1Active ? '' : 'hidden'}`}>
                    <span className="player-name">▼ Player 1 ▼</span>
                </div>
                <Board>
                    <Dish
                        index={0}
                        gameIndex={player2DishIndex}
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
                        gameIndex={player1DishIndex}
                        counters={this.state.gameState.counters[player1DishIndex]}
                    />
                </Board>
                <div className={`player-indicator player-2 ${player1Active ? 'hidden' : ''}`}>
                    <span className="player-name">▲ Player 2 ▲</span>
                </div>
                {/* <div className='overlay'>
                    {this.state.flashText}
                </div> */}
            </div>
        );
    }

    generateBox(i, gameIndex) {
        const value = this.state.gameState.counters[gameIndex];
        return (
            <div id={`box-${gameIndex}`} className={`box box-${i}`} onClick={() => this.handleClick(gameIndex)}>
                <CounterBall counters={value} hover={true} gameIndex={gameIndex} />
            </div>
        )
    }

    handleClick(selectedIndex) {
        if (this.wrongPlayerClicked(selectedIndex)) {
            alert('Wrong player!');
        } else {
            this.doMoves(selectedIndex);
            //this.doMove(selectedIndex);
        }

    }

    doSingleMove(selectedIndex, numberofCountersMoved, remainingCounterToMove) {
        console.log(`doSingleMove with selectedIndex: ${selectedIndex} numberofCountersMoved: ${numberofCountersMoved} remainingCounterToMove: ${remainingCounterToMove}`)
        if(remainingCounterToMove === 0)
            return;

        moveCounter(selectedIndex, circularIndex(selectedIndex + numberofCountersMoved + 1), () =>
        {
            window.setTimeout(
                this.doSingleMove(selectedIndex, numberofCountersMoved + 1, remainingCounterToMove - 1)
                , 2000);
        });
    }

    doMoves(selectedIndex){
        const counters = this.state.gameState.counters;
        const numInBox = counters[selectedIndex];
        moveAll(selectedIndex, getBallIdsToUpdate(selectedIndex, numInBox))
    }

    doMove(selectedIndex) {
        const player1Active = this.state.gameState.player1Active;
        const counters = this.state.gameState.counters;
        const newCounters = Array.from(counters);
        const numInBox = counters[selectedIndex];
        newCounters[selectedIndex] = 0; //empty the selected box
        counters[selectedIndex] = 0;

        //Add a counter to each of the following boxes
        for (let i = numInBox; i > 0; i--) {
            const ci = circularIndex(i + selectedIndex);
            newCounters[ci] = counters[ci] + 1;
        }

        const playerActive = finishedInHomeDish(selectedIndex, numInBox, player1Active) ? player1Active : !player1Active;

        this.setState({
            gameState: {
                player1Active: playerActive,
                counters: newCounters,
            },
        })
    }

    wrongPlayerClicked(gameIndex) {
        if (this.state.gameState.player1Active) {
            return gameIndex > player1DishIndex;
        }
        return gameIndex < player1DishIndex;
    }
}

export {
    HtmlBoard,
}
