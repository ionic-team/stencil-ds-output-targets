import Input from './Input/Input';
import Button from './Button/Button';
import { MyComponent, MyRange } from './components'

export default function Home() {
  return (
    <>
      <Input />
      <hr />
      <Button />
      <hr />
      <MyComponent first="Stencil" last="'Don't call me a framework' JS" />
      <hr />
      <MyRange name="myRange">Hello World</MyRange>
    </>
  );
}
