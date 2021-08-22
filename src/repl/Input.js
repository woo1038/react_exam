import React from 'react';

function Input({name, nickname, onChange, onCreate, focus}) {
    return (
        <div>
            <input ref={focus} name='name' type='text' placeholder='이름' onChange={onChange} value={name} />
            <input name='nickname' type='text' placeholder='닉네임' onChange={onChange} value={nickname} />
            <button onClick={onCreate}>확인</button>
        </div>
    )
}

export default Input;