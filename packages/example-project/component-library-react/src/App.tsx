import { MyInput } from './components';

function App() {
  return (
    <div>
      <h1>Component Library</h1>

      <h3>MyInput</h3>
      <MyInput
        onMyInput={(ev) => console.log('myInput', ev.detail)}
        onMyChange={(ev) => console.log('myChange', ev.detail)}
        value={'initial value'}
      />
    </div>
  );
}

export default App;
