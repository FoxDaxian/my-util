import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Home from '@/views/home'
import List from '@/views/list'
import Activity from '@/views/activity'
import User from '@/views/users'

import Swiper from 'swiper/dist/js/swiper.min.js'
import 'swiper/dist/css/swiper.min.css'

class App extends Component {
	constructor () {
		super()
		this.state = {
			hour: window.moment().format('hh'),
			minute: window.moment().format('mm')
		}
	}
	componentDidMount() {
		const self = this
		this.timeId = null

		// const SWIPER = new Swiper('.swiper-container', {
		// 	direction: 'horizontal',
		// 	loop: true,
		// 	on: {
		// 		slideChangeTransitionStart: function() {
		// 			clearInterval(self.timeId)
		// 		},
		// 		slideChangeTransitionEnd: function() {
		// 			switch (this.activeIndex % 4) {
		// 				case 1:
		// 					if (self.props.location.pathname !== '/') {
		// 						self.props.history.push('/')
		// 					}
		// 					break
		// 				case 2:
		// 					self.props.history.push('/activity')
		// 					break
		// 				case 3:
		// 					self.props.history.push('/list')
		// 					break
		// 				case 0:
		// 				case 4:
		// 					self.props.history.push('/users')
		// 					break
		// 				default:
		// 			}
		// 			self.timeId = setInterval(() => {
		// 				SWIPER.slideNext()
		// 			}, 20000)
		// 		}
		// 	}
		// })

		let flag = false
		this.dateId = setInterval(() => {
			if (flag) {
				this.space.innerHTML = ''
			} else {
				this.space.innerHTML = ':'
			}
			flag = !flag
			this.setState({
				hour: window.moment().format('hh'),
				minute: window.moment().format('mm')
			})
		}, 1000)
	}

	componentWillUnmount() {
		this.timeId !== null && clearInterval(this.timeId)
		this.dateId !== null && clearInterval(this.dateId)
	}

	render() {
		return (
			<div className="App">
				<div>
					<p className="mainTitle">随便一个标题</p>
					<div className="dateWrap count">
						<div className="time">
							{this.state.hour}
							<p style={{
								width: '14px',
								margin: 0
							}} ref={el => (this.space = el)}>:</p>
							{this.state.minute}
						</div>
						<div className="date">
							{window.moment().format('YYYY/MM/DD')}
						</div>
					</div>
					<Route path="/" exact component={Home} />
					<Route path="/list" component={List} />
					<Route path="/activity" component={Activity} />
					<Route path="/users" component={User} />
					<div
						className="swiper-container"
						style={{
							width: '100%',
							height: '100%',
							position: 'absolute',
							top: 0,
							zIndex: 100
						}}
						data-name="页面切换"
					>
						<div className="swiper-wrapper">
							<div className="swiper-slide" />
							<div className="swiper-slide" />
							<div className="swiper-slide" />
							<div className="swiper-slide" />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default App
