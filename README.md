# redux-persist-transform-expire

[![npm](https://img.shields.io/npm/v/redux-persist-transform-expire.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.com/package/redux-persist-transform-expire)

Add expiration to your persisted store.

Supports default application-wide state after expiration as well as specific configurations for each
reducer.

## Usage
```js
import createExpirationTransform from 'redux-persist-transform-expire';

const expireTransform = createExpirationTransform({
  expireDateKey: 'customDateExpiresAt',
  expireStateKey: 'customStateAfterExpire',
  defaultState: {
    custom: 'values'
  }
});

persistStore(store, {
  transforms: [expireTransform]
});

```
Your `expireDateKey` key should be present in each reducer, which should be expired. E.g.
```
// top most reducer
{
  reducerOne: {
    persistExpiresAt: '2017-04-11T15:46:54.338Z'
  },
  reducerTwo: {
    persistExpiresAt: '2017-04-11T15:46:54.338Z'
  }
}
```
The `expireStateKey` is optional. If it is not set, the expired state evaluates to `defaultState`.

To set state after expiration for a specific reducer, place `expireStateKey` alongside 
`expireDateKey`:
```
// top most reducer
{
  reducerOne: {
    persistExpiresAt: '2017-04-11T15:46:54.338Z',
    stateAfterExpiration: { value: 'foo' }
  },
  reducerTwo: {
    persistExpiresAt: '2017-04-11T15:46:54.338Z',
    stateAfterExpiration: { value: 'bar' }
  }
}
```

## Configuration

| Attr          | Type   | Default                | Notes                                                             |
| ------------- | ------ | ---------------------- | ----------------------------------------------------------------- |
| expireDateKey | String | 'persistExpiresAt'     | Name of the attribute holding the expire date value               |
| expireStateKey| String | 'stateAfterExpiration' | Name of the attribute holding the value of state after expiration |
| defaultState  | Any    | {}                     | Shape of the state after expirations happen                       |
