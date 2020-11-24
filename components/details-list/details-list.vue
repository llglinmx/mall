<template>
	<view class="order-content-list">
		<view class="order-list-title">
			商品列表<text>共 {{TotalNum}} 件商品</text>
		</view>
		<view class="order-list-li" v-for="(item,index) in GoodsList" :key="item.id">
			<view class="order-list-li-img">
				<image :src="item.pic" mode=""></image>
			</view>
			<view class="order-list-ii-info">
				<view class="order-list-info-title">
					{{item.name||item.goodsName}}
				</view>
				<view class="order-list-info-specs">
					<text v-if="item.property">{{item.property}}</text>
				</view>
				<view class="order-list-info-bottom">
					<view class="order-list-info-price">
						￥<text>{{item.price||item.amountSingle |PriceTow}}</text>
					</view>
					<view class="order-list-info-num">
						x {{item.number}}
					</view>
				</view>
			</view>
		</view>
		<view class="order-list-btn" v-if="isBtn">
			<view class="order-btn" @click="RefundBtn">
				退款
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			GoodsList: {},
			isBtn: {
				type: Boolean,
				default: false
			}
		},
		// 过滤器
		filters: {
			PriceTow(value) {
				return value.toFixed(2)
			}
		},
		computed: {
			// 计算商品总数量
			TotalNum() {
				let num = 0
				this.GoodsList.forEach(item => {
					num += item.number
				})
				return num
			},
		},
		methods: {
			RefundBtn() {
				this.$emit("RefundBtn")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-content-list {
		background: #fff;
		padding: 0 32rpx;
		padding-bottom: 40rpx;
		box-sizing: border-box;

		.order-list-title {
			display: flex;
			align-items: center;
			padding: 32rpx 0;
			color: #000;
			font-size: 28rpx;

			text {
				color: #666;
				font-size: 24rpx;
				margin-left: 15rpx;
			}
		}

		.order-list-li {
			display: flex;
			align-items: center;
			height: 160rpx;
			margin-bottom: 40rpx;

			.order-list-li-img {
				width: 160rpx;
				height: 160rpx;
				border-radius: 12rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 12rpx;
				}
			}

			.order-list-ii-info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				flex: 1;
				height: 100%;
				margin-left: 24rpx;

				.order-list-info-title {
					font-size: 24rpx;
					font-weight: 400;
					color: #000;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.order-list-info-specs {
					font-size: 20rpx;
					color: #999;
				}

				.order-list-info-bottom {
					display: flex;
					justify-content: space-between;

					.order-list-info-price {
						font-size: 20rpx;
						font-weight: 500;
						color: #E53948;

						text {
							font-size: 28rpx;
						}
					}

					.order-list-info-num {
						font-size: 28rpx;
						color: #000;
					}
				}
			}
		}

		.order-list-li:last-child {
			margin-bottom: 0;
		}

		.order-list-btn {
			display: flex;
			align-items: center;
			justify-content: flex-end;

			.order-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 176rpx;
				height: 64rpx;
				border: 1rpx solid rgba(153, 153, 153, 1);
				border-radius: 32rpx;
				font-size: 24rpx;
				color: #999;
			}
		}

	}
</style>
