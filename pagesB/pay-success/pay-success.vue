<template>
	<view class="pay-box">
		<view class="pay-box-head">
			<Title title="支付成功" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="pay-box-content">
			<view class="pay-content-top">
				<view class="pay-content-wrap">
					<view class="pay-wrap-title">
						<view class="pay-wrap-img">
							<image src="../../static/images/pay-success.png" mode=""></image>
						</view>
						<view class="pay-wrap-msg">
							<view class="pay-msg-title">支付成功</view>
							<view class="pay-msg-text">感谢您的购买</view>
						</view>
					</view>
					<view class="pay-wrap-order">
						<view class="pay-wrap-order-info">
							<view class="pay-order-info-price">
								￥<text>{{price|PriceTow}}</text>
							</view>
							<view class="pay-order-info-list">
								<view class="pay-info-list-li">
									<view class="pay-list-li-title">订单编号</view>
									<view class="pay-list-li-text">{{orderInfo.orderNumber}}</view>
								</view>
								<view class="pay-info-list-li">
									<view class="pay-list-li-title">创建时间</view>
									<view class="pay-list-li-text">{{orderInfo.dateAdd}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="pay-content-bottom">
				<view class="order-btn" @click="SeeOrder">查看订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Title from "../../components/title/title.vue"
	export default {
		data() {
			return {
				orderInfo: {},
				price:0
			}
		},
		// 过滤器
		filters: {
			PriceTow(value) {
				let val = !value ? 0 : value
				return val.toFixed(2)
			}
		},
		components: {
			Title,
		},
		onLoad(options) {
			this.orderInfo = JSON.parse(options.data);

			this.price = Number(options.price); // 支付金额
		},
		methods: {
			// 返回到首页
			GBack() {
				uni.reLaunch({
					url: "../../pages/index/index"
				})
			},

			
			// 查看订单按钮
			SeeOrder() {
				uni.redirectTo({
					url: "../../pagesB/delivery-details/delivery-details?id=" + this.orderInfo.id
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.pay-box {
		display: flex;
		flex-direction: column;
		height: 100%;
		font-family: PingFang SC;

		.pay-box-head {}

		.pay-box-content {
			flex: 1;
			height: 100%;
			display: flex;
			flex-direction: column;

			.pay-content-top {
				flex: 1;
				width: 100%;
				height: 320rpx;

				.pay-content-wrap {
					display: flex;
					align-items: center;
					flex-direction: column;
					width: 100%;
					padding: 48rpx;
					box-sizing: border-box;
					background: #324B78;

					.pay-wrap-title {
						display: flex;
						align-items: center;
						padding: 60rpx 0 80rpx;

						.pay-wrap-img {
							width: 80rpx;
							height: 80rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.pay-wrap-msg {
							margin-left: 32rpx;
							color: #fff;

							.pay-msg-title {
								font-weight: 500;
								font-size: 28rpx;
							}

							.pay-msg-text {
								// margin-top: 10rpx;
								font-weight: 400;
								font-size: 22rpx;
							}
						}
					}

					.pay-wrap-order {
						position: relative;
						width: 100%;
						height: 24rpx;
						padding: 0 27rpx;
						background: #20304D;
						border-radius: 12rpx;

						.pay-wrap-order-info {
							height: 377rpx;
							margin-top: 12rpx;
							padding: 0 36rpx;
							box-sizing: border-box;
							// background:linear-gradient(180deg,rgba(255,255,255,0.6),rgba(50,75,120,0.5));
							background: #fff;
							box-shadow: 0px 6rpx 18rpx 0px rgba(29, 29, 38, 0.08);
							border-radius: 0px 0px 12rpx 12rpx;

							.pay-order-info-price {
								text-align: center;
								padding: 50rpx 0 40rpx;
								color: #000;
								font-weight: 500;
								font-size: 24rpx;
								border-bottom: 1rpx solid #f2f2f2;

								text {
									font-size: 44rpx;
								}
							}

							.pay-order-info-list {
								// display: flex;
								// align-items: center;
								// flex-direction: column;
								color: #999;
								font-size: 24rpx;

								.pay-info-list-li {
									display: flex;
									justify-content: space-between;
									margin-top: 50rpx;

									.pay-list-li-title {}

									.pay-list-li-text {}
								}
							}
						}
					}
				}
			}

			.statusBarHeight {
				padding-bottom: 60rpx !important;
			}

			.pay-content-bottom {
				display: flex;
				justify-content: center;
				flex: 1;

				.order-btn {
					width: 352rpx;
					height: 64rpx;
					line-height: 64rpx;
					font-size: 27rpx;
					text-align: center;
					color: #f7f7f7;
					border-radius: 32rpx;
					background: #324B78;
				}
			}
		}
	}
</style>
