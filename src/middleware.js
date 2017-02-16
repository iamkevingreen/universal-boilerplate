import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import reducers from './reducers';
import routes from './routes';
import Helmet from 'react-helmet';

export default (req, res) => {
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if(error) {
			res.status(500).send(error.message);
		} else if(redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if(renderProps) {
			if(process.env.NODE_ENV == 'development') {
				res.status(200).send(`
					<!doctype html>
					<html>
						<body>
							<div id='app'></div>
							<script src='bundle.js'></script>
						</body>
					</html>
				`);
			} else if(process.env.NODE_ENV == 'production') {
				let renderBody = renderToString(
					<Provider store={createStore(reducers)}>
						<RouterContext {...renderProps} />
					</Provider>
				)
				let head = Helmet.rewind();
				res.status(200).send(`
					<!doctype html>
					<html>
						<head>
							<meta charset="utf-8" />
							${head.title}
							${head.meta}
						</head>
						<header>
							<link rel='stylesheet' href='bundle.css'>
						</header>
						<body>
							<div id='app'>${renderBody}</div>
							<script src='bundle.js'></script>
						</body>
					</html>
				`);
			}
		} else {
			res.status(404).send(`
				<!doctype html>
				<html>
					<head>
						<meta charset="utf-8" />
						${head.title}
						${head.meta}
					</head>
					<header>
						<link rel='stylesheet' href='bundle.css'>
					</header>
					<body>
						<div id='app'>${renderBody}</div>
						<script src='bundle.js'></script>
					</body>
				</html>
			`);
		}
	});
};
