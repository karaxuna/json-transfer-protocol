const { createType } = require('../../type')

module.exports = createType({
    read: (buffer, offset) => {
        return [
            buffer.readUInt16LE(offset),
            offset + 2
        ]
    },
    write: (value) => {
        const buffer = Buffer.alloc(2)
        buffer.writeUInt16LE(value)
        return buffer
    }
})
