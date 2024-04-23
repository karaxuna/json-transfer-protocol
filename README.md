### JSON Transfer Protocol

Serialize JSON into binary and vice versa.

```javascript
const schema = {
  type: 'object',
  name: 'MoveToLocation',
  properties: [{
    type: 'c',
    name: 'type',
    value: 0x2f,
  }, {
    type: 'd',
    name: 'objectId'
  }, {
    type: 'd',
    name: 'destX'
  }, {
    type: 'd',
    name: 'destY'
  }, {
    type: 'd',
    name: 'destZ'
  }, {
    type: 'd',
    name: 'curX'
  }, {
    type: 'd',
    name: 'curY'
  }, {
    type: 'd',
    name: 'curZ'
  }],
};

const data = {
  type: 0x2f,
  objectId: 1,
  destX: 2222,
  destY: 3333,
  destZ: 0,
  curX: 4444,
  curY: 5555,
  curZ: 6666,
};

const buffer = types.object.write(data, schema)
const [ parsed ] = types.object.read(buffer, 0, schema);

assert.deepStrictEqual(
  parsed,
  data,
  'Parsed buffer should be equal to original data'
);
```
