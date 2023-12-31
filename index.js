import { rootReducer } from "./redax/rootReducer";
import { applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { increment, decrement, asyncIncrement, changeTheme } from "./redax/actions";
import './style.css'

const counter = document.querySelector('.counter');
const addBtn = document.querySelector('.add');
const subBtn = document.querySelector('.sub');
const asyncBtn = document.querySelector('.async');
const themeBtn = document.querySelector('.theme')

const store = legacy_createStore(rootReducer, applyMiddleware(thunk, logger))

addBtn.addEventListener('click', () => {
    store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
    store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement())
})

themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light')
        ? 'dark'
        : 'light'
    store.dispatch(changeTheme(newTheme))
})



store.subscribe(() => {
    const state = store.getState()
    counter.innerHTML = state.counter
    document.body.className = state.theme.value;

    [addBtn, subBtn, asyncBtn, themeBtn].forEach(btn => { btn.disabled = state.theme.disabled })
})

store.dispatch({ type: 'INIT_APPLICATION' })