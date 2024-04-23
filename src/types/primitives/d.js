const { createType } = require('../../type')

module.exports = createType({
    read: (buffer, offset) => {
        return [
            buffer.readInt32LE(offset),
            offset + 4
        ]
    },
    write: (value) => {
        const buffer = Buffer.alloc(4)
        buffer.writeInt32LE(value)
        return buffer
    }
})
