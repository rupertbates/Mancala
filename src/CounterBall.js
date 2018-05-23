import React from 'react';

export default function CounterBall(props) {
    const hidden = props.counters === 0 ? 'hidden' : '';
    const hoverClass = props.hover ? 'ball-hover' : '';
    return (
        <div id={`ball-${props.gameIndex}`} className={`ball-wrapper ${hidden}`}>
            <section className="stage">
                <figure className={`ball ${hoverClass}`}>
                    <span className="shadow" />
                    <span className="counter-text">{props.counters.toString()}</span>
                </figure>
            </section>
        </div>
    )
}
