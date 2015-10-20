'use strict'
let include, imports
imports = (file, name) => {
	if (!name)
		return include.exported[file]
	return include.exported[file][name]
}
include = ((es6) => {
	es6.exported = {}
	es6.import = (config, callback) => {
		es6.config = config
		if (!es6.config.baseUrl) es6.config.baseUrl = './'
		es6.modules = []
		
		es6.config.include.forEach(p => es6.modules.push(es6.config.baseUrl + p))
		
		let tags = document.querySelectorAll('script'),
			i = tags.length
		while (i--)
			if (tags.item(i).type === 'include')
				es6.modules.push(tags.item(i).src)
				
		es6.modules.forEach((p, i) => es6.loadFile(p, i, callback))
	}

	es6.loadFile = (p, i, cb) => {
		let u = document.createElement('script')
        u.src = p
        document.body.appendChild(u)

        u.onload = () => {
            es6.modules.splice(i, 1)
            if (es6.modules.length === 0) cb()
        }
	}
	
	es6.newModule = (name, value) => include.exported[name] = value
    es6.export = es6.exports = es6.newModule

	return es6
})({})