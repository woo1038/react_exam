import logo from './logo.svg';
import './App.css';
import InputSample from './exam/InputSample';
import UserList from './exam/UserList';
import { useRef, useState } from 'react';
import UserInputs from './exam/UserInputs';

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

  const onChange = (e) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const onCreate = () => {
    const user = {
      id: nextId,
      name,
      nickname
    }
    setUsers([...users, user]);
    setInputs({
      name: '',
      nickname: ''
    })
    
    inputFocus.current.focus();
    nextId.current += 1;

  }
  const onRemove = (id) => {
    setUsers(users.filter(user => user.id !==  id));
  }

  const onUpdate = (id) => {
    setUsers(users.map(user => 
      user.id === id 
      ? {...user, active: !user.active}
      : user
    ))
  }

  const inputFocus = useRef();

  return (
    <div>
      <UserInputs focus={inputFocus} name={name} nickname={nickname} onCreate={onCreate} onChange={onChange} />
      <UserList users={users} onRemove={onRemove} onUpdate={onUpdate} />
    </div>
  );
}

export default App;
