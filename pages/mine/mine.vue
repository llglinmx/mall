<template>
	<view class="mine">
		<view class="mine-head"  @click="LiveClick">
			<Title title="我的"></Title>
		</view>
		<view class="mine-content">
			<view class="mine-content-info">
				<view class="mine-info-wrap" v-if="isCanUse">
					<view class="mine-info-img">
						<image :src="avatarUrl" mode=""></image>
					</view>
					<view class="mine-info-box">
						<view class="mine-info-name">
							{{nickName}}
						</view>
						<view class="mine-info-tel">
							<button v-if="!loginInfo.mobile" type="primary" size="mini" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">绑定手机号</button>
							<text v-else>{{loginInfo.mobile}}</text>
						</view>
					</view>
				</view>
				<view class="mine-info-wrap" v-else>
					<view class="mine-info-img">
						<image src="../../static/images/user-img.png" mode=""></image>
					</view>
					<view class="mine-info-box">
						<!-- <button open-type="getUserInfo" bindgetuserinfo="getUserInfo">授权登录</button> -->
						<!-- <button open-type='getUserInfo' @click="Login">获取授权</button> -->
						<view class="min-info-login" @click="LoginClick">登录注册</view>
					</view>
				</view>
			</view>
			<view class="mine-order">
				<view style="margin: 62rpx 0 41rpx; ">
					<order-title Title='我的订单'></order-title>
				</view>
				<order-tab :options='options' @TabClick="ClickBtn"></order-tab>
			</view>
			<view class="min-box-list">
				<view style="margin: 62rpx 0 21rpx; ">
					<order-title Title='我的服务'></order-title>
				</view>
				<mine-list :MenuList='MenuList' @TabClick="TabBtn"></mine-list>
			</view>

		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warn" content="你确定要退出吗？" title="警告" :duration="2000" :before-close="false" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="ServicePopup" type="dialog">
			<service-popup type="warn" content="是否要进入人工客服咨询？" title="提示" :duration="2000" :before-close="false" @confirm="ServiceConfirm"></service-popup>
		</uni-popup>
	</view>
</template>

