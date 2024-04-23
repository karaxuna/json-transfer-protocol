const createType = (options) => {
    return {
        read: (buffer, offset, entry, data) => {
            let [ result, _offset ] = options.read(buffer, offset, entry, data)

            if (entry && entry.transform && entry.transform.read) {
                result = entry.transform.read(result)
            }

            return [ result, _offset ]
        },
        write: (value, entry) => {
            if (entry && entry.transform && entry.transform.write) {
                value = entry.transform.write(value)
            }

            if (value != null) {
                return options.write(value, entry)
            }

            if (entry.value == null) {
                throw new Error(`Don't know what to write in property "${entry.name}"`)
            }

            return options.write(entry.value, entry)
        }
    }
}

module.exports = {
    createType
}
