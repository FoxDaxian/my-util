// actions

import {
	ADD_TODO, DEL_TODO, EDIT_TODO, TOG_TODO
} from '@/store/types'

// TODO 要传入的参数放进payload(载荷，携带)字段里，设置为对象

export const addItem = text => {
	return {
		type: ADD_TODO,
		text,
		complete: false
	}	
}

export const deleteItem = index => {
	return {
		type: DEL_TODO,
		index
	}
}

export const editItem = (text, index) => {
	return {
		type: EDIT_TODO,
		text, index
	}
}

export const togItem = (index) => {
	return {
		type: TOG_TODO,
		index
	}
}