import React, { useReducer } from 'react';
import Input from './Input';
import List from './List';

const reduceState = {
    inputs: {
        name: '',
        nickname: ''
    },
    users: [
        {
            id: 1,
            name: 'hello',
            nickname: 'world',
            active: true
        },
        {
            id: 2,
            name: 'hello2',
            nickname: 'world2',
            active: true
        },
        {
            id: 3,
            name: 'hello3',
            nickname: 'world3',
            active: true
        },
    ]
}

function countActive(users) {
    return users.filter(user => user.active).length;
}

function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.name]: action.value
                }
            }
        case 'CREATE_INPUT':
            return {
                inputs: reduceState.inputs,
                users: state.users.concat(action.user)
            }  
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.id)
            }
        case 'TOGGLE_USER':
            return {
                ...state,
                users: state.users.map(user => 
                    user.id === action.id
                    ? {...user, active: !user.active}
                    : user
                )
            }
        default:
            throw new Error('Error');
    }
}

function ReduceApp() {
    const [ state, dispatch ] = useReducer(reducer, reduceState);
    const { users } = state;
    const { name, nickname } = state.inputs;
    const nextId = useRef(4);

    const onToggle = (id) => {
        dispatch({
            type: 'TOGGLE_USER',
            id
        })
    }

    const onRemove = (id) => {
        dispatch({
            type: 'REMOVE_USER',
            id
        })
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        dispatch({
            type: 'CHANGE_INPUT',
            name,
            value
        })
    }
    
    const onCreate = (e) => {
        dispatch({
            type: 'CREATE_INPUT',
            user: {
                id: nextId,
                name,
                nickname
            }
        })
        nextId.current += 1
    }

    const count = countActive(users);

    return (
        <div>
            <Input name={name} nickname={nickname} onChange={onChange} onCreate={onCreate} />
            <List users={users} onToggle={onToggle} onRemove={onRemove} />
            <b>활성화 된 수: {count}</b>
        </div>
    )
}

export default ReduceApp;