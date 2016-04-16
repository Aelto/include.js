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
include({
    baseUrl: './',
    sync: ['test1.js', 'test2.js'],
    async: ['test3.js'],
    after: {
        async: ['test4.js']
    }
}).then(v => {
    console.log('done!')

    const test = imports('test4')
    test()
})
```

# How to export
to export you'll have to use the exports function
the first argument is the module's name, the second one is the value (can be a function, an object, an array, everything...)
```javascript
// mod_1 is the name you'll use when importing it: let myMod = imports('mod_1')
exports('test4', () => {
    console.log('from test4!')
})
```

# License
include.js is released under the MIT license
