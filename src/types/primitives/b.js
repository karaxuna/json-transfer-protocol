const { createType } = require('../../type')

module.exports = createType({
  read: (buffer, offset, entry) => {
    let result = buffer.slice(offset, offset + entry.length);

    return [
      result,
      offset + entry.length,
    ];
  },
  write: (value, entry) => {
    const length = 'length' in entry ? entry.length : value.length;
    const buffer = Buffer.alloc(length);
    buffer.set(value, 0);
    return buffer;
  }
})
