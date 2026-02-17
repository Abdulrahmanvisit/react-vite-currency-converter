# currency converter

A React app that converts currencies in real time. You type an amount, choose your currencies and it does the math instantly using live exchange rates fetched from an external API. No page reloads, no manual refreshing, it just works as you use it.


## What it does

You type any amount and the conversion happens right there on the spot. You pick two currencies from a dropdown that gets populated with real options pulled from the API. There is a swap button in the middle that flips the two currencies around and recalculates everything without you having to do anything extra. The bottom field is read only so it only ever shows you the result, you cannot accidentally start typing in the wrong box. It fetches live exchange rates from exchangerate-api.com and you do not need an API key which honestly made things a lot simpler.


## What I used to build it

React did the heavy lifting with components, useState, useEffect and useId. Vite handled the dev server and the build process. Tailwind CSS took care of all the styling, layout, hover effects and transitions. On top of that I wrote a custom hook to handle the currency data fetching and a reusable input component that I ended up using twice in the same form, once for the From side and once for the To side.


## How it is structured

currency-converter/
├── public/
├── src/
│   ├── assets/
│   │   └── components/
│   │       └── InputBox.jsx        ← reusable input with amount field and currency dropdown
│   ├── hooks/
│   │   └── useCurrencyInfo.js      ← custom hook that fetches live exchange rates
│   ├── App.jsx                     ← all the main logic and state lives here
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js



## The three main pieces

useCurrencyInfo.js is a custom hook that takes a currency code like usd and goes off to fetch all the exchange rates for it. It re-fetches automatically whenever the base currency changes because of how useEffect watches it. I also added an AbortController in there so if the user switches currencies before the previous request finishes it cancels the old one cleanly instead of letting stale data come through.

InputBox.jsx is a reusable component that puts a number input and a currency selector next to each other. The same component gets dropped into the form twice. The first time it is fully editable so the user can type an amount and choose a currency. The second time the amount field is disabled and it just shows the converted result. I used useId to give each input its own unique id so the labels connect to the right field every time.

App.jsx is where everything comes together. It holds three pieces of state, the amount, the from currency and the to currency. The converted amount is not stored in state, it gets calculated on the spot from whatever those three values are at that moment. The swap function takes the current to currency and makes it the from currency, then takes the from currency and makes it the to currency, and it also sets the amount to the already converted value so the numbers stay consistent after the flip.


## How to run it on your machine

You need Node.js installed first. If you do not have it yet go to nodejs.org and grab it.

bash
git clone https://github.com/your-username/currency-converter.git
cd currency-converter
npm install
npm run dev


Then open http://localhost:5173 in your browser.

You will land on the converter with a background image behind it and it defaults to converting USD to INR. If you see the currency dropdowns filling up with options that means the API call went through and everything is running properly.


## One thing worth knowing

The converted amount never gets stored in state on its own. It is always computed fresh from the current values like this:

js
const convertedAmount =
  amount && currencyInfo[to]
    ? parseFloat((amount * currencyInfo[to]).toFixed(2))
    : 0;


That way it is always accurate and always matches whatever is currently selected. There is no chance of it showing a number that belongs to a previous selection.


## Ideas for taking it further

Showing a small timestamp of when the rates were last fetched would be a nice touch. A conversion history so users can scroll back through what they converted earlier would also be useful. Letting people save their most used currency pairs would save time if they use the same ones regularly. A loading state while the API is fetching and a visible error message when it fails would also make the experience feel a lot more polished.


## Live demo

Will add the link here once it is deployed.


I built this to get comfortable with custom hooks and to practice splitting a component into reusable pieces. Working with a real API instead of dummy data made it feel like an actual project rather than just an exercise.
