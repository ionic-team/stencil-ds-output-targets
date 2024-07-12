'use client';

import { useState } from 'react';

import { MyButton, MyComponent } from '../components';

function Button() {
  const [inputEvent, setInputEvent] = useState<number>(0);
  return (
    <>
      <MyButton href="#" onClick={(e) => setInputEvent(inputEvent + 1)}>
        Click me <b>now</b>!
        <MyComponent first="Stencil" last="'Don't call me a framework' JS">Hello</MyComponent>
      </MyButton>
      <div className="buttonResult">
        <p>Input Event: {inputEvent}</p>
      </div>
    </>
  );
}

export default Button;
