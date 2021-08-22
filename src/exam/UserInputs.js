import React from 'react';

function UserInputs({name, nickname, onChange, onCreate, focus}) {
    return (
        <>
            <input type='text' name='name' placeholder='이름' onChange={onChange} value={name} ref={focus} />
            <input type='text' name='nickname' placeholder='닉네임' onChange={onChange} value={nickname} />
            <button onClick={onCreate}>확인</button>
        </>
    )
}

export default React.memo(UserInputs);