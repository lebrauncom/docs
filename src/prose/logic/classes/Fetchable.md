---
title: Fetchable
tags: UI logic
publish: true
order: 0
---

`Fetchable` is a class that enriches a resource (i.e. a URL), allowing it to:
- Asynchronously fetch itself
- Store the response and [any derived version](https://developer.mozilla.org/en-US/docs/Web/API/Body#Methods) of the response's body
- Store a status (`ready`, `fetching`, `fetched`, `aborted`, or `errored`)

::: type="info"
`Fetchable` adds very little extra functionality to the [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) and [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) web APIs. It's intended to be a thin wrapper, simply ensuring that they integrate properly, and conform to all of Baleada Logic's API design specs and naming conventions.
:::


:::
## Construct a `Fetchable` instance
:::

To construct a `Fetchable` instance (Object), use the `Fetchable` constructor, which accepts two parameters:

::: ariaLabel="Fetchable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `resource` | String | yes | The URL of a resource that will be made fetchable. |
| `options` | Object | no | Passes options for the `Fetchable` instance. See the [`Fetchable` constructor options](#Fetchable-constructor-options) section for more guidance. |
:::


:::
```js
const instance = new Fetchable(resource[, options])
```
:::

Or, if you're using [Baleada Composition](/docs/composition):

:::
```js
const reactiveInstance = useFetchable(resource[, options])
```
:::


:::
### `Fetchable` constructor options
:::

`Fetchable`'s `options` object currently does not accept any options.


:::
## Access state and methods
:::

The constructed `Fetchable` instance is an Object, and state and methods can be accessed via its properties:


::: ariaLabel="Fetchable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `resource` | Getter/Setter | See return value | N/A | <p>The `resource` string passed to the constructor.</p><p>If you assign a value directly to `resource`, a setter will pass the new value to `setResource`.</p> |
| `status` | Getter | See return value | N/A | <p>The status (String) of the `Fetchable` instance.</p><p>See the [How methods affect status](#how-methods-affect-status) section for more information.</p> |
| `response` | Getter | See return value | N/A | <p>An empty object `{}` before a fetching process is completed.</p><p>After a fetching process succeeds, `response` will be a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object</p><p>If a fetching process is aborted, `response` will be an `AbortError`.</p><p>If a fetching process fails for any other reason, `response` will contain details about the error.</p> |
| `arrayBuffer` | Getter | See return value | N/A | <p>Before calling the `fetch` method, `arrayBuffer` accesses a `Resolveable` instance, pre-set to resolve the `response` body's [`arrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/API/Body/arrayBuffer) asynchronous method.</p><p>After calling the `fetch` method, `arrayBuffer` accesses the result of the `Resolveable` instance's `resolve` method.</p><p>See the [How to use asynchronous properties](#how-to-use-asynchronous-properties) section for more guidance.</p>   
| `blob` | Getter | See return value | N/A | <p>Before calling the `fetch` method, `blob` accesses a `Resolveable` instance, pre-set to resolve the `response` body's [`blob`](https://developer.mozilla.org/en-US/docs/Web/API/Body/blob) asynchronous method.</p><p>After calling the `fetch` method, `blob` accesses the result of the `Resolveable` instance's `resolve` method.</p><p>See the [How to use asynchronous properties](#how-to-use-asynchronous-properties) section for more guidance.</p>   
| `formData` | Getter | See return value | N/A | <p>Before calling the `fetch` method, `formData` accesses a `Resolveable` instance, pre-set to resolve the `response` body's [`formData`](https://developer.mozilla.org/en-US/docs/Web/API/Body/formData) asynchronous method.</p><p>After calling the `fetch` method, `formData` accesses the result of the `Resolveable` instance's `resolve` method.</p><p>See the [How to use asynchronous properties](#how-to-use-asynchronous-properties) section for more guidance.</p>   
| `json` | Getter | See return value | N/A | <p>Before calling the `fetch` method, `json` accesses a `Resolveable` instance, pre-set to resolve the `response` body's [`json`](https://developer.mozilla.org/en-US/docs/Web/API/Body/json) asynchronous method.</p><p>After calling the `fetch` method, `json` accesses the result of the `Resolveable` instance's `resolve` method.</p><p>See the [How to use asynchronous properties](#how-to-use-asynchronous-properties) section for more guidance.</p>   
| `text` | Getter | See return value | N/A | <p>Before calling the `fetch` method, `text` accesses a `Resolveable` instance, pre-set to resolve the `response` body's [`text`](https://developer.mozilla.org/en-US/docs/Web/API/Body/text) asynchronous method.</p><p>After calling the `fetch` method, `text` accesses the result of the `Resolveable` instance's `resolve` method.</p><p>See the [How to use asynchronous properties](#how-to-use-asynchronous-properties) section for more guidance.</p>   
| `setResource(newResource)` | Function | Sets the `resource` | The new `resource` (String) | The `Fetchable` instance |
| `fetch(options)` | Function | Asynchronously fetches the resource using the [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) web API. Can't be called until the DOM is available. | <p>An options object.</p><p>Valid options include anything you would pass to the [`fetch` function's `init` object](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch), e.g. `method` and `headers`.</p> | The `Fetchable` instance |
| `get(options)` | Function | Shorthand for calling `fetch` with the `method` set to `get` via the `options` object. Can't be called until the DOM is available. | <p>An options object.</p><p>Valid options include anything you would pass to the [`fetch` function's `init` object](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch), e.g. `headers`.</p><p>If you pass your own `method` option, Fetchable will override its value.</p> | The `Fetchable` instance |
| `patch(options)` | Function | Shorthand for calling `fetch` with the `method` set to `patch` via the `options` object. Can't be called until the DOM is available. | <p>An options object.</p><p>Valid options include anything you would pass to the [`fetch` function's `init` object](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch), e.g. `headers`.</p><p>If you pass your own `method` option, Fetchable will override its value.</p> | The `Fetchable` instance |
| `post(options)` | Function | Shorthand for calling `fetch` with the `method` set to `post` via the `options` object. Can't be called until the DOM is available. | <p>An options object.</p><p>Valid options include anything you would pass to the [`fetch` function's `init` object](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch), e.g. `headers`.</p><p>If you pass your own `method` option, Fetchable will override its value.</p> | The `Fetchable` instance |
| `put(options)` | Function | Shorthand for calling `fetch` with the `method` set to `put` via the `options` object. Can't be called until the DOM is available. | <p>An options object.</p><p>Valid options include anything you would pass to the [`fetch` function's `init` object](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch), e.g. `headers`.</p><p>If you pass your own `method` option, Fetchable will override its value.</p> | The `Fetchable` instance |
| `delete(options)` | Function | Shorthand for calling `fetch` with the `method` set to `delete` via the `options` object. Can't be called until the DOM is available. | <p>An options object.</p><p>Valid options include anything you would pass to the [`fetch` function's `init` object](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch), e.g. `headers`.</p><p>If you pass your own `method` option, Fetchable will override its value.</p> | The `Fetchable` instance |
| `abort()` | Function | <p>Aborts the current fetching process, sets `response` to the `AbortError` produced by the fetching process, and sets status to `aborted`.</p><p>Has no effect if no fetch process is currently running.</p><p>Can't be called until the DOM is available.</p> | none | The `Fetchable` instance |
:::


:::
### How methods affect status
:::

Each `Fetchable` instance maintains a `status` property that keeps you informed of what's going on internally. As mentioned above, the value of `status` is a String.

Immediately after the instance is constructed, `status` has a value of `ready`. After you call any of the `Fetchable` instance's fetching methods (i.e. any method except `setResource` or `abort`), `status` will change to `fetching`.

If the fetching process succeeds, `status` will changed to `fetched`. If it is aborted using the `abort` method, `status` will change to `aborted`. If the fetching process fails for any other reason, `status` will change to `errored`.

::: type="info"
All methods always return the `Fetchable` instance (i.e. `this`), regardless of `status`.
:::


:::
### How to use asynchronous properties
:::

Your `Fetchable` instance has the following **asynchronous properties**, meaning that the properties retrieve [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) instead of raw data:
- `arrayBuffer`
- `blob`
- `formData`
- `json`
- `text`

These properties mirror the [asynchronous Body interface methods](https://developer.mozilla.org/en-US/docs/Web/API/Response) found on the Response object that the `fetch` API fetches.

To make these Body methods easier to work with, `Fetchable` internally wraps them all in [`Resolveable`](/docs/logic/classes/Resolveable).

Immediately after the `Fetchable` instance is constructed (`status` will be `ready`), each of those asynchronous properties will access a fully constructed `Resolveable` instance, which will also have a `status` of `ready`.

After you call the `Fetchable` instance's `fetch` method—or any of the shorthand methods, e.g. `get`—the `Fetchable` instance will asynchronously fetch data from its resource. After fetching has finished, the `Fetchable` instances `response` property will be updated with a Response object (assuming fetching was successful).

When you access one of the asynchronous properties listed above, you will trigger that property's underlying `Resolveable` instance to asynchronously resolve the Response Body's corresponding Promise-based method.

So, putting that all together, here's how to use `Fetchable` with `async/await` to retrieve the underlying data from a response to an HTTP request:

:::
```js
const fetchable = new Fetchable('https://example.com'),
      fetched = await fetchable.fetch(),
      resolved = await fetched.json,
      json = resolved.response
```
:::

And here's how to do it without `async/await`:

:::
```js
const fetchable = new Fetchable('https://example.com'),
      json = fetchable.fetch()
        .then(fetched => fetched.json)
        .then(resolved => resolved.response)
```
:::



:::
## API design compliance
:::

::: ariaLabel="A table showing Fetchable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state, and an `options` object. | <BrandApiDesignSpecCheckmark /> | The `options` object doesn't currently have any valid properties. |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `resource`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setResource` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `response`, `arrayBuffer`, `blob`, `formData`, `json`, `text` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `fetch`, `get`, `patch`, `post`, `put`, `delete`, `abort` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "A resource can be fetched." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::

