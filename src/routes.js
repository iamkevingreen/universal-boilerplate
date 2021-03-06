import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/layout';
import Home from './components/home';
import Page from './components/page';
import NotFound from './components/pages/NotFound';

export default (
	<Route path='/' component={App}>
		<IndexRoute component={Home} />
		<Route path='page' component={Page} />
		<Route path="*" component={NotFound} />
	</Route>
);
