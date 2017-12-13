import React, { PureComponent } from 'react'
import echarts from 'echarts'

class LineCharts extends PureComponent {
	componentDidMount() {
		const { xData, yData } = this.props.data
		const myChart = echarts.init(this.chart)

		var option = {
			tooltip: {
				trigger: 'axis',
				formatter: function(params, ticket, callback) {
					return params[0].data
				},
				backgroundColor: 'rgba(255, 16, 40, .6)',
				padding: [window.remBase * 0.1, window.remBase * 0.3],
				textStyle: {
					color: '#fff',
					fontSize: window.remBase * 0.3
				}
			},
			grid: {
				x: 50, //默认是80px
				y: 20, //默认是60px
				x2: 0, //默认80px
				y2: 30 //默认60px
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				offset: 10,
				axisLine: {
					show: false,
					lineStyle: {
						color: '#8ac7fe'
					}
				},
				// 是否显示刻度
				axisTick: {
					show: false
				},
				data: xData
			},
			yAxis: {
				type: 'value',
				offset: 20,
				boundaryGap: [0, '100%'],
				axisLine: {
					show: false,
					lineStyle: {
						color: '#8ac7fe'
					}
				},
				// 是否显示刻度
				axisTick: {
					show: false
				},
				// Y 轴刻度线样式设置
				splitLine: {
					lineStyle: {
						color: ['#3b598f'],
						type: 'dashed'
					}
				}
			},
			series: [
				{
					type: 'line',
					sampling: 'average',
					itemStyle: {
						normal: {
							color: '#aba3f6' // 线条的颜色
						}
					},
					lineStyle: {
						normal: {
							color: '#aba3f6' // 这个颜色会覆盖上面的线条的颜色
						}
					},
					areaStyle: {
						// 面积的颜色
						normal: {
							color: new echarts.graphic.LinearGradient(
								0,
								0,
								0,
								1,
								[
									{
										offset: 0,
										color: 'rgba(72, 67, 171, .8)'
									},
									{
										offset: 1,
										color: '#1d1f67'
									}
								]
							)
						}
					},
					data: yData
				}
			]
		}
		myChart.setOption(option)
	}

	render() {
		return (
			<div
				id="line-charts"
				ref={el => (this.chart = el)}
				className={this.props.className}
				style={{
					position: 'relative',
					zIndex: 10000
				}}
			/>
		)
	}
}

export default LineCharts
