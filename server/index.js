require('babel-register')({
  presets: ['es2015', 'react']
});
require.extensions['.less'] = () => {
  return;
};
require.extensions['.scss'] = () => {
  return;
};
require.extensions['.png'] = () => {
  return;
};
require.extensions['.jpg'] = () => {
  return;
};
require.extensions['.svg'] = () => {
  return;
};
require.extensions['.gif'] = () => {
  return;
};
require.extensions['.html'] = () => {
  return;
};

require('./server')
