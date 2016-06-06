# redux-persist-transform-encrypt

[![npm](https://img.shields.io/npm/v/redux-persist-transform-expire.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.com/package/redux-persist-transform-expire)

Add expiration to your persisted store.

## Usage

```js
import createExpirationTransform from 'redux-persist-transform-encrypt';

const encryptor = createExpirationTransform({
  expireKey: 'customExpiresAt'
});

persistStore(store, {
  transforms: [
    encryptor
  ]
});

```