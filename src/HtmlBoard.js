import React, { Component } from 'react';
import { Stage, Group, Layer, Ellipse, Rect, Text } from 'react-konva';
import Konva from 'konva';
import { css } from 'emotion';
import Layout from './layout';

const dish1Index = 0;
const dish2Index = 7;
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

        return (
            <Background>
                <Dish
                    index={0}
                    counters={this.state.gameState.counters[dish1Index]}
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
                    counters={this.state.gameState.counters[dish2Index]}
                />
            </Background>
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

    handleClick(gameIndex) {
        if (this.wrongPlayerClicked(gameIndex)) {
            alert('Wrong player!');
            return;
        }
        const ca = this.state.gameState.counters;
        const newCounters = Array.from(ca);

        //TODO: Be more functional!
        const numInBox = ca[gameIndex];
        newCounters[gameIndex] = 0;
        for (var i = numInBox; i > 0; i--) {
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

    wrongPlayerClicked(gameIndex) {
        if (this.state.gameState.player1Active) {
            return gameIndex > dish2Index;
        }
        return gameIndex < dish2Index;
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
    if(props.counters == 0)
        return null;
    const hoverClass = props.hover ? 'ball-hover' : '';
    return (
        <section className="stage">
        <figure className={`ball ${hoverClass}`}>
            <span className="shadow" />
            <span className="counter-text">{props.counters.toString()}</span>
        </figure>
        </section>
    )
}

function Background(props) {
    return (
        <div id='background' className='board'>
            {props.children}
        </div>
    )
}

export default HtmlBoard;