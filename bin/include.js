let include, imports, exports
{
    // will store exported modules
    let exported = {}

    // adds the exported module to the modules list
    exports = (name, value) => exported[name] = value

    // returns the exported module
    imports = name => exported[name]

    include = config => new Promise((resolve, reject) => {
        if (!config) reject('no config object supplied')

        const baseUrl = config.baseUrl || './'
        const tags = []

        if (!config.sync) config.sync = []
        config.sync.forEach(path => {
            const tag = document.createElement('script')
            tag.async = false
            tag.src = baseUrl + path

            tags.push(tag)
        })

        if (!config.async) config.async = []
        config.async.forEach(path => {
            const tag = document.createElement('script')
            tag.src = baseUrl + path

            tags.push(tag)
        })

        tags.forEach(tag => {
            document.body.appendChild(tag)
            tag.onload = () => {
                // remove this module from the list
                tags.splice(0, 1)

                // no more modules to load
                if (!tags.length) {
                    if (config.after) {
                        if (!config.after.baseUrl) config.after.baseUrl = baseUrl
                        return include(config.after).then(() => resolve(config))
                    }
                    resolve(config)
                }
            }
        })
    })
}
