const { createType } = require('../type')
const types = require('.')

module.exports = createType({
    read: (buffer, offset, entry, data) => {
        const count = entry.count || 'count'
        const results = []

        if (!data || !(count in data)) {
            throw new Error(`Could not determine array length. Poperty '${count}' does not exist on:\n${JSON.stringify(data)}`)
        }

        for (let i = 0; i < data[count]; i++) {
            const [ result, _offset2 ] = types[entry.items.type].read(buffer, offset, entry.items)

            results.push(result)
            offset = _offset2
        }

        return [ results, offset ]
    },
    write: (value, entry) => {
        let buffer = types[entry.count].write(value.length)

        for (let item of value) {
            buffer = Buffer.concat([
                buffer,
                types[entry.items.type].write(item, entry.items)
            ])
        }

        return buffer
    }
})
