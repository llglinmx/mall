<template>
	<view class="coupon-box">
		<view class="coupon-head">
			<Title title="优惠券" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="coupon-content">
			<view class="coupon-content-tab">
				<Tabs :TabsList='TabsList' :IndexIdx='idx' @TabClick="TabBtn"></Tabs>
			</view>
			<view class="coupon-content-list">
				<swiper class="swiper-box" :current="idx" @change="tabChange">
					<!-- 可领取 -->
					<swiper-item class="swiper-box-item-list">
						<view class="coupon-content-list-box">
							<card-list :CouponList="CouponList1" @btn="CouponClick" v-if="isDataOne"></card-list>
							<view class="conpon-list-loading" v-else>
								<view class="conpon-list-no-data">
									<image src="../../static/images/no-coupon.png" mode=""></image>
									<text>当前没有可领取的优惠券</text>
								</view>
							</view>
						</view>
					</swiper-item>

					<!-- 未使用 -->
					<swiper-item class="swiper-box-item-list">
						<view class="coupon-content-list-box">
							<card-list :CouponList="CouponList2" v-if="isDataTwo" @CardBtn="CardList"></card-list>
							<view class="conpon-list-loading" v-else>
								<view class="conpon-list-no-data">
									<image src="../../static/images/no-coupon.png" mode=""></image>
									<text>当前没有可使用的优惠券</text>
								</view>
							</view>
						</view>
					</swiper-item>
					<!-- 已使用/过期 -->
					<swiper-item class="swiper-box-item-list">
						<view class="coupon-content-list-box">
							<card-list :CouponList="CouponList3" v-if="isDataThree"></card-list>
							<view class="conpon-list-loading" v-else>
								<view class="conpon-list-no-data">
									<image src="../../static/images/no-coupon.png" mode=""></image>
									<text>当前没有优惠券</text>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from "../../static/js/ajax.js"
	import Title from "../../components/title/title.vue"
	import Tabs from "../../components/tabs/tabs.vue"
	import CardList from "../../components/card-list/card-list.vue"
	export default {
		data() {
			return {
				CouponList1: [],
				CouponList2: [],
				CouponList3: [],
				isDataOne: false,
				isDataTwo: false,
				isDataThree: false,
				isLoading: false,
				TabsList: ["可领取", "可使用", "已使用/已过期"],
				idx: 1,
				isData: false,
				UrlData: {}
			}
		},
		components: {
			Title,
			Tabs,
			CardList,
		},
		onLoad(options) {
			if (options.id == "index") {
				this.idx = 0
				this.GetCoupon(0)
				return;
			}

			if (Object.keys(options).length > 0) {
				// 判断从确认订单页面过来传递过来的参数
				this.UrlData = JSON.parse(options.item)
				this.GetCoupon(1)
			} else {
				this.GetCoupon(1)
			}
			// this.get()
		},
		methods: {
			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				})
			},

			// tab点击
			TabBtn(e) {
				this.idx = e
				// 判断是否有登录
				if (!!uni.getStorageSync("token")) {
					this.GetCoupon(this.idx)
				}
			},
			// 滑动切换列表
			tabChange(e) {
				this.idx = e.detail.current
				// 判断是否有登录
				if (!!uni.getStorageSync("token")) {
					this.GetCoupon(this.idx)
				}
			},

			// 点击领取优惠券
			CouponClick(options) {
				var token = uni.getStorageSync("token")
				// 判断是否已经登录
				if (!!token) {
					uni.showLoading({
						title: '领取中...',
						mask: true
					});
					var data = {
						id: options.id,
						token: uni.getStorageSync("token")
					}
					request({
						url: '/discounts/fetch',
						method: 'GET',
						data: data
					}).then(res => {
						if (res.statusCode == 200) {
							if (res.data.code == 0) {
								// 隐藏加载页效果
								uni.hideLoading();
								uni.showToast({
									title: "领取成功",
									icon: "none"
								})
								this.GetCoupon('0')
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						} else {}

					})
				} else {
					uni.showModal({
						title: "提示信息",
						content: "你还未登录，请先登录",
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: "../../pagesA/login/login"
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}



			},


			// 点击使用优惠券
			CardList(item) {
				// 判断是否从确认订单页过来点击
				if (JSON.stringify(this.UrlData) != "{}") {
					let pages = getCurrentPages(); //获取所有页面栈实例列表
					let nowPage = pages[pages.length - 1]; //当前页页面实例
					let prevPage = pages[pages.length - 2]; //上一页页面实例
					prevPage.$vm.couponId = item.id; //修改上一页面的 couponId 参数值为 value
					prevPage.$vm.couponMoney = item.money; //修改上一页面的 money 

					uni.navigateBack({
						delta: 1
					})
				}
			},



			// 获取优惠券列表
			GetCoupon(idx) {
				var url = ""
				var data = {}
				// idx 等于0 执行可领取列表接口
				if (idx == 0) {
					url = "/discounts/coupons"
					data = {
						token: uni.getStorageSync("token")
					}
				} else {
					url = "/discounts/my"
					var index = 0
					if (idx == 2) {
						index = '1,2,3'
					} else {
						index = 0
					}
					data = {
						status: index,
						token: uni.getStorageSync("token")
					}
				}
				request({
					url: url,
					method: 'GET',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							// 单独判读可领取优惠券
							if (idx == 0) {
								this.isDataOne = true
								if (res.data.data.length == 0) {
									this.isDataOne = false
								}
								this.CouponList1 = res.data.data
							} else if (idx == 1) {
								// 判段从确认订单页面过来 // 否则直接赋值
								this.isDataTwo = true
								if (this.UrlData.type == "pay") {
									this.CouponList2 = []
									res.data.data.forEach(item => {
										if (this.UrlData.money >= item.moneyHreshold) {
											this.CouponList2.push(item)
										}
									})
								} else {
									this.CouponList2 = res.data.data
								}
							} else {
								this.isDataThree = true
								this.CouponList3 = res.data.data
							}

						} else {
							this.isData = false
							// uni.showToast({
							// 	title: res.data.msg,
							// 	icon: "none"
							// })
						}
					} else {}

				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.coupon-box {
		display: flex;
		flex-direction: column;
		height: 100%;

		.coupon-head {}

		.coupon-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			height: calc(100% - 24rpx);
			overflow-y: scroll;

			.coupon-content-tab {}

			.coupon-content-list {
				flex: 1;
				padding: 0 32rpx;
				box-sizing: border-box;
				overflow-y: scroll;
				background: #f7f7f7;
				padding-bottom: 24rpx;

				.swiper-box {
					height: 100%;

					// 隐藏滚动条
					.swiper-box-item-list::-webkit-scrollbar {
						display: none;
					}

					.swiper-box-item-list {
						overflow-y: scroll;

						.coupon-content-list-box {
							height: 100%;

							.conpon-list-loading {
								height: 100%;

								.conpon-list-no-data {
									height: 100%;
									display: flex;
									align-items: center;
									justify-content: center;
									flex-direction: column;

									image {
										width: 208rpx;
										height: 154rpx;
									}

									text {
										margin-top: 39rpx;
										font-size: 22rpx;
										font-weight: 400;
										color: #B2B2B2;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
