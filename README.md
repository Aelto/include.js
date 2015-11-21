# include.js
Async import/export system for the browser

# how to use

### load include.js
You have to write a script tag in your html file to load include.js
```html
<script type="text/javascript" src='pathToInclude/include.js'>
```
now you can load your javascript file
```html
<script type="text/javascript" src='main.js'>
```
## import your modules
you can import using javascript
```javascript
// main.js
include.import({
    baseUrl: './',
    include: [
        'modules/mod_1.js' // the path will be './modules/mod_1.js'
    ]
}, () => {})
```
or using a script tag with type='include'. This method doesn't use the baseUrl given in the javascript
```
<script type="text/javascript" src='./modules/mod_2.js'>
```
the 2nd argument of include.import is a callback function. This function will be called after every files are fully loaded
```javascript
// main.js
include.import({
	// standard config object, see above...
}, () => {
	// define the module based on their export names
	let mod_1 = imports('mod_1') // mod_1 is name given at export
	let mod_2 = imports('mod_2') // same for mod_2
	
	// call the module to test if everything is working as intended
	mod_1()
	mod_2()
	
	// be happy :)
})
```

# How to export
to export you'll have to use the include.export function (include.exports & include.newModule are also accepted).
the first argument is the module's name, the second one is the content (can be a function, an object, an array, everything...)
```javascript
// mod_1 is the name you'll use when importing it: let myMod = imports('mod_1')
include.export('mod_1', () => {
    console.log('i am module 1')
})
```

# License
include.js is released under the MIT license
