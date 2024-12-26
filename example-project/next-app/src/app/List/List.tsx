'use client';

import { MyList, MyListItem } from '../components.server';
import { LazyComponent } from '../LazyComponent/LazyComponent';
import { ThemeContext } from '../ThemeContext/ThemeContext';

export const List = () => {
  const theme = 'light';

  return (
    <ThemeContext.Provider value={theme}>
      <LazyComponent />
      <MyList>
        <MyListItem>Item 1</MyListItem>
        <MyListItem>Item 2</MyListItem>
        <MyListItem>Item 3</MyListItem>
      </MyList>
    </ThemeContext.Provider>
  );
};
