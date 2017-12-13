// TODO react-devtools

import React from 'react'
import ReactDOM from 'react-dom'
import '@/assets/normalize.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

// action定义了什么事件会发生
// reducers定义了事件的具体内容
import { applyMiddleware, createStore, compose } from 'redux'
import reducers from '@/store/reducers'

// react-redux
import { Provider } from 'react-redux'
// redux-thunk: 说白了thunk就是允许dispatch第一个参数为函数，可以不是对象
// 是函数的话，就可以添加promise进行异步处理，等等操作
// 参考阮一峰的文章
import ReduxThunk from 'redux-thunk'

import { HashRouter as Router, Route } from 'react-router-dom'

// 根据环境添加中间件
const middlewares = [ReduxThunk]
if (process.env.NODE_ENV === 'development') {
	// 这样 require 会有条件的执行，不是总会执行
	const { logger } = require('redux-logger')
	middlewares.push(logger)
}

window.remBase = document.documentElement.offsetWidth / 19.2
document.documentElement.style.fontSize = window.remBase + 'px'

// 创建 store
// compose(applyMiddleware(...middlewares)) => return function (reducer, preloadedState, enhancer), 所以可以使用下面的形式
const store = compose(applyMiddleware(...middlewares))(createStore)(reducers)

// 初始化
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route path="/" component={App} />
		</Router>
	</Provider>,
	document.getElementById('root')
)
registerServiceWorker()
