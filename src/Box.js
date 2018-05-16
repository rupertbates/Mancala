import React from 'react';
import CounterBall from './CounterBall'

export default function Box(props) {
    return (
        <div id={`box-${props.gameIndex}`} className={`box box-${props.layoutIndex}`} onClick={() => props.onClick(props.gameIndex)}>
            <CounterBall counters={props.value} hover={true} gameIndex={props.gameIndex} />
        </div>
    )
}
