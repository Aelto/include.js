include.import({
	baseUrl: './',
	include: [
		'modules/mod_1.js'
	]
}, () => {
	// import the module based on their export names
	let mod_1 = imports('mod_1')
	let mod_2 = imports('mod_2')
	
	// call the module to test if everything is working as intended
	mod_1()
	mod_2()
	
	// be happy :)
})