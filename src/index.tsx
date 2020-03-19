import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash.throttle';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux';
import './assets/main.css';
import Home from './components/pages/Home';
import People from './components/pages/People';
import PersonPage from './components/pages/Person';
import { saveState, loadState } from './utils/localStorage';

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(
  throttle(() => {
    saveState({
      ...store.getState(),
    });
  }, 1000)
);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route exact path="/" component={Home} />
      <Route exact path="/people" component={People} />
      <Route path="/people/:id" component={PersonPage} />
    </Provider>
  </Router>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
