import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HeaderApp,Name} from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import {createStore,combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {gebi} from './utils'
const reduders={
	form:formReducer
}
const reducer=combineReducers(reduders)
let store=createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
ReactDOM.render(<Provider store={store}>
	<HeaderApp />
</Provider>
, document.getElementById('hdr'));
ReactDOM.render(<Name />,gebi('root'))
registerServiceWorker();
