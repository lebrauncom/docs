---
title: What is Baleada Recognizeable Effects?
tags: UI logic
publish: true
order: 0
---

Baleada Recognizeable Effects is a collection of factory functions that can help you recognize sequences of events, like gestures and keychords.

More specifically, each function in the Baleada Recognizeable Effects collection returns an object that you can pass to the `effects` option of Baleada Logic's [`Recognizeable` class](/docs/logic/classes/Recognizeable), or more commonly, to the `recognizeable.effects` option of the [`Listenable` class](/docs/logic/classes/listenable).


:::
## Installation
:::

:::
```bash
npm i @baleada/recognizeable-effects
```
:::


:::
## Workflow
:::

The best way to get a sense of the Baleada Recognizeable Effects workflow is to see some code examples.

First, import one of the functions from Baleada Recognizeable Effects:

:::
```js
import { touchdragdrop } from '@baleada/recognizeable-effects'
```
:::

The functions are designed to work seamlessly with the `Listenable` class from Baleada Logic. 

In the example below, an instance of the `Listenable` class is  constructed using the `useListenable` composable from [Baleada Composition](/docs/composition).

Note that the `options` object for the `Listenable` constructor should have a `recognizeable` property, whose value is an object with a `effects` key. Call your Baleada Recognizeable Effects function, passing the result to that key.

:::
```js
import { touchdragdrop } from '@baleada/recognizeable-effects'

const instance = useListenable(
  'recognizeable', // Pass 'recognizeable' as the first argument
  {
    // Options object has a `recognizeable` property 
    recognizeable: { 
      // Pass the function's result to options.recognizeable.effects
      effects: touchdragdrop()
    }
  }
)
```
:::

When you call the instance's `listen` method, `Listenable` will set up all the appropriate event listeners and will execute your callback when the gesture is recognized.

As explained in the [How to listen for gestures](/docs/logic/classes/listenable#how-to-listen-for-gestures) section of the `Listenable` docs, your callback's first parameter is the latest `event` in the recognized event sequence, and you can access the `Listenable` instance's `recognizeable` property to read gesture metadata.

:::
```js
instance.listen(() => {
  console.log(instance.recognizeable.status) // 'recognized'

  // Log the touchdragdrop direction:
  console.log(instance.recognizeable.metadata.direction.fromStart)
})
```
:::

Calling `Listenable`'s stop method will remove _all_ active event listeners for the gesture.

:::
```js
// The touchdragdrop function causes Listenable to 
// add event listeners for touchstart, touchmove,
// touchcancel, and touchend events.
//
// Calling Listenable's stop method removes all of those
// listeners at once.
instance.stop()
```
:::


:::
## Available gestures
:::

Baleada Recognizeable Effects currently has functions available for the following gestures:

- [`clicks`](/docs/recognizeable-effects/clicks) (i.e. double-clicks, triple-clicks, etc.)
- [`mousedrag`](/docs/recognizeable-effects/drag)
- [`mousedragdrop`](/docs/recognizeable-effects/dragdrop)
- [`touchdrag`](/docs/recognizeable-effects/touchdrag)
- [`touchdragdrop`](/docs/recognizeable-effects/touchdragdrop)
- [`taps`](/docs/recognizeable-effects/taps) (including double-taps, triple-taps, etc.)

And these gestures are on the to-do list:
- `pinch`
- `press`
- `rotate`


:::
## Language, compilation, browser support, and dependencies
:::

The functions in Baleada Recognizeable Effects are written in modern JavaScript, and the package has no dependencies ([Baleada Logic](/docs/logic) is a peer dependency).

Functions are compiled by [Babel](https://babeljs.io) to work in browsers that are used by more than 0.5% of global web visitors AND have had official support or updates in the past 24 months.

To allow for [tree-shaking](https://webpack.js.org/guides/tree-shaking/), Baleada Logic's compiled code has no side effects and uses [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) instead of [`require()`](https://nodejs.org/api/modules.html#modules_require_id) and [`module.exports`](https://nodejs.org/api/modules.html#modules_module_exports).


:::
## Semantic versioning conventions
:::

The following things will trigger a new major release of Baleada Recognizeable Effects:
- Any changes to the existing options accepted by any of the Baleada Recognizeable Effects functons
- Any changes to the existing metadata stored by the functions

The following things will trigger a new minor release:
- Tha addition of functions for new gestures
- Added options for the functions
- Additional metadata stored by the functions
