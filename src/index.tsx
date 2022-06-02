import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';

import App from './App';
import store from './store';
import 'antd/dist/antd.min.css';

const container = document.getElementById('root');

// Create a root.
const root = ReactDOM.createRoot(container!);

// Initial render
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
);
