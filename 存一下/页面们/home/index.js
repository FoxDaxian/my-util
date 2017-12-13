import React, { Component } from 'react'
import scss from './index.scss'
import CountAni from '@/tools/CountAni'
import Svg from '@/tools/svg.js'
import { myAni } from '@/tools/utils'

// 图片资源
import bg from '@/assets/imgs/home/circle.png'
import star from '@/assets/imgs/home/star.png'
import contentBg from '@/assets/imgs/home/bg.png'

console.log(star)

class Home extends Component {
	async componentDidMount() {
		const svg1 = new Svg('circle', window.remBase * 7, window.remBase * 7)
		// 最外层环
		const outSide1 = svg1.createArc({
			Mx: window.remBase * 0.1,
			My: window.remBase * 3.5,
			Axr: window.remBase * 3.4,
			Ayr: window.remBase * 3.4,
			Ax: window.remBase * 1.9,
			Ay: window.remBase * 6.5,
			stroke: '#d7d8ff',
			strokeWidth: 8
		})
		const outSide2 = svg1.createArc({
			Mx: window.remBase * 4.4,
			My: window.remBase * 0.21,
			Axr: window.remBase * 3.4,
			Ayr: window.remBase * 3.4,
			Ax: window.remBase * 6.7,
			Ay: window.remBase * 2.4,
			stroke: '#d7d8ff',
			strokeWidth: 8,
			dir: 1
		})
		const outSide3 = svg1.createArc({
			Mx: window.remBase * 6.5,
			My: window.remBase * 5.1,
			Axr: window.remBase * 3.4,
			Ayr: window.remBase * 3.4,
			Ax: window.remBase * 4.5,
			Ay: window.remBase * 6.71,
			stroke: '#d7d8ff',
			strokeWidth: 8,
			dir: 1
		})
		// 内层圆
		const innerSide1 = svg1.createArc({
			Mx: window.remBase * 0.83,
			My: window.remBase * 4.39,
			Axr: window.remBase * 2.8,
			Ayr: window.remBase * 2.8,
			Ax: window.remBase * 6.17,
			Ay: window.remBase * 4.39,
			stroke: '#dee498',
			strokeWidth: 1
		})
		const innerSide2 = svg1.createArc({
			Mx: window.remBase * 0.83,
			My: window.remBase * 2.61,
			Axr: window.remBase * 2.8,
			Ayr: window.remBase * 2.8,
			Ax: window.remBase * 6.17,
			Ay: window.remBase * 2.61,
			stroke: '#dee498',
			strokeWidth: 1,
			dir: 1
		})

		const svg2 = new Svg('dashed', '100%', '100%')
		const durTime = 3000
		svg2.svgMeet('left', durTime)
		svg2.svgMeet('right', durTime)

		


		try {
			const countAni = new CountAni('countup', 0, 100, durTime / 1000)
			await countAni.init();

			[outSide1, outSide2, outSide3].forEach((item) => {
				item.animate(12000).rotate(360, window.remBase * 3.5, window.remBase * 3.5).loop()
			});
			[innerSide1, innerSide2].forEach((item) => {
				item.animate(12000).rotate(-360, window.remBase * 3.5, window.remBase * 3.5).loop()
			})

			// 星星部分
			const svg3 = new Svg('star', '100%', '100%')

			
			// 日增
			var temp1 = svg3.svg
				.image(star, 18, 18)
				.move(window.remBase, window.remBase)
				.animate(1000)
				.rotate(360, window.remBase * 3, window.remBase * 3)

			await new Promise((resolve, reject) => {
				this.timeId1 = setInterval(() => {
					if (temp1.situation === null) {
						resolve()
					}
				}, 200)
			})

			await myAni({
				el: this.box1,
				start: 0,
				end: this.box1.parentNode.offsetWidth,
				dur: 1000
			})


			const increment1 = new CountAni('increament1', 0, 100, 2)
			await increment1.init()


			// 月增
			const temp3 = svg3.svg
				.image(star, 18, 18)
				.move(window.remBase * 5.1, window.remBase * 1.8)
				.animate(1000)
				.rotate(360, window.remBase * 3, window.remBase * 3)

			await new Promise((resolve, reject) => {
				this.timeId2 = setInterval(() => {
					if (temp3.situation === null) {
						resolve()
					}
				}, 200)
			})

			await myAni({
				el: this.box3,
				start: 0,
				end: this.box3.parentNode.offsetWidth,
				dur: 1000,
				dir: 'right'
			})

			const increment3 = new CountAni('increament3', 0, 100, 2)
			await increment3.init()

			// 年增
			const temp2 = svg3.svg
				.image(star, 18, 18)
				.move(window.remBase, window.remBase * 4.57)
				.animate(1000)
				.rotate(360, window.remBase * 3, window.remBase * 3)

			await new Promise((resolve, reject) => {
				this.timeId3 = setInterval(() => {
					if (temp2.situation === null) {
						resolve()
					}
				}, 200)
			})

			await myAni({
				el: this.box2,
				start: 0,
				end: this.box2.parentNode.offsetWidth,
				dur: 1000
			})
			const increment2 = new CountAni('increament2', 0, 100, 2)
			await increment2.init()
		} catch (error) {
			console.log(error)
		}
	}

	componentWillUnmount() {
		clearInterval(this.timeId1)
		clearInterval(this.timeId2)
		clearInterval(this.timeId3)
	}

	render() {
		return (
			<div className={scss.wrap}>
				<div className="content">
					<div id="circle" data-name="两个环" />
					<div id="dashed" data-name="内层的点点点" />
					<div id="star" data-name="✨部分">
						<div
							className="box1"
							data-name="日增"
						>
							<div className="ofh" ref={el => (this.box1 = el)}>
								<div className="fixBox">
									<div
										className="img"
										style={{
											backgroundImage: `url(${contentBg})`
										}}
									>
										<p className="title">日增</p>
										<p className="increament count" id="increament1">0</p>
									</div>
									<div className="line" />
								</div>
							</div>
						</div>
						<div
							className="box2"
							data-name="年增"
						>
							<div className="ofh" ref={el => (this.box2 = el)}>
								<div className="fixBox">
									<div
										className="img"
										style={{
											backgroundImage: `url(${contentBg})`
										}}
									>
										<p className="title">年增</p>
										<p className="increament count" id="increament2">0</p>
									</div>
									<div className="line" />
								</div>
							</div>
						</div>
						<div
							className="box3"
							data-name="月增"
						>
							<div className="ofh" ref={el => (this.box3 = el)}>
								<div className="fixBox">
									<div className="line" />
									<div
										className="img"
										style={{
											backgroundImage: `url(${contentBg})`
										}}
									>
										<p className="title">月增</p>
										<p className="increament count" id="increament3">0</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						className="circle"
						style={{ backgroundImage: `url(${bg})` }}
					>
						<div className="center">
							<p id="countup" className="count">0</p>
							<p className="text">总阅读人数</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Home
