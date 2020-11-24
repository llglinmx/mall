<template>
	<view class="order-details-box">
		<view class="order-details-box-head">
			<Title title="订单详情" :isGBack="true" @GBack="GBack"></Title>
		</view>

		<view class="order-details-box-content">
			<view class="order-details-wrap">
				<view class="order-details-top">
					<view class="order-details-top-ico">
						<image src="../../static/images/order-details-2.png" mode=""></image>
					</view>
					<view class="order-details-top-box">
						<view class="order-top-box-title">
							等待发货
						</view>
						<view class="order-top-box-text">
							买家已付款，等待商家发货
						</view>
					</view>
					<view class="order-details-top-right">
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
				<details-list :GoodsList="GoodsList"></details-list>
				<view class="order-details-info-list">
					<view class="order-details-info-li">
						<view class="order-info-li-title">商品总价</view>
						<view class="order-info-li-text">{{(orderInfo.amount+orderInfo.amountCoupons)|PriceTow}}</view>
					</view>
					<view class="order-details-info-li">
						<view class="order-info-li-title">邮费</view>
						<view class="order-info-li-text">+￥{{orderInfo.amountLogistics}}</view>
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
			<view class="order-details-foot-btn order-box-btn2" @click="RefundBtn">
				申请退款
			</view>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from "../../static/js/ajax.js"
	import Title from "../../components/title/title.vue"
	import DetailsList from "../../components/details-list/details-list.vue"
	export default {
		data() {
			return {
				GoodsList: [],
				orderInfo: '',
				AddressInfo: {},
				isBarHeight: false,
				FullMinusPrice: 0, //满减价格
				ReducePrice: 0, // 满减优惠
			}
		},
		components: {
			Title,
			DetailsList
		},
		onLoad(options) {
			this.getDetails(options.id)
			this.SystemInfo()
			this.FullMinusSet()
		},
		// 过滤器
		filters: {
			// 价格保留两位
			PriceTow(value) {
				let val = !value ? 0 : value
				return val.toFixed(2)
			},
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

			getDetails(skid) {
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
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					} else {}

				})
			},
			// 申请退款按钮
			RefundBtn() {
				let data = {
					orderId: this.orderInfo.id,
					price: this.orderInfo.amountReal
				}
				uni.navigateTo({
					url: "../../pagesA/apply-for-refund/apply-for-refund?data=" + JSON.stringify(data)
				})
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
			background: #F7F7F7;
			padding-bottom: 74rpx;

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
			padding-bottom: 60rpx !important;
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
				border: 1rpx solid #999;
				color: #999;
				background: #fff;
			}

		}
	}
</style>
