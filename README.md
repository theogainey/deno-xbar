# Deno xbar

Write xbar app plugins using JavaScript and Deno

## Installation

### Deno

### Xbar

## API

### isDarkMode

Async function to query if dark mode is enabled.

Type: `async () => Promise<boolean>`

Will always return `false` if environment permission has not previously been
granted `--allow-env`

```
import { isDarkMode } from "";

const darkMode = await isDarkMode();
```
