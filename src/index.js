// import { configureStore, createAction } from '@reduxjs/toolkit';
import { configureStore, createStore, createAction } from './toolkit';

import logger from 'redux-logger';
import thunk from 'redux-thunk';


// const ADD = 'ADD';
// const MINUS = 'MINUS';

// function add() {
//   return {type: ADD}
// }

// function minus() {
//   return {type: MINUS};
// }

const add = createAction('ADD', function(amount){ // 就是这里可以改变传递的参数的值
  return {payload: amount * 10}
})
const minus = createAction('MINUS', amount => {
  return {payload: amount * 10}
})

function reducer(state={number: 0}, action) {
  switch(action.type) {
    case add.type: 
      return {number: state.number + action.payload};
    case minus.type: 
      return {number: state.number - 1};
    default: 
      return state;
  }
}

// const store = createStore(reducer);
const store = configureStore({
  reducer,
  middlewares: [logger, thunk],
  preloadedState: {number: 0}
})

const valueEle = document.getElementById('value');
const addEle = document.getElementById('add');
const minusEle = document.getElementById('minus');
const asyncEle = document.getElementById('async');

// subscribe  dispatch getState

function render() {
  valueEle.innerHTML = store.getState().number;
}

render();

store.subscribe(render);

addEle.addEventListener('click', () => {
  store.dispatch(add(2));
})

minusEle.addEventListener('click', () => {
  store.dispatch(minus());
})

asyncEle.addEventListener('click', () => {
  // 有个问题 为啥dispatch是从这个传递进去的  原来的dispatch 是不能派发函数的 派发的是一个纯对象
  store.dispatch(function(dispatch) {  
    setTimeout(() => {
      dispatch(add());
    },1000)
  })
})