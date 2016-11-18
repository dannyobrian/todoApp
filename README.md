# Todo App front end

##Description
This is a simple Todo app with dynamic Aria tagging for site readers such as JAWS. CSS is based on Bootstrap and compiled using SASS, Custom CSS follows the [SUITCSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md) naming convention scheme.

It is built on the ReactJS framework using Redux for State management, source files are transpiled using Babel and the Webpack build tool.

Unit testing is available using Karma and Jasmine though, due to time constraints and their ommission from the specification requirements, no tests are currently included in the repo.

##Installation
To install type:
```
npm install
```

To run in dev mode type:
```
npm run dev
```

To run in production mode (required for REST API load and save)
```
npm start
```
This will compile a distribution build and start the server as a forever process.
 
On load, data is loaded from <http://localhost:5000/api/data>

On saving changes, data is saved back a local json file by posting to <http://localhost:5000/api/save>
 
 
##Accessing the app
In both cases dev and production builds, the app will be accessible at <http://localhost:5000>

##Known bugs
Cross browser tested down to IE9 (there are a node_module compile errors when transpiling down to ES3 for IE<9)  

App will complain about malformed JSON from REST API when in development mode as REST API is only implemented on production mode.