const assert = require('assert')
const types = require('../src')

const defaults = {
  prop1: 0x01
}

const packet = {
  type: 'object',
  properties: [{
    type: 'c',
    name: 'prop1',
    value: defaults.prop1
  }, {
    type: 'b',
    name: 'prop2',
    length: 2,
  }, {
    type: 'h',
    name: 'prop3',
    transform: {
      read: (value) => {
        return value === 1;
      },
      write: (value) => {
        return value ? 1 : 0;
      },
    },
  }, {
    type: 'c',
    name: 'prop5count',
  }, {
    type: 'd',
    name: 'prop4'
  }, {
    type: 'array',
    name: 'prop5',
    count: 'prop5count',
    items: {
      type: 'object',
      properties: [{
        type: 'f',
        name: 'prop51'
      }, {
        type: 's',
        name: 'prop52'
      }]
    }
  }]
}

const data = {
  prop2: Buffer.from([1, 2]),
  prop3: true,
  prop4: 0xd2,
  prop5: [{
    prop51: 0xfd,
    prop52: 'Hi, I\'m foo.'
  }, {
    prop51: 0xfa,
    prop52: 'Nice to meet you!'
  }]
}

const buffer = types.object.write(data, packet)
const [parsed] = types.object.read(buffer, 0, packet)

assert.deepStrictEqual(
  parsed,
  {
    ...data,
    ...defaults,
    prop5count: data.prop5.length,
  },
  'Parsed buffer should be equal to original data'
)

console.log('All tests passed!')
