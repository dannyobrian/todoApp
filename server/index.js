require('babel-register')({
  presets: ['es2015', 'react']
});

require.extensions['.scss'] = () => {};
require.extensions['.png'] = () => {};
require.extensions['.jpg'] = () => {};
require.extensions['.svg'] = () => {};
require.extensions['.gif'] = () => {};
require.extensions['.html'] = () => {};

require('./server');
