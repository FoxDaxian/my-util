import React, { Component } from 'react'
import scss from './index.scss'
import CountAni from '@/tools/CountAni'

// 图片资源
import bg from '@/assets/imgs/activity/bg.png'

// 组件
import LineCharts from '@/components/lineCharts'

class Activity extends Component {
	componentWillMount() {
		this.xData = [10, 20, 30, 40]
		this.yData = [50, 130, 70, 200]
	}

	async componentDidMount() {
		await new Promise((resolve, reject) => {
			this.tab.addEventListener('animationend', function() {
				resolve()
			})
		})
		const counts = Array.prototype.slice.call(
			document.querySelectorAll(`.${scss.wrap} .count`)
		)
		for (let i = 0, len = counts.length; i < len; i++) {
			const countAni = new CountAni(counts[i], 0, 10000, 3, {
				separator: ',',
				decimal: '.',
				suffix: !i ? '' : '%' 
			})
			countAni.init()
		}
	}

	render() {
		return (
			<div className={scss.wrap} ref={el => this.wrap = el}>
				<div className="layoutWrap">
					<div className="sumActivity">
						<div className="count">0</div>
						<div className="title">活</div>
					</div>
					<div className="tabs">
						<div
							className="tab animated bounceInDown"
							ref={el => (this.tab = el)}
							style={{ backgroundImage: `url(${bg})` }}
						>
							<div className="title">年</div>
							<div className="count">0</div>
						</div>
						<div
							className="tab animated bounceInDown"
							style={{ backgroundImage: `url(${bg})` }}
						>
							<div className="title">日</div>
							<div className="count">0</div>
						</div><div
							className="tab animated bounceInDown"
							style={{ backgroundImage: `url(${bg})` }}
						>
							<div className="title">月</div>
							<div className="count">0</div>
						</div>
					</div>
					<LineCharts
						className="chart"
						data={{ xData: this.xData, yData: this.yData }}
					/>
				</div>
			</div>
		)
	}
}

export default Activity
