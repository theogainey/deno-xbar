import { assertEquals } from 'https://deno.land/std@0.128.0/testing/asserts.ts';
import { wordWrap } from '../src/accessibility.ts';

Deno.test('wordWrap splits a string into an array of lines', () => {
  const input = {
    text:
      'Sometimes science is more art than science, Morty. A lot of people dont get that',
    wordWrap: 30,
  };
  const expected = [
    {
      text: 'Sometimes science is more art',
    },
    {
      text: 'than science, Morty. A lot of',
    },
    {
      text: 'people dont get that',
    },
  ];
  assertEquals(wordWrap(input), expected);
});

Deno.test('wordWrap keeps object feilds other than wordWrap constant', () => {
  const input = {
    text:
      'Sometimes science is more art than science, Morty. A lot of people dont get that',
    wordWrap: 30,
    color: 'red',
    size: 12,
  };
  const expected = [
    {
      text: 'Sometimes science is more art',
      color: 'red',
      size: 12,
    },
    {
      text: 'than science, Morty. A lot of',
      color: 'red',
      size: 12,
    },
    {
      text: 'people dont get that',
      color: 'red',
      size: 12,
    },
  ];
  const actual = wordWrap(input);
  assertEquals(actual, expected);
});

Deno.test('wordWrap does not split words longer than the max line length into multiple lines', () => {
  const input = {
    text: 'the word implementation is long',
    wordWrap: 12,
  };
  const result = wordWrap(input);

  const expected = [
    {
      text: 'the word',
    },
    {
      text: 'implementation',
    },
    {
      text: 'is long',
    },
  ];
  assertEquals(result, expected);
});

Deno.test('wordWrap only includes one space between words', () => {
  const input = {
    text: 'Making    things      easy is    hard',
    wordWrap: 20,
  };
  const expected = [
    {
      text: 'Making things easy',
    },
    {
      text: 'is hard',
    },
  ];
  const actual = wordWrap(input);
  assertEquals(actual, expected);
});

Deno.test('wordWrap does not split a string into multiple lines if the string is not longer than the max line length', () => {
  const input = {
    text:
      'Program testing can be used to show the presence of bugs, but never to show their absence',
    wordWrap: 9999,
  };
  const actual = wordWrap(input);
  assertEquals(actual, [{ text: input.text }]);
});

Deno.test('wordWrap returns only 1 line per word if every word is longer than max line limit', () => {
  const input = {
    text: 'walla walla washington',
    wordWrap: 4,
  };
  const expected = [
    {
      text: 'walla',
    },
    {
      text: 'walla',
    },
    {
      text: 'washington',
    },
  ];
  const actual = wordWrap(input);
  assertEquals(actual, expected);
});

Deno.test('wordWrap does not return an object with a `wordWrap` field if input object contains a `wordWrap` field with a falsy value', () => {
  const input = [
    {
      text: 'Code never lies, sometimes comments do',
      wordWrap: false,
    },
    {
      text: 'JavaScript making 0 falsy was a mistake',
      wordWrap: 0,
    },
    {
      text: 'undefined is well defined',
      wordWrap: undefined,
    },
    {
      text: 'intentional absence of a value should not carry pass this point',
      wordWrap: null,
    },
    {
      text: 'NaN does not equal NaN',
      wordWrap: NaN,
    },
  ];
  const expected = [
    {
      text: 'Code never lies, sometimes comments do',
    },
    {
      text: 'JavaScript making 0 falsy was a mistake',
    },
    {
      text: 'undefined is well defined',
    },
    {
      text: 'intentional absence of a value should not carry pass this point',
    },
    {
      text: 'NaN does not equal NaN',
    },
  ];
  input.forEach((item, i) => {
    assertEquals(wordWrap(item), [expected[i]]);
  });
});

Deno.test('wordWrap does not throw error when passed objects with falsy text values' , () => {
  const input = {
    wordWrap: 20,
    color: 'red',
  };

  const expected = [
    {
      color: 'red',
    }
  ]
  const actual = wordWrap(input);
  assertEquals(actual, expected);
});