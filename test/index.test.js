import {
  assert,
  assertEquals,
} from 'https://deno.land/std@0.128.0/testing/asserts.ts';
import { separator, xbar } from '../src/index.js';

Deno.test('xbar returns separator as ---', () => {
  const input = [separator];
  const actual = xbar(input);
  assertEquals(actual, ['---']);
});

Deno.test('xbar returns an array of strings', () => {
  const input = [
    {
      text: 'Making things easy is hard',
    },
    separator,
    {
      text: 'second text',
      color: 'red',
      submenu: [
        {
          text: 'submenu text',
        },
      ],
    },
  ];
  const actual = xbar(input);
  actual.forEach((element) => {
    assert(typeof element === 'string');
  });
});

Deno.test('xbar handles an menu item with a submenu so that the submenu is returned before the next menu item', () => {
  const input = [
    {
      text: 'first',
    },
    {
      text: 'second',
      submenu: [
        {
          text: 'third',
        },
      ],
    },
    {
      text: 'fourth',
    },
  ];
  const expected = ['first', 'second', '--third', 'fourth'];

  const actual = xbar(input);
  assertEquals(actual, expected);
});

Deno.test('xbar does not apply a menu items properties to a submenu', () => {
  const input = [
    {
      text: 'menu',
      color: 'red',
      submenu: [
        {
          text: 'submenu',
        },
      ],
    },
  ];
  const expected = ['menu | color=red', '--submenu'];
  const actual = xbar(input);
  assertEquals(actual, expected);
});
