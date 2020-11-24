<template>
	<view class="discount-box">
		<view class="discount-title">
			<view class="discount-title-wrap">
				<view class="discount-title-text">
					限时
				</view>
				<view class="discount-title-bg-text">
					折扣
				</view>
			</view>
		</view>
		<scroll-view class="scroll-view" scroll-x="true" @scroll="scroll" scroll-left="120">
			<view class="scroll-view-list" :style="{width:width+'px'}">
				<block v-for="(item, index) in DataList" :key="index">
					<view class="scroll-li" @click.stop="GoodsDetails(item.id)">
						<view class="scroll-li-img">
							<image :src="item.pic" mode="aspectFill" :lazy-load="true"></image>
						</view>
						<view class="scroll-li-title">
							{{item.name}}
						</view>
						<view class="scroll-li-bottom">
							<view class="scroll-li-price">
								<view class="price-xj">
									￥<text>{{item.minPrice}}</text>
								</view>
								<view class="price-yj" v-if="item.originalPrice!=0">
									{{item.originalPrice}}
								</view>
							</view>
							<view class="scroll-li-bottom-add">
								<image src="../../static/images/shopping-ico.png" mode=""></image>
							</view>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				width: "100%",
				// DataList:0
			}
		},
		props: {
			DataList: {

			}
		},
		mounted() {
			this.width = this.DataList.length * (130 + 12)
		},
		watch: {
			DataList(val) {
				this.width = this.DataList.length * (130+12)
				this.DataList = val
			}
		},
		methods: {
			scroll: function(e) {
				// console.log(e)
			},
			// 点击进入详情
			GoodsDetails(id) {
				this.$emit('details', id)
			},

		}
	}
</script>

<style lang="scss" scoped>
	.discount-box {
		width: 100%;
		height: 520rpx;
		padding: 53rpx 32rpx;
		margin-top: 16rpx;
		box-sizing: border-box;
		background: #fff;
		font-family: PingFang SC;

		.discount-title {
			display: flex;
			align-items: center;
			justify-content: center;

			.discount-title-wrap {
				position: relative;
				display: flex;
				align-items: center;
				width: 160rpx;
				height: 40rpx;
				font-size: 32rpx;
				font-weight: 500;
				font-style: oblique;

				.discount-title-text {
					color: #324B78;
				}

				.discount-title-bg-text {
					width: 88rpx;
					height: 40rpx;
					margin-left: 5rpx;
					line-height: 40rpx;
					text-align: center;
					color: #fff;
					background: url(../../static/images/11.png) no-repeat;
					background-size: contain;
				}

				&.discount-title-wrap::after {
					position: absolute;
					top: 0;
					left: -50rpx;
					bottom: 0;
					margin: auto;
					content: '';
					width: 32rpx;
					height: 3rpx;
					background: #324B78;
				}

				&.discount-title-wrap::before {
					position: absolute;
					top: 0;
					right: -50rpx;
					bottom: 0;
					margin: auto;
					content: '';
					width: 32rpx;
					height: 3rpx;
					background: #324B78;
				}
			}
		}

		.scroll-view {
			margin-top: 45rpx;
			white-space: nowrap; // 滚动必须加的属性

			.scroll-view-list {
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				padding: 8rpx;
				box-sizing: border-box;
				background: #fff;

				.scroll-li {
					width: 260rpx;
					height: 320rpx;
					margin-right: 24rpx;
					box-shadow: 0px 0px 3px 0px rgba(29, 29, 38, 0.08);
					border-radius: 12rpx;
					// background: #fff;

					.scroll-li-img {
						width: 260rpx;
						height: 220rpx;
						border-radius: 12rpx 12rpx 0 0;

						image {
							width: 100%;
							height: 100%;
							border-radius: 12rpx 12rpx 0 0;
						}
					}

					.scroll-li-title {
						padding: 15rpx 16rpx 0;
						box-sizing: border-box;
						font-size: 24rpx;
						font-weight: 400;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}

					.scroll-li-bottom {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0 16rpx;
						box-sizing: border-box;

						.scroll-li-price {
							display: flex;
							align-items: baseline;
							font-size: 20rpx;

							.price-xj {
								color: #E53948;

								text {
									font-size: 28rpx;
								}
							}

							.price-yj {
								margin-left: 10rpx;
								color: #999;
								text-decoration: line-through;
							}
						}

						.scroll-li-bottom-add {
							display: flex;
							align-items: center;
							width: 36rpx;
							height: 36rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}
					}
				}

				.scroll-li:last-child {
					margin-right: 0;
				}
			}


		}
	}
</style>
