---
title: touchdrag
tags: UI Logic
publish: true
order: 1
---

`touchdrag` is defined as a single touch that:
- starts at given point
- travels a distance greater than 0px (or a minimum distance of your choice)
- does not cancel or end

The `touchdrag` function returns an object that contains event handlers for the following events:
- `touchstart`
- `touchmove`
- `touchcancel`
- `touchend`

::: type="info"
In Baleada Recognizeable Handlers, `touchdrag` is the touch event equivalent of [`mousedrag`](/docs/recognizeable-effects/mousedrag).
:::

::: type="warning"
`touchdrag` only works with touch events. It won't have any effect if the user uses a mouse.
:::


:::
## Create the `touchdrag` handlers
:::

To create the `touchdrag` handlers, import and call the `touchdrag` function:

:::
```js
import { touchdrag } from '@baleada/recognizeable-effects'

const touchdragHandlers = touchdrag(/* options */)

// If you're using useListenable:
const listenable = useListenable(
  'recognizeable',
  { recognizeable: { handlers: touchdragHandlers } }
)
```
:::

Optionally, you can pass an `options` object as the first argument of the `touchdrag` function. Here's a breakdown of the `options` object:

::: ariaLabel="touchdrag options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `minDistance` | Number | `0` | The minimum distance in pixels that the cursor must travel in order to be considered a touchdrag gesture. |
| `onStart` | Function | none | <p>Hooks into the `touchstart` event that the `touchdrag` handlers listen to.</p><p>`onStart` receives the touchdrag hook API as its only argument. See the [Pan hook API](#touchdrag-hook-api) section for more info.</p> |
| `onMove` | Function | none | <p>Hooks into the `touchmove` event that the `touchdrag` handlers listen to.</p><p>`onMove` receives the touchdrag hook API as its only argument. See the [Pan hook API](#touchdrag-hook-api) section for more info.</p> |
| `onCancel` | Function | none |  <p>Hooks into the `touchcancel` event that the `touchdrag` handlers listen to.</p><p>`onCancel` receives the touchdrag hook API as its only argument. See the [Pan hook API](#touchdrag-hook-api) section for more info.</p> |
| `onEnd` | Function | none | <p>Hooks into the `touchend` event that the `touchdrag` handlers listen to.</p><p>`onEnd` receives the touchdrag hook API as its only argument. See the [Pan hook API](#touchdrag-hook-api) section for more info.</p> |
:::


:::
### Pan hook API
:::

`touchdrag` provides handlers for the `touchstart`, `touchmove`, `touchcancel`, and `touchend` events, and those handlers gather and store all the metadata needed to recognize a touchdrag gesture.

But, if you ever want to take some additional action during any of those events, you can use the touchdrag hooks:
- `onStart`
- `onMove`
- `onCancel`
- `onEnd`

The touchdrag hooks get called after the `touchdrag` handlers have performed their necessary actions, and each hook receives the touchdrag hook API as its only argument. The touchdrag hook API is an object—here's a full breakdown:

::: ariaLabel="touchdrag hook API breakdown"
| Property | Type | Description |
| --- | --- | --- |
| `event` | Event | The most recent DOM event received by the `Recognizeable` instance |
| `sequence` | Event | The `Recognizeable` instance's `sequence` |
| `status` | Event | The `Recognizeable` instance's `status` |
| `metadata` | Event | The `Recognizeable` instance's `metadata` object |
:::


:::
## Access `touchdrag` metadata
:::

After a `touchstart` event, `touchdrag` starts storing gesture metadata in the `Recognizeable` instance's `metadata` property (Object). `touchdrag` stores the following information:

::: ariaLabel="touchdrag metadata breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `times` | Object | <p>The `times`  object has two properties: `start` and `end`.</p><p>`times.start` is the timestamp (DOMHighResTimeStamp) of the `touchstart` event that started the `touchdrag` recognizing process.</p><p>`times.end` is always the timestamp (DOMHighResTimeStamp) of the most recent event in the `touchdrag` sequence.</p><p>`times.end` updates after every `touchmove`.</p> |
| `points` | Object | <p>The `points`  object has two properties: `start` and `end`.</p><p>`points.start` is an object whose `x` and `y` properties contain the x and y coordinates (Numbers) of the location of the `touchstart` event that started the `touchdrag` recognizing process.</p><p>`points.end` is an object whose `x` and `y` properties always contain the x and y coordinates (Numbers) of the most recent event in the `touchdrag` sequence.</p><p>`points.end.x` and `points.end.y` update after every `touchmove`.</p> |
| `distance` | Object | <p>The `distance` object has two properties: `fromStart` and `fromPrevious`.</p><p>`distance.fromStart` is the straight-line distance (Number, measured in pixels), between `points.end` and `points.start` .</p><p>`distance.fromPrevious` is the straight-line distance (Number, measured in pixels) between `points.end` and the x and y coordinates of the second-to-last event in the sequence.</p><p>`distance.fromStart` and `distance.fromPrevious` update after every `touchmove`.</p> |
| `angle` | Object | <p>The `angle` object has two properties: `fromStart` and `fromPrevious`.</p><p>`angle.fromStart` is an object whose `radians` and `degrees` properties contain the angle (Number) of the straight line from `points.start` to `points.end`.</p><p>`angle.fromPrevious` is an object whose `radians` and `degrees` properties contain the angle (Number) of the straight line from the x and y coordinates of the second-to-last event in the sequence to `points.end`.</p><p>`angle.fromStart` and `angle.fromPrevious` update after every `touchmove`.</p> |
| `direction` | Object | <p>The `direction` object has two properties: `fromStart` and `fromPrevious`.</p><p>`direction.fromStart` is the direction (String) of the straight line from `points.start` to `points.end`.</p><p>`direction.fromPrevious` is the direction (String) of the straight line from the x and y coordinates of the second-to-last event in the sequence to `points.end`.</p><p>`direction.fromStart` and `direction.fromPrevious` update after every `touchmove`.</p><p>Possible directions are:</p><ul><li>`'up'`</li><li>`'upRight'`</li><li>`'right'`</li><li>`'downRight'`</li><li>`'down'`</li><li>`'downLeft'`</li><li>`'left'`</li><li>`'upLeft'`</li></ul> |
| `velocity` | Object | <p>The velocity (Number, measured in pixels per millisecond) at which the mouse is currently traveling.</p><p>`velocity` updates after every `touchmove`.</p> |
| `touchTotal` | Number | Used mostly for internal purposes, `touchTotal` indicates the current number of active touch points. If `touchTotal` exceeds `1`, the gesture will be denied. |
:::
