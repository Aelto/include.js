var include, imports
imports = function (file, name) {
	if (!name)
		return include.exported[file]
	return include.exported[file][name]
}
include = (function (es6) {
	es6.exported = {}
	es6.import = function (config, callback) {
		es6.config = config
		if (!es6.config.baseUrl) es6.config.baseUrl = './'
		es6.modules = []

		var i = es6.config.include.length
		while (i--)
			es6.modules.push(es6.config.baseUrl + es6.config.include[i])

		var tags = document.querySelectorAll('script')
		i = tags.length
		while (i--)
			if (tags.item(i).type === 'include')
				es6.modules.push(tags.item(i).src)

		i = es6.modules.length
		while (i--)
			es6.loadFile(es6.modules[i], i, callback)
	}

	es6.loadFile = function (p, i, cb) {
		var u = document.createElement('script')
		u.src = p
		document.body.appendChild(u)

		u.onload = function () {
			es6.modules.splice(i, 1)
			if (es6.modules.length === 0) cb()
		}
	}

	es6.newModule = function (name, value) {
		include.exported[name] = value
	}
	es6.export = es6.exports = es6.newModule

	return es6
})({})