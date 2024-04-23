const { createType } = require('../../type')

module.exports = createType({
    read: (buffer, offset) => {
        return [
            buffer.readUInt8(offset),
            offset + 1
        ]
    },
    write: (value) => {
        const buffer = Buffer.alloc(1)
        buffer.writeUInt8(value)
        return buffer
    }
})
