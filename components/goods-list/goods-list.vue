<template>
	<view class="goods-list-box">
		<view class="goods-list-title flex">
			<text>热门精选</text>
		</view>
		<view class="goods-list-box">
			<view class="goods-list-view" v-for="(item,index) in GoodsList" :key="index" @click.stop="GoodsDetails(item.id)">
				<view class="goods-li">
					<view class="goods-img">
						<image :src="item.pic" mode="aspectFill"></image>
					</view>
					<view class="goods-info">
					</view>
					<view class="goods-bottom">
						<view class="goods-bottom-text">
							{{item.name}}
						</view>
						<view class="goods-bottom-add">
							<view class="goods-bottom-price">
								￥<text>{{item.minPrice | PriceTwo}}</text>
							</view>

							<view class="goods-store" @click.stop="StoreClick(item.id,index,'store')" v-if="!item.isStore">
								<image src="../../static/images/store.png" mode=""></image>
							</view>
							<view class="goods-store" @click.stop="StoreClick(item.id,index,'storeActive')" v-else>
								<image src="../../static/images/store-active.png" mode=""></image>
							</view>
						</view>
					</view>
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
			GoodsList: {
				type: Array
			}
		},
		filters: {
			PriceTwo(value) {
				return value.toFixed(2)
			}
		},
		mounted() {

		},
		methods: {
			// 详情跳转
			GoodsDetails(id) {
				this.$emit('ListTab', id)
			},
			// 收藏
			StoreClick(id, index, store) {
				let data = {
					id: id,
					index: index,
					store: store
				}
				this.$emit('store', data)
			}
		}
	}
</script>

<style lang="scss">
	.goods-list-box {
		width: 100%;
		margin-top: 16rpx;
		background: #fff;

		.goods-list-title {
			padding: 40rpx 0;

			text {
				display: block;
				position: relative;
				width: 176rpx;
				height: 48rpx;
				margin: auto;
				text-align: center;
				line-height: 48rpx;
				color: #fff;
				font-size: 32rpx;
				background: #E63948;
				border-radius: 56rpx;
				font-style: oblique;
			}

			text::after,
			text::before {
				position: absolute;
				top: 0;
				bottom: 0;
				margin: auto;
				content: '';
				width: 12rpx;
				height: 12rpx;
				background: #E63948;
				border-radius: 50%;
			}

			text::after {
				left: -18rpx;
			}

			text::before {
				right: -18rpx;
			}

		}


		.goods-list-box {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			overflow: hidden;
			padding: 0 32rpx 20rpx;
			box-sizing: border-box;

			.goods-list-view {
				width: 331rpx;
				height: 100%;
				margin-left: 22rpx;

				.goods-li {
					padding: 0 0 29rpx;
					box-sizing: border-box;
					width: 331rpx;
					// height: 350rpx;
					height: 448rpx;
					margin-bottom: 24rpx;
					// min-height: 407rpx; // 加入这两个后每个item的宽度就生效了
					// max-height: 448rpx; // 加入这两个后每个item的宽度就生效了
					border-radius: 12rpx;
					box-shadow: 0px 5px 14px 0px rgba(29, 29, 38, 0.08);


					.goods-img {
						width: 100%;
						height: 260rpx;
						overflow: hidden;

						image {
							width: 100%;
							height: 100%;
							border-radius: 12rpx 12rpx 0 0;
						}
					}

					.goods-info {}

					.goods-bottom {
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.goods-bottom-text {
							color: #000;
							font-size: 24rpx;
							padding: 15rpx 15rpx 0;
							box-sizing: border-box;
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
						}

						.goods-bottom-add {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-top: 15rpx;
							padding: 0 15rpx;
							box-sizing: border-box;

							.goods-bottom-price {
								font-size: 20rpx;
								color: #E53948;

								text {
									font-size: 28rpx;
								}
							}

							.goods-store {
								display: flex;
								align-items: center;
								width: 32rpx;
								height: 32rpx;
								padding: 10rpx;


								image {
									width: 32rpx;
									height: 32rpx;
								}
							}
						}
					}
				}
			}

			.goods-list-view:nth-child(2n+1) {
				margin-left: 0;
			}
		}
	}
</style>
