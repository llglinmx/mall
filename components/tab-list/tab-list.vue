<template>
	<view class="tab-list-box">
		<view class="tab-list-li" v-for="(item,index) in OrderList" :key="item.id">
			<view class="tab-list-li-title" @click="OrderDetail(item.id,item.status)">
				<view class="tab-li-title-left">
					<view class="tab-li-title-year">
						{{item.dateAdd|DataFilt}}
						<text v-if="item.status==0">{{item.end_time1}}</text>
					</view>
				</view>
				<view class="tab-li-title-right">
					<text style="color: #E53948;">{{item.statusStr}}</text>
				</view>
			</view>
			<view class="tab-list-li-info" @click="OrderDetail(item.id,item.status)">
				<view class="tab-list-goods-li" v-for="(idx,i) in item.OrderDataList" :key="idx.id">
					<view class="tab-goods-li-img">
						<image :src="idx.pic" mode=""></image>
					</view>
					<view class="tab-goods-li-info">
						<view class="tab-goods-info-title">
							{{idx.goodsName}}
						</view>
						<view class="tab-goods-info-specs" v-if="idx.property">
							{{idx.property}}
						</view>
						<view class="tab-goods-info-bottom">
							<view class="tab-goods-info-pric">￥<text>{{idx.amountSingle|PriceTow}}</text></view>
							<view class="tab-goods-info-num">
								x{{idx.number}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="tab-list-bottom">
				<view class="tab-list-bottom-text">
					<view class="tab-list-bottom-num">
						共 {{item.OrderDataList.length}} 件商品
					</view>
					<view class="tab-list-bottom-price">
						合计：￥<text>{{item.amountReal|PriceTow}}</text>
					</view>
				</view>
				<view class="tab-list-bottom-btn-list" v-if="item.status==0">
					<view class="tab-bottom-btn tab-btn-border" @click="clickBtn(0,item.id)">取消订单</view>
					<view class="tab-bottom-btn tab-btn-color" @click="clickBtn(1,item.id,item.amountReal,item.dateAdd,item.orderNumber)">立即支付</view>
				</view>
				<view class="tab-list-bottom-btn-list" v-if="item.status==1">
					<view class="tab-bottom-btn tab-btn-red" @click="clickBtn(2,item.id,item.amountReal)">申请退款</view>
				</view>
				<view class="tab-list-bottom-btn-list" v-if="item.status==2">
					<view class="tab-bottom-btn tab-btn-border" @click="clickBtn(3,item.id)">查看物流</view>
					<view class="tab-bottom-btn tab-btn-red" @click="clickBtn(4,item.id)">确认收货</view>
				</view>
				<view class="tab-list-bottom-btn-list" v-if="item.status==3">
					<view class="tab-bottom-btn tab-btn-red" @click="clickBtn(6,item.id)">立即评价</view>
				</view>
				<view class="tab-list-bottom-btn-list" v-if="item.status==-1||item.status==4">
					<view class="tab-bottom-btn tab-btn-red" @click="clickBtn(5,item.id)">删除订单</view>
				</view>
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
			OrderList: {}
		},

		// 过滤器
		filters: {
			// 价格保留两位
			PriceTow(value) {
				return value.toFixed(2)
			},
			// 过滤日期后的时间
			DataFilt(value) {
				return value.split(' ')[0]
			},
		},
		watch: {
			
		},
		created() {
			
		},
		methods: {
			OrderDetail(id, state) {
				var data = {
					id: id,
					state: state
				}
				this.$emit("OrderDetail", data)
			},
			// 按钮
			clickBtn(index, id, price, dateAdd, orderNumber) {
				var data = {
					index: index, // 下标
					id: id, //订单id
					price: price, // 支付价格
					dateAdd: dateAdd, // 创建时间
					orderNumber: orderNumber, // 订单编号
				}
				this.$emit("ClickBtn", data)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tab-list-box {
		.tab-list-li {
			margin-top: 16rpx;
			// padding-bottom: 32rpx;
			padding: 0 32rpx 32rpx;
			box-sizing: border-box;
			background: #fff;

			.tab-list-li-title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 66rpx;

				.tab-li-title-left {
					.tab-li-title-year {
						font-size: 24rpx;
						color: #000;

						text {
							margin-left: 15rpx;
							color: #E53948;
						}
					}
				}

				.tab-li-title-right {
					font-size: 24rpx;
				}
			}

			.tab-list-li-info {
				padding: 24rpx 0;
				border-top: 1px solid #eee;
				border-bottom: 1px solid #eee;

				.tab-list-goods-li {
					display: flex;
					height: 160rpx;
					margin-bottom: 24rpx;

					.tab-goods-li-img {
						width: 160rpx;
						height: 160rpx;
						background: #eee;
						border-radius: 12rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 12rpx;
						}
					}

					.tab-goods-li-info {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						flex: 1;
						margin-left: 24rpx;
						font-weight: 500;

						.tab-goods-info-title {
							line-height: 28rpx;
							font-size: 24rpx;
							color: #000;
							word-break: break-all;
							text-overflow: ellipsis;
							overflow: hidden;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}

						.tab-goods-info-specs {
							color: #999;
							font-size: 20rpx;
							// min-height: 32rpx;
							// max-height: 64rpx;
							word-break: break-all;
							text-overflow: ellipsis;
							overflow: hidden;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}

						.tab-goods-info-bottom {
							display: flex;
							align-items: center;
							justify-content: space-between;

							.tab-goods-info-pric {
								font-size: 20rpx;
								color: #E53948;

								text {
									font-size: 28rpx;
								}
							}

							.tab-goods-info-num {
								font-size: 28rpx;
								color: #000;
							}
						}
					}
				}

				.tab-list-goods-li:last-child {
					margin-bottom: 0;
				}
			}

			.tab-list-bottom {
				.tab-list-bottom-text {
					display: flex;
					align-items: baseline;
					justify-content: space-between;
					padding: 24rpx 0;
					font-size: 24rpx;

					.tab-list-bottom-num {
						color: #666;
					}

					.tab-list-bottom-price {
						color: #000;

						text {
							font-size: 40rpx;
						}
					}
				}

				.tab-list-bottom-btn-list {
					display: flex;
					justify-content: flex-end;

					.tab-bottom-btn {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 180rpx;
						height: 62rpx;
						margin-right: 24rpx;
						font-size: 24rpx;
						border-radius: 32rpx;
					}

					.tab-bottom-btn:last-child {
						margin-right: 0;
					}

					.tab-btn-border {
						border: 1rpx solid #999;
						color: #999;
					}

					.tab-btn-color {
						background: #324B78;
						color: #fff;
						border: 1rpx solid #324B78;
					}

					.tab-btn-red {
						color: #E53948;
						border: 1rpx solid #E53948;
					}

				}

			}
		}
	}
</style>
