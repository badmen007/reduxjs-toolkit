import { createStore } from '@reduxjs/toolkit';


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

const store = createStore(reducer);

const valueEle = document.getElementById('value');
const addEle = document.getElementById('add');
const minusEle = document.getElementById('minus');

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