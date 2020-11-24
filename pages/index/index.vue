<template>
	<view class="content flex">
		<view class="content-top flex" :style="{paddingTop:paddingTop +'px'}">
			<view class="content-address flex" @click="getLocation">
				<image src="../../static/images/address.png" mode="" class="address-ico"></image>
				<text class="address-title">{{CityName}}</text>
				<image src="../../static/images/jt.png" mode="" class="address-jt"></image>
			</view>
			<view class="content-search flex" @click="Search">
				<image src="../../static/images/search-ico.png" mode=""></image>
				<text>搜索</text>
			</view>
			<!-- <button class="sys_btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">{{loginInfo.openid != "" && loginInfo.openid != undefined ? "已授权" : "小程序授权"}}</button> -->
		</view>
		<view class="index-box">
			<!-- :height="mesHeight" -->
			<mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
				<!-- 轮播图 -->
				<Swiper :ImgList="BannerList" @Details='BannerDetails' style="height:auto;padding:0rpx 0 34rpx;background: #fff;"></Swiper>
				<!-- 分类列表 -->
				<menu-list :TabList="TabList" @catClick="Category"></menu-list>
				<!-- 限时折扣 -->
				<discount-list :DataList="GoodsList" @details='GoodsDetails'></discount-list>
				<!-- 热门精选 -->
				<good-list :GoodsList='GoodsList' @ListTab='GoodsDetails' @store="StoreBtn" style="width: 100%;margin-top: 16rpx;"></good-list>
			</mescroll-uni>
			<!-- 可领取优惠券弹出层 -->
			<uni-popup ref="popup" type="dialog" :maskClick='false' style="height: 100%;">
				<view class="popup-box">
					<view class="popup-box-info">
						<view class="popup-info-top">
							<text class="popup-info-title">优惠券待领</text>
							<text class="popup-info-text"> 您当前还有{{CouponLength}}张优惠券未领请尽快领取哦～</text>
						</view>
						<view class="popup-info-bottom">
							<view class="popup-info-bottom-btn" @click="CouponBtn">前往领取</view>
						</view>
					</view>
					<view class="popup-box-close" @click="CouponColse"></view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from '../../static/js/ajax.js'
	import MescrollMixin from "../../components/mescroll-uni/mescroll-mixins.js";
	import Swiper from '@/components/swiper/swiper.vue'
	import MenuList from '@/components/menu-list/menu-list.vue'
	import DiscountList from '@/components/discount-list/discount-list.vue'
	import GoodList from '@/components/goods-list/goods-list.vue'
	import MsTab from '../../components/ms-tabs/ms-tabs.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'

	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	// 引入vuex
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				mesHeight: "100%",
				downOption: { // 下拉刷新配置
					auto: false,
				},
				upOption: { // 上拉加载配置
					noMoreSize: 5,
					textLoading: "正在加载更多数据",
					textNoMore: "——  已经到底了  ——",
					isBounce: true,
					auto: false,
				},
				PageNumber: 1, // 请求页数，
				PageLimt: 10, // 请求条数
				TabList: [],
				active: 0,
				paddingTop: 0,
				BannerList: [],
				DataList: 10,
				GoodsList: [],
				CityName: '请选择',
				shoppingList: [], // 存储购物车数据
				shoppNums: 0,
				CouponLength: 0, // 可领取优惠券数量
			}
		},
		watch: {
			active() {
				console.log(this.active) // 0
			}
		},
		components: {
			Swiper,
			MenuList,
			DiscountList,
			GoodList,
			MsTab,
			uniPopup,
			MescrollUni
		},
		onLoad(options) {
			var that = this

			// 获取通过扫码传递过来的用户id
			if (JSON.stringify(options) !== "{}") {
				uni.setStorageSync("userId", options.scene)
			} else {

			}

			uni.getSystemInfo({
				success: function(res) {
					that.paddingTop = res.statusBarHeight
				}
			});

			this.getBanner();
			this.GetCoupon() // 获取优惠券列表
		},
		onShow(e) {

			this.GetShoppingList() // 请求购物车列表接口，便于显示购物车数量
			this.GetStore();

			this.PageNumber = 1
			this.GoodsData();

			// 获取城市名称
			let city = uni.getStorageSync("CityName")
			if (Boolean(city)) {
				this.CityName = city
			}
		},

		mounted() {
			// uni.setStorageSync("token", "72cbf236-d0b6-4926-9aea-51bede611ead")
		},
		methods: {
			...mapMutations(['ClikSortIndex']), // 引入vuex 里的事件

			// 搜索
			Search() {
				uni.navigateTo({
					url: "../../pagesC/search/search"
				})
			},
			// 轮播图点击
			BannerDetails(e) {
				var SKID = ""
				if (JSON.stringify(e) != "{}") {
					SKID = e.detail.__args__[0]
				} else {
					SKID = e
				}

				uni.navigateTo({
					url: "../../pagesA/goods-details/goods-details?id=" + SKID
				})
			},

			/*下拉刷新的回调*/
			downCallback() {
				this.PageNumber = 1
				setTimeout(() => {
					this.GoodsData();
				}, 500)
			},

			/*上拉加载的回调*/
			upCallback(page) {
				this.PageNumber++
				this.GoodsData();
				console.log("上拉加载")
			},



			// 获取分类菜单
			GetStore() {
				request({
					url: '/shop/goods/category/all',
					method: 'GET',
					data: {}
				}).then(res => {
					if (res.statusCode == 200) {
						res.data.data.map((item, index) => {
							if (item.level == 1) {
								// 拿取到一级分类 只拿取前七个 用于界面显示 ，
								if (this.TabList.length == 7) {
									return
								}
								this.TabList.push(item)
							}
						})
					} else {}

				})
			},
			// 分类菜单点击
			Category(index) {

				// vuex 里的 事件  传递下标
				this.ClikSortIndex(index)

				// 跳转到分类列表页
				uni.switchTab({
					url: "../sort/sort"
				})
			},

			// 商品列表
			GoodsData() {
				var dataArr = []
				request({
					url: '/shop/goods/list',
					method: 'GET',
					data: {
						page: this.PageNumber,
						pageSize: this.PageLimt,
						// recommendStatus: 1,
						token: uni.getStorageSync("token")
					}
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							// this.GoodsList = [] // 
							res.data.data.map((item, index) => {
								Object.assign(item, {
									isStore: false
								})
							})
							this.GoodsList = this.GoodsList.concat(res.data.data)
							// 数组去重 避免重复添加数据
							let hash = {};
							this.GoodsList = this.GoodsList.reduce((preVal, curVal) => {
								hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
								// console.log(preVal)
								return preVal
							}, [])


							// token 登录执行  分辨是否有添加收藏
							if (!!uni.getStorageSync("token")) {
								// 执行商品收藏接口
								this.getCollectData(res.data.data)
							} else {
								// //登录过期则清除
								uni.removeStorageSync("isCanUse")
								uni.removeStorageSync("nickName")
								uni.removeStorageSync("avatarUrl")
								uni.removeStorageSync("token")
								uni.removeStorageSync("userId")
								this.isCanUse = false
								// 没有登录就改变收藏状态
								this.GoodsList.map((item, index) => {
									item.isStore = false
								})
							}


							this.mescroll.endSuccess() // 请求成功 隐藏加载状态
							if (res.data.data.length < this.PageLimt) {
								this.mescroll.showNoMore()
							}

						} else if (res.data.code == 700) {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}

					} else {}

				})
			},

			// 点击商品 ，进入详情
			GoodsDetails(e) {
				uni.navigateTo({
					url: "../../pagesA/goods-details/goods-details?id=" + e
				})
				// console.log(e)
			},

			// 收藏点击
			StoreBtn(option) {
				var token = uni.getStorageSync("token")

				if (!!token) {
					let data = {
						goodsId: option.id,
						token: uni.getStorageSync("token")
					}

					this.GoodsList.forEach(item => {
						if (item.id == option.id) {
							if (option.store == 'store') {
								request({
									url: '/shop/goods/fav/add',
									method: 'POST',
									data: data
								}).then(res => {
									if (res.statusCode == 200) {
										if (res.data.code == 0) {
											uni.showToast({
												title: '收藏成功',
												icon: "none"
											})
											item.isStore = true // 改变收藏状态
										} else if (res.data.code == 2000) {
											uni.showToast({
												title: res.data.msg,
												icon: 'none'
											})
										}
									} else {}
								})
							} else {
								request({
									url: "/shop/goods/fav/delete",
									method: 'POST',
									data: data
								}).then(res => {
									if (res.statusCode == 200) {
										if (res.data.code == 0) {
											uni.showToast({
												title: "取消收藏成功",
												icon: "none"
											})
											item.isStore = false // 改变收藏状态
										} else {
											uni.showToast({
												title: "取消收藏失败",
												icon: "none"
											})
										}
									}
								})
							}

						}
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

			// 读取商品收藏列表数据
			getCollectData(getdata) {
				let data = {
					token: uni.getStorageSync("token")
				}
				request({
					url: '/shop/goods/fav/list',
					method: 'GET',
					data: data
				}).then(res => {
					if (res.statusCode = 200) {
						if (res.data.code == 0) {

							this.GoodsList = this.GoodsList.concat(getdata)
							// 是否收藏
							for (var i = 0; i < this.GoodsList.length; i++) {
								for (var j = 0; j < res.data.data.length; j++) {
									if (this.GoodsList[i].id == res.data.data[j].goodsId) {
										this.GoodsList[i].isStore = true
										break;
									} else {
										this.GoodsList[i].isStore = false
									}
								}
							}


							//  //数组去重 避免重复添加数据
							let hash = {};
							this.GoodsList = this.GoodsList.reduce((preVal, curVal) => {
								hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
								return preVal
							}, [])
							// console.log(this.GoodsList)
						} else if (res.data.code = 700) {
							// 已收藏的全变为未收藏
							this.GoodsList.map((item, index) => {
								Object.assign(item, {
									isStore: false
								})
							})
						}
					}
				})
			},


			// 获取轮播图
			getBanner() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				});

				request({
					url: '/banner/list',
					method: 'GET',
					data: {}
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							// 隐藏加载页效果
							uni.hideLoading();
							this.BannerList = res.data.data
						}
					}
				})
			},

			// 请求购物车列表接口
			GetShoppingList() {
				let data = {
					token: uni.getStorageSync("token")
				}
				request({
					url: '/shopping-cart/info',
					method: 'GET',
					data: data
				}).then(res => {
					if (res.statusCode = 200) {
						if (res.data.code == 0) {
							this.shoppingList = []
							// 往对象之中添加一条新的数据
							res.data.data.items.map((item, index) => {
								this.shoppingList.push(Object.assign({}, item, {
									right: 0,
									isCheck: false
								}))
							})
							// 存储购物车数据
							uni.setStorage({
								key: 'ShoppingList',
								data: JSON.stringify(this.shoppingList),
							});
							this.shoppNums = res.data.data.items.length
							uni.setStorageSync("shoppingNum", this.shoppNums)

						} else {
							this.shoppNums = 0
						}
					}
					// 设置购物车气泡数量
					if (this.shoppNums != 0) {
						uni.setTabBarBadge({
							index: 2,
							text: "" + this.shoppNums + "",
							success: (res) => {}
						})
					} else {
						uni.removeTabBarBadge({
							index: 2
						})
					}
				})
			},
			// 获取优惠券列表  判断是否有未领取优惠券
			GetCoupon() {
				let data = {
					token: uni.getStorageSync("token")
				}
				request({
					url: "/discounts/coupons",
					method: 'GET',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.CouponLength = res.data.data.length
							if (res.data.data.length != 0) {
								this.$refs.popup.open() // 打开弹出层
								// wx.hideTabBar({})
							} else {
								this.$refs.popup.close()
							}
						} else {

						}
					} else {}
				})
			},

			// 前往领取优惠券按钮
			CouponBtn() {
				uni.navigateTo({
					url: "../../pagesA/coupon-list/coupon-list?id=index",
					success: (res) => {
						// wx.showTabBar({})
						this.$refs.popup.close()
					},
				})

			},
			// 关闭可领取优惠券弹出层
			CouponColse() {
				// wx.showTabBar({})
				this.$refs.popup.close()
			},


			// 定位跳转
			getLocation() {
				uni.navigateTo({
					url: "../../pagesC/address-page/address-page"
				})
			},

		},

	}
