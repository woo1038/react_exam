import React, { useRef } from 'react';


const UserProps = React.memo(function UserProps({ user, onRemove, onUpdate}) {
    const {name, nickname, id, active} = user;
    console.log(active);
    return (
        <div>
            <span 
                style={{
                    color: active ? 'green' : 'black',
                    cursor:'pointer'
                }}
                onClick={() => onUpdate(id)}
            >
                이름: {name} 닉네임: {nickname}</span>
            <button onClick={() => onRemove(id)}>삭제</button>
        </div>
    )
});

function UserList({ users, onRemove, onUpdate }) {
    return (
        <div>
            {
                users.map(user => <UserProps key={user.id} user={user} onRemove={onRemove} onUpdate={onUpdate} />)
            }
        </div>
    )
}


export default React.memo(UserList);