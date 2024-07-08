'use client';

import { useState } from 'react';

import { MyButton } from '../components';

function Button() {
  const [inputEvent, setInputEvent] = useState<number>(0);
  // return <MyButton>Hello</MyButton>
  return (
    <>
      <MyButton
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation()
          setInputEvent(inputEvent + 1)
        }}
      >
        Click me
      </MyButton>
      <div>
        <p>Input Event: {inputEvent}</p>
      </div>
    </>
  );
}

export default Button;
