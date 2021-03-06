import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

const app = document.getElementById('main');

ReactDOM.render(
<Provider store={store}>
	<BrowserRouter>
		<App />
  	</BrowserRouter>
</Provider>, app);

registerServiceWorker();

