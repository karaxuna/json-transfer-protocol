module.exports = {
    ...require('./primitives'),
    get object() {
        return require('./object')
    },
    get array() {
        return require('./array')
    }
}
