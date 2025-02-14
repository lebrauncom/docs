---
title: Using with Vue
tags: Components, Vue
publish: true
---


:::
## Install
:::

Each icon set has its own package, prefixed with `@baleada/vue-`:

:::
```bash
npm i @baleada/vue-heroicons
```
:::

:::
```bash
npm i @baleada/vue-teenyicons
```
:::

:::
```bash
npm i @baleada/vue-octicons
```
:::

:::
```bash
npm i @baleada/vue-eva-icons
```
:::

:::
```bash
npm i @baleada/vue-simple-icons
```
:::

:::
```bash
npm i @baleada/vue-radix-icons
```
:::


:::
## Import a component
:::

All Baleada Icons Vue components can be imported as ES modules:

:::
```js
import { HeroiconsEmojiHappy } from '@baleada/vue-heroicons'
import { EvaGlobe2 } from '@baleada/vue-eva-icons'
import { SimpleGeocaching } from '@baleada/vue-simple-icons'
import { TeenyiconsGlobeAfrica } from '@baleada/vue-teenyicons'
import { OcticonsBold24 } from '@baleada/vue-octicons'
import { RadixRocket } from '@baleada/vue-radix-icons'

export default {
  components: {
    HeroiconsEmojiHappy,
    EvaGlobe2,
    SimpleGeocaching,
    TeenyiconsGlobeAfrica,
    OcticonsBold24,
    RadixRocket,
  },
  ...
}
```
:::


:::
## Use a component
:::

All components will render an SVG of their icon. The SVG has 3 default attributes:

:::
```html
<svg
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="xMidYMid meet"
>
  ...
</svg>
```
:::

Each SVG also has a pre-set `viewBox` attribute to match the original icons `viewBox`.

These 4 attributes are easy to override or expand—all of the component's attributes, event listeners, and class & style bindings are passed directly to the SVG.

:::
```html
<template lang="html">
  <SimpleGeocaching
    preserveAspectRatio="none"
    class="h-4 w-4 fill-czurrent inline-block text-blue-600"
  />
  <EvaGlobe2
    aria-label="A nifty globe icon"
    @click.native="() => console.log('Eva icon was clicked')"
  />
</template>

<script setup>...</script>
```
:::

