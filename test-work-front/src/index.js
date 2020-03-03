import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ApiService } from './services';
import { ApiServiceProvider } from './components/api-service-context';

import App from './components/app';

const apiService = new ApiService();

ReactDOM.render(
    <Provider store={store}>
        <ApiServiceProvider value={apiService}>
            <Router>
                <App />
            </Router>
        </ApiServiceProvider>
    </Provider>,
    document.getElementById('root'));

