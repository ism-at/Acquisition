import arcjet, { shield, detectBot, slidingWindow } from '@arcjet/node';

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: 'LIVE' }),
    // Create a bot detection rule
    detectBot({
      mode: 'LIVE', // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        'CATEGORY:SEARCH_ENGINE',
        'CATEGORY:PREVIEW', // Google, Bing, etc
      ],
    }),
    // Rate-limit using a sliding-window algorithm.
    // - `interval`: time window to observe (e.g. '2s' = 2 seconds).
    // - `max`: maximum allowed events within the sliding interval.
    // The sliding window counts requests over a moving time range
    // (not fixed buckets), so bursts are smoothed and limits are
    // enforced continuously. Set `mode` to 'DRY_RUN' to only log.
    slidingWindow({
      mode: 'LIVE',
      interval: '2s',
      max: 5,
    }),
  ],
});

export default aj;
