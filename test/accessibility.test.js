import { assert, assertEquals } from 'https://deno.land/std@0.128.0/testing/asserts.ts';
import { wordWrap } from '../src/accessibility.js'

Deno.test('wordWrap splits a string into an array of lines ', () => {
const input = 'Sometimes science is more art than science, Morty. A lot of people dont get that';
const expected = [
    'Sometimes science is more art',
    'than science, Morty. A lot of',
    'people dont get that'
  ];
  const actual = wordWrap(input, 30);
  assertEquals(actual, expected);
});

Deno.test('wordWrap places words longer than max line length on their own line', () => { 
  const input = 'Sometimes, the elegant implementation is a function. Not a method. Not a class. Not a framework. Just a function';
  const result = wordWrap(input, 12);

  const wordsLongerThanMax = input.split(' ').filter((e) => e !==' ' && e.length >= 12);
  const linesLongerThanMax = result.filter((e) => e.length > 12);

  //number of lines longer than max length must be equal to words longer than max length 
  assertEquals(wordsLongerThanMax.length, linesLongerThanMax.length);

  //each line longer than max length must not have any spaces to contain only 1 word 
  linesLongerThanMax.forEach((line) => {
    const oneWord = !line.includes(' ');
    assert(oneWord);
  });
  
});

Deno.test('wordWrap only includes one space between words', () => { 
  const input = 'Making    things      easy is    hard';
  const expected = [ "Making things easy", "is hard" ];
  const actual = wordWrap(input, 20);
  assertEquals(actual, expected);
});


Deno.test('wordWrap does not split a string into multiple line if is not longer than the max line length', () => { 
  
  const input = 'Program testing can be used to show the presence of bugs, but never to show their absence';
  const actual = wordWrap(input, 9999);
  assertEquals(actual, [input]);

});