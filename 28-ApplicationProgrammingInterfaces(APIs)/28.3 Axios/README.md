# How to run Bored-API from local

Since Bored-API from `https://bored-api.appbrewery.com/` doesn't work for me, so below is step-by-step how I finished this exercise

## Solution 1
1. Clone `https://github.com/appbrewery/api-example-bored-api`
2. Open a new terminal
3. Run `npm i` then `nodemon app.js` in that new terminal, keep it running.
4. In `index.js`, replace `https://bored-api.appbrewery.com` by `http://localhost:4000`. Here you have to request through localhost, not through `https://bored-api.appbrewery.com` directly.
5. Switch to another terminal and run your `index.js` and it will work.

## Solution 2
Use this instead: `https://apis.scrimba.com/bored/`