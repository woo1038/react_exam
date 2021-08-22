import React, { useRef, useState } from 'react';

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        email: ''
    })
    const {name, email} = inputs;
    const nameInput = useRef();

    const onChange = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const onClick = () => {
        setInputs({
            name: '',
            email: ''
        })
        nameInput.current.focus();
    }

    return (
        <div>
            <input 
                onChange={onChange} 
                name='name' 
                type='text' 
                value={name} 
                ref={nameInput} 
            />
            <input 
                onChange={onChange} 
                name='email' 
                type='text' 
                value={email} 
            />
            <button onClick={onClick}>초기화</button>
            <p>값 : {name}({email})</p>
        </div>
    )
}

export default React.memo(InputSample);