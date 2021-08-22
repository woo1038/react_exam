import logo from './logo.svg';
import './App.css';
import InputSample from './exam/InputSample';
import UserList from './exam/UserList';
import { useCallback, useMemo, useReducer, useRef, useState } from 'react';
import UserInputs from './exam/UserInputs';

function countActiveUsers(users) {
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    name: '',
    nickname: ''
  },
  users: [
    {
      id: 1,
      name: 'hello1',
      nickname: 'world1',
      active: false
    },
    {
      id: 2,
      name: 'hello2',
      nickname: 'world2',
      active: false
    },
    {
      id: 3,
      name: 'hello3',
      nickname: 'world3',
      active: false
    },
  ]
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
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
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
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      }
    default:
      throw new Error("error");
  }
}


function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const { name, nickname } = state.inputs;
  const nextId = useRef(4);

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    })
  }, []);

  const onCreate = useCallback(e => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        name,
        nickname
      }
    });
    nextId.current += 1
  }, [name, nickname])

  const onUpdate = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    })
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    })
  }, [])

  const count = useMemo(() => countActiveUsers(users), [users]);


  return (
    <div>
      <UserInputs name={name} nickname={nickname} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onUpdate={onUpdate} onRemove={onRemove} />
      <div>사용자 수: {count}</div>
    </div>
  );
}

export default App;
