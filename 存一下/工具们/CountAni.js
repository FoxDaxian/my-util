import CountUp from 'countup.js'


class CountAni{
	constructor (el, start, end, dur, options = {}) {
		this.numAni = new CountUp(el, start, end, 0, dur, options)
	}

	async init () {
		return new Promise((resolve, reject) => {
			if (!this.numAni.error) {
				this.numAni.start(() => {
					resolve('完成')
				})
			} else {
				console.error(this.numAni.error)
				reject(this.numAni.error)
			}
		})
	}
}

export default CountAni
