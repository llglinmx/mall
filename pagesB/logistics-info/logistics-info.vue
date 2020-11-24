<template>
	<view class="logistics-box">
		<view class="logistics-box-head">
			<Title title="物流信息" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="logistics-box-content">
			<view class="logistics-box-card1">
				<view class="logistics-box-list" :class="{'list-auto':isActive}">
					<view class="logistics-box-list-li" v-for="(item,index) in GoodsList" :key="index">
						<view class="logistics-box-li-img">
							<image :src="item.pic" mode=""></image>
						</view>
						<view class="logistics-box-li-info">
							<view class="logistics-li-info-title">
								{{item.goodsName}}
							</view>
							<view class="logistics-li-info-text">
								<text v-if="item.propertyChildIds!=''">{{item.property}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="logistics-box-tab" v-if="GoodsList.length>2">
					<Stretch Title="查看全部商品" @stretch="BtnClick" :ImgRotate="isActive"></Stretch>
				</view>
				<view class="logistics-box-bottom">
					<view class="logistics-box-bottom-left">
						<view class="logistics-box-title">
							{{logistics.shipperName}}
						</view>
						<view class="logistics-box-text">
							{{logistics.trackingNumber}}
						</view>
					</view>
					<view class="logistics-box-bottom-ico" @click="Copy">
						<image src="../../static/images/copy-ico.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="logistics-box-card2" :class="{'logistics-box-card2-bottom':logisticsTraces.length>3}">
				<view class="logistics-wrap-list" :class="{'logistics-auto':isLogis}">
					<view class="logistics-wrap-list-li" v-for="(item,index) in logisticsTraces" :key="index">
						<view class="logistics-wrap-li-title">
							{{item.AcceptStation}}
						</view>
						<view class="logistics-wrap-li-time">
							{{item.AcceptTime}}
						</view>
						<text class="logistics-wrap-li-dost" :class="{'dost-active':index==0}"></text>
						<text class="logistics-wrap-li-hidden" v-if="index==0"></text>
					</view>
				</view>
				<Stretch Title="点击查看更多物流信息" @stretch="logisticlClick" :ImgRotate="isLogis" v-if="logisticsTraces.length>3"></Stretch>
			</view>
		</view>
	</view>
</template>

<script>
	import Title from "../../components/title/title.vue"
	import Stretch from "../../components/click-stretch/click-stretch.vue"
	import {
		request
	} from "../../static/js/ajax.js"
	export default {
		data() {
			return {
				isActive: false,
				isLogis: false,
				SKID: "",
				GoodsList: [], //商品列表
				logisticsTraces: [], // 物流信息
				logistics: {}, // 订单信息
			}
		},
		onLoad(options) {
			this.SKID = options.id
			this.getDetails()
		},
		components: {
			Title,
			Stretch
		},
		methods: {
			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 点击复制
			Copy() {
				uni.setClipboardData({
					data: this.logistics.trackingNumber, //要被复制的内容
					success: (res) => { //复制成功的回调函数
						uni.showToast({ //提示
							title: '复制成功',
							icon: "none"
						})
					}
				});

			},

			// 商品信息点击展开
			BtnClick() {
				this.isActive = !this.isActive
			},

			// 更多物流信息点击
			logisticlClick() {
				this.isLogis = !this.isLogis
			},


			getDetails() {
				// 获取订单详情数据
				var data = {
					id: this.SKID,
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
							this.logistics = res.data.data.logistics
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
	.logistics-box {
		height: 100%;
		display: flex;
		flex-direction: column;

		.logistics-box-head {}

		.logistics-box-content {
			flex: 1;
			overflow-y: scroll;
			padding: 24rpx 32rpx 50rpx;
			box-sizing: border-box;
			background: #f7f7f7;

			.logistics-box-card1 {
				padding: 32rpx;
				box-sizing: border-box;
				border-radius: 12rpx;
				background: #fff;

				.logistics-box-list {
					// min-height: 152rpx;
					height: 152rpx;
					overflow: hidden;

					.logistics-box-list-li {
						display: flex;
						align-items: center;
						margin-bottom: 32rpx;

						.logistics-box-li-img {
							width: 120rpx;
							height: 120rpx;
							border-radius: 12rpx;

							image {
								width: 100%;
								height: 100%;
								border-radius: 12rpx;
							}
						}

						.logistics-box-li-info {
							flex: 1;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							padding: 10rpx 0;
							height: 100rpx;
							margin-left: 24rpx;
							font-family: PingFang SC;

							.logistics-li-info-title {
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

							.logistics-li-info-text {
								color: #999;
								font-size: 22rpx;
							}
						}
					}
				}

				.list-auto {
					height: auto !important;
				}

				.logistics-box-tab {}

				.logistics-box-bottom {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.logistics-box-bottom-left {
						font-weight: 400;

						.logistics-box-title {
							font-size: 28rpx;
							color: #000;
						}

						.logistics-box-text {
							margin-top: 15rpx;
							font-size: 24rpx;
							color: #999;
						}
					}

					.logistics-box-bottom-ico {
						width: 26rpx;
						height: 26rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

				}
			}

			.logistics-box-card2-bottom {
				padding-bottom: 0 !important;
			}

			.logistics-box-card2 {
				margin-top: 24rpx;
				padding: 64rpx 64rpx 0;
				box-sizing: border-box;
				border-radius: 12rpx;
				background: #fff;

				.logistics-auto {
					height: auto !important;
				}

				.logistics-wrap-list {
					height: 406rpx;
					overflow: hidden;
					padding-left: 10rpx;

					.logistics-wrap-list-li {
						position: relative;
						padding-left: 29rpx;
						padding-bottom: 40rpx;
						font-size: 24rpx;
						border-left: 1px dashed #ccc;

						.logistics-wrap-li-title {
							color: #000;
						}

						.logistics-wrap-li-time {
							margin-top: 10rpx;
							color: #999;
						}

						.logistics-wrap-li-dost {
							position: absolute;
							top: 10rpx;
							left: -8rpx;
							width: 12rpx;
							height: 12rpx;
							background: #ccc;
							border-radius: 50%;
						}

						.logistics-wrap-li-hidden {
							position: absolute;
							top: 0;
							left: -5rpx;
							width: 10rpx;
							height: 10rpx;
							background: #fff;
						}

						.dost-active {
							width: 16rpx !important;
							height: 16rpx !important;
							left: -10rpx !important;
							background: #324B78 !important;
						}
					}

					.logistics-wrap-list-li:last-child {
						border-left: none;
					}
				}

			}

		}
	}
</style>
