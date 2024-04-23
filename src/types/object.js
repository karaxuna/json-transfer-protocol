const { createType } = require('../type')
const types = require('.')

module.exports = createType({
    read: (buffer, offset, entry) => {
        const data = {}

        for (let property of entry.properties) {
            const results = types[property.type].read(buffer, offset, property, data)

            if (property.name) {
                data[property.name] = results[0]
            }

            offset = results[1]
        }

        return [ data, offset ]
    },
    write: (value, entry) => {
        const buffers = []

        for (let property of entry.properties) {
            const buffer = types[property.type].write(value[property.name], property)
            buffers.push(buffer)
        }

        return Buffer.concat(buffers)
    }
})
