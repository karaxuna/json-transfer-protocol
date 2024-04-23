const { createType } = require('../../type')

module.exports = createType({
    read: (buffer, offset) => {
        let i;
        for (i = offset; i < buffer.length; i += 2) {
            if (buffer.readUInt16LE(i) === 0x00) {
                break;
            }
        }

        return [
            buffer.toString('ucs2', offset, i),
            i + 2
        ]
    },
    write: (value) => {
        const length = Buffer.byteLength(value, 'ucs2') + 2
        const buffer = Buffer.alloc(length)

        buffer.write(value, 0, 'ucs2');
        buffer.writeInt16LE(0, length - 2)
        
        return buffer
    }
})