<script>
	import {
		request
	} from "../../static/js/ajax.js"
	import Title from "../../components/title/title.vue"
	import OrderTab from '../../components/ordar-tab/order-tab.vue'
	import OrderTitle from '../../components/order-title/order-title.vue'
	import MineList from '../../components/min-list/min-list.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import ServicePopup from '@/components/service-popup/service-popup.vue'

	export default {
		data() {
			return {
				isCanUse: false,
				nickName: '', //用户名
				avatarUrl: '', // 用户头像
				loginInfo: {},
				shoppingList: [],
				shoppNums: 0,
				options: [{
						name: "待付款",
						ico: '../../static/images/tobepaid.png',
						num: 0
					},
					{
						name: "待发货",
						ico: '../../static/images/deliver.png',
						num: 0,
					},
					{
						name: "待收货",
						ico: '../../static/images/delivery.png',
						num: 0,
					},
					{
						name: "全部订单",
						ico: '../../static/images/order-ico.png',
						num: 0
					}
				],
				MenuList: [{
						name: '分销系统',
						ico: '../../static/images/team-ico.png'
					}, {
						name: '优惠券',
						ico: '../../static/images/coupon.png'
					},
					{
						name: '我的收藏',
						ico: '../../static/images/mine-store-ico.png'
					},
					{
						name: '收货地址',
						ico: '../../static/images/address-ico.png'
					},
					{
						name: '客服',
						ico: '../../static/images/cust-ico.png'
					},
					{
						name: '退出',
						ico: '../../static/images/out-ico.png'
					},
				],
				UserInfo: {},
				isLogin: false,


			}
		},
		components: {
			Title,
			OrderTab,
			OrderTitle,
			MineList,
			uniPopup,
			uniPopupDialog,
			ServicePopup
		},
		onLoad() {
			let that = this
		},
		onShow() {
			this.isCanUse = uni.getStorageSync("isCanUse")
			this.nickName = uni.getStorageSync("nickName")
			this.avatarUrl = uni.getStorageSync("avatarUrl")



			this.loginInfo = uni.getStorageSync("loginInfo")
			if (Boolean(this.loginInfo)) {
				this.loginInfo = JSON.parse(this.loginInfo)
			}

			this.getShoppingList()
			this.GetOrder();
		},
		methods: {
			// 获取手机号
			getPhoneNumber: function(e) {
				let that = this
				uni.login({
					provider: 'weixin',
					success: (ress) => {
						let data = {
							code: ress.code, //临时登陆凭证
							encryptedData: e.detail.encryptedData, //微信登录接口返回的 加密用户信息	query	true	
							iv: e.detail.iv, //微信登录接口返回的加密偏移数据
							token: uni.getStorageSync("token")
						}
						request({
							url: '/user/wxapp/bindMobile',
							method: 'POST',
							data: data
						}).then(res => {
							if (res.statusCode == 200) {
								if (res.data.code == 0) {
									that.Login()
								} else if (res.data.code == 700) {

								}
							} else {}

						})
					}
				})
			},

			// 发货 待收货 等按钮点击
			ClickBtn(e) {
				// uni.showToast({
				// 	title: e,
				// 	icon: "none"
				// })
				switch (e) {
					case "待付款":
						uni.navigateTo({
							url: "../../pagesA/order/order?id=1"
						})
						break;
					case "待发货":
						uni.navigateTo({
							url: "../../pagesA/order/order?id=2"
						})
						break;
					case "待收货":
						uni.navigateTo({
							url: "../../pagesA/order/order?id=3"
						})
						break;
					case "全部订单":
						uni.navigateTo({
							url: "../../pagesA/order/order?id=0"
						})
						break;
				}

				// console.log(e)
			},

			// 服务菜单列表
			TabBtn(e) {
				var token = uni.getStorageSync("token")
				switch (e) {
					case "分销系统":
						// 判断是否登录
						if (!!token) {
							uni.navigateTo({
								url: "../../pagesC/ExtendHome/ExtendHome"
							})
						} else {
							uni.showModal({
								title: "提示信息",
								content: "你还未登录，请先登录",
								success: (res) => {
									if (res.confirm) {
										uni.navigateTo({
											url: "../../pagesA/login/login"
										})
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						}

						break;
					case "我的收藏":
						uni.navigateTo({
							url: "../../pagesA/shopping-collect/shopping-collect"
						})
						break;
					case "收货地址":
						uni.navigateTo({
							url: "../../pagesA/address-list/address-list?isId=1"
						})
						break;
					case "优惠券":
						uni.navigateTo({
							url: "../../pagesA/coupon-list/coupon-list"
						})
						break;
					case "客服":
						this.$refs.ServicePopup.open()
						break;
					case "退出":
						// 判断是否已经退出，已经退出 点击退出按钮弹窗提示
						if (Boolean(uni.getStorageSync("token"))) {
							this.$refs.popup.open() // 打开弹窗
						} else {
							uni.showToast({
								title: "你已经退出登录了",
								icon: "none"
							})
						}
						break;

				}

				// uni.showToast({
				// 	title: e,
				// 	icon: "none"
				// })
			},

			// 点击进入直播间列表
			LiveClick() {
				// uni.navigateTo({
				// 	url:"../../pagesB/live/live"
				// })
			},

			// 登录
			LoginClick() {
				let that = this
				uni.navigateTo({
					url: "../../pagesA/login/login"
				})
			},


			// 退出确认事件
			confirm(done, value) {
				uni.removeStorageSync("isCanUse")
				uni.removeStorageSync("nickName")
				uni.removeStorageSync("avatarUrl")
				uni.removeStorageSync("token")
				uni.removeStorageSync("userId")
				this.isCanUse = false
				this.getShoppingList()

				this.options.forEach(item => {
					item.num = 0
				})


				done() // 关闭弹出层
			},

			// 进入客服页面确认事件
			ServiceConfirm(done, value) {
				setTimeout(() => {
					done()
				}, 500)
			},


			// 读取购物车数据
			getShoppingList() {
				this.shoppNums = 0
				let data = {
					token: uni.getStorageSync("token")
				}
				request({
					url: '/shopping-cart/info',
					method: 'GET',
					data: data
				}).then(res => {
					if (res.statusCode = 200) {
						if (res.data.code == 0) {
							this.shoppingList = []
							// 往对象之中添加一条新的数据
							res.data.data.items.map((item, index) => {
								this.shoppingList.push(Object.assign({}, item, {
									right: 0,
									isCheck: false
								}))
							})
							// 存储购物车数据
							uni.setStorage({
								key: 'ShoppingList',
								data: JSON.stringify(this.shoppingList),
							});
							this.shoppNums = res.data.data.items.length
							uni.setStorageSync("shoppingNum", this.shoppNums)

						} else if (res.data.code == 700) {
							this.shoppNums = 0
						}
					}
					// 设置购物车气泡数量
					if (this.shoppNums != 0) {
						uni.setTabBarBadge({
							index: 2,
							text: "" + this.shoppNums + "",
							success: (res) => {}
						})
					} else {
						uni.removeTabBarBadge({
							index: 2
						})
					}
				})
			},


			// 登录方法
			Login() {
				let that = this
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						request({
							url: '/user/wxapp/login',
							method: 'POST',
							data: {
								code: loginRes.code,
								type: 2,
								autoReg: true
							}
						}).then(ress => {
							if (ress.statusCode == 200) {
								if (ress.data.code == 0) {
									uni.setStorageSync("loginInfo", JSON.stringify(ress.data.data))
									uni.setStorageSync("token", ress.data.data.token)
									that.loginInfo = ress.data.data
									console.log('个人信息', that.loginInfo)
								} else {}
							}
						})
					}
				});
			},



			// 获取订单列表
			GetOrder() {
				var that = this
				var data = {
					// status: 0,
					token: uni.getStorageSync("token")
				}
				request({
					url: '/order/list',
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						this.isLoad = true
						if (res.data.code == 0) {
							let arr1 = [];
							let arr2 = [];
							let arr3 = [];
							// 先请空原来的数量  拿到最新的值
							this.options.forEach(item => {
								item.num = 0
							})
							// 循环拿到对应的状态
							res.data.data.orderList.forEach(item => {
								// 0 待付款
								switch (item.status) {
									case 0:
										arr1.push(item);
										this.options[0].num = arr1.length;
										break;
									case 1:
										arr2.push(item);
										this.options[1].num = arr2.length;
										break;
									case 2:
										arr3.push(item);
										this.options[2].num = arr3.length;
										break;
									default:
										// this.options.forEach(item => {
										// 	item.num = 0
										// })
										break
								}

							})

						} else {
							this.options[0].num = 0
							this.options[1].num = 0
							this.options[2].num = 0
						}
					} else {}

				})

			},
		}

	}
