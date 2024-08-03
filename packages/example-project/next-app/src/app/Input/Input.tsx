'use client';

import { useState } from 'react';

import { MyInput } from '../components';

function Input() {
  const [inputEvent, setInputEvent] = useState<string>('');
  const [changeEvent, setChangeEvent] = useState<string>('');
  return (
    <>
      <MyInput
        onMyInput={(ev) => setInputEvent(`${ev.target.value}`)}
        onMyChange={(ev) => setChangeEvent(`${ev.detail.value}`)}
      >
        {/* the following space makes the hydration error go away */}
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
