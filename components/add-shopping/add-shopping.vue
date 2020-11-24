<template>
	<view class="goods-nav">
		<view class="nav-left">
			<view class="nav-item">
				<button open-type="contact">
					<view class="nav-item-top">
						<image src="../../static/images/cust-ico.png" mode=""></image>
					</view>
					<view class="nav-item-title">客服</view>
				</button>
			</view>
			<view class="nav-item">
				<button v-if="isState!=1">
					<view class="nav-item-top" @click="Collect(0)">
						<image src="../../static/images/store.png" mode=""></image>
					</view>
					<view class="nav-item-title">收藏</view>
				</button>
				<button v-else>
					<view class="nav-item-top" @click="Collect(1)">
						<image src="../../static/images/store-active.png" mode=""></image>
					</view>
					<view class="nav-item-title" style="color: #E53948;">已收藏</view>
				</button>
			</view>
			<view class="nav-item" @click="shoppingBtn">
				<button>
					<view class="nav-item-top">
						<image src="../../static/images/shopping.png" mode="" style="transform: translateX(-8rpx);"></image>
						<text v-if="shoppingNum!=0">{{shoppingNum}}</text>
					</view>
					<view class="nav-item-title">购物车</view>
				</button>
			</view>
		</view>
		<view class="nav-right">
			<view class="nav-btn" @click="ShoppingAdd(1)">加入购物车</view>
			<view class="nav-btn" @click="ShoppingAdd(0)">立即购买</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isState: 0,
			}
		},
		props: {
			FooterData: {
				// type:Array
			},
			shoppingNum: {}
		},
		watch: {
			FooterData(val) {
				this.isState = this.FooterData
			}
		},
		created() {
			// this.shoppingNum = uni.getStorageSync("shoppingNum")
		},
		// created() {
		// 	setTimeout(() => {
		// 		this.isState = this.FooterData.numberFav
		// 	}, 500)
		// },
		methods: {
			ShoppingAdd(type) {
				this.$emit("ShoppingAdd", type)
			},

			// 点击进入购物车列表
			shoppingBtn() {
				this.$emit("ClickShopping")
			},

			// 按钮
			Collect(type) {
				this.$emit("Collect", type)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-nav {
		display: flex;
		align-items: center;
		height: 94rpx;
		box-sizing: border-box;

		.nav-left {
			flex: 1;
			display: flex;

			padding-right: 40rpx;

			.nav-item {
				flex: 1;

				button {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					background: none;
					border: none;
					padding: 0;
					position: static;
					line-height: normal;

					.nav-item-top {
						position: relative;
						height: 36rpx;

						image {
							width: 36rpx;
							height: 36rpx;
						}


						text {
							position: absolute;
							top: 0rpx;
							right: -12rpx;
							padding: 5rpx;
							min-width: 20rpx;
							height: 20rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							background: #E53948;
							border-radius: 15rpx;
							color: #fff;
							font-size: 20rpx;
						}
						
					}

					


					.nav-item-title {
						margin-top: 6rpx;
						font-size: 20rpx;
					}
				}

				button:after {
					height: 0;
					border: 1px solid rgba(230, 228, 228, 0.2);
				}



			}
		}

		.nav-right {
			width: 352rpx;
			display: flex;

			.nav-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 64rpx;
				flex: 1;
				font-size: 24rpx;
				color: #fff;

			}

			.nav-btn:nth-child(1) {
				border-radius: 50rpx 0 0 50rpx;
				background: #526C9E;
			}

			.nav-btn:nth-child(2) {
				border-radius: 0 50rpx 50rpx 0;
				background: #324B78;
			}
		}
	}
</style>
