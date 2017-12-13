// reducers

import { combineReducers } from 'redux'
import {
	todos
} from '@/store/states'

import {
	ADD_TODO, DEL_TODO, EDIT_TODO, TOG_TODO
} from '@/store/types'

const todoReducer = (state = todos, action) => {
	switch (action.type) {
		case ADD_TODO:
		return [...state, {
			text: action.text,
			cmplete: false
		}]
		case DEL_TODO:
		let temp = [...state]
		temp.splice(action.index, 1)
		return temp
		case EDIT_TODO:
		return state.map((item, index) => {
			index === action.index && (item.text = action.text)
			return item
		})
		case TOG_TODO:
		return state.map((item, index) => {
			index === action.index && (item.completed = !item.completed)
			return item
		})
		default:
		return state;
	}
}

const temp = (state = {}, action) => {
	switch (action.type) {
		default:
		return state;
	}
}

// 多个reducers 共同使用demo
const redux = combineReducers({
	todoReducer,
	temp
})

export default redux