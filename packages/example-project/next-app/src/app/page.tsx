import Input from './Input/Input';
import Button from './Button/Button';
import { MyComponent, MyRange, MyRadioGroup } from './components';

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
      <hr />
      <MyRadioGroup name="myRadioGroup" value="two">
        <input type="radio" name="myRadioGroup" value="one" />
        <input type="radio" name="myRadioGroup" value="two" />
        <input type="radio" name="myRadioGroup" value="three" />
      </MyRadioGroup>
    </>
  );
}
