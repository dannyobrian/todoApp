/* eslint-disable no-console, no-use-before-define */

var express = require('express')
import favicon from 'serve-favicon'
import qs from 'qs'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import React from 'react'
import { Router, browserHistory, match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import compression from 'compression'

import configureStore from '../src/store/configureStore'
import App from '../src/components/App'
import Routes from '../client/routes'


const app = express();
const router = express.Router();
const port = 5000;

if ( process.env.NODE_ENV == 'production' ) {
  console.log("production mode");
  app.use(compression());
  app.use('/static', express.static('dist'));
  app.use(favicon(__dirname + './../static/favicon.png'));
}
else {
  // Use this middleware to set up hot module reloading via webpack.
  console.log("development mode");
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler))
}

app.use('/api', router);

router.route('/save').post((req, res) =>{
  "use strict";
    console.log(req);
    res.json({message: "item saved"});
});


// send all requests to index.html so browserHistory works
router.get('*', (req, res) => {
  
  var url = req.url;

  // console.log(url);

  match({ routes: Routes, location: req.url }, (err, redirect, props) => {
    
    let timeStamp = new Date();

    if (typeof(window) == 'undefined'){
      global.window = {};
    }

    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {

      const initialState = {};

      // Create a new Redux store instance
      const store = configureStore(initialState);
      
      console.log(store);

      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      );
        
      // Grab the initial state from our Redux store
      const finalState = store.getState();

      // Send the rendered page back to the client
      res.send(renderFullPage(html, finalState));
      
      console.log("Finished Page Request: " + req.url.toString() + " at " + (new Date().getTime() - timeStamp.getTime()) + "ms."  )

    } else {
      res.status(404).send('Not Found')
    }
  })
});



function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>TescoTodo</title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/static/styles.css">
      </head>
      <body>
        <div id="app" style='height:100%;position:relative;'><div>${html}</div></div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>        
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
});
