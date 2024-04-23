const { createType } = require('../../type')

module.exports = createType({
    read: (buffer, offset) => {
        return [
            buffer.readDoubleLE(offset),
            offset + 8
        ]
    },
    write: (value) => {
        const buffer = Buffer.alloc(8)
        buffer.writeDoubleLE(value)
        return buffer
    }
})
