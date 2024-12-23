'use client';

import { MyToggle } from '../components.server';
import { List } from '../List/List';
import { PureReactComponent } from '../PureReactComponent/PureReactComponent';

export const ToggleableContent = () => {
  return (
    <MyToggle>
      <PureReactComponent />
      <List />
    </MyToggle>
  );
};
