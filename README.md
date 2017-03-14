# redux-persist-transform-expire

[![npm](https://img.shields.io/npm/v/redux-persist-transform-expire.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.com/package/redux-persist-transform-expire)

Add expiration to your persisted store.

## Usage

```js
import createExpirationTransform from 'redux-persist-transform-expire';

const expireTransform = createExpirationTransform({
  expireKey: 'customExpiresAt',
  defaultState: {
    custom: 'values'
  }
});

persistStore(store, {
  transforms: [expireTransform]
});

```
## Configuration

| Attr         | Type   | Default            | Notes                                               |
| ------------ | ------ | ------------------ | --------------------------------------------------- |
| expireKey    | String | 'persistExpiresAt' | Name of the attribute holding the expire date value |
| defaultState | Any    | {}                 | Shape of the state after expirations happen         |
