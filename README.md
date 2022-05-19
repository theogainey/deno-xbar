# Deno xbar

Write xbar app plugins using JavaScript and Deno

## Installation

### Deno

[Deno](https://github.com/denoland/deno) is a simple, modern and secure runtime
for JavaScript and TypeScript that uses V8 and is built in Rust.

Shell (Mac, Linux):

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```

[Homebrew](https://formulae.brew.sh/formula/deno) (Mac):

```sh
brew install deno
```

See
[deno_install](https://github.com/denoland/deno_install/blob/master/README.md)
and [releases](https://github.com/denoland/deno/releases) for other options.

### xbar

[xbar](https://github.com/matryer/xbar) lets you put the output from any
script/program in your macOS menu bar.

[Download the latest release of xbar](https://github.com/matryer/xbar/releases).

## Usage

In the xbar plugins directory create a file named with the following format:

`{name}.{refreshTime}.js`

On the first line of that file include a shebang in the following format:

`#!/usr/bin/env -S ${HOME}/.deno/bin/deno run --allow-net run <permissions>`

This module can be imported to the plugin with the following code:

`import { xbar, separator, isDarkMode } from "https://deno.land/x/xbar@LATEST_VERSION/mod.ts";`

Deno is secure by default. Therefore, unless you specifically enable it, a
program run with Deno has no file, network, or environment access. Replace
`<permissions>` with the permissions required for the plugin. See
[Deno Manual](https://deno.land/manual/getting_started/permissions) for more.

Ensure that the file is executable by using the command `chmod +x filename.js`.
[Read more.](https://github.com/matryer/xbar#installing-plugins)

### Example

```
#!/usr/bin/env -S ${HOME}/.deno/bin/deno run --allow-env

import { xbar, separator, isDarkMode } from "https://deno.land/x/xbar@LATEST_VERSION/mod.ts";

const darkMode = await isDarkMode(); 

xbar([
	{
		text: 'plugin text on the menu bar',
		color: darkMode ? 'white' : 'red',
	},
	separator,
	{
		text: 'plugin text below the menu bar',
		color: '#85b56d',
		submenu: [
			{
				text: 'plugin text in a submenu menu that is long and is word wrapped',
				wordWrap: 40
			},
		]
	},
]);
```

See [examples](/examples) for more.

## API

### xbar

Prints output to xbar and returns printed output as an array of strings

Type: `(Array<MenuItem>) => string[]`

Takes an array of MenuItem objects, that represent xbar menu items, as input.

#### MenuItem

Type: `object`

MenuItem can contain any of the following fields:

```
{
  text: string;
  submenu: Array<MenuItem>;
  ...options
}
```

#### submenu

Type: `Array<MenuItem>`

It will add a submenu to the current menu item. A submenu is composed of an
array of menu items. Submenus can contain nested submenus.

#### options

Type: `option: any`

You can use any of the xbar
[supported options](https://github.com/matryer/xbar-plugins/blob/main/CONTRIBUTING.md#plugin-api).
Additionally this module enables an additional `wordWrap` option.

`wordWrap`

Enabling the wordWrap option will result in the improved readability of long
text by outputting the text as multiple lines with out breaking any apart words.

Example:

```
{
  text: 'Douglas Crockford',
  submenu: [
    {
      text: 'In JavaScript, there is a beautiful, elegant, highly expressive language that is buried under a steaming pile of good intentions and blunders.',
      wordWrap: 40,
    }
  ]
}
```

![' '](https://github.com/theogainey/deno-xbar/blob/main/wordWrapExample.png)

### separator

The menu items below `separator` will appear in the plugin's drop down, but will
not appear in the menu bar itself.

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
