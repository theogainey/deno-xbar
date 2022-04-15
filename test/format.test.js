import {
  assert,
  assertEquals,
} from 'https://deno.land/std@0.128.0/testing/asserts.ts';
import { formatLine } from '../src/format.js';
Deno.test('formatLine returns a string', () => {
  const input = {
    text:
      'Sometimes science is more art than science, Morty. A lot of people dont get that',
  };
  const output = formatLine(input);
  assert(typeof output === 'string');
});

Deno.test('formatLine formats submenulevel as hyphens', () => {
  const input = {
    text:
      'The computer industry is the only industry that is more fashion-driven than womens fashion',
    submenuLevel: 3,
  };
  const output = formatLine(input);
  assert(output.includes('--'));
  assert(!output.includes('submenuLevel'));
});

Deno.test('formatLine does not include leading or trailing spaces in output string', () => {
  const input = {
    text: '  Making things easy is hard   ',
  };

  const output = formatLine(input);
  assertEquals(output, 'Making things easy is hard');
});

Deno.test('formatLine outputs numeric values as strings', () => {
  const input = {
    text: 100,
    size: 20,
  };
  const output = formatLine(input);
  assertEquals(output, '100 | size=20');
});

Deno.test('formatLine includes falsy values in output', () => {
  const input = {
    text: 'making everything true or false has its downsides',
    emojize: false,
  };

  const output = formatLine(input);
  assertEquals(
    output,
    'making everything true or false has its downsides | emojize=false',
  );
});

Deno.test('formatLine will format an object that does not include a text feild', () => {
  const input = {
    color: 'red',
  };

  const output = formatLine(input);
  assertEquals(output, ' | color=red');
});
