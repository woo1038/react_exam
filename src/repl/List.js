import React from 'react';

function ListProps({ user, onToggle, onRemove }) {
    const { id, name, nickname, active } = user;
    
    return (
        <div>
            <span style={{
                color: active ? 'green' : 'black',
                cursor: 'pointer'
            }} onClick={() => onToggle(id)}>이름: {name} 닉네임: {nickname}</span>
            <button onClick={() => onRemove(id)}>삭제</button>
        </div>
    )
}

function List({ users, onToggle, onRemove }) {
    return (
        <div>
            {
                users.map(user =>
                    <ListProps key={user.id} user={user} onToggle={onToggle} onRemove={onRemove} />
                )
            }
        </div>
    )
}

export default List;