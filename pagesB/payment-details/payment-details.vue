<template>
	<view class="order-details-box">
		<view class="order-details-box-head">
			<Title title="订单详情" :isGBack="true" @GBack="GBack"></Title>
		</view>

		<view class="order-details-box-content">
			<view class="order-details-wrap">
				<view class="order-details-top">
					<view class="order-details-top-ico">
						<image src="../../static/images/order-details-1.png" mode=""></image>
					</view>
					<view class="order-details-top-box">
						<view class="order-top-box-title">
							等待付款
						</view>
						<view class="order-top-box-text">
							<text v-if="timeData!=''">距离订单关闭还有：{{timeData}}</text>
							<text v-else>订单已关闭</text>
						</view>
					</view>
					<view class="order-details-top-right">
						<!-- 订单取消 -->
					</view>
				</view>
				<view class="order-details-address">
					<view class="order-content-address" @click="CheckAddress">
						<view class="order-address-ico">
							<image src="../../static/images/address-ico.png" mode=""></image>
						</view>
						<view class="order-address-info">
							<view class="order-info-top">
								<view class="order-info-top-name">{{AddressInfo.linkMan}}</view>
								<view class="order-info-top-tel">{{AddressInfo.mobile}}</view>
							</view>
							<view class="order-info-bottom">{{AddressInfo.provinceStr}}-{{AddressInfo.cityStr}}-{{AddressInfo.areaStr}}-{{AddressInfo.address}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="order-details-list">
				<detalis-list :GoodsList="GoodsList"></detalis-list>
				<view class="order-details-info-list">
					<view class="order-details-info-li">
						<view class="order-info-li-title">商品总价</view>
						<view class="order-info-li-text">￥{{orderInfo.amount+orderInfo.amountCoupons |PriceTow}}</view>
					</view>
					<view class="order-details-info-li">
						<view class="order-info-li-title">邮费</view>
						<view class="order-info-li-text">+￥{{orderInfo.amountLogistics|PriceTow}}</view>
					</view>
					<view class="order-details-info-li" v-if="FullMinusPrice!=0">
						<view class="order-info-li-title">满减优惠</view>
						<view class="order-info-li-title" v-if="orderInfo.amountReal>=FullMinusPrice">
							<text>满{{FullMinusPrice|PriceTow}}元减{{ReducePrice|PriceTow}}元</text>
						</view>
						<view class="order-info-li-text" v-else>暂无满减</view>
					</view>
					<view class="order-details-info-li">
						<view class="order-info-li-title">优惠券</view>
						<view class="order-info-li-text">-￥{{orderInfo.amountCoupons|PriceTow}}</view>
					</view>
					<view class="order-details-info-li" style="color: #E53948;">
						<view class="order-info-li-title">实付金额</view>
						<view class="order-info-li-text" style="font-size:20rpx">￥<text style="font-size:32rpx">{{orderInfo.amountReal|PriceTow}}</text></view>
					</view>
				</view>
				<view class="order-details-info-list">
					<view class="order-details-info-li" v-if="orderInfo.remark!=''">
						<view class="order-info-li-title">订单备注</view>
						<view class="order-info-li-text">{{orderInfo.remark}}</view>
					</view>
					<view class="order-details-info-li">
						<view class="order-info-li-title">订单编号</view>
						<view class="order-info-li-text">{{orderInfo.orderNumber}}</view>
					</view>
					<view class="order-details-info-li">
						<view class="order-info-li-title">创建时间</view>
						<view class="order-info-li-text">{{orderInfo.dateAdd}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="order-details-footer" :class="{'statusBarHeight':isBarHeight}">
			<view class="order-details-foot-btn order-box-btn3" @click="ClickBtn(0)">
				取消订单
			</view>
			<view class="order-details-foot-btn order-box-btn1" @click="ClickBtn(1)">
				立即付款
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warn" content="你确定要删除此订单吗？" title="警告" :duration="2000" :before-close="false" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {
		request
	} from "../../static/js/ajax.js"
	import Title from "../../components/title/title.vue"
	import DetalisList from "../../components/details-list/details-list.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		data() {
			return {
				GoodsList: [],
				orderInfo: '',
				timeData: 0, //存放每条数据的处理好的倒计时
				timer: '', //用来清除定时器
				AddressInfo: {},
				isBarHeight: false,
				FullMinusPrice: 0, //满减价格
				ReducePrice: 0, // 满减优惠
			}
		},
		components: {
			Title,
			DetalisList,
			uniPopup,
			uniPopupDialog,
		},
		// 过滤器
		filters: {
			// 价格保留两位
			PriceTow(value) {
				let val = !value ? 0 : value
				return val.toFixed(2)
			},
		},
		onLoad(options) {
			this.getDetails(options.id)
			this.SystemInfo()
			this.FullMinusSet()
		},
		onUnload() {
			clearInterval(this.timer)
		},
		methods: {
			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 获取手机设备信息
			SystemInfo() {
				uni.getSystemInfo({
					success: (res) => {
						if (res.statusBarHeight == 44) {
							this.isBarHeight = true
						}
					}
				})
			},

			// 订单取消  立即支付按钮
			ClickBtn(type) {
				switch (type) {
					case 0: // 取消订单按钮
						this.$refs.popup.open() // 打开弹窗
						break;
					case 1: // 立即支付按钮
						uni.showLoading({
							title: '订单支付中',
							mask: true
						});
						// 调用支付接口  参数(金额，订单id)
						this.RequestPay(this.orderInfo.amountReal, this.orderInfo.id)
						break;
				}
			},
			// 订单确认删除事件
			confirm(done, value) {
				let data = {
					orderId: this.orderInfo.id,
					token: uni.getStorageSync("token")
				}
				//删除订单接口
				request({
					url: '/order/close',
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							// 删除成功返回全部订单列表
							uni.redirectTo({
								url: "../../pagesA/order/order?id=3"
							});
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					} else {}
				})
				done()
			},


			// 请求支付
			RequestPay(price, id) {
				var str = {
					type: 0,
					id: id
				}
				var data = {
					money: price,
					payName: '订单支付',
					nextAction: JSON.stringify(str),
					token: uni.getStorageSync("token")
				}
				request({
					url: '/pay/wx/wxapp',
					method: 'POST',
					data: data
				}).then(res => {
					// 隐藏加载页效果
					uni.hideLoading();
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							// 调用支付接口
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res.data.data.timeStamp,
								nonceStr: res.data.data.nonceStr,
								package: res.data.data.package,
								signType: res.data.data.signType,
								paySign: res.data.data.paySign,
								success: (ress) => {
									//跳转支付成功页面
									uni.redirectTo({
										url: '../../pagesB/pay-success/pay-success?data=' + JSON.stringify(this.orderInfo)+'&price='+price
									});
									console.log('success:' + JSON.stringify(ress));
								},
								fail: (err) => {
									// uni.redirectTo({
									// url: '../../pagesB/payment-details/payment-details?id=' + JSON.stringify(this.orderInfo.id)
									// });
									console.log('fail:' + JSON.stringify(err));
								}
							});
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					} else {}
				})
			},

			// 获取满减
			FullMinusSet() {
				request({
					url: '/payBill/discounts',
					method: 'GET',
					data: {
						token: uni.getStorageSync("token")
					}
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.FullMinusPrice = res.data.data[0].consume // 满减价格
							this.ReducePrice = res.data.data[0].discounts // 满减优惠价格
						} else if (res.data.code == 700) {
							this.FullMinusPrice = 0
						}
					} else {}
				})
			},
			// 获取订单详情
			getDetails(skid) {
				var that = this
				// 获取订单详情数据
				var data = {
					id: skid,
					token: uni.getStorageSync("token")
				}
				request({
					url: '/order/detail',
					method: 'GET',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.GoodsList = res.data.data.goods
							this.orderInfo = res.data.data.orderInfo
							this.AddressInfo = res.data.data.logistics
							this.getTimeList(res.data.data.orderInfo.dateClose)
							var timer = setInterval(function() {
								that.getTimeList(res.data.data.orderInfo.dateClose)
							}, 1000)
							this.timer = timer

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					} else {}

				})
			},



			// 时间换算
			getTimeList(item) {
				let that = this
				var nowdate = new Date().getTime() //获取当前时间毫秒数
				var time = item.replace(new RegExp("-", "gm"), "/") //ios不能识别日期格式中的 "-" ； .productExpiredTime是接口返回的名称
				var time = time.split('.')[0] //此处是因为我们接口返回的时间格式是这样："2019-12-31 11:00:00.0"
				var enddate = new Date(time).getTime() //处理好格式之后获取结束时间的毫秒数
				var totaltime = enddate - nowdate //获取时间差
				that.totaltime(totaltime) //这是下面封装的方法，将毫秒数处理成"xx时xx分xx秒"
			},

			totaltime(a) { //计算单个剩余时间
				let totaltime = a
				let that = this
				var h, m, s, d

				function test(num) {
					if (num < 10) {
						num = "0" + num
					}
					return num
				}

				if (totaltime > 0) {
					d = Math.floor(totaltime / 1000 / 60 / 60 / 24) * 24
					h = Math.floor(totaltime / 1000 / 60 / 60 % 24)
					m = Math.floor(totaltime / 1000 / 60 % 60)
					s = Math.floor(totaltime / 1000 % 60)
					//获取时分秒
					h = d + h
					h = test(h)
					m = test(m)
					s = test(s)
					// this.timeData = `${m}` // 每个时间的显示格式
					this.timeData = `${h}时 : ${m}分 : ${s}秒` // 每个时间的显示格式
					// console.log(this.timeData)
				} else {
					// this.timeData = `00 : 00 : 00`
					this.timeData = ``
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.order-details-box {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;

		.order-details-box-head {
			width: 100%;
		}

		.order-details-box-content {
			display: flex;
			flex-direction: column;
			width: 100%;
			flex: 1;
			overflow-y: scroll;
			padding-bottom: 74rpx;
			background: #F7F7F7;

			.order-details-wrap {
				.order-details-top {
					display: flex;
					align-items: center;
					width: 100%;
					height: 127rpx;
					padding: 0 32rpx;
					box-sizing: border-box;
					background: #fff;

					.order-details-top-ico {
						display: flex;
						align-items: center;
						width: 48rpx;
						height: 48rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.order-details-top-box {
						flex: 1;
						margin-left: 31rpx;
						color: #E53948;
						font-weight: 400;

						.order-top-box-title {
							font-size: 28rpx;
						}

						.order-top-box-text {
							font-size: 23rpx;
							// margin-top: 16rpx;
						}
					}

					.order-details-top-right {
						font-size: 24rpx;
						color: #999;
					}

				}

				.order-details-address {
					margin: 16rpx 0;
					background: #fff;

					.order-content-address {
						display: flex;
						align-items: center;
						width: 100%;
						padding: 32rpx;
						box-sizing: border-box;
						background: url(../../static/images/add-bg.png) no-repeat;
						background-size: contain;
						background-position: bottom;

						.order-address-ico {
							display: flex;
							align-items: center;
							width: 32rpx;
							height: 34rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.order-address-info {

							flex: 1;
							margin: 0 29rpx;

							.order-info-title {
								color: #000;
								font-size: 28rpx;
								font-weight: 500rpx;
							}

							.order-info-top {
								display: flex;
								align-items: center;
								color: #000;

								.order-info-top-name {
									font-size: 28rpx;
								}

								.order-info-top-tel {
									margin-left: 24rpx;
									font-size: 24rpx;
								}
							}

							.order-info-bottom {
								// margin-top: 22rpx;
								color: #000;
								font-size: 24rpx;
							}
						}
					}
				}
			}

			.order-details-list {
				flex: 1;
				// overflow-y: scroll;

				.order-details-info-list {
					padding: 0 32rpx;
					margin-top: 16rpx;
					background: #fff;
					box-sizing: border-box;

					.order-details-info-li {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 79rpx;
						font-size: 24rpx;
						font-weight: 500;
						color: #000;
						border-bottom: 1px solid #f2f2f2;

						.order-info-li-title {}

						.order-info-li-text {}
					}

					.order-details-info-li:last-child {
						border-bottom: none;
					}
				}
			}
		}

		.statusBarHeight {
			padding-bottom: 60rpx;
		}

		.order-details-footer {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 100%;
			// height: 88rpx;
			padding: 20rpx 32rpx;
			box-sizing: border-box;

			.order-details-foot-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 176rpx;
				height: 62rpx;
				margin-right: 24rpx;
				border-radius: 32rpx;
				font-size: 24rpx;
				font-weight: 500;
			}

			.order-details-foot-btn:last-child {
				margin-right: 0;
			}

			.order-box-btn1 {
				border: 1rpx solid #324B78;
				color: #fff;
				background: #324B78;
			}

			.order-box-btn2 {
				border: 1rpx solid #E53948;
				color: #E53948;
				background: #fff;
			}

			.order-box-btn3 {
				border: 1rpx solid #999999;
				color: #999;
				background: #fff;
			}

		}
	}
</style>
