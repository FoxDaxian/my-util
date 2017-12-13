import React, { Component } from 'react'
import scss from './index.scss'

// 图片资源
import bg from '@/assets/imgs/list/bg.png'

class List extends Component {
	async componentDidMount () {
		this.aniWraps = Array.prototype.slice.call(document.querySelectorAll(`.${ scss.wrap } .aniWrap`))

		await new Promise((resolve, reject) => {
			this.ani1.addEventListener("animationend", function() {
				resolve()
			})
		})
		for (let i = 0, len = this.aniWraps.length; i < len; i++) {
			this.aniWraps[i].timeId = setTimeout(() => {
				this.aniWraps[i].classList.add('animated')
				this.aniWraps[i].classList.add('bounceInDown')
				this.aniWraps[i].style.display = 'block'
			}, 200 * i)
		}
	}

	componentWillUnmount () {
		for (let i = 0, len = this.aniWraps.length; i < len; i++) {
			clearTimeout(this.aniWraps[i].timeId)
		}
	}
	// render里用循环写，毕竟用的jsx
	render() {
		return (
			<div className={scss.wrap}>
				<div className="center">
					<div
						className="contents animated bounceInLeft"
						ref={el => this.ani1 = el}
						style={{ backgroundImage: `url(${bg})` }}
					>
						<div className="aniWrap">
							<div className="title">最</div>
							<div className="lists">
								<div className="list">
									<div className="count">1</div>
									<div className="text">当代</div>
								</div>
								<div className="list">
									<div className="count">1</div>
									<div className="text">当代</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default List
