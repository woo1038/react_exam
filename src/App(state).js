import logo from './logo.svg';
import './App.css';
import InputSample from './exam/InputSample';
import UserList from './exam/UserList';
import { useCallback, useMemo, useRef, useState } from 'react';
import UserInputs from './exam/UserInputs';

function countActiveUsers(users) {
  console.log(1);
  return users.filter(user => user.active).length;
}

function App() {


  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  })
  const {name, nickname} = inputs;

  const [users, setUsers] = useState([
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
  ])

  const nextId = useRef(4);

  const count = useMemo(() => countActiveUsers(users), [users]);

  const onChange = useCallback((e) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }, [inputs]);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId,
      name,
      nickname
    }
    setUsers(users => [...users, user]);
    setInputs({
      name: '',
      nickname: ''
    })
    
    inputFocus.current.focus();
    nextId.current += 1;

  }, [name, nickname])

  const onRemove = useCallback((id) => {
    setUsers(users => users.filter(user => user.id !==  id));
  }, []);

  const onUpdate = useCallback((id) => {
    setUsers(users => users.map(user => 
      user.id === id 
      ? {...user, active: !user.active}
      : user
    ))
  }, [])

  const inputFocus = useRef();

  return (
    <div>
      <UserInputs focus={inputFocus} name={name} nickname={nickname} onCreate={onCreate} onChange={onChange} />
      <UserList users={users} onRemove={onRemove} onUpdate={onUpdate} />
      <div>사용자 수: {count}</div>
    </div>
  );
}

export default App;
