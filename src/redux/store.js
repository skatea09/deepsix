import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import nodes from './reducers';
import requests from '../utils/requestReducer';

const reducer = combineReducers({ nodes, requests });
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
