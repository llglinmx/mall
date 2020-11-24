<template>
	<view class="code-box">
		<view class="code-box-head">
			<Title title="推广二维码" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="code-box-content">
			<view class="code-box-bill">
				<canvas class="canvas" canvas-id="firstCanvas"></canvas>

			</view>
			<view class="code-box-btn">
				<button type="primary" open-type="share" style="background: #526D9E;margin-right: 58rpx;">转发</button>
				<button type="primary"  style="background: #324B78;" @click="KeepImg" v-if="saveImgBtnHidden">保存到相册</button>
				<button type='primary' style="background: #324B78;" open-type="openSetting" @opensetting='handleSetting' v-else>立即授权</button>
			</view>
		</view>

	</view>
</template>

<script>
	import ImageUtil from "../../static/js/images.js"
	import Title from "../../components/title/title.vue"
	import {
		request
	} from "../../static/js/ajax.js"
	export default {
		data() {
			return {
				canvasHeight: 0,
				systemWidth: 0,
				systemHeight: 0,
				saveImgBtnHidden: true
			}
		},
		components: {
			Title,
		},
		onLoad() {
			this.getCode()
			this.SystemInfo()

			uni.showLoading({
				title: '推广图生成中...',
				mask: true
			});

		},
		methods: {
			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			getCode() {

				var data = {
					scene: Number(wx.getStorageSync('userId')),
					// scene: user,
					page: 'pages/index/index',
					is_hyaline: true,
					autoColor: true,
					expireHours: 1,
				}
				request({
					url: '/qrcode/wxa/unlimit',
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode = 200) {
						if (res.data.code == 0) {
							this.showCanvas(res.data.data)
							console.log(res.data)
						} else if (res.data.code == 700) {

						}
					}
				})
			},


			// 
			showCanvas(qrcode) {
				let ctx = uni.createCanvasContext('firstCanvas')
				const bgUrl = 'https://dcdn.it120.cc/2020/07/24/bb444db7-b343-430a-b121-fd87351303e8.png'
				const qrcodeWidth = 600 * this.systemWidth / 750 // 宽
				const qrcodeHight = 1000 * this.systemHeight / 1624 // 高

				var ImgWidth = this.systemWidth /750
				var ImgHeight = this.systemHeight / 1624

				uni.getImageInfo({
					src: bgUrl,
					success: (res) => {
						console.log(res)
						ctx.drawImage(res.path, 0, 0, qrcodeWidth, qrcodeHight)
console.log(qrcode)
						uni.getImageInfo({
							src: qrcode,
							success: (res) => {
								// 隐藏加载页效果
								uni.hideLoading();

								ctx.drawImage(res.path, 120 * ImgWidth, 800 * ImgHeight, 124*ImgWidth , 124*ImgWidth)
								ctx.setFontSize(12) //文字大小
								ctx.fillText(uni.getStorageSync("nickName"), 276 * ImgWidth, 850 *ImgHeight ) //文字后跟的参数为文字启示坐标
								// ctx.fillText("安稳也随性", 276 * ImgWidth, 850 *ImgHeight ) //文字后跟的参数为文字启示坐标
								ctx.fillText("邀请您加入逗芙商城", 276 * ImgWidth, 900 *ImgHeight ) //文字后跟的参数为文字启示坐标
								ctx.draw()
							},
							fail: (err) => {
								console.log("第二个画图失败了")
							}
						})

					},
					fail: (err) => {
						console.log("第一个画图失败了")
					}
				})


			},
			// 获取手机设备信息
			SystemInfo() {
				uni.getSystemInfo({
					success: (res) => {
						this.systemWidth = res.windowWidth
						this.systemHeight = res.windowHeight
					}
				})
			},
			// 点击保存图片按钮
			KeepImg() {
				var that = this;
				//获取相册授权
				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.authorize({
								scope: 'scope.writePhotosAlbum',
								success() { //这里是用户同意授权后的回调
									that.savaImageToPhoto();
								},
								fail() { //这里是用户拒绝授权后的回调
									that.saveImgBtnHidden = false
								}
							})
						} else { //用户已经授权过了
							that.savaImageToPhoto();
						}
					}
				})
			},

			// 保存图片
			savaImageToPhoto() {
				uni.showLoading({
					title: '推广图保存中',
					mask: true
				});
				uni.canvasToTempFilePath({
					canvasId: 'firstCanvas',
					success: function(res) {
						let tempFilePath = res.tempFilePath
						uni.saveImageToPhotosAlbum({
							filePath: tempFilePath,
							success: (res) => {
								// 隐藏加载页效果
								uni.hideLoading();

								uni.showModal({
									content: '二维码已保存到手机相册',
									showCancel: false,
									confirmText: '知道了',
									confirmColor: '#666'
								})
							},
							fail: (res) => {
								uni.showToast({
									title: res.errMsg,
									icon: 'none',
									duration: 2000
								})
							}
						})
					}
				})
			},

			// 重新拉取授权
			handleSetting: function(e) {
				let that = this;
				// 对用户的设置进行判断，如果没有授权，即使用户返回到保存页面，显示的也是“去授权”按钮；同意授权之后才显示保存按钮
				if (!e.detail.authSetting['scope.writePhotosAlbum']) {
					wx.showModal({
						title: '警告',
						content: '若不打开授权，则无法将图片保存在相册中！',
						showCancel: false
					})
					this.saveImgBtnHidden = false;
				} else {
					wx.showModal({
						title: '提示',
						content: '您已授权，赶紧将推广码保存在相册中吧！',
						showCancel: false
					})
					this.saveImgBtnHidden = true
				}
			},
		},
		onShareAppMessage() {
			return {
				title: '小程序商城转发',
				path: '/pages/index/index?scene=' + uni.getStorageSync('userId'),
				imageUrl: "https://dcdn.it120.cc/2020/07/22/3b0b8340-c4a1-4bb1-84ed-47c9d99c0707.png",
				success: function(res) {
					console.log(res)
					console.log("转发成功")
					// 转发成功
				},
				fail: function(res) {
					// 转发失败
					console.log("转发失败")
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.code-box {
		display: flex;
		flex-direction: column;
		height: 100%;

		.code-box-head {}

		.code-box-content {
			padding-top: 80rpx;
			flex: 1;

			.code-box-bill {
				width: 600rpx;
				height: 1000rpx;
				margin: auto;
				box-shadow: 0 0 7.5px 0.5px #e0e0e0;

				.canvas {
					height: 100%;
					width: 100%;
				}
				
			}
			
			.code-box-btn{
				margin-top: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				button{
					width: 200rpx;
					height: 64rpx;
					border-radius: 32rpx;
					margin: 0;
					font-size: 24rpx;
					color: #fff;
				}
			}
		}

	}
</style>
