#!/usr/bin/env "${HOME}/.deno/bin/deno" run --allow-net --allow-env
import {
  isDarkMode,
  separator,
  xbar,
} from 'https://deno.land/x/xbar@v2.0.0/mod.ts';

const jsonResponse = await fetch(
  'https://programming-quotes-api.herokuapp.com/quotes/random',
);
const jsonData = await jsonResponse.json();
const darkMode = await isDarkMode();

xbar([
  {
    text: 'Programming Quotes',
  },
  separator,
  {
    text: jsonData.author,
    submenu: [
      {
        text: jsonData.en,
        wordWrap: 40,
        size: 16,
        color: darkMode ? '#818cf8' : 'navy',
      },
    ],
  },
]);
