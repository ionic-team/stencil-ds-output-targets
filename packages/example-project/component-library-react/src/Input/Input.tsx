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
      />
      <div>
        <p>Input Event: {inputEvent}</p>
        <p>Change Event: {changeEvent}</p>
      </div>
    </>
  );
}

export default Input;
