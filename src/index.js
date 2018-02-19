import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import UIreducer from './store/reducers/UIreducer';
import dataReducer from './store/reducers/dataReducer';

const rootReducer = combineReducers({
    uireducer: UIreducer,
    dataReducer: dataReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));
const app = (
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
