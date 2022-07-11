// import { configureStore, createStore } from '@reduxjs/toolkit';
import { configureStore, createStore } from './toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';


const ADD = 'ADD';
const MINUS = 'MINUS';

function add() {
  return {type: ADD}
}

function minus() {
  return {type: MINUS};
}

function reducer(state={number: 0}, action) {
  switch(action.type) {
    case ADD: 
      return {number: state.number + 1};
    case MINUS: 
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
  store.dispatch(add());
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