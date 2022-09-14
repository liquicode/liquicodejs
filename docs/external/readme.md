# LiquicodeJS
***(v0.0.3)***

LiquicodeJS is a general purpose library for NodeJS and Javascript.

It is writtem in 100% Javascript and has no dependencies.

There are packages available for node, es5, and es6.


Getting Started
---------------------------------------------------------------------

**Node Environment**

Install via NPM:
~~~bash
npm install @liquicode/liquicodejs
~~~

~~~javascript
// Include the library in your source code
const Liquicode = require( '@liquicode/liquicodejs' );
console.log( Liquicode.version );
~~~

**Browser Environment**

~~~html
<script src="//unpkg.com/@liquicode/liquicodejs/dist/es6/liquicode.es6.js"></script>
<script>
	console.log( window.Liquicode.version );
</script>
~~~

Or use the ES5 version for use with older browsers:

~~~html
<script src="//unpkg.com/@liquicode/liquicodejs/dist/es5/liquicode.es5.js"></script>
<script>
	console.log( window.Liquicode.version );
</script>
~~~


Sample Usage
---------------------------------------------------------------------

~~~javascript
// Include the library in your source code
const Liquicode = require( '@liquicode/liquicodejs' );

// Clone an object.
let cloned = Liquicode.Object.Clone( { foo: 'bar' } );

// Merge two objects.
let merged = Liquicode.Object.Merge( 
	{ foo: 'bar', biz: 'boo' },
	{ foo: 'baz', dee: 'dum' } );
// merged == { foo: 'baz', biz: 'boo', dee: 'dum' }

// Match Wildcard Text
Liquicode.Text.Matches( 'bar', 'b?r' ) // == true
Liquicode.Text.Matches( 'bar', 'ba*' ) // == true
Liquicode.Text.Matches( 'baz', 'ba*' ) // == true
Liquicode.Text.Matches( 'ba', 'ba*' )  // == true

~~~


Project Links
---------------------------------------------------------------------

- [Library Source Code](https://github.com/liquicode/liquicodejs)
- [Library Docs Site](http://liquicodejs.liquicode.com)
- [Library NPM Page](https://www.npmjs.com/package/@liquicode/liquicodejs)


Dependencies
---------------------------------------------------------------------

**None**


Notices
---------------------------------------------------------------------

**None**

