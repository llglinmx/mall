<template>
	<view class="box-wrap">
		<view class="box-top">
			<Title title="购物车"></Title>
		</view>
		<view class="shopping-box" v-if="isData">
			<view class="shopping-box-title">
				<view class="shoppping-title-num">共 {{TotalShopping}} 件商品</view>
				<view class="shopping-title-select-all" @click="SelectAllDel">删除</view>
			</view>
			<view class="shopping-list-box" @click="cloneCover">
				<uni-swipe-action>
					<uni-swipe-action-item v-for="(item, index) in shoppingList" :key="item.key" :right-options="options" @click="onClick($event, index,item.key)"s>
						<view class="shopping-list">
							<view :data-index="index" class="order-item flex" :style="{ right:item.right + 'rpx' }">
								<view class="shopping-check" @click.stop="checkBox(index)">
									<text class="check-ico" v-if="!item.isCheck"></text>
									<!-- <icon type="success" color='#ff005e' size="18" v-else /> -->
									<image src="../../static/images/check.png" mode="" v-else></image>
								</view>
								<view class="shopping-content" @click.stop="GoodsDetails(item.goodsId)">
									<view class="shopping-img">
										<image :src="item.pic" mode=""></image>
									</view>
									<view class="shopping-info">
										<view class="shopping-info-title">
											{{item.name}}
										</view>
										<view class="shopping-info-center">
											<view v-if="item.sku">
												<text v-for="(el,i) in item.sku" :key="el.optionId"> {{el.optionName}}:{{el.optionValueName}}, </text>
											</view>
										</view>
										<view class="shopping-info-bottom">
											<view class="shopping-info-price">
												￥<text class="x-price">{{item.price | PriceTow}}</text>
												<!-- <text class="y-price">￥{{item.price | PriceTow}}</text> -->
											</view>
											<view class="shopping-info-stepper">
												<view class="stepper-reduce" :class="{'active':item.number==1}" @click.stop="ShoppingClick('reduce',item.saleNums,item.key,index)">
													<image src="../../static/images/reduce.png" mode=""></image>
												</view>
												<view class="stepper-num" @click.stop="ShoppingClick('nums',item.saleNums,item.key,index)">{{item.number}}</view>
												<!-- <input class="stepper-num" type="text" :value="item.number" /> -->
												<view class="stepper-add" :class="{'active':item.number>=item.saleNums}" @click.stop="ShoppingClick('add',item.saleNums,item.key,index)">
													<image src="../../static/images/add.png" mode=""></image>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
		</view>
		<view class="shopping-box" v-else>
			<view class="shopping-no-data" v-if="isLoding">
				<view class="shopping-no-data-text">
					<Loading></Loading>
				</view>
			</view>
			<view class="shopping-no-data" v-else>
				<view class="shopping-no-data-img">
					<image src="../../static/images/no-shopping.png" mode=""></image>
				</view>
				<view class="shopping-no-data-text">
					购物车还是空的
				</view>
				<view class="shopping-no-data-btn" @click="AddShopping">
					随便看看
				</view>
			</view>
		</view>
		<view class="shopping-footer" v-if="isData">
			<view class="shopping-foot-check" @click="CheckAll">
				<view class="shopping-check-ico">
					<text v-if="!isCheckAll"></text>
					<image src="../../static/images/check.png" mode="" v-else></image>
				</view>
				<view class="shopping-check-text">
					全选
				</view>
			</view>
			<view class="shopping-foot-info">
				合计：<text class="price-msg">￥</text><text class="price-title">{{TotalPrice | PriceTow}}</text>
			</view>
			<view class="shopping-foot-btn" @click="Settlement">
				结算<text v-if="TotalNum!=0">({{TotalNum}})</text>
			</view>
		</view>

		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warn" content="你确定要删除吗？" title="警告" :duration="2000" :before-close="false" @close="Cancel"
			 @confirm="confirm"></uni-popup-dialog>
		</uni-popup>

		<uni-popup ref="PopClick" type="center" :maskClick='isMask'>
			<view class="pop-box">
				<view class="pop-box-title">修改商品数量</view>
				<view class="pop-box-stepper">
					<view class="pop-box-stepper-add" :class="{'active': shoppingList[idx].number==1}" @click="ShoppingClick('reduce',shoppingList[idx].saleNums,shoppingList[idx].key,idx)">
						<image src="../../static/images/reduce.png" mode=""></image>
					</view>
					<view class="pop-box-stepper-input">
						<!-- :focus='setFocus' -->
						<input type="text" v-model="popEditVal" style="text-align: center;font-size: 28rpx;" />
					</view>
					<view class="pop-box-stepper-reduce" :class="{'active': shoppingList[idx].number>= shoppingList[idx].saleNums}"
					 @click="ShoppingClick('add',shoppingList[idx].saleNums,shoppingList[idx].key,idx)">
						<image src="../../static/images/add.png" mode=""></image>
					</view>
				</view>
				<view class="pop-box-btn">
					<view class="pop-cancel" @click="PopCancel">取消</view>
					<view class="pop-confirm" @click="PopConfirm(shoppingList[idx].key)">确认</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'

	import Title from "../../components/title/title.vue"
	import Loading from "../../components/loading/loading.vue"
	// 引入vuex
	import {
		mapState,
		mapMutations
	} from 'vuex';

	import {
		request
	} from '../../static/js/ajax.js'
	export default {
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#E53947'
					}
				}],
				isMask: false, // 点击遮罩层禁止关闭
				isCheckAll: false, // 全选状态
				IndexIdx: '-1',
				shoppIndex: '-1',
				isData: false, //判断是否有数据
				isLoding: true,
				delBtnWidth: 160,
				shoppingList: [{
					number: 0,
					price: 0.00,
				}],
				isScroll: true,
				keyarr: [], // key数组列表
				checkList: [],
				shoppingKey: '', // 购物车数据的key值
				shoppNums: 0,
				popEditVal: 0,
				idx: 0,
				setFocus: false,
				PageNumer: 0,
				PageLimt: 10,
			};
		},

		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			uniSwipeAction,
			uniSwipeActionItem,
			Title,
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
			TotalPrice() {
				let price = 0;
				this.shoppingList.forEach(item => {
					if (item.isCheck) {
						price += item.number * item.price
					}
				})
				return price
			},
			// 计算商品总数量
			TotalNum() {
				let num = 0
				this.shoppingList.forEach(item => {
					if (item.isCheck) {
						num += item.number
					}
				})
				return num
			},
			// 计算商品总共多少种
			TotalShopping() {
				return this.shoppingList.length
			},
		},

		onLoad: function(options) {

		},

		onShow() {
			// this.shoppingList=[]

			if (this.$store.state.ShoppingList.length != 0) {
				this.shoppingList = this.$store.state.ShoppingList
				// console.log(this.shoppingList)
			}

			// 获取购物车列表数据
			this.getData();
		},

		onHide() {
			// this.shoppingList = [];
		},

		methods: {
			...mapMutations(['VuexShoppingList']), // 引入vuex 里的事件
			// 关闭阴影层
			cloneCover() {
				this.IndexIdx = -1
			},
			// 删除按钮
			onClick(e, index, key) {
				this.shoppingKey = key // 拿到当前数据的key值
				this.shoppIndex = index
				this.$refs.popup.open() // 打开弹窗
			},



			// 一键删除按钮
			SelectAllDel() {
				let str = ""
				this.shoppingList.forEach(item => {
					if (item.isCheck) {
						str += item.key + ','
					}
				})
				if (str != '') {
					this.$refs.popup.open() // 打开弹窗
				} else {
					uni.showToast({
						title: "请先选择商品",
						icon: "none"
					})
				}
				this.shoppingKey = str

			},
			// 商品详情
			GoodsDetails(id) {
				// console.log(id)
				// uni.navigateTo({
				// 	url: '../goods-details/goods-details?id=' + id
				// })
			},


			// 删除确认事件
			confirm(done, value) {
				let data = {
					key: this.shoppingKey,
					token: uni.getStorageSync("token")
				}

				request({
					url: '/shopping-cart/remove',
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.isData = true
							this.shoppingList = this.$store.state.ShoppingList

							if (this.$store.state.ShoppingList.length != 0) {
								this.shoppingList.forEach((v, idx) => {
									res.data.data.items.map((item, index) => {
										if (v.goodsId == item.goodsId) {
											Object.assign(item, {
												isCheck: v.isCheck
											})
										} else {
											Object.assign(item, {
												isCheck: false
											})
										}
									})
								})
							} else {
								res.data.data.items.map((item, index) => {
									Object.assign(item, {
										isCheck: false
									})
								})
							}
 
							var checkList = uni.getStorageSync("checkList")
							if (Boolean(checkList)) {
								this.shoppingList.forEach(item => {
									checkList.forEach(el => {
										if (item.key == el.key) {
											item.isCheck = true
										}
									})
								})
								uni.setStorageSync("checkList", this.shoppingList) // 存储选择状态
							}
							this.shoppNums = res.data.data.items.length
							this.shoppingList.splice(this.shoppIndex, 1) //删除
							this.VuexShoppingList(this.shoppingList) // 把数据存进vuex
						} else if (res.data.code == 700) {
							this.isData = false
							this.isLoding = false
							this.shoppNums = 0
							uni.removeStorageSync("checkList") // 存储选择状态
							this.isCheckAll = false

							// this.shoppingList = []
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
					}
					done() // 关闭弹出层
				})
			},


			// 删除取消事件
			close(done) {
				console.log("取消")
			},

			// 选中按钮
			checkBox(index) {

				this.keyarr = []
				this.shoppingList[index].isCheck = !this.shoppingList[index].isCheck
				this.shoppingList.forEach(item => {
					if (item.isCheck) {
						this.keyarr.push(item.key)
					}
				})
				if (this.shoppingList[index].isCheck) {
					// this.keyarr.push(this.shoppingList[index].key) // 把已选的商品key值放到数组里
				} else {
					var index = this.keyarr.indexOf(this.shoppingList[index].key); // 查找是否存在某个值
					if (index > -1) { //大于0 代表存在，
						this.keyarr.splice(index, 1); //存在就删除
					}
				}

				if (this.keyarr.length != 0) {
					this.checkList = []
					// 通过key值拿到已选商品
					this.keyarr.forEach(item => {
						this.shoppingList.forEach(el => {
							if (item == el.key) {
								this.checkList.push(el)
							}
						})
					})
					uni.setStorageSync("checkList", this.checkList) // 存储选择状态
				} else {
					this.checkList = []
					uni.removeStorageSync("checkList") // 没有选择商品则移除
				}

				this.isCheckAll = true
				this.shoppingList.forEach(item => {
					this.isCheckAll = item.isCheck && this.isCheckAll
				})
			},

			// 全选按钮
			CheckAll() {
				this.isCheckAll = !this.isCheckAll // 全选选中
				this.checkList = []
				this.shoppingList.forEach(item => {
					item.isCheck = this.isCheckAll
					if (this.isCheckAll) {
						this.checkList.push(item)
						uni.setStorageSync("checkList", this.shoppingList) // 存储选择状态
					} else {
						this.checkList = []
						uni.removeStorageSync("checkList") // 存储选择状态
					}
				})
			},

			// 结算按钮
			Settlement() {
				var checkList = uni.getStorageSync("checkList")
				this.checkList = checkList

				if (this.checkList.length != 0) {
					uni.navigateTo({
						url: "../../pagesA/confirm-order/confirm-order?data=" + JSON.stringify(this.checkList)
					})
					uni.setStorageSync("checkList", this.checkList)
				} else {
					uni.showToast({
						title: '请先勾选商品',
						icon: 'none',
					})
				}
			},


			//  数量加减按钮
			ShoppingClick(type, sale, key, index) {
				switch (type) {
					case "add":
						if (sale > this.shoppingList[index].number) {
							this.shoppingList[index].number++
							this.popEditVal = this.shoppingList[index].number
							request({
								url: '/shopping-cart/modifyNumber',
								method: 'POST',
								data: {
									key: key,
									token: uni.getStorageSync("token"),
									number: this.shoppingList[index].number
								}
							}).then(res => {
								if (res.statusCode == 200) {
									if (res.data.code == 0) {
										res.data.data.items.forEach((item, index) => {
											this.checkList.forEach(el => {
												if (item.key == el.key) {
													el.number = item.number
												}
											})
										})
										uni.setStorageSync("checkList", this.checkList)
									}
								}
							})

						} else {
							uni.showToast({
								title: "超过可售库存数量：" + sale,
								icon: "none"
							})
						}
						break;
					case "reduce":
						if (this.shoppingList[index].number != 1) {
							this.shoppingList[index].number--
							this.popEditVal = this.shoppingList[index].number
							request({
								url: '/shopping-cart/modifyNumber',
								method: 'POST',
								data: {
									key: key,
									token: uni.getStorageSync("token"),
									number: this.shoppingList[index].number
								}
							}).then(res => {
								if (res.statusCode == 200) {
									if (res.data.code == 0) {

										res.data.data.items.forEach((item, index) => {
											this.checkList.forEach(el => {
												if (item.key == el.key) {
													el.number = item.number
												}
											})
										})
										uni.setStorageSync("checkList", this.checkList)
									}
								}
							})
						} else {
							uni.showToast({
								title: "已经减到最少了",
								icon: "none"
							})
						}
						break;
					case "nums":
						this.$refs.PopClick.open()

						this.popEditVal = this.shoppingList[index].number
						this.idx = index

						break;
				}
			},

			// 弹出层数量修改确定按钮
			PopConfirm(key) {
				if (this.popEditVal > this.shoppingList[this.idx].saleNums) {
					uni.showToast({
						title: "大于库存可售数量：" + this.shoppingList[this.idx].saleNums,
						icon: "none"
					})
				} else {
					request({
						url: '/shopping-cart/modifyNumber',
						method: 'POST',
						data: {
							key: key,
							token: uni.getStorageSync("token"),
							number: this.popEditVal
						}
					}).then(res => {
						if (res.statusCode == 200) {
							this.$refs.PopClick.close() // 关闭弹出层
							if (res.data.code == 0) {

								this.shoppingList[this.idx].number = this.popEditVal

								res.data.data.items.forEach((item) => {
									this.checkList.forEach(el => {
										if (item.key == el.key) {
											el.number = item.number
										}
									})
								})
								uni.setStorageSync("checkList", this.checkList)
							} else {
								uni.showToast({
									title: "修改失败",
									icon: "none"
								})
							}
						}
					})
				}
			},

			// 弹出层数量修改取消按钮
			PopCancel() {
				this.$refs.PopClick.close() // 关闭弹出层
			},

			// 没有数据   去看看 按钮
			AddShopping() {
				uni.switchTab({
					url: "../index/index"
				})
			},


			// 读取购物车数据
			getData() {
				this.isLoding = true
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
							this.isData = true;

							var propertyChildIds = ""; // 存储 多商品的规格ID


							res.data.data.items.map((item, index) => {
								Object.assign(item, {
									isCheck: false,
									saleNums: 0
								})

								// 判断单规格与多规格的可售数量
								if (item.sku) {
									item.sku.forEach(el => {
										propertyChildIds = propertyChildIds + el.optionId + ":" + el.optionValueId + ",";
									})
									var arrData = {
										goodsId: item.goodsId,
										propertyChildIds: propertyChildIds,
										token: uni.getStorageSync("token")
									}
									this.getStores(arrData) // 多规格商品获取可售数量
									propertyChildIds = ""; // 清空之前选择的 让下一次的重新赋值
								} else {
									// 获取单规格的可售数量
									var arrData = {
										id: item.goodsId,
										token: uni.getStorageSync("token")
									}
									this.getDetails(arrData) // 单规格商品获取可售数量
								}

							})

							var checkList = uni.getStorageSync("checkList")
							if (Boolean(checkList)) {
								res.data.data.items.forEach(item => {
									checkList.forEach(el => {
										if (item.key == el.key) {
											item.isCheck = true
										}
									})
								})
							}

							// 判断全选
							this.isCheckAll = true
							res.data.data.items.forEach(item => {
								this.isCheckAll = item.isCheck && this.isCheckAll
							})

							// 设置购物车气泡数量
							this.shoppNums = res.data.data.items.length
							if (this.shoppNums != 0) {
								uni.setTabBarBadge({
									index: 2,
									text: "" + this.shoppNums + "",
									success: (res) => {}
								})
							}
							uni.setStorageSync("shoppingNum", this.shoppNums)


							// 执行vuex里面的方法
							this.VuexShoppingList(res.data.data.items) // 把数据存进vuex

							this.shoppingList = res.data.data.items

						} else if (res.data.code = 700) {
							this.isData = false
							this.isLoding = false
						}
					}
				})
			},

			// 多规格获取库存数量
			getStores(data) {
				request({
					url: '/shop/goods/price',
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {

							this.shoppingList.forEach(item => {
								if (res.data.data.goodsId == item.goodsId) {
									item.saleNums = res.data.data.stores
								}
							})
						} else {

						}
					}
				})
			},
			//获取单规格库存数量
			getDetails(data) {
				request({
					url: '/shop/goods/detail',
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.shoppingList.forEach(item => {
								if (res.data.data.basicInfo.id == item.goodsId) {
									item.saleNums = res.data.data.basicInfo.stores
								}
							})
						} else {}
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

		.box-top {}


		.shopping-box {
			display: flex;
			align-items: center;
			flex-direction: column;
			width: 100%;
			height: 100%;
			flex: 1;
			overflow-y: scroll;
			overflow-x: hidden;
			background: #fff;

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
					padding: 20rpx;
					color: #E53947;
				}
			}

			// 隐藏滚动条
			.shopping-list-box::-webkit-scrollbar {
				display: none;
			}

			.shopping-list-box {
				flex: 1;
				overflow-y: scroll;
				overflow-x: hidden;
				width: 100%;
				height: 100%;

				// overflow-y: scroll;

				.shopping-list {
					position: relative;
					width: 100%;
					// margin-bottom: 40rpx;
					// background: #fff;

					.order-item {
						position: relative;
						// height: 200rpx;
						width: 100%;
						transition: 0.3s;

						.shopping-check {
							display: flex;
							align-items: center;
							justify-content: center;
							margin: 30rpx 24rpx 30rpx 32rpx;
							// margin-left: 32rpx;
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
								margin-left: 24rpx;
								margin-right: 32rpx;

								.shopping-info-title {
									width: 100%;
									line-height: 30rpx;
									text-overflow: -o-ellipsis-lastline;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;
									-webkit-line-clamp: 2;
									line-clamp: 2;
									-webkit-box-orient: vertical;
									font-size: 24rpx;
									color: #333;
									font-weight: 400;
								}

								.shopping-info-center {
									color: #999;
									font-size: 20rpx;
									line-height: 26rpx;
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

										.y-price {
											margin-left: 10rpx;
											color: #999;
											// font-size: 24rpx;
											text-decoration: line-through;
										}
									}

									.shopping-info-stepper {
										display: flex;
										// width: 128rpx;
										height: 36rpx;

										.active {
											opacity: 0.5;
										}

										.stepper-reduce,
										.stepper-add {
											display: flex;
											justify-content: center;
											align-items: center;
											box-sizing: border-box;
											padding: 0 20rpx;

											image {
												width: 36rpx;
												height: 36rpx;
											}
										}

										.stepper-num {
											display: flex;
											justify-content: center;
											align-items: center;
											flex: 1;
											color: #000;
										}
									}
								}
							}
						}

						.shopping-remove {
							width: 160rpx;
							height: 100%;
							background: #E53947;
							color: white;
							position: absolute;
							top: 0;
							right: -160rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 28rpx;
						}
					}

				}
			}

			.shopping-no-data {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				height: 100%;

				.shopping-no-data-img {
					width: 122rpx;
					height: 122rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.shopping-no-data-text {
					margin-top: 39rpx;
					color: #B3B3B3;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
				}

				.shopping-no-data-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 180rpx;
					height: 64rpx;
					margin-top: 59rpx;
					border: 0.5px solid rgba(153, 153, 153, 1);
					border-radius: 32rpx;
					font-size: 24rpx;
					color: #999;
				}
			}

		}

		.shopping-footer {
			display: flex;
			align-items: center;
			width: 100%;
			height: 88rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			background: #fff;
			color: #000;

			.shopping-foot-check {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 120rpx;
				height: 100%;

				.shopping-check-ico {
					display: flex;
					align-items: center;
					justify-content: center;

					text {
						display: block;
						width: 32rpx;
						height: 32rpx;
						border: 1px solid #666;
						border-radius: 50%;
					}

					image {
						width: 32rpx;
						height: 32rpx;
					}
				}

				.shopping-check-text {
					font-size: 24rpx;
					margin-left: 24rpx;
				}
			}

			.shopping-foot-info {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				flex: 1;
				height: 100%;
				margin: 0 10rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #000;

				.price-msg {
					color: #ce1009;
					font-size: 24rpx;
				}

				.price-title {
					color: #ce1009;
					font-size: 36rpx;
				}
			}

			.shopping-foot-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 24rpx;
				width: 176rpx;
				height: 64rpx;
				background: #324B78;
				color: #fff;
				border-radius: 50rpx;
				font-size: 32rpx;
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
				width: 500rpx;
				height: 275rpx;
				// padding: 30rpx;
				background: #fff;
				margin: auto;
				box-sizing: border-box;
				border-radius: 24rpx;

				.pop-box-title {
					padding: 47rpx 0 0;
					font-size: 32rpx;
					font-weight: 400;
					color: #000;
				}

				.pop-box-stepper {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 208rpx;
					height: 36rpx;

					.active {
						opacity: 0.5;
					}

					.pop-box-stepper-add,
					.pop-box-stepper-reduce {
						display: flex;
						padding: 20rpx;

						image {
							width: 36rpx;
							height: 36rpx;
						}
					}

					.pop-box-stepper-input {
						display: flex;
						align-items: center;
						justify-content: center;

						input {
							width: 100%;
							height: 36rpx;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}

					.pop-box-stepper-reduce {}
				}

				.pop-box-btn {
					display: flex;
					width: 100%;
					justify-content: space-between;
					border-top: 1rpx solid #eee;

					.pop-cancel,
					.pop-confirm {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						height: 80rpx;
						font-size: 28rpx;
						font-size: 400;
						color: #0078FE;
					}

					.pop-cancel {
						border-right: 1rpx solid #eee;
					}

					// .pop-confirm {

					// 	color: #fff;
					// }
				}
			}
		}

	}
</style>
