<template>
	<view class="card-list-box">
		<view class="coupon-list-li" v-for="(item,index) in CouponList"  @click="CardList(item)" :key="index">
			<view class="coupon-list-li-left" :class="{'coupon-list-color':item.status==3||item.status==2}">
				<view class="coupon-left-price">
					￥<text v-if="item.money">{{item.money}}</text><text v-else>{{item.moneyMin}}</text>
				</view>
				<view class="coupon-left-text">
					满{{item.moneyHreshold}}元使用
				</view>
			</view>
			<view class="coupon-list-li-rigth">
				<view class="coupon-right-text">
					<view class="coupon-text-title" :class="{'coupon-list-color':item.status==3||item.status==2}">
						{{item.name}}
					</view>
					<view class="coupon-text-endTime" v-if="item.dateEnd" :class="{'coupon-list-color':item.status==3||item.status==2}">
						<!-- 有效期至{{item.dateEnd|DataFilt}} -->
						有效期至{{item.dateEnd}}
					</view>
				</view>
				<view class="coupon-right-btn" v-if="item.moneyMin" @click.stop="CouponClick(item.id,'0')">领取</view>
				<!-- <view class="coupon-right-btn" v-else>
					立即使用
				</view> -->
			</view>

			<view class="coupon-used-ico" v-if="item.status==3 ||item.status==2">
				<image src="../../static/images/ysy.png" mode="" v-if="item.status==3"></image>
				<image src="../../static/images/ygq.png" mode="" v-else-if="item.status==2"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		filters: {
			DataFilt(value) {
				// return value.split(' ')[0]
			},
		},
		props: {
			CouponList: {
				// type:Array
			}
		},
		created() {
			// console.log(this.CouponList)
		},
		methods: {
			// 按钮
			CouponClick(id, type) {
				let options= {
					type: type,
					id: id
				}
				this.$emit("btn", options)
			},
			// 列表点击
			CardList(item) {
				this.$emit("CardBtn", item)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.card-list-box {

		.coupon-list-li {
			position: relative;
			display: flex;
			margin-top: 24rpx;
			background: #fff;
			border-radius: 12rpx;

			.coupon-list-color {
				color: #ccc !important;
			}

			.coupon-list-li-left {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				position: relative;
				width: 206rpx;
				height: 180rpx;
				border-right: 1px dashed #eee;
				color: #E53948;

				&.coupon-list-li-left::after {
					position: absolute;
					content: '';
					bottom: -20rpx;
					right: -20rpx;
					width: 40rpx;
					height: 40rpx;
					background: #f7f7f7;
					border-radius: 50%;
				}

				&.coupon-list-li-left::before {
					position: absolute;
					content: '';
					top: -20rpx;
					right: -20rpx;
					width: 40rpx;
					height: 40rpx;
					background: #f7f7f7;
					border-radius: 50%;
				}

				.coupon-left-price {
					font-size: 36rpx;
					font-weight: 500;

					text {
						font-weight: 600;
						font-size: 72rpx;
					}
				}

				.coupon-left-text {
					font-size: 20rpx;
				}

			}

			.coupon-list-li-rigth {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex: 1;
				padding: 0 40rpx;
				box-sizing: border-box;

				.coupon-right-text {
					.coupon-text-title {
						font-size: 28rpx;
						font-weight: 600;
						color: #324B78;
					}

					.coupon-text-endTime {
						margin-top: 20rpx;
						color: #999;
						font-size: 20rpx;
					}

					.coupon-list-color {
						color: #ccc !important;
					}
				}


				.coupon-right-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 120rpx;
					height: 50rpx;
					border: 1px solid #E53948;
					border-radius: 26rpx;
					font-size: 24rpx;
					color: #E53948;
				}

			}

			.coupon-used-ico {
				position: absolute;
				bottom: 24rpx;
				right: 32rpx;
				width: 139rpx;
				height: 80rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
