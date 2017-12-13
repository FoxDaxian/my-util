export const myAni = ({el, start, end, dur, dir = 'left'}) => {
	el.style[dir] = `${ end }px`
	const startTime = new Date()
	let animateFrame = null

	return new Promise((resolve, reject) => {
		const foo = () => {
			const curTime = new Date()
			// 时间差值
			const timeDiff = curTime - startTime
			// 等于1则达到指定的时间，事件结束
			let ratio = timeDiff / dur
			animateFrame = requestAnimationFrame(foo)

			if (ratio >= 1) {
				ratio = 1
				el.style[dir] = `${ end - ratio * end }px`
				cancelAnimationFrame(animateFrame)
				resolve()
			} else {
				el.style[dir] = `${ end - ratio * end }px`
			}
		}
		animateFrame = requestAnimationFrame(foo)
	})
}
