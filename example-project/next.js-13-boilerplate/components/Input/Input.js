'use client';

import { useState } from 'react';

import { MyInput } from '../components';

function Input() {
  const [inputEvent, setInputEvent] = useState('');
  const [changeEvent, setChangeEvent] = useState('');
  return (
    <>
      <MyInput
        onMyInput={(ev) => setInputEvent(`${ev.target.value}`)}
        onMyChange={(ev) => setChangeEvent(`${ev.detail.value}`)}
      >
        {' '}
      </MyInput>
      <div className="inputResult">
        <p>Input Event: {inputEvent}</p>
        <p>Change Event: {changeEvent}</p>
      </div>
    </>
  );
}

export default Input;
