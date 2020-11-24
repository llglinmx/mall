<template>
	<view class="address-page-box">
		<view class="address-page-head">
			<Title title="定位地址" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="address-page-conten">
			<view class="address-current-box">
				<view class="address-current-li-head">
					当前位置
				</view>
				<view class="address-current-li-bottom">
					<view class="address-current-li-title">
						<text>{{addressName}}</text>
						<!-- <text>正在定位</text> -->
					</view>
					<view class="address-current-li-ico" @click="getLocation">
						<image src="../../static/images/addressIco.png" mode=""></image>
						<text>重新定位</text>
					</view>
				</view>
			</view>
			<view class="address-page-box-list">
				<view class="address-page-list-title">
					我的收货地址
				</view>
				<view class="add-address-box-list" :class="{'address-page-list-auto':isFlag}" v-if="addressList.length!=0">
					<view class="address-page-list-li" v-for="(item,index) in addressList" :key="index">
						<view class="address-page-list-top">
							<view class="address-title-page">
								{{item.address}}
							</view>
							<view class="address-default-page" v-if="item.isDefault">
								默认
							</view>
						</view>
						<view class="address-page-bottom">
							<text>{{item.linkMan}}</text>
							<text class="address-page-bottom-tel">{{item.mobile}}</text>
						</view>
					</view>
				</view>

				<view class="address-page-bottom-info" @click="ClickOpen">
					<text>{{msg}}</text>
					<image src="../../static/images/xjt-blue.png" mode="" :class="{'img-rotate':isFlag}"></image>
				</view>
			</view>
		</view>
		<view class="address-box-footer">
			<add-btn @footbtn="AddressBtn" BtnName="新增收货地址"></add-btn>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from '../../static/js/ajax.js'
	import Title from "../../components/title/title.vue"
	import AddBtn from "../../components/footer-btn/foot-btn.vue"
	export default {
		data() {
			return {
				addressName: "请定位地址",
				addressList: [],
				isAddress: false,
				isFlag: false,
				msg: '展开更多地址'
			}
		},
		components: {
			Title,
			AddBtn
		},
		onLoad() {
			this.getLocation()
		},
		onShow() {
			this.getAddressList()
		},
		methods: {
			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				})
			},

			// 获取所有收货地址
			getAddressList() {
				this.addressName = "正在定位"

				let data = {
					token: uni.getStorageSync("token")
				}
				request({
					url: '/user/shipping-address/list',
					method: 'GET',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.addressList = res.data.data.reverse()
						} else if (res.data.code == 700) {

						}
					} else {}

				})
			},




			// 点击获取位置
			getLocation() {
				let that = this
				that.addressName = "正在定位"
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						// 拿到定位城市信息
						uni.request({
							url: 'https://api.map.baidu.com/reverse_geocoding/v3',
							data: {
								ak: 'exeCMstyfw7448NeOZ5eEj33zhUdrK4P',
								output: 'json',
								coordtype: 'wgs84ll',
								location: `${res.latitude},${res.longitude}`
								// location: res.latitude + ',' + res.longitude  
							},
							success: (cityResult) => {
								let city = cityResult.data.result.addressComponent.city;
								that.addressName = cityResult.data.result.formatted_address
								console.log('当前定位城市:', city);
								
								uni.setStorageSync("CityName",city)
							},
							fail: () => {
								that.addressName = "定位失败"
							},
							complete: () => {}
						});
					},
					fail(res) {
						console.log(res)
						that.openConfirm()
					}
				})
			},
			// 再次获取授权
			openConfirm() {
				uni.showModal({
					title: '请求授权当前位置',
					content: '需要获取您的地理位置，请确认授权',
					success: (res) => {
						if (res.confirm) {
							uni.openSetting(); // 打开地图权限设置
						} else if (res.cancel) {
							uni.showToast({
								title: '你拒绝了授权，无法获取到位置信息',
								icon: 'none',
								duration: 1000
							})
						}
					}
				});
			},

			// 点击暂开收货地址
			ClickOpen() {
				this.isFlag = !this.isFlag
				if (this.isFlag) {
					this.msg = "收起全部地址"
				} else {
					this.msg = "展开全部收货地址"
				}
			},

			// 新增收货地址
			AddressBtn() {
				uni.navigateTo({
					url:"../../pagesB/add-address/add-address?id=1"
				})
			},

			appLoginWx() {
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.log(res.provider)
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log(loginRes.code)
									request({
										url: '/user/wxapp/login',
										method: 'POST',
										data: {
											code: loginRes.code,
											type: 2
										}
									}).then(ress => {
										console.log(ress)
									})
								}
							});
						}
					}
				});



				// // 微信授权登录
				// // #ifdef MP-WEIXIN
				// var that = this
				// uni.getProvider({
				// 	service: 'oauth',
				// 	success: function(res) {
				// 		if (~res.provider.indexOf('weixin')) {
				// 			uni.login({
				// 				provider: 'weixin',
				// 				success: (res) => {
				// 					that.authorization = res.code;
				// 					uni.getUserInfo({
				// 						provider: 'weixin',
				// 						success: (info) => { //这里请求接口
				// 							console.log(res);
				// 							console.log(info);

				// 						},
				// 						fail: () => {
				// 							uni.showToast({
				// 								title: "微信登录授权失败",
				// 								icon: "none"
				// 							});
				// 						}
				// 					})

				// 				},
				// 				fail: () => {
				// 					uni.showToast({
				// 						title: "微信登录授权失败",
				// 						icon: "none"
				// 					});
				// 				}
				// 			})

				// 		} else {
				// 			uni.showToast({
				// 				title: '请先安装微信或升级版本',
				// 				icon: "none"
				// 			});
				// 		}
				// 	}
				// });
				// //#endif
			},
		}
	}