</script>

<style lang="scss">
	.mine {
		display: flex;
		flex-direction: column;
		height: 100%;

		// background: #eee;
		.mine-content {
			flex: 1;
			overflow-y: scroll;
			width: 100%;

			.mine-content-info {
				width: 100%;
				height: 253rpx;
				margin-top: -1px;
				background: url(../../static/images/mine-ico.png);
				background-size: contain;

				.mine-info-wrap {
					width: 100%;
					display: flex;
					align-items: center;
					padding: 38rpx 60rpx 0;
					box-sizing: border-box;

					.mine-info-img {
						width: 120rpx;
						height: 120rpx;
						background: rgba(2, 2, 4, 1);
						// border: 2px solid rgba(255, 255, 255, 1);
						border-radius: 50%;

						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}

					.mine-info-box {
						flex: 1;
						margin-left: 40rpx;
						color: #fff;

						.mine-info-name {
							font-size: 32rpx;
						}

						.mine-info-tel {
							width: 144rpx;
							margin-top: 16rpx;
							font-size: 24rpx;

							button {
								width: 100%;
								display: flex;
								align-items: center;
								justify-content: center;

								height: 40rpx;
								background: rgba(0, 0, 0, 0.2);
								border: 0.5px solid rgba(255, 255, 255, 0.2);
								padding: 0;
								// opacity:0.2;
								border-radius: 20rpx;
								font-size: 20rpx;
							}
						}

						.min-info-login {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 180rpx;
							height: 64rpx;
							border: 1rpx solid #fff;
							border-radius: 32rpx;
							font-size: 24rpx;
							color: #F7F7F7;
						}
					}
				}

			}

			.mine-order {
				padding: 0 32rpx;
				box-sizing: border-box;
			}

			.min-box-list {
				padding: 0 32rpx;
				box-sizing: border-box;
			}
		}
	}
</style>
