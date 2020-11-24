<template>
	<view class="box-wrap">
		<view class="box-top">
			<Title title="我的收藏" @GBack="GBack" :isGBack="true"></Title>
			<view class="shopping-box-title" v-if="isData">
				<view class="shoppping-title-num">共 {{TotalShopping}} 件商品</view>
				<view class="shopping-title-select-all" @click="Manage">
					<!-- <text>全选</text>
					<text>取消收藏</text> -->
				</view>
			</view>
		</view>
		<view class="shopping-box" v-show="isData">
			<view class="shopping-list-box">
				<mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
					<view :key="index" v-for="(item, index) in shoppingList" class="shopping-list">
						<view :data-index="index" class="order-item flex">
							<!-- <view class="shopping-check" @click="checkBox(index)">
							<text class="check-ico" v-if="!item.isCheck"></text>
							<image src="../../static/images/check.png" mode="" v-else></image>
						</view> -->
							<view class="shopping-content" @click="GoodsDetails(item.goodsId)">
								<view class="shopping-img">
									<image :src="item.pic" mode=""></image>
								</view>
								<view class="shopping-info">
									<view class="shopping-info-title">
										{{item.goodsName}}
									</view>
									<view class="shopping-info-center">
										<!-- 颜色：红色 -->
									</view>
									<view class="shopping-info-bottom">
										<view class="shopping-info-price">
											收藏时间：{{item.dateAdd}}
											<!-- ￥<text class="x-price">{{item.price | PriceTow}}</text> -->
										</view>
										<view class="shopping-info-stepper" @click.stop="CancalColl(item.goodsId,item.id)">
											<image src="../../static/images/store-active.png" mode="aspectFill" v-if='item.isCheck'></image>
											<image src="../../static/images/store.png" mode="aspectFill" v-else></image>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</mescroll-uni>
			</view>
		</view>
		<view class="shopping-box" v-show="!isData">
			<view class="shopping-collect-no-data" v-if="!isLoading">
				<Loading></Loading>
			</view>
			<view class="shopping-collect-no-data" v-else>
				<view class="shopping-collect-no-data-img">
					<image src="../../static/images/no-store.png" mode=""></image>
				</view>
				<view class="shopping-collect-text">
					暂时没有任何收藏
				</view>
				<view class="shopping-collect-btn" @click="AddCollect">
					随便看看
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Title from "../../components/title/title.vue"
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import Loading from "../../components/loading/loading.vue"
	import {
		request
	} from '../../static/js/ajax.js'
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	// 引入vuex
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				isData: false, //判断是否有数据
				isLoading: false,
				shoppingList: [],
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
			};
		},
		components: {
			Title,
			MescrollUni,
			Loading
		},
		// 过滤器
		filters: {
			PriceTow(value) {
				return value.toFixed(2)
			}
		},
		// 计算属性
		computed: {
			// 计算商品总共多少种
			TotalShopping() {
				return this.shoppingList.length
			},
		},
		watch: {
			shoppingList(value) {
				this.shoppingList = value
			},
		},
		onLoad: function(options) {
			// console.log("收藏列表")
			var token = uni.getStorageSync("token")
			// 判断是否登录
			if (!!token) {
				// 拿到vuex里面的数据赋值 
				if (this.$store.state.CollectionList.length != 0) {
					this.isData = true
					this.isLoading = true
					this.shoppingList = this.$store.state.CollectionList
				}
				this.getData()
			} else {
				this.isData = false
				this.isLoading = true
				// console.log(this.isData,this.isLoading)
			}


		},
		onShow() {

		},
		onHide() {

		},
		methods: {
			...mapMutations(['VuexCollectionList']), // 引入vuex 里的事件

			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1@p3ZURq5gAq397N
				})
			},

			/*下拉刷新的回调*/
			downCallback() {
				setTimeout(() => {
					// this.mescroll.showUpScroll() // 显示上拉加载布局
					this.PageNumber = 1
					this.getData();
					
					// this.shoppingList.forEach(item=>{
					// 	item.isCheck = false
					// })
				}, 500)
			},

			/*上拉加载的回调*/
			upCallback(page) {
				this.PageNumber++
				this.getData();
			},

			// 商品详情
			GoodsDetails(e) {
				uni.navigateTo({
					url: "../../pagesA/goods-details/goods-details?id=" + e
				})
			},
			// 点击取消收藏
			CancalColl(goodsId, id) {
				this.shoppingList.forEach((item, index) => {
					if (item.goodsId == goodsId) {
						var url = item.isCheck ? '/shop/goods/fav/delete' : '/shop/goods/fav/add'
						var data = {}
						if (item.isCheck) {
							data = {
								goodsId: goodsId,
								id: id,
								token: uni.getStorageSync("token")
							}
						} else {
							data = {
								goodsId: goodsId,
								token: uni.getStorageSync("token")
							}
						}
						request({
							url: url,
							method: 'POST',
							data: data
						}).then(res => {
							if (res.statusCode = 200) {
								if (res.data.code == 0) {
									// 设置选中状态
									Object.assign(item, {
										isCheck: !item.isCheck
									})
									// this.$set(this.shoppingList,'isCheck', !item.isCheck)
									uni.showToast({
										title: item.isCheck ? '添加收藏成功' : '取消收藏成功',
										icon: "none"
									})
								}
							}
						})
					}
				})
			},

			// 随便看看按钮
			AddCollect() {
				uni.switchTab({
					url: "../../pages/index/index"
				})
			},


			// 读取商品收藏数据
			getData() {
				// this.isData = false
				let data = {
					page: this.PageNumber,
					pageSize: this.PageLimt,
					token: uni.getStorageSync("token")
				}

				request({
					url: '/shop/goods/fav/list',
					method: 'GET',
					data: data
				}).then(res => {
					if (res.statusCode = 200) {
						this.isLoading = true
						if (res.data.code == 0) {
							res.data.data.map(v => {
								// console.log(v)
								Object.assign(v, {
									isCheck: true
								})
							})


							this.shoppingList = this.shoppingList.concat(res.data.data)

							// 数组去重 避免重复添加数据
							let hash = {};
							this.shoppingList = this.shoppingList.reduce((preVal, curVal) => {
								hash[curVal.goodsId] ? '' : hash[curVal.goodsId] = true && preVal.push(curVal);
								return preVal
							}, [])

							this.isData = true
							// console.log(this.shoppingList)

							// 往对象之中添加一条新的数据
							// this.shoppingList.forEach((item) => {
							// 	// Object.assign(item, {
							// 	// 	isCheck: true
							// 	// })
							// 	Object.assign({}, this.shoppingList, { isCheck: true })
							// })

							this.mescroll.endSuccess()
							// 判断返回的数组长度是否大于请求的条数
							if (res.data.data.length < this.PageLimt) {
								this.mescroll.showNoMore()
							}

						} else if (res.data.code = 700) {
							this.mescroll.endErr()
							// this.mescroll.showNoMore()
							this.isData = false
							this.isLoading = true
						}

						// vuex 里面的方法
						this.VuexCollectionList(this.shoppingList) // 把数据存进vuex
					}
				})
			},
		}
	};
