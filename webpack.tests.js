// this regex matches any js files in __tests__ directories
var context = require.context('./common/', true, /tests\/.+\.js$/);
context.keys().forEach(context);