import React from 'react';
import CounterBall from './CounterBall';

export default function Dish(props) {
    return (
        <div id={`dish-${props.index}`} className='dish'>
            <CounterBall counters={props.counters} hover={false} gameIndex={props.gameIndex} />
        </div>
    )
}