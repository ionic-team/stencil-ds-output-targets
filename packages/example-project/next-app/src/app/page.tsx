import Input from './Input/Input';
import Button from './Button/Button';
import { MyComponent, MyRange, MyRadioGroup } from './components';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Input />
      <hr />
      <Button />
      <hr />
      <MyComponent
        first="Stencil"
        last="'Don't call me a framework' JS"
        className="my-8"
        kidName="foobar"
      />
      <hr />
      <MyRange name="myRange">Hello World</MyRange>
      <hr />
      <MyRadioGroup name="myRadioGroup" value="two">
        <input type="radio" name="myRadioGroup" value="one" />
        <input type="radio" name="myRadioGroup" value="two" />
        <input type="radio" name="myRadioGroup" value="three" />
      </MyRadioGroup>
    </main>
  );
}
