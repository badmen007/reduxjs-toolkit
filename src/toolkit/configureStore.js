import { applyMiddleware, createStore, compose, combineReducers } from 'redux';

/**
 * 判断是不是纯对象 reduxjs/toolkit 这个里面的方法
 * @param {*} value 
 * @returns 
 */
function isPlainObject(value) {
  if(typeof value !== 'object' || value === null) return false;

  return Object.getPrototypeOf(value) === Object.prototype;
}

export default function configureStore(options={}) {
  const {reducer, middlewares, preloadedState} = options;
  let rootReducer;
  if(typeof reducer === 'function') {
    rootReducer = reducer;
  }else if(isPlainObject(reducer)) {
    rootReducer = combineReducers(reducer);
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(...middlewares)));
}