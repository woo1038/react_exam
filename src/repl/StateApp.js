import { useCallback, useMemo, useReducer, useRef, useState } from 'react';
import Input from './Input';
import List from './List';

function CountUser(users) {
    return users.filter(user => user.active).length;
}

function StateApp() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    })
    const { name, nickname } = inputs;

    const [users, setUsers] = useState([
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
    ]);

    const onChange = (e) => {
        const { name, value } = e.target;
        
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const nextId = useRef(4);
    const onCreate = () => {
        const user = {
            id: nextId,
            name,
            nickname,
            active: false
        }
        setUsers(users => users.concat(user));

        setInputs({
            name: '',
            nickname: ''
        })

        inputFocus.current.focus();
        nextId.current += 1;
    }


    const onToggle = (id) => {
        setUsers(users => users.map(user => 
            user.id === id
            ? {...user, active: !user.active}
            : user
        ))
    }

    const onRemove = (id) => {
        setUsers(users => users.filter(user => user.id !== id))
    }

    // focus
    const inputFocus = useRef();

    // count
    const count = CountUser(users);

    return (
        <div>
            <Input name={name} nickname={nickname} onChange={onChange} onCreate={onCreate} focus={inputFocus} />
            <List users={users} onToggle={onToggle} onRemove={onRemove} />
            <div>활성화된 수: {count}</div>
        </div>
    )
}

export default StateApp;