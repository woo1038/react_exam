import React, { useReducer, useState } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'plus':
            return state + 1;
        case 'minus':
            return state - 1;
        default:
            throw new Error('unAction');
    }
}

function Counter() {

    const [number, dispatch] = useReducer(reducer, 0);


    const plus = (e) => {
        dispatch({
            type: 'plus'
        })
    }

    const minus = (e) => {
        dispatch({
            type: 'minus'
        })
    }

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={plus}>+1</button>
            <button onClick={minus}>-1</button>
        </div>
    )
}

export default Counter;