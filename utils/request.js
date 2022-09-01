import store from '../store'

const request = ({
	url,
	data,
	method
}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `https://api.imooc-blog.lgdsunday.club/api${url}`,
			data,
			method,
			header: {
				icode: '15073159E12179FF',
				Authorization: store.state.user.token
			},

			success: ({
				data
			}) => {
				if (data.success) {
					resolve(data)
				} else {
					uni.showToast({
						title: data.message,
						icon: 'none',
						mask: true,
						duration: 3000
					})
					reject(data.message)
				}
			},

			fail: (error) => {
				reject(error)
			},
			complete: () => {
				//关闭加载框
				uni.hideLoading()
			}
		})
	})
}

export default request
