<template>
	<view class="Team-box">
		<view class="Team-box-head">
			<Title title="我的推广" :isGBack="true" @GBack="GBack"></Title>

		</view>
		<view class="Team-box-content">
			<view class="Team-box-content-tab">
				<view class="Team-box-tab-list">
					<view class="Team-box-tab-list-li" v-for="(item,index) in tabList" :key="index" @click="TabClick(index)">
						<text class="Team-tab-li-title" :class="{'active':idx==index}">{{item}}</text>
						<text class="Team-tab-li-solid" v-show="idx==index"></text>
					</view>
				</view>
			</view>
			<view class="Team-box-content-box">
				<swiper class="Team-box-swiper" :current="idx" @change="SlideTab">
					<swiper-item class="Team-swiper-list">
						<view class="Team-box-goods-item" v-show="isDataOne">
							<view class="Team-box-goods-item-li" v-for="(item,index) in goodsList">
								<view class="Team-goods-item-li-img">
									<image :src="item.avatarUrls" mode=""></image>
								</view>
								<view class="Team-goods-item-li-info">
									<view class="Team-goods-item-li-info-userName">
										{{item.nicks}}
									</view>
									<view class="Team-goods-item-li-info-addTime">
										注册时间：{{item.dateAdd}}
									</view>
								</view>
							</view>
						</view>
						<view class="Team-box-goods-item" v-show="!isDataOne">
							<view class="Team-box-goods-item-loading" v-if="!isLoading">
								<Loading></Loading>
							</view>
							<view class="Team-box-goods-item-loading" v-else>
								<image src="../../static/images/extend-no-data.png" mode=""></image>
								<text>暂时没有推广成员</text>
							</view>
						</view>
					</swiper-item>
					<swiper-item class="Team-swiper-list">
						<view class="Team-box-goods-item" v-show="isDataTwo">
							<view class="Team-box-goods-item-li" v-for="(item,index) in TwoList">
								<view class="Team-goods-item-li-img">
									<image :src="item.avatarUrls" mode=""></image>
								</view>
								<view class="Team-goods-item-li-info">
									<view class="Team-goods-item-li-info-userName">
										{{item.nicks}}
									</view>
									<view class="Team-goods-item-li-info-addTime">
										注册时间：{{item.dateAdd}}
									</view>
								</view>
							</view>
						</view>
						<view class="Team-box-goods-item" v-show="!isDataTwo">
							<view class="Team-box-goods-item-loading" v-if="!isLoading">
								<!-- <text>加载中...</text> -->
								<Loading></Loading>
							</view>
							<view class="Team-box-goods-item-loading" v-else>
								<image src="../../static/images/extend-no-data.png" mode=""></image>
								<text>暂时没有推广成员</text>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import Title from "../../components/title/title.vue"
	import Loading from "../../components/loading/loading.vue"
	import {
		request
	} from "../../static/js/ajax.js"
	export default {
		data() {
			return {
				tabList: ["一级推广", "二级推广"],
				idx: 0,
				isDataOne: false,
				isDataTwo: false,
				isLoading: false,
				goodsList: [],
				TwoList: [],
			}
		},
		components: {
			Title,
			Loading
		},
		onLoad() {
			this.team(1)
		},
		methods: {
			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// tab点击
			TabClick(index) {
				this.idx = index
			},
			// 滑动切换
			SlideTab(e) {
				// this.isData = false
				// this.isLoading = false

				this.idx = e.detail.current
				var idx;
				switch (e.detail.current) {
					case 0:
						idx = 1
						break;
					case 1:
						idx = 2
						break;
				}
				this.team(idx)
			},

			// 我的团队
			team(idx) {
				let data = {
					level: idx, // 1-直接 2-间接 ,
					token: uni.getStorageSync("token")
				}
				request({
					url: '/saleDistribution/members',
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode = 200) {
						this.isLoading = true
						if (res.data.code == 0) {
							// 判断等级
							if (idx == 1) {
								this.goodsList = res.data.data.result
								this.isDataOne = true
							} else {
								this.TwoList = res.data.data.result
								this.isDataTwo = true
							}
						} else if (res.data.code == 700) {
							if (idx == 1) {
								this.isDataOne = false
							} else {
								this.isDataTwo = false
							}
						}
					}
				})



			}

		}
	}
</script>

<style lang="scss" scoped>
	.Team-box {
		display: flex;
		flex-direction: column;
		height: 100%;

		.Team-box-head {}

		.Team-box-content {
			flex: 1;
			display: flex;
			flex-direction: column;

			.Team-box-content-tab {

				.Team-box-tab-list {
					display: flex;
					justify-content: center;
					align-items: center;

					.Team-box-tab-list-li {
						position: relative;
						display: flex;
						justify-content: center;
						align-items: center;
						width: 150rpx;
						height: 40rpx;
						padding: 32rpx 0;

						.Team-tab-li-title {
							font-size: 24rpx;
							font-weight: 400;
							color: #999;
							transition: 0.3s;
						}

						.Team-tab-li-solid {
							position: absolute;
							right: 0;
							left: 0;
							bottom: 20rpx;
							margin: auto;
							width: 40rpx;
							height: 4rpx;
							background: #324B78;
						}

						.active {
							color: #324B78 !important;
							font-size: 28rpx !important;
							font-size: 500 !important;
						}
					}
				}
			}

			.Team-box-content-box {
				padding: 0 32rpx;
				flex: 1;
				overflow-y: scroll;
				box-sizing: border-box;

				.Team-box-swiper {
					height: 100%;

					.Team-swiper-list {
						.Team-box-goods-item {
							height: 100%;

							.Team-box-goods-item-li {
								display: flex;
								margin-bottom: 40rpx;

								.Team-goods-item-li-img {
									width: 80rpx;
									height: 80rpx;
									border-radius: 50%;

									image {
										width: 100%;
										height: 100%;
										border-radius: 50%;
									}
								}

								.Team-goods-item-li-info {
									display: flex;
									// align-items: center;
									flex-direction: column;
									margin-left: 24rpx;

									.Team-goods-item-li-info-userName {
										font-size: 28rpx;
										font-weight: 500;
										color: #332831;
									}

									.Team-goods-item-li-info-addTime {
										margin-top: 6rpx;
										font-size: 20rpx;
										font-weight: 400;
										color: #666;
									}
								}
							}

							.Team-box-goods-item-loading {
								height: 100%;
								display: flex;
								align-items: center;
								justify-content: center;
								flex-direction: column;

								image {
									width: 208rpx;
									height: 154rpx;
									transform: translateY(-39rpx);
								}

								text {
									// margin-top: 39rpx;
									font-size: 22rpx;
									font-weight: 400;
									color: #B3B3B3;
								}
							}
						}

					}
				}
			}
		}
	}
</style>
