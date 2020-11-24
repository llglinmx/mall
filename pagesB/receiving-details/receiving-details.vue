<template>
	<view class="order-details-box">
		<view class="order-details-box-head">
			<Title title="订单详情" :isGBack="true" @GBack="GBack"></Title>
		</view>

		<view class="order-details-box-content">
			<view class="order-details-wrap">
				<view class="order-details-top">
					<view class="order-details-top-ico">
						<image src="../../static/images/order-details-3.png" mode=""></image>
					</view>
					<view class="order-details-top-box">
						<view class="order-top-box-title">
							卖家已发货
						</view>
						<!-- <view class="order-top-box-text">
							预计07月01日送达
						</view> -->
					</view>
					<view class="order-details-top-right">
					</view>
				</view>
				<view class="order-details-address">
					<view class="order-content-address order-content-adderss-top" v-for="(item,index) in logisticsTraces" :key="item.AcceptTime"
					 v-if="index==0">
						<view class="order-content-address-top-list">
							<view class="order-address-ico" style="width: 34rpx;height: 34rpx;">
								<image src="../../static/images/ys-ico.png" mode=""></image>
							</view>
							<view class="order-address-info">
								<view class="order-info-top">
									<view class="order-info-top-name" style="color: #324B78;">{{item.AcceptStation}}</view>
								</view>
								<view class="order-info-bottom" style="color: #999;">{{item.AcceptTime}}</view>
							</view>
							<view class="order-address-more">
								<image src="../../static/images/mord.png" mode=""></image>
							</view>
						</view>
					</view>

					<view class="order-content-address" @click="CheckAddress">
						<view class="order-address-ico">
							<image src="../../static/images/address-ico.png" mode=""></image>
						</view>
						<view class="order-address-info">
							<view class="order-info-top">
								<view class="order-info-top-name">{{AddressInfo.linkMan}}</view>
								<view class="order-info-top-tel">{{AddressInfo.mobile}}</view>
							</view>
							<view class="order-info-bottom">{{AddressInfo.address}}</view>
							<!-- <view class="order-info-bottom">{{AddressInfo.provinceStr}}-{{AddressInfo.cityStr}}-{{AddressInfo.areaStr}}-{{AddressInfo.address}}</view> -->
						</view>
					</view>
				</view>
			</view>
			<view class="order-details-list">
				<details-list :GoodsList="GoodsList" :isBtn="true" @RefundBtn="RefundBtn"></details-list>
				<view class="order-details-info-list">
					<view class="order-details-info-li">
						<view class="order-info-li-title">商品总价</view>
						<view class="order-info-li-text">{{orderInfo.amount+orderInfo.amountCoupons |PriceTow}}</view>
					</view>
					<view class="order-details-info-li">
						<view class="order-info-li-title">邮费</view>
						<view class="order-info-li-text">+￥{{orderInfo.amountLogistics |PriceTow}}</view>
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
			<view class="order-details-foot-btn order-box-btn3" @click="FootBtn(0)">
				查看物流
			</view>
			<view class="order-details-foot-btn order-box-btn2" @click="FootBtn(1)">
				确认收货
			</view>
		</view>
		<uni-popup ref="goods" type="dialog">
			<uni-popup-dialog type="warn" content="你确定要点击已收货吗？" title="警告" :duration="2000" :before-close="false" @confirm="ConfirmGoods"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {
		request
	} from "../../static/js/ajax.js"
	import Title from "../../components/title/title.vue"
	import DetailsList from "../../components/details-list/details-list.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		data() {
			return {
				GoodsList: [],
				orderInfo: '',
				AddressInfo: {},
				isBarHeight: false,
				logisticsTraces: {},
				FullMinusPrice: 0, //满减价格
				ReducePrice: 0, // 满减优惠
			}
		},
		components: {
			Title,
			DetailsList,
			uniPopup,
			uniPopupDialog
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

			// 查看物流 确认收货按钮
			FootBtn(type) {
				switch (type) {
					// 查看物流
					case 0:
						uni.navigateTo({
							url: "../../pagesB/logistics-info/logistics-info?id=" + this.orderInfo.id
						})
						break;
						// 确认收货按钮
					case 1:
						this.$refs.goods.open();
						break;
				}
			},
			// 确认收货弹窗确定按钮
			ConfirmGoods(done, value) {
				request({
					url: '/order/delivery',
					method: 'POST',
					data: {
						orderId: this.goodsId,
						token: uni.getStorageSync("token")
					}
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.GetOrder(2)
						} else {

						}
					} else {}
					done() // 关闭弹出层
				})
			},
			// 退款按钮
			RefundBtn() {
				let data = {
					orderId: this.orderInfo.id,
					price: this.orderInfo.amountReal,
				}
				uni.navigateTo({
					url: "../../pagesA/apply-for-refund/apply-for-refund?data=" + JSON.stringify(data)
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

							if (res.data.data.logisticsTraces) {
								this.logisticsTraces = res.data.data.logisticsTraces.reverse() // 倒叙方法
							} else {
								this.logisticsTraces = [{
									AcceptStation: "包裹正在等待揽收",
									AcceptTime: res.data.data.orderInfo.dateUpdate
								}]
							}


						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					} else {}

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
						width: 54rpx;
						height: 54rpx;
						// background: #E53948;

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
							margin-top: 16rpx;
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
									text-overflow: -o-ellipsis-lastline;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 2;
									line-clamp: 2;
									-webkit-box-orient: vertical;
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

						.order-address-more {
							display: flex;
							align-items: center;
							width: 12rpx;
							height: 22rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}
					}

					.order-content-adderss-top {
						position: relative;
						background: none;

						&.order-content-adderss-top::after {
							position: absolute;
							left: 0;
							right: 0;
							margin: auto;
							bottom: 0;
							height: 1px;
							width: 686rpx;
							box-sizing: border-box;
							background: #f2f2f2;
							content: '';
							// border-bottom:1px solid #f7f7f7 ;
						}

						.order-content-address-top-list {
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;
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
				border: 1rpx solid #999999;
				color: #999;
				background: #fff;
			}

		}
	}
</style>