</script>

<style lang="scss" scoped>
	.content {
		// padding: 0 20rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: #f7f7f7;

		.content-top {
			width: 100%;
			height: 90rpx !important;
			justify-content: end;
			background: $uni-bg-color-top;

			.content-search {
				padding: 10rpx;
				// opacity:0.2;
				border-radius: 56rpx;
				background: rgba(255, 255, 255, 0.2);
				font-family: PingFang SC;
				font-weight: 400;

				image {
					width: 24rpx;
					height: 24rpx;
				}

				text {
					margin-left: 10rpx;
					color: #ccc;
					font-size: 26rpx;
				}
			}

			.content-address {
				width: 200rpx;
				height: 100%;
				display: flex;
				align-items: center;

				.address-ico {
					width: 32rpx;
					height: 32rpx;
				}

				.address-title {
					margin: 0 10rpx;
					color: #fff;
					font-size: 28rpx;
				}

				.address-jt {
					width: 12rpx;
					height: 22rpx;
				}

			}

			.content-search {
				width: 328rpx;
			}
		}

		// 隐藏滚动条
		// .index-box::-webkit-scrollbar {
		// 	display: none;
		// }

		.index-box {
			// position: relative;
			width: 100%;
			flex: 1;
			// height: 2000rpx;
			// overflow-y: scroll;



			.popup-cover {
				position: fixed;
				width: 100%;
				height: calc(100% - 90rpx);
				background: rgba(0, 0, 0, 0.5);
				display: flex;
				justify-content: center;
				align-items: center;
			}

		}

		.popup-box {
			position: relative;
			width: 571rpx;
			height: 511rpx;
			background: url("https://dcdn.it120.cc/2020/07/14/1aa417b5-df87-48a4-8d30-958c9f50917c.png");
			background-size: contain;

			.popup-box-info {
				.popup-info-top {
					height: 318rpx;
					padding: 0 125rpx;
					box-sizing: border-box;

					.popup-info-title {
						display: block;
						position: relative;
						padding: 55rpx 0;
						font-size: 36rpx;
						font-weight: 500;
						color: #1D1D26;
						text-align: center;

					}

					.popup-info-title::after,
					.popup-info-title::before {
						position: absolute;
						top: 0;
						bottom: 0;
						margin: auto;
						content: '';
						width: 52rpx;
						height: 1rpx;
						background: #1d1d26;
					}

					.popup-info-title::after {
						right: 0;
					}

					.popup-info-title::before {
						left: 0;
					}

					.popup-info-text {
						display: block;
						line-height: 40rpx;
						text-align: center;
						font-size: 28rpx;
						font-weight: 400;
						color: #1D1D26;
					}
				}

				.popup-info-bottom {
					height: 192rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.popup-info-bottom-btn {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 260rpx;
						height: 72rpx;
						background: #F5D045;
						border-radius: 36rpx;
						font-size: 28rpx;
						color: #1E1E27;
					}
				}
			}

			.popup-box-close {
				width: 83rpx;
				height: 83rpx;
				position: absolute;
				left: 0;
				right: 0;
				bottom: -160rpx;
				margin: auto;
				background: url(../../static/images/coupon-close.png);
				background-size: contain;
			}
		}
	}
</style>
