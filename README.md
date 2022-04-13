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
#!/usr/bin/env deno run --allow-env
import { isDarkMode } from "https://deno.land/x/xbar@LATEST_VERSION/mod.ts";

const darkMode = await isDarkMode();
```
