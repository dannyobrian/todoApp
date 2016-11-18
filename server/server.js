/* eslint-disable no-console, no-use-before-define */

const express = require('express');
const jsonfile = require('jsonfile');
const fs = require('fs');

import favicon from 'serve-favicon'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
// import webpackConfig from '../webpack.config'
let config = require('../webpack.config');

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

const jsonBody = require('body/json');

const expressLogging = require('express-logging');
const logger = require('logops');
app.use(expressLogging(logger));

if ( process.env.NODE_ENV == 'production' ) {

  console.log("production mode");
  app.use(compression());
  app.use('/', express.static('dist'));
  app.use(favicon(__dirname + './../static/favicon.png'));
}
else {
  let config = require('../webpack.config.dev-server');
  // Use this middleware to set up hot module reloading via webpack.
  console.log("development mode");
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log
  }))
}

if (typeof(window) == 'undefined'){
  global.window = {};
}

if (typeof(document) == 'undefined'){
  global.document = {domain: 'localhost'};
}

app.use('/api', router);

app.post('/api/save',(req,res) => { jsonBody(req, res, (err, body) => {
  logger.info(body);
  jsonfile.writeFile('./static/data/data.json', body, {}, (err) => {
    if (err) {
      res.json({error: err});
      logger.warn(err);
    } else {
      res.json({success: "data written"});
    }
  });
})});

app.get('/api/data',(req, res) =>{
  jsonfile.readFile('./static/data/data.json',(err,obj) => {
    if (err) {
      logger.warn(err);
      res.json({error: err});
    } else {
      res.json(obj);
    }
  });
});

// send all requests to index.html so browserHistory works
app.get('/', (req, res) => {
  
  match({ routes: Routes, location: req.url }, (err, redirect, props) => {
    let timeStamp = new Date();

    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {

      const initialState = {};

      // Create a new Redux store instance
      const store = configureStore(initialState);

      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      );
        
      // Grab the initial state from our Redux store
      const finalState = store.getState();

      // Send the rendered page back to the client
      res.send(renderFullPage(html, finalState));
      
      logger.info("Finished Page Request: " + req.url.toString() + " at " + (new Date().getTime() - timeStamp.getTime()) + "ms."  )

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
        <link rel="stylesheet" href="/styles.css">
        <!--[if IE lt 9]>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.9/es5-shim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.9/es5-sham.min.js"></script>
        <![endif]>-->
      </head>
      <body>
        <div id="app" style='height:100%;position:relative;'><div>${html}</div></div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>        
        <script src="/vendor.bundle.js"></script>
        <script src="/bundle.js"></script>
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
