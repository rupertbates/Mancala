import React, { Component } from 'react'
import { moveFirstCounter, moveNextCounter } from './animations'
import Dish from './Dish'
import Board from './Board'
import Box from './Box'
import { circularIndex, finishedInHomeDish } from './helpers'
import { player1DishIndex, player2DishIndex } from './constants'
import CounterBall from './CounterBall'

class HtmlBoard extends Component {

    constructor (props) {
        super(props)
        this.state = {
            player1Active: true,
            counters: [5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 0], //The number of counters in each cell, top left is 0
            pendingMoves: {
                originalIndex: 0,
                originalNum: 0,
                amountLeft: 0,
                from: 1,
            },
            flashText: 'Testing',
        }
    }

    render () {
        const indexes = [...Array(6).keys()]
        const onClick = this.handleClick.bind(this)
        const player1Boxes = indexes.map(i => (
            <Box
                layoutIndex={i}
                gameIndex={i}
                value={this.state.counters[i]}
                onClick={onClick}
            />
        ))
        const player2Boxes = indexes.map(i => (
            <Box
                layoutIndex={i}
                gameIndex={12 - i}
                value={this.state.counters[12 - i]}
                onClick={onClick}
            />
        ))
        const player1Active = this.state.player1Active
        return (
            <div className="wrapper">
                <div className={`player-indicator player-1 ${player1Active ? '' : 'hidden'}`}>
                    <span className="player-name">▼ Player 1 ▼</span>
                </div>
                <Board>
                    <Dish
                        index={0}
                        gameIndex={player2DishIndex}
                        counters={this.state.counters[player2DishIndex]}
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
                        counters={this.state.counters[player1DishIndex]}
                    />
                    <CounterBall
                        counters={this.state.pendingMoves ? this.state.pendingMoves.amountLeft : 0}
                        gameIndex={99}
                    />
                </Board>
                <div className={`player-indicator player-2 ${player1Active ? 'hidden' : ''}`}>
                    <span className="player-name">▲ Player 2 ▲</span>
                </div>

                {/* <div className='overlay'>
                    {this.state.flashText}
                </div> */}
            </div>
        )
    }

    componentDidUpdate () {
        if (this.state.pendingMoves.amountLeft > 0)
            this.doNextMove(this.state.pendingMoves)

    }

    handleClick (selectedIndex) {
        if (this.wrongPlayerClicked(selectedIndex)) {
            alert('Wrong player!')
        } else {
            //this.doMoves(selectedIndex);
            this.doFirstMove(selectedIndex)
        }

    }

    doNextMove (pendingMoves) {
        const counters = this.state.counters
        const newCounters = Array.from(counters)

        //Add a counter to the next box
        const ci = circularIndex(pendingMoves.from + 1)
        newCounters[ci] = counters[ci] + 1

        const player1Active = this.state.player1Active
        const finished = pendingMoves.amountLeft === 1;
        // Switch players if we have finished the move and the move didn't end in the current players home dish
        const playerActive = finished && finishedInHomeDish(pendingMoves.originalIndex, pendingMoves.originalNum, player1Active) ? player1Active : !player1Active

        const callback = () => this.setState({
            player1Active: playerActive,
            counters: newCounters,
            pendingMoves: {
                originalIndex: pendingMoves.originalIndex,
                originalNum: pendingMoves.originalNum,
                amountLeft: pendingMoves.amountLeft - 1,
                from: ci,
            }
        })

        //animate the movement
        moveNextCounter(pendingMoves.from, circularIndex(pendingMoves.from + 1), callback.bind(this))
    }

    //To animate the movement more easily we move the
    // counters one by one animating as we go
    doFirstMove (selectedIndex) {
        const counters = this.state.counters
        const newCounters = Array.from(counters)
        const numInBox = counters[selectedIndex]
        newCounters[selectedIndex] = 0 //empty the selected box
        counters[selectedIndex] = 0

        //Add a counter to the next box
        const ci = circularIndex(selectedIndex + 1)
        newCounters[ci] = counters[ci] + 1

        const player1Active = this.state.player1Active
        const finished = numInBox === 1;
        // Switch players if we have finished the move and the move didn't end in the current players home dish
        const playerActive = finished && finishedInHomeDish(selectedIndex, numInBox, player1Active) ? player1Active : !player1Active

        const callback = () => this.setState({
            player1Active: playerActive,
            counters: newCounters,
            pendingMoves: {
                originalIndex: selectedIndex,
                originalNum: numInBox,
                amountLeft: numInBox - 1,
                from: selectedIndex + 1,
            }
        })

        //animate the movement
        moveFirstCounter(selectedIndex, circularIndex(selectedIndex + 1), callback.bind(this))

    }

    wrongPlayerClicked (gameIndex) {
        if (this.state.player1Active) {
            return gameIndex > player1DishIndex
        }
        return gameIndex < player1DishIndex
    }
}

export {
    HtmlBoard,
}
