<template>
	<view class="box-wrap">
		<view class="box-top">
			<Title title="分类"></Title>
		</view>
		<view class="list_box">
			<!-- 菜单左边 -->
			<view class="left">
				<view class="item" :class="{'active-bg':index==Index}" v-for="(item,index) in leftArray" :key="index" @tap="leftTap"
				 :data-index="index" :data-id="item.id">
					<text class="item-btn" :class="{ 'active':index==Index }"></text>
					{{item.name}}
				</view>
			</view>
			<view class="main">
				<view class="marin-shopping" v-if="isData" style="margin-left: 40rpx;">
					<view class="shopping-list" v-for="(item,index) in goodsList" :key="index">
						<view class="shopping-list-title">
							<text>{{item.name}}</text>
						</view>
						<view class="shopping-list-bottom">
							<view class="goods-list" v-for="(el,idx) in item.goodList" :key="el.id" @click="GoodsDetails(el.id)">
								<view class="goods-list-img">
									<image :src="el.pic" mode=""></image>
								</view>
								<view class="goods-list-info">
									<view class="goods-info-top">
										{{el.name}}
									</view>
									<view class="goods-info-center">
										销量：20552
									</view>
									<view class="goods-info-bottom">
										<view class="goods-price">
											￥<text>{{el.minPrice | PriceTow}}</text>
										</view>
										<!-- #ifdef APP-PLUS -->
										<view class="goods-add" @click.stop="GoodsAdd(el.id,goods)">
											<image src="../../static/images/shopping-ico.png" mode=""></image>
										</view>
										<!-- #endif -->
										<!-- #ifdef H5 -->
										<view class="goods-add" @click.stop="GoodsAdd(el.id,'goods')">
											<image src="../../static/images/shopping-ico.png" mode=""></image>
										</view>
										<!-- #endif -->
										<!-- #ifdef MP-WEIXIN -->
										<view class="goods-add" :data-goods='el' data-type="goods" @click.stop="GoodsAdd(el.id,'goods')">
											<image src="../../static/images/shopping-ico.png" mode=""></image>
										</view>
										<!-- #endif -->
									</view>
								</view>
							</view>
						</view>
					</view>


				</view>
				<view class="marin-shopping main-shopping-no-data" v-else>
					<view class="shopping-loading" v-if="isLoading">
						<image src="../../static/images/no-sort.png" mode=""></image>
						<text>商家正在努力上新中</text>
					</view>
					<view class="shopping-loading" v-else>
						<Loading></Loading>
						<!-- 加载中... -->
					</view>

				</view>
			</view>
			<uni-popup ref="popup" type="bottom" :maskClick='false'>
				<popup-details :popInfo='popInfo' :isPopup="isPopup" @PopClose="PopClose" @checkBtn="CheckBtn" @ShoppingBtn="AddShopping" @CheckActive="CheckActive"></popup-details>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from '../../static/js/ajax.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import PopupDetails from '../../components/popup-details/popup-details.vue'
	import Title from "../../components/title/title.vue"
	import Loading from "../../components/loading/loading.vue"

	// 引入vuex
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				Index: 0,
				getIndex: 0,
				leftArray: [],
				goodsList: [],
				listData: [], // 存储点击过的数据
				arrId: [],
				isData: false,
				isLoading: false,
				isPopup:false,// 弹出层是否弹出了  （状态）
				popInfo: {
					basicInfo: {
					pic: "",
					minPrice: 0,
					stores: ""
				}},
				shoppNums: 0, // 购物车数量
				shoppingList: [], //存储购物车列表数据
				isFlag: false,
				detailsIndex: -1,
				sortId: '', //  菜单栏id
			}
		},
		// 过滤器
		filters: {
			PriceTow(value) {
				return value.toFixed(2)
			}
		},
		components: {
			uniPopup,
			PopupDetails,
			Title,
			Loading
		},
		onLoad() {
			this.LeftMenu();
			this.GetShoppingList() // 获取购物车数据
		},
		onShow() {

			// 第一次加载 默认为false
			// if (this.isFlag) {
			this.MentCheck()
			// }

		},

		methods: {
			...mapMutations(['VuexSortListData', 'ClikSortIndex']), // 引入vuex 里的事件

			// 当前选中点击
			CheckActive(item) {
				this.popInfo = item
			},

			// 首页点击菜单栏跳转到 分类列表  显示对应的列表
			MentCheck() {
				var sortIndex = this.$store.state.sortIndex
				if (sortIndex == -1) {
					this.getIndex = 0
				} else {
					this.getIndex = sortIndex
				}
				this.Index = this.getIndex

				// 获取存储的数据
				if (this.$store.state.SortListData.length != 0) {
					this.$store.state.SortListData.forEach(v => {
						if (v.categoryId == this.leftArray[this.Index].id) {
							this.goodsList = v.arrList
						}
					})
				}

				if (this.leftArray.length != 0) {
					let data = {
						categoryId: this.leftArray[this.getIndex].id,
					}
					// 获取右侧对应的数据
					// this.goodsList=[]
					this.RightGetData(data);
				}
				// this.isData = false
			},



			// 添加商品
			GoodsAdd(e, type) {
				var token = uni.getStorageSync("token")
				// 判断是否登录
				if (token != '') {
					var datalist = {}
					var SKID = ''
					switch (type) {
						case 'goods':
							SKID = e
							datalist = {
								goodsId: e,
								number: 1,
								token: uni.getStorageSync("token")
							}
							break;
						case 'popgoods':
							datalist = {
								goodsId: e.id,
								number: e.number,
								sku: JSON.stringify(e.sku),
								token: uni.getStorageSync("token")
							}
							break
					}
					request({
						url: '/shopping-cart/add',
						method: 'POST',
						data: datalist
					}).then(res => {
						if (res.statusCode == 200) {
							// 等于 30002 代表有多规格商品
							if (res.data.code == 30002) {
								this.GetDataDetails(SKID) // 执行详情接口
							} else if (res.data.code == 0) {
								uni.showToast({
									title: '添加成功'
								})
								this.GetShoppingList() // 调用购物车列表接口，
								this.PopClose() // 调用关闭弹出事件
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
								// this.login()
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}

			},
			// 获取详情
			GetDataDetails(id) {
				let data = {
					id: id,
					token: uni.getStorageSync("token")
				}
				request({
					url: '/shop/goods/detail',
					method: 'GET',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.popInfo = res.data.data
							this.$refs.popup.open() // 详情获取成功后 弹出弹出层
							this.isPopup = true;
							uni.hideTabBar({
								// animation: true
							})
							// 往数组对象里面添加一条属性
							if (this.popInfo.properties != undefined) {
								this.popInfo.properties.forEach(el => {
									el.childsCurGoods.map((item, index) => {
										item.active = false
									})
								})
							}
						} else if (res.data.code = 700) {

						}
					}
				})
			},


			// 获取左侧菜单栏数据
			LeftMenu() {
				// this.leftArray = []
				this.goodsList = [];
				this.isData = false;
				this.isLoading = false
				request({
					url: '/shop/goods/category/all',
					method: 'GET',
					data: {}
				}).then(res => {
					if (res.statusCode == 200) {
						this.leftArray = []
						res.data.data.map((item) => {
							// 拿取第一级分类 过滤第二级
							if (item.level == 1) {
								this.leftArray.push(item)
							}
						})
					} else {}
					this.sortId = this.leftArray[this.getIndex].id
					let data = {
						categoryId: this.leftArray[this.getIndex].id,
					}
					// 获取右侧对应的数据
					this.RightGetData(data);
				})

			},

			// 获取右侧商品数据
			RightGetData(data) {
				this.arrId = []
				request({
					url: '/shop/goods/list',
					method: 'GET',
					data: data
				}).then(res => {
					this.isLoading = true
					if (res.data.code == 0) {
						this.isFlag = true // 第一次加载
						this.isData = true

						this.rightArray = res.data.data

						// 循环push 当前商品的 categoryId , 放到一个数组里
						res.data.data.forEach(element => {
							this.arrId.push(element.categoryId)
						});

						// 分类详情
						this.sortFn(res.data.data)
					} else if (res.data.code == 700) {
						this.isData = false
						// console.log("暂无数据")
					}
				})
			},

			/* 左侧导航点击 */
			leftTap(e) {
				let index = e.currentTarget.dataset.index;
				let id = e.currentTarget.dataset.id;
				// 避免重复点击 执行接口
				if (index !== this.Index) {
					this.Index = index;

					// vuex 里的 事件  传递下标
					this.ClikSortIndex(index)

					if (this.$store.state.SortListData.length != 0) {
						this.$store.state.SortListData.forEach(v => {
							if (v.categoryId == id) {
								this.goodsList = v.arrList
							}
						})
					}


					let data = {
						categoryId: id,
					}
					this.RightGetData(data)
					this.sortId = id // 菜单栏id 
				}

			},

			async sortFn(goodsData) {
				let arr = [...new Set(this.arrId)]
				let arrlist = []
				let listStr = {}
				let str = {}
				let goodArr = []
				let flag = false

				// 数组不为空执行
				if (arr.length != 0) {
					// 循环拿到商品类别名称
					arr.forEach(async (ele) => {
						let data = {
							id: ele,
							token: uni.getStorageSync("token")
						}
						const res = await request({
							url: '/shop/goods/category/info',
							method: 'GET',
							data: data
						});

						// console.log('res：', res)

						if (res.statusCode == 200) {
							if (res.data.code == 0) {
								this.isData = true
								// this.isLoading = true
								// 循环商品，根据数组里的id 判断
								goodsData.forEach(el => {
									if (el.categoryId == ele) {
										goodArr.push(el)
										str = {
											name: res.data.data.info.name,
											goodList: goodArr
										}
									}
								})
								arrlist.push(str)
								goodArr = []
							}
						}
					})
					// 判断是有点击过加载过
					if (this.listData.length != 0) {
						this.listData.forEach(item => {
							if (item.categoryId === this.sortId) {
								flag = true
							}
						})
					} else {
						this.goodsList = arrlist
					}

					if (!flag) {
						this.goodsList = arrlist
					}


					listStr = {
						categoryId: this.sortId,
						arrList: arrlist
					}
					await this.listData.push(listStr)


					let res = []
					let obj = {}
					for (let i = 0; i < this.listData.length; i++) {
						if (!obj[this.listData[i].categoryId]) {
							res.push(this.listData[i])
							obj[this.listData[i].categoryId] = true
						}
					}

					// vuex 里面的方法  
					this.VuexSortListData(res) // 把数据存进vuex
				}




			},

			// 点击跳转详情
			GoodsDetails(id) {
				uni.navigateTo({
					url: '../../pagesA/goods-details/goods-details?id=' + id
				})
			},

			// 关闭弹出层
			PopClose() {
				this.$refs.popup.close() // 详情获取成功后 弹出弹出层
				this.isPopup = false
				uni.showTabBar({
					// animation: true
				})
			},
			// 规格选择点击
			CheckBtn(e) {
				this.popInfo = item
			},
			// 获取价格
			getPrice(data) {
				request({
					url: '/shop/goods/price',
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							// this.goodsTitle = '已选：'+res.data.data.propertyChildNames // 已选商品
							this.goodsPrice = res.data.data.price // 价格
							this.stores = res.data.data.stores // 库存数量

						} else if (res.data.code = 700) {

						}
					}
				})
			},

			// 加入购物车按钮
			AddShopping(options) {
				const SkuLength = options.DataList.properties.length // 有几组SKU
				var sku = []
				options.DataList.properties.forEach(p => {
					const o = p.childsCurGoods.find(ele => {
						return ele.active
					})
					if (!o) {
						return
					}
					sku.push({
						optionId: o.propertyId,
						optionValueId: o.id
					})
				})

				if (sku.length != SkuLength) {
					uni.showToast({
						title: '请选择规格',
						icon: 'none'
					})
					return
				}
				let optionsArr = {
					sku: sku,
					id: options.DataList.basicInfo.id,
					number: options.number
				}
				this.GoodsAdd(optionsArr, 'popgoods')
			},

			// 请求购物车列表接口
			GetShoppingList() {
				this.shoppNums = 0
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
							res.data.data.items.map((item, index) => {
								// 往对象之中添加一条新的数据
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

		}
	}
</script>

<style lang="scss" scoped>
	.box-wrap {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #fff;

		.box-top {
			width: 100%;
			// height: 90rpx;
		}

		.list_box {
			flex: 1;
			overflow-y: scroll;
			height: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: flex-start;
			align-content: flex-start;
			font-size: 28rpx;

			.left {
				width: 180rpx;
				height: 100%;
				overflow: scroll;
				background-color: #fff;
				// line-height: 80rpx;
				box-sizing: border-box;
				font-size: 28rpx;
				background: #f7f7f7;

				.item-btn {
					position: absolute;
					left: 0;
					display: block;
					width: 8rpx;
					height: 40rpx;
					border-radius: 5rpx;
					transition: 0.3s;
					background: transparent;
				}

				.active {
					background: #324B78;
				}

				.active-bg {
					color: #324B77 !important;
					background: #fff !important;
				}


				.item {
					width: 180rpx;
					height: 88rpx;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #999;
					font-size: 28rpx;
					font-weight: 500;

				}
			}

			.main {
				flex: 1;
				height: 100%;
				flex-grow: 1;
				box-sizing: border-box;
				background: #fff;
				overflow: scroll;


				.marin-shopping {
					height: 100%;




					.shopping-list {
						width: 100%;
						height: auto;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;

						.shopping-list-title {

							display: flex;
							align-items: center;
							justify-content: center;
							width: 100%;
							padding: 40rpx 0;
							font-size: 36rpx;
							color: #000;
							font-size: 28rpx;
							font-weight: 500;
							text-align: center;

							text {
								position: relative;
							}

							text::after,
							text::before {
								position: absolute;
								top: 0;
								bottom: 0;
								margin: auto;
								content: '';
								width: 40rpx;
								height: 1px;
								background: #000;
							}

							text::after {
								right: -50rpx;
							}

							text::before {
								left: -50rpx;
							}
						}

						.shopping-list-bottom {
							width: 100%;
							// background: purple;

							.goods-list {
								height: 160rpx;
								display: flex;
								flex-direction: row;
								margin-bottom: 40rpx;

								.goods-list-img {
									width: 160rpx;
									height: 160rpx;
									border-radius: 12rpx;

									image {
										width: 100%;
										height: 100%;
										border-radius: 12rpx;
									}
								}

								.goods-list-info {
									height: 160rpx;
									flex: 1;
									display: flex;
									justify-content: space-between;
									flex-direction: column;
									padding: 0 20rpx;


									.goods-info-top {
										max-height: 68rpx;
										min-height: 40rpx;
										font-size: 24rpx;
										width: 100%;
										font-size: 24rpx;
										color: #000;
										text-overflow: -o-ellipsis-lastline;
										overflow: hidden;
										text-overflow: ellipsis;
										display: -webkit-box;
										-webkit-line-clamp: 2;
										line-clamp: 2;
										-webkit-box-orient: vertical;
									}

									.goods-info-center {
										font-size: 22rpx;
										color: #999;
									}

									.goods-info-bottom {
										display: flex;
										align-items: center;
										justify-content: space-between;

										.goods-price {
											color: #E53948;

											text {
												font-size: 28rpx;
											}
										}

										.goods-add {
											display: flex;
											align-items: center;
											justify-content: center;
											width: 48rpx;
											height: 48rpx;
											border-radius: 50%;

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

				.main-shopping-no-data {
					height: 100%;

					.shopping-loading {
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;

						image {
							width: 83rpx;
							height: 121rpx;
						}

						text {
							margin-top: 39rpx;
							color: #B3B3B3;
							font-size: 22rpx;
							font-weight: 400;
						}
					}

				}

			}
		}
	}
</style>
