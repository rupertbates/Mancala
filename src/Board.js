import React from 'react';

export default function Board(props) {
    return (
        <div id='background' className='board'>
            {props.children}
        </div>
    )
}