</script>

<style lang="scss" scoped>
	.address-page-box {
		display: flex;
		flex-direction: column;
		height: 100%;

		.address-page-head {}

		.address-page-conten {
			flex: 1;
			background: #f2f2f2;

			.address-current-box {
				padding: 0 32rpx;
				background: #FFFFFF;


				.address-current-li-head {
					padding: 20rpx 0;
					font-size: 24rpx;
					font-weight: 400;
					color: #999;
					border-bottom: 1rpx solid #f2f2f2;
				}

				.address-current-li-bottom {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 31rpx 0;

					.address-current-li-title {
						font-size: 28rpx;
						color: #000000;
					}

					.address-current-li-ico {
						display: flex;
						align-items: center;

						image {
							width: 24rpx;
							height: 24rpx;
						}

						text {
							margin-left: 7rpx;
							font-weight: 400;
							font-size: 24rpx;
							color: #324B77;
						}
					}
				}

			}

			.address-page-box-list {

				padding: 0 32rpx;
				margin-top: 16rpx;
				background: #fff;

				.address-page-list-title {
					padding: 24rpx 0;
					font-size: 24rpx;
					color: #999;
					border-bottom: 1rpx solid #f2f2f2;
				}

				.add-address-box-list {
					// min-height: 146rpx;
					height: 292rpx;
					overflow: hidden;

					.address-page-list-li {
						padding: 32rpx 0;
						border-bottom: 1rpx solid #f2f2f2;

						.address-page-list-top {
							display: flex;
							align-items: center;

							.address-title-page {
								font-weight: 400;
								font-size: 28rpx;
								color: #000;
							}

							.address-default-page {
								display: flex;
								align-items: center;
								justify-content: center;
								margin-left: 24rpx;
								width: 64rpx;
								height: 29rpx;
								font-weight: 400;
								font-size: 18rpx;
								color: #E53947;
								border: 1rpx solid #E53947;
								border-radius: 14rpx;
							}
						}

						.address-page-bottom {
							margin-top: 10rpx;
							font-size: 24rpx;
							color: #999;
							.address-page-bottom-tel{
								margin-left: 23rpx;
							}
						}
					}
				}
			}

			.address-page-list-auto {
				height: auto !important;
			}


			.address-page-bottom-info {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 78rpx;

				text {
					font-size: 24rpx;
					color: #324B77;
				}

				image {
					width: 18rpx;
					height: 10rpx;
					margin-left: 9rpx;
					transition: 0.3s;
				}

				.img-rotate {
					transform: rotate(180deg);
				}
			}

		}
	}
</style>
