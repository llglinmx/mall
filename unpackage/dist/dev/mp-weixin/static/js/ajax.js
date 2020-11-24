// 记录调用 request 方法的次数
let ajaxTimes = 0

// 请求地址的基本路径
// const baseUrl = 'https://api.it120.cc/llg'
const baseUrl = 'https://api.it120.cc/doufu'
var Timer = null

function request(params) {
	// 每次调用 request 方法时，将 ajaxTimes 计数器自增一
	ajaxTimes++
	// 显示加载数据的提示
	// Timer = setTimeout(() => {
		// uni.showLoading({
		// 	title: '加载中...',
		// 	mask: true
		// })
	// }, 0)
	return new Promise(function(resolve, reject) {
		uni.request({
			...params,
			url: baseUrl + params.url,
			method: params.method,
			timeout: '10000',
			data: params.data,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			},
			complete() {
				// console.log(Timer)
				// clearTimeout(Timer)
				// 每当完成一个请求，让 ajaxTimes 计数器自减一
				ajaxTimes--

				if (ajaxTimes === 0) {
					// 停止加载数据的提示
					
					// uni.hideLoading()
				}
			}
		})
	})
}


export {
	request
}
