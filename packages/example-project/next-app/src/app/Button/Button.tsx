'use client';

import { useState } from 'react';

import { MyButton } from '../components';

function Button() {
  const [inputEvent, setInputEvent] = useState<number>(0);
  return (
    <>
      <MyButton href="#" onClick={(e) => setInputEvent(inputEvent + 1)}>
        Click me
      </MyButton>
      <div className="buttonResult">
        <p>Input Event: {inputEvent}</p>
      </div>
    </>
  );
}

export default Button;
