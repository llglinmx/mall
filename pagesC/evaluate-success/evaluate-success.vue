<template>
	<view class="evaluate-success-box">
		<view class="eval-succ-head">
			<Title title=" " :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="eval-succ-content">
			<view class="eval-succ-content-head">
				<view class="eval-content-head-msg">
					<image src="../../static/images/pay-success.png" mode=""></image>
					<text>评价成功</text>
				</view>
				<view class="eval-succ-content-text">我们会继续为您提供更优质的商品及服务</view>
				<view class="eval-succ-content-btn" @click="BackIndex">返回首页</view>
			</view>
			<view class="eval-content-wrap">
				<view class="eval-content-wrap-list">
					<view class="eval-list-title">
						<text>为你推荐</text>
					</view>
					<view class="eval-list-box">
						<view class="eval-list-box-li" v-for="(item,index) in GoodsList" :key="item.id" @click="GoodsDetails(item.id)">
							<view class="eval-list-box-li-img">
								<image :src="item.pic" mode=""></image>
							</view>
							<view class="eval-list-box-li-info">
								<view class="eval-list-box-li-info-title">{{item.name}}</view>
								<view class="eval-list-box-li-info-text">销量：{{item.numberSells}}</view>
								<view class="eval-list-box-li-bottom">
									<view class="eval-list-box-li-price">
										￥<text>{{item.minPrice}}</text>
									</view>
									<view class="eval-list-box-li-shopp">
										<image src="../../static/images/shopping-ico.png" mode=""></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="eval-succ-footer">

		</view>
	</view>
</template>

<script>
	import Title from "../../components/title/title.vue"
	import {
		request
	} from '../../static/js/ajax.js'
	export default {
		data() {
			return {
				GoodsList:[]
			}
		},
		components: {
			Title,
		},
		onLoad() {
			this.GoodsData()
		},
		methods: {
			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 2
				})
			},
			
			// 返回首页
			BackIndex(){
				uni.reLaunch({
					url:"../../pages/index/index"
				})
			},
			// 商品详情
			GoodsDetails(id){
				uni.navigateTo({
					url: "../../pagesA/goods-details/goods-details?id=" + id
				})
			},
			
			// 商品列表
			GoodsData() {
				request({
					url: '/shop/goods/list',
					method: 'GET',
					data: {
						recommendStatus: 1,
						token: uni.getStorageSync("token")
					}
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.GoodsList = this.GoodsList.concat(res.data.data)
						} else if (res.data.code == 700) {
							
						}
			
					} else {}
			
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.evaluate-success-box {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #f7f7f7;

		.eval-succ-head {}

		.eval-succ-content {
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow-y: scroll;

			.eval-succ-content-head {
				display: flex;
				flex-direction: column;
				align-items: center;
				height: 302rpx;
				background: #324B78;

				.eval-content-head-msg {
					display: flex;
					align-items: center;

					image {
						width: 36rpx;
						height: 36rpx;
					}

					text {
						margin-left: 24rpx;
						font-size: 32rpx;
						font-weight: 500;
						color: #fff;
					}
				}

				.eval-succ-content-text {
					margin-top: 20rpx;
					font-size: 24rpx;
					font-weight: 400;
					color: #fff;
				}

				.eval-succ-content-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 174rpx;
					height: 62rpx;
					margin-top: 40rpx;
					color: #fff;
					font-size: 24rpx;
					font-weight: 400;
					border: 1rpx solid #fff;
					border-radius: 32rpx;
				}
			}

			.eval-content-wrap {
				flex: 1;
				padding: 0 32rpx 24rpx;
				box-sizing: border-box;
				overflow-y: scroll;
				margin-top: -60rpx;

				.eval-content-wrap-list {
					display: flex;
					flex-direction: column;
					padding: 0 32rpx;
					height: 100%;
					// margin-top: -60rpx;
					background: #fff;
					border-radius: 12rpx;
					box-sizing: border-box;

					.eval-list-title {
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 40rpx 0;

						text {
							position: relative;
							font-size: 32rpx;
							font-weight: 500;
							color: #E63948;
							line-height: 32rpx;
						}

						text::after {
							position: absolute;
							top: 0;
							right: -40rpx;
							content: '';
							width: 22rpx;
							height: 20rpx;
							background: url(../../static/images/right-ico.png) no-repeat;
							background-size: contain;
						}

						text::before {
							position: absolute;
							bottom: 0;
							left: -40rpx;
							content: '';
							width: 22rpx;
							height: 20rpx;
							background: url(../../static/images/left-ico.png) no-repeat;
							background-size: contain;
						}
					}

					.eval-list-box {
						flex: 1;
						overflow-y: scroll;
						.eval-list-box-li {
							display: flex;
							height: 160rpx;
							margin-bottom: 40rpx;

							.eval-list-box-li-img {
								width: 160rpx;
								height: 160rpx;

								image {
									width: 100%;
									height: 100%;
									border-radius: 12rpx;
								}
							}
							.eval-list-box-li-info{
								flex: 1;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								margin-left: 24rpx;
								.eval-list-box-li-info-title{
									font-size: 24rpx;
									font-weight: 400;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;
								}
								.eval-list-box-li-info-text{
									font-size: 22rpx;
									font-weight: 400;
									color: #999;
								}
								.eval-list-box-li-bottom{
									display: flex;
									align-items: center;
									justify-content: space-between;
									.eval-list-box-li-price{
										font-size: 20rpx;
										font-weight: 500;
										text{
											font-size: 28rpx;
										}
									}
									.eval-list-box-li-shopp{
										width: 48rpx;
										height: 48rpx;
										image{
											width: 100%;
											height: 100%;
										}
									}
								}
							}
						}
					}
				}
			}
		}

		.eval-succ-footer {}

	}
</style>
