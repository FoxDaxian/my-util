import svgJs from 'svg.js'

// new一个就是一个新的svg
class Svg {
	constructor(id, w, h) {
		this.id = id
		this.svg = svgJs(id).size(w, h)
	}

	/**
	 * 创造一段圆弧
	 * @param  {Number} Mx  		 起始点X坐标
	 * @param  {Number} My  		 起始点Y坐标
	 * @param  {Number} Axr 		 圆弧x半径
	 * @param  {Number} Ayr 		 圆弧y半径
	 * @param  {Number} Ax  		 圆弧X终点
	 * @param  {Number} Ay  		 圆弧Y终点
	 * @param  {String} stroke       线条颜色
	 * @param  {Number} strokeWidth  线条粗细
	 * @param  {String} fill         填充色
	 * @param  {Number} dir         顺时针(1)还是逆时针(0)
	 * @return {undefined}     undefined
	 */
	createArc({
		Mx,
		My,
		Axr,
		Ayr,
		Ax,
		Ay,
		stroke,
		strokeWidth,
		fill = 'transparent',
		dir = 0
	}) {
		return this.svg
			.path(`M${Mx} ${My} A${Axr} ${Ayr} 0 0 ${dir} ${Ax} ${Ay}`)
			.attr({
				stroke,
				fill,
				'stroke-width': strokeWidth
			})
	}

	renderEllipse(deg) {
		const y = Math.sin(deg * Math.PI / 180) * window.remBase * 2.1
		const x = Math.cos(deg * Math.PI / 180) * window.remBase * 2.1

		this.svg
			.ellipse(5, 10)
			.attr({
				fill: '#34c1e4'
			})
			.move(window.remBase * 2.25 - x, window.remBase * 2.2 - y)
			.rotate(deg - 90)
	}

	/**
	 * 画点点点
	 * @param  {Number}   sumDeg   需要走的总度数
	 * @param  {Date}   dur        总时间
	 * @param  {Number}   startDeg 开始的度数
	 * @param  {String}   dir      条件
	 * @return {Undefined}          无
	 */
	// 根据半径求x、y坐标
	svgMeet(dir, durTime) {
		const dur = durTime
		const step = -5
		const sumDeg = 180
		let endDeg, startDeg
		// 负数比正数运算慢，好像是这样的，因为二进制左边起第一个表示正负数，负数多做了这一步，数量一多就会慢
		// 所以说可以先用正数运算，然后加个符号，这样算法更快
		if (dir === 'left') {
			startDeg = -270
			endDeg = -450
		} else if (dir === 'right') {
			startDeg = -90
			endDeg = -270
		} else {
			throw new Error('请传入正确的参数')
		}
		let animateFrame = null

		const foo = () => {
			const curTime = new Date()
			// 时间差值
			const timeDiff = curTime - startTime
			// 等于1则达到指定的时间，事件结束
			const ratio = timeDiff / dur
			// 获取当前时间对应的弧度
			const radian = Math.floor(sumDeg * timeDiff / dur)

			if (ratio >= 1) {
				cancelAnimationFrame(animateFrame)
				return
			} else {
				if ((startDeg - radian) % 5 >= -1.4) {
					if (startDeg !== endDeg) {
						this.renderEllipse(startDeg)
						startDeg > endDeg && (startDeg += step)
					}
				}
			}
			animateFrame = requestAnimationFrame(foo)
		}
		const startTime = new Date()
		animateFrame = requestAnimationFrame(foo)
	}
}

export default Svg