</script>

<style lang="scss">
	.box-wrap {
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background: #F7F7F7;

		.box-top {
			.shopping-box-title {
				display: flex;
				align-items: center;
				padding: 0 32rpx;
				box-sizing: border-box;
				justify-content: space-between;
				width: 100%;
				height: 87rpx;
				background: #fff;
				font-size: 24rpx;

				.shoppping-title-num {
					color: #656565;
				}

				.shopping-title-select-all {
					color: #E53947;
				}
			}
		}

		.shopping-box {
			width: 100%;
			height: 100%;
			flex: 1;
			overflow-y: scroll;
			overflow-x: hidden;
			background: #fff;

			.shopping-list-box {
				width: 100%;
				height: 100%;

				// overflow-y: scroll;

				.shopping-list {
					position: relative;
					margin-bottom: 40rpx;
					padding: 0 32rpx;
					box-sizing: border-box;
					// background: #fff;

					.order-item {
						position: relative;
						// height: 200rpx;
						width: 100%;

						.shopping-check {
							display: flex;
							align-items: center;
							justify-content: center;
							padding: 30rpx 24rpx 30rpx 0;
							box-sizing: border-box;

							.check-ico {
								display: block;
								width: 32rpx;
								height: 32rpx;
								border-radius: 50%;
								border: 1px solid #d6d3d3;
							}

							image {
								width: 36rpx;
								height: 36rpx;
							}
						}

						.shopping-content {
							height: 100%;
							flex: 1;
							display: flex;
							align-items: center;
							// padding: 20rpx 0;
							box-sizing: border-box;
							// justify-content: center;

							.shopping-img {
								width: 160rpx;
								height: 160rpx;
								border-radius: 20rpx;

								image {
									width: 100%;
									height: 100%;
									border-radius: 20rpx;
								}
							}

							.shopping-info {
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								flex: 1;
								height: 160rpx;
								margin-left: 20rpx;

								.shopping-info-title {
									width: 100%;
									text-overflow: -o-ellipsis-lastline;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 2;
									line-clamp: 2;
									-webkit-box-orient: vertical;
									font-size: 28rpx;
									color: #333;
									font-weight: 400;
								}

								.shopping-info-center {
									color: #666;
									font-size: 24rpx;
								}

								.shopping-info-bottom {
									display: flex;
									justify-content: space-between;

									.shopping-info-price {
										font-size: 20rpx;
										color: #E53948;

										.x-price {
											font-size: 28rpx;
										}

									}

									.shopping-info-stepper {
										display: flex;
										width: 32rpx;
										height: 32rpx;

										image {
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


			.shopping-collect-no-data {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				height: 100%;

				.shopping-collect-no-data-img {
					width: 208rpx;
					height: 154rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.shopping-collect-text {
					margin-top: 39rpx;
					font-size: 22rpx;
					font-weight: 400;
					color: #B2B2B2;
				}

				.shopping-collect-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 180rpx;
					height: 64rpx;
					margin-top: 59rpx;
					border: 1rpx solid rgba(153, 153, 153, 1);
					border-radius: 32rpx;
					font-size: 24rpx;
					color: #999999;
				}
			}
		}


		.uni-popup-dialog {
			margin: auto;
		}

		.uni-popup__wrapper-box {
			width: 100%;

			.pop-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: column;
				width: 600rpx;
				height: 300rpx;
				padding: 30rpx;
				background: #fff;
				margin: auto;
				box-sizing: border-box;
				border-radius: 25rpx;

				.pop-box-title {
					color: #333;

				}

				.pop-box-stepper {
					width: 300rpx;
					height: 80rpx;
					background: red;
				}

				.pop-box-btn {
					display: flex;
					width: 100%;
					justify-content: space-between;

					.pop-cancel,
					.pop-confirm {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 240rpx;
						height: 70rpx;
						border-radius: 50rpx;
						font-size: 28rpx;
					}

					.pop-cancel {
						border: 1px solid #d80421;
						color: #d80421;
					}

					.pop-confirm {
						background: linear-gradient(to right, #c32e4a, #d80421);
						color: #fff;
					}
				}
			}
		}

	}
</style>
