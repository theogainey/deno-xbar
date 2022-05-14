#!/usr/bin/env /path/to/the/deno/executable run --allow-net 
import { separator, xbar } from 'https://deno.land/x/xbar@v2.0.0/mod.ts';
import {
  fetchLocation,
  fetchWeatherData,
  formatForXbar,
} from 'https://raw.githubusercontent.com/theogainey/xbar-weatheralerts/main/src/index.ts';

fetchLocation()
  .then((loc) => fetchWeatherData(loc))
  .then((data) => formatForXbar(data))
  .then((alerts) => xbar(alerts))
  .catch((err) =>
    xbar([
      {
        text: 'error',
      },
      separator,
      {
        text: err,
      },
    ])
  );
