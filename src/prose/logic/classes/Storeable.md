---
title: Storeable
tags: UI logic
publish: true
order: 0
---

`Storeable` is a class that enriches a storage key (String), allowing it to:
- Store state in [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) or [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
- Remove itself from `localStorage` or `sessionStorage`
- Store a status (`ready`, `stored`, or `removed`) in `localStorage` or `sessionStorage`
- Remove its status from `localStorage` or `sessionStorage`

::: type="info"
`Storeable` adds very little extra functionality to the `localStorage` and `sessionStorage` APIs. It's intended to be a thin wrapper, simply ensuring that those APIs conform to all of Baleada Logic's API design specs and naming conventions.
:::


:::
## Example
:::

Baleada's docs use `Storeable` to remember your dark theme and minimalist theme preferences, even after you reload this browser tab or open these docs in a new tab.


:::
## Construct a `Storeable` instance
:::

To construct a `Storeable` instance (Object), use the `Storeable` constructor, which accepts two parameters:

::: ariaLabel="Storeable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | String | yes | The key (from a key/value pair) that will be made storable. |
| `options` | Object | no | Options for the `Storeable` instance. See the [`Storeable` constructor options](#Storeable-constructor-options) section for more guidance. |
:::


:::
```js
const instance = new Storeable(key[, options])
```
:::

Or, if you're using [Baleada Composition](/docs/composition):

:::
```js
const reactiveInstance = useStoreable(key[, options])
```
:::


:::
### `Storeable` constructor options
:::

::: ariaLabel="Storeable constructor options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | String | `local` | Indicates the type of storage that your `Storeable` instance should use. Valid values are `local` and `session`. |
| `statusKeySuffix` | String | ` status` | <p>Indicates the suffix your `Storeable` instance should add to your `key` when generating the key used to store `status`.</p><p>See the [Access state and methods](#access-state-and-methods) table to learn more about `status`.</p> |
:::


:::
## Access state and methods
:::

The constructed `Storeable` instance is an Object, and state and methods can be accessed via its properties:


::: ariaLabel="Storeable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `key` | Getter/Setter | See return value | N/A | <p>The `key` (String) passed to the constructor.</p><p>If you assign a value directly to `key`, a setter will pass the new value to `setKey`.</p> |
| `status` | Getter | See return value | N/A | <p>The status (String) of the `Storeable` instance.</p><p>`status` is `constructing` while the instance is constructing and `ready` after it's constructed. It changes to `stored` after a value has been stored for your `key`, and it changes to `removed` after your key/value pair has been removed from storage.</p><p>`status` also gets stored in `localStorage` or `sessionStorage`. See the [How to use persistent status](#how-to-use-persistent-status) section for more guidance on this.</p> |
| `storage` | Getter | See return value | N/A | `localStorage` or `sessionStorage`, depending on what options were passed to the `Storeable` constructor. |
| `string` | Getter | See return value | N/A | The value (String) stored under your `key` in `localStorage` or `sessionStorage`. |
| `error` | Getter | See return value | N/A | An empty object `{}` before any storage has been attempted The value (String) stored under your `key` in `localStorage` or `sessionStorage`. |
| `setKey(newKey)` | Function | Sets the `key` and updates `trie`. | The new `key` (Array) | The `Storeable` instance |
| `store(string)` | Function | Stores the `key` in `localStorage` or `sessionStorage`, along with any String you want to store as the value for your `key`. | The String you want to store. If you don't pass this parameter, `Storeable` will store `undefined` as the value for your `key`. | The `Storeable` instance |
| `remove()` | Function | Removes the `key` from `localStorage` or `sessionStorage`. | None | The `Storeable` instance |
| `removeStatus()` | Function | Removes the stored `status` from `localStorage` or `sessionStorage`. | None | The `Storeable` instance |
:::


:::
### How to use persistent status
:::

As mentioned in the table above, each `Storeable` instance stores its `status` in `localStorage` or `sessionStorage`. After the instance is constructed, `status` will be `ready`, and if the DOM is available, `status` will be stored.

The key used for your `Storeable` instance's `status` is your `key` suffixed with the `statusKeySuffix` option. For example, if the `key` is `baleada`, and the `statusKeySuffix` option is left as the default, `status` will be stored under the `baleada status` key.

Persistent status isn't quite as useful when using `sessionStorage`, but makes it particularly easy to write explicit, readable code when using `localStorage`.

Here's an example of how these docs use `status` to make a decision about whether or not to apply the default dark theme setting (simplified into generic JavaScript instead of the original Vue code):

:::
```js
const darkThemeStatus = new Storeable('baleada_dark_theme status'),
      enableDarkTheme = () => darkThemeStatus.store('enabled'),
      disableDarkTheme = () => darkThemeStatus.store('disabled')

switch (darkThemeStatus.status) {
case 'ready':
  disableDarkTheme() // Disable by default
  break
case 'stored':
case 'removed':
  // do nothing
  break
}
```
:::

The business logic here is that, if you have specifically set your theme preference, `status` will be `stored`, and these docs shouldn't mess with your preferences. If `status` is `ready`, though, it indicates that you haven't set any preferences yet, so the default preference (disable dark theme) will be set for you.

Note that these docs handle the `removed` status to be safe, but there's no UI that would allow you to reach that state.

Consider another example: imagine you're building a web app, and you plan to store a JSON web token in `localStorage` after somebody logs into your app. So naturally, you boot up an instance of `Storeable` to receive that token.

The first time a user visits visit your app, `status` will be `ready`. After they log in, you'll call the `store` method to store the token, and `status` will be set to `stored`. 

Now, you can write explicit code in your app to funnel the user to the correct process:

:::
```js
const token = new Storeable('token')

switch (token.status) {
case 'ready':
  // This person is most likely a new user without an account. Prompt them to sign up 🚀
  break
case 'stored':
  // This person is most likely logged in. Authenticate their token with the server to make sure!
  break
}
```
:::

And after the user logs out, you'll call the `remove` method to remove the token, and `status` will be set to `removed`.

You can expand your code to handle the `removed` status when the user returns:

:::
```js
const token = new Storeable('token')

switch (token.status) {
case 'ready':
  // This person is a new user without an account.
  // Prompt them to sign up 🚀
  break
case 'stored':
  // This person is logged in.
  // Authenticate their token with the server to make sure!
  break
case 'removed':
  // This person has logged out.
  // Skip the signup sales pitch, and prompt them to log in.
  break
}
```
:::


:::
## Using with TypeScript
:::

Nothing special to know about using `Storeable` with TypeScript! Enjoy IDE autocomplete and type checking while you construct and use your instance.


:::
## API design compliance
:::

::: ariaLabel="A table showing Storeable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state, and an `options` object. | <BrandApiDesignSpecCheckmark /> |  |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `key`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setKey` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `storage`, `string`, `error` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `store`, `remove`, `removeStatus` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "A key can be stored." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::
