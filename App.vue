<script>
	import {
		request
	} from './static/js/ajax.js'
	export default {
		// token: this.$components.token == '' ? '757cff80-f033-4d82-a4d8-84ca928e4279' : this.$components.token
		
		
		onLaunch: function() {
			console.log('App Launch')
			// let that = this
			// uni.getProvider({
			// 	service: 'oauth',
			// 	success: function(res) {
			// 		console.log(res)
			// 		if (~res.provider.indexOf('weixin')) {
			// 			uni.login({
			// 				provider: 'weixin',
			// 				success: function(loginRes) {
			// 					console.log(loginRes.code)
			// 					request({
			// 						url: '/user/wxapp/login',
			// 						method: 'POST',
			// 						data: {
			// 							code: loginRes.code,
			// 							type: 2
			// 						}
			// 					}).then(ress => {
			// 						if (ress.statusCode == 200) {
			// 							console.log(that.$components.token = ress.data.data.token)
			// 							console.log(ress.data.data.token)
			// 						}
			// 					})
			// 				}
			// 			});
			// 		}
			// 	}
			// });

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
	}
</script>

<style>
	::-webkit-scrollbar {  
	    display: none;  
	    width: 0 !important;  
	    height: 0 !important;  
	    -webkit-appearance: none;  
	    background: transparent;  
	}
	.mescroll-wxs-content{
		height: 100%;
	}
	uni-tabbar, uni-tabbar .uni-tabbar{
		z-index: 1;
	}
	.wscnph{
		width: 750rpx;
	}
	
	/*每个页面公共css */
	.flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	page {
		height: 100%;
		/* background: #fff; */
		font-family:PingFang SC;
	}

	/* .uni-dialog-content {
		padding: 25px 15px 25px 15px !important;
		
	} */
	.uni-dialog-content-text {
		font-size: 32rpx !important;
	}

	uni-page-body,
	uni-page-refresh {
		height: 100%;
		/* background: #fff; */
		font-family:PingFang SC;
	}
	
	uni-tabbar .uni-tabbar__icon {
	    position: relative;
	    display: inline-block;
	    margin-top: 5px;
	    width: 20px;
	    height: 20px;
	}
	
</style>
