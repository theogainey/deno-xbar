import { assertEquals } from 'https://deno.land/std@0.128.0/testing/asserts.ts';
import { wordWrap } from '../src/accessibility.js';

Deno.test('wordWrap splits a string into an array of lines ', () => {
  const input =
    'Sometimes science is more art than science, Morty. A lot of people dont get that';
  const expected = [
    'Sometimes science is more art',
    'than science, Morty. A lot of',
    'people dont get that',
  ];
  const actual = wordWrap(input, 30);
  assertEquals(actual, expected);
});

Deno.test('wordWrap places words longer than max line length on their own line', () => {
  const input = 'the word implementation is long';
  const lineLenth = 12;
  const result = wordWrap(input, lineLenth);

  const expected = ['the word', 'implementation', 'is long'];

  assertEquals(result, expected);
});

Deno.test('wordWrap only includes one space between words', () => {
  const input = 'Making    things      easy is    hard';
  const expected = ['Making things easy', 'is hard'];
  const actual = wordWrap(input, 20);
  assertEquals(actual, expected);
});

Deno.test('wordWrap does not split a string into multiple lines if the string is not longer than the max line length', () => {
  const input =
    'Program testing can be used to show the presence of bugs, but never to show their absence';
  const actual = wordWrap(input, 9999);
  assertEquals(actual, [input]);
});

Deno.test('wordWrap returns only 1 line per word if every word is longer than max line limit', () => {
  const input = 'walla walla washington';
  const expected = ['walla', 'walla', 'washington'];
  const actual = wordWrap(input, 4);
  assertEquals(actual, expected);
});
