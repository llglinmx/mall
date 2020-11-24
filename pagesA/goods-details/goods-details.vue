<template>
	<view class="details-box">
		<view class="details-header">
			<view class="header-top" :style="{paddingTop:PaddingTop+'px',opacity:OpacityNum}">
				<text>商品详情</text>
			</view>
			<view class="head-back" @click="GBack">
				<image src="../../static/images/back.png" mode=""></image>
			</view>
		</view>
		<view class="details-content">
			<view class="details-banner">
				<swiper :autoplay="true" :interval="3000" :duration="500" :circular='true' @change="change">
					<swiper-item class="swiper-li" v-for="(item,index) in bannerList" :key="index" @click="previewImg(index)">
						<view class="swiper-item">
							<image :src="item.pic" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
				<view class="details-banner-dost">
					{{current}}/{{ImgLength}}
				</view>
			</view>
			<view class="details-content-info">
				<view class="details-info-top">
					<view class="details-top-price">
						<!-- ￥<text>{{popInfo["basicInfo"]["minPrice"]}}</text> -->
						￥<text>{{popInfo.basicInfo.minPrice}}</text>
					</view>
					<view class="details-top-cost-price" v-if="popInfo.basicInfo.originalPrice!=0">
						￥{{popInfo["basicInfo"]["originalPrice"]}}
					</view>
				</view>
				<view class="details-info-bottom">
					<view class="details-bottom-title">
						{{popInfo["basicInfo"]["name"]}}
					</view>
					<view class="details-bottom-share">
						<button open-type="share">
							<image src="../../static/images/share-ico.png" mode=""></image>
						</button>
					</view>
				</view>
			</view>

			<view class="details-content-info-two">
				<view class="details-info-li">
					<view class="details-info-li-text">优惠</view>
					<view class="details-info-li-explain">
						<text style="color:#E53947">【限时活动】{{popInfo['basicInfo']['purchaseNotes']}}</text>
					</view>
				</view>
				<view class="details-info-li">
					<view class="details-info-li-text">邮费</view>
					<view class="details-info-li-explain">
						<text> {{Postage}} </text>
					</view>
				</view>
				<view class="details-info-li">
					<view class="details-info-li-text">说明</view>
					<view class="details-info-li-explain">
						<text style="color:#999;font-size: 20rpx;">{{popInfo['basicInfo']['characteristic']}}</text>
					</view>
				</view>
			</view>
			<view class="details-content-info-evaluate" v-if="EvaluateData.length!=0">
				<view class="details-evaluate-top"  @click="MoreEvaluate">
					<view class="details-evaluate-top-title">
						宝贝评价
					</view>
					<view class="details-evaluate-top-more">
						<text>查看更多</text>
						<image src="../../static/images/xjt-blue.png" mode=""></image>
					</view>
				</view>
				<view class="details-evaluate-li" :class="{'details-evaluate-li-active':!item.reputationPics}" v-for="(item,index) in EvaluateData">
					<view class="details-evaluate-center">
						<view class="details-evaluate-center-info">
							<image :src="item.user.avatarUrl" mode=""></image>
							<text>{{item.user.nick}}</text>
						</view>
						<view class="details-evaluate-center-text">{{item.goods.goodReputationRemark}}</view>
					</view>
					<view class="details-evaluate-center-bottom">
						<view class="details-evaluate-img-list">
							<view class="details-evaluate-img" v-for="(v,j) in item.reputationPics" @click="EvaluatepreviewImg(j,item.reputationPics)">
								<image :src="v.pic" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="details-content-info-evaluate" v-else>
				<view style="padding: 32rpx 0;font-size: 28rpx;font-weight: 400;">
					暂无评价
				</view>
			</view>

			<view class="details-content-goods">
				<view class="details-content-goods-title">
					商品详情
				</view>
			</view>
			<rich-text :nodes="popInfo.content" class="details-goods-img-list"></rich-text>
		</view>

		<view class="details-footer">
			<view class="foot-tab" :class="{'statusBarHeight':isBarHeight}">
				<FooterShopping @ShoppingAdd="ShoppingAdd" @ClickShopping="ClickShopping" @Collect="CollectBtn" :FooterData='numberFav'
				 :shoppingNum='shoppNums'></FooterShopping>
			</view>

		</view>
		<uni-popup ref="popup" type="bottom">
			<PopupDetails :popInfo='popInfo' :isPopup="isPopup" @PopClose="PopClose" @ShoppingBtn="AddShopping" @CheckActive="CheckActive"
			 :isBtnType="isBtnType"></PopupDetails>
		</uni-popup>
	</view>
</template>

<script>
	import {
		request
	} from '../../static/js/ajax.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import PopupDetails from '../../components/popup-details/popup-details.vue'
	import FooterShopping from "../../components/add-shopping/add-shopping.vue"

	export default {
		data() {
			return {
				bannerList: [], // 轮播图
				PaddingTop: 0, //初始padding-top值
				OpacityNum: 0, // 初始opacity值
				scollTop: 0,
				popInfo: {
					basicInfo: {
						minPrice: 0,
						originalPrice: 0,
						name: '',
						characteristic: '',
						purchaseNotes: ''
					}
				},
				numberFav: 0, // 是否收藏
				shoppingList: [],
				shoppNums: 0,
				isBtnType: true, // 当前点击的btn
				isBarHeight: false, // 苹果底部导航高度
				Postage: "暂无", //邮费
				ImgLength: 0,
				current: 1,
				EvaluateData: [], // 评价列表
				isPopup:false,// 判断弹出层是否弹出
			};
		},
		onLoad(options) {

			// 获取距离顶部高度
			var that = this
			wx.getSystemInfo({
				success: function(res) {
					that.PaddingTop = res.statusBarHeight
				}
			});

			// 获取详情
			this.GoodsDetails(options.id)
			// 获取评价详情
			this.EvaluateList(options.id)
		},
		onShow() {
			this.GetShoppingList() // 执行购物车接口 
			this.SystemInfo()
		},

		created() {

		},
		components: {
			uniPopup,
			PopupDetails,
			FooterShopping
		},
		methods: {
			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 获取手机设备信息
			SystemInfo() {
				uni.getSystemInfo({
					success: (res) => {

						if (res.statusBarHeight == 44) {
							this.isBarHeight = true
						}
					}
				})
			},
			// 监听当前轮播图下标
			change(e) {
				this.current = e.detail.current + 1
			},


			// 轮播图片放大预览
			previewImg(index) {
				let _this = this;
				let imgsArray = [];
				for (let i = 0; i < this.bannerList.length; i++) {
					imgsArray.push(this.bannerList[i].pic);
					// if (this.bannerList[i].pic == "") {
					// }
				}
				uni.previewImage({
					current: index,
					urls: imgsArray,
					indicator: 'number',
					loop: true
				});
			},

			// 更多评价
			MoreEvaluate() {
				uni.navigateTo({
					url: "../../pagesB/evaluation-list/evaluation-list?id=" + this.popInfo.basicInfo.id
				})
			},

			// 评价图片放大预览
			EvaluatepreviewImg(index, item) {
				let imgsArray = [];
				for (let i = 0; i < item.length; i++) {
					imgsArray.push(item[i].pic);
				}
				uni.previewImage({
					current: index,
					urls: imgsArray,
					indicator: 'number',
					loop: true
				});
			},

			// 收藏点击
			CollectBtn(e) {
				var data = {
					goodsId: this.popInfo.basicInfo.id,
					token: uni.getStorageSync("token")
				}

				// 判断是否登录
				var token = uni.getStorageSync("token")
				if (token != '') {
					switch (e) {
						case 0:
							this.AddCollect(data)
							break;
						case 1:
							this.CancelCollect(data)
							break;
					}
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
			// 检测商品是否收藏
			IsGoodsCollect() {
				var data = {
					goodsId: this.popInfo.basicInfo.id,
					token: uni.getStorageSync("token")
				}
				request({
					url: "/shop/goods/fav/check",
					method: 'GET',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.numberFav = 1
						} else if (res.data.data == -1) {
							this.numberFav = 0
						}
					}
				})
			},

			// 添加收藏
			AddCollect(data) {
				request({
					url: "/shop/goods/fav/add",
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.numberFav = 1 // 改变当前收藏显示状态
							uni.showToast({
								title: "收藏成功",
								icon: "none"
							})
						} else {
							uni.showToast({
								title: "收藏失败",
								icon: "none"
							})
						}
					}
				})
			},

			// 取消收藏
			CancelCollect(data) {
				request({
					url: "/shop/goods/fav/delete",
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.numberFav = 0 // 改变当前收藏显示状态
							console.log(this.popInfo.basicInfo.numberFav)
							uni.showToast({
								title: "取消收藏成功",
								icon: "none"
							})
						} else {
							uni.showToast({
								title: "取消收藏失败",
								icon: "none"
							})
						}
					}
				})
			},

			// 当前选中点击
			CheckActive(item) {
				this.popInfo = item
			},

			// 加入购物车按钮
			ShoppingAdd(e) {
				// 判断是否登录
				var token = uni.getStorageSync("token")
				if (token != '') {
					if (e == 0) {
						this.$refs.popup.open()
						this.isPopup = true // 
						
						this.isBtnType = true
					} else {
						this.isBtnType = false
						this.GoodsAdd()
					}
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



			// 添加商品
			GoodsAdd(e, type) {
				var datalist = {}
				if (type !== 'popgoods') {
					datalist = {
						goodsId: this.popInfo.basicInfo.id,
						number: 1,
						token: uni.getStorageSync("token")
					}
				} else {
					datalist = {
						goodsId: e.id,
						number: e.number,
						sku: JSON.stringify(e.sku),
						token: uni.getStorageSync("token")
					}
				}

				request({
					url: '/shopping-cart/add',
					method: 'POST',
					data: datalist
				}).then(res => {
					if (res.statusCode == 200) {
						// 等于 30002 代表有多规格商品
						if (res.data.code == 30002) {
							this.$refs.popup.open()
							this.isPopup = true;
						} else if (res.data.code == 0) {
							uni.showToast({
								title: '添加成功'
							})
							this.PopClose() // 调用关闭弹出事件
							this.GetShoppingList()
						}
					}
				})

			},




			// 获取商品详情数据
			GoodsDetails(id) {
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
							this.bannerList = res.data.data.pics
							this.ImgLength = res.data.data.pics.length // 图片数组长度

							this.popInfo = res.data.data

							this.shoppingList = []

							// 往数组对象里面添加一条属性 用于初始选中状态
							if (this.popInfo.properties != undefined) {
								this.popInfo.properties.forEach(el => {
									el.childsCurGoods.map((item, index) => {
										item.active = false
									})
								})
							}
							// 获取物流费用  是否包邮
							this.LogisticsCost(res.data.data.basicInfo.logisticsId)
							// 判断是否登录
							if (!!uni.getStorageSync("token")) {
								// 检测是否收藏
								this.IsGoodsCollect()
							}

						} else if (res.data.code = 700) {

						}
					}
				})
			},

			// 获取评价列表
			EvaluateList(id) {
				request({
					url: '/shop/goods/reputation',
					method: 'POST',
					data: {
						goodsId: id,
						page: 1,
						pageSize: 2,
						token: uni.getStorageSync("token")
					}
				}).then(res => {
					if (res.statusCode == 200) {
						console.log(res.data)
						if (res.data.code == 0) {
							this.EvaluateData = res.data.data
						} else if (res.data.code == 700) {

						}
					} else {

					}
				})
			},

			// 获取物流费用
			LogisticsCost(templateId) {
				let data = {
					templateId: templateId, //运费模板编号，
					type: 0, //快递方式：0 快递 1 EMS 2 平邮
					token: uni.getStorageSync("token") //登录接口返回的token
				}
				request({
					url: "/shop/goods/price/freight",
					method: 'GET',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.Postage = "快递费" + res.data.data.firstAmount + "元"
						} else if (res.data.code == 10002) {
							this.Postage = res.data.msg
						}
					} else {}

				})
			},



			// 关闭弹出层
			PopClose() {
				this.$refs.popup.close() // 关闭弹出层方法
				this.isPopup = false,
				uni.showTabBar({
					animation: true
				})
			},


			// 加入购物车。立即购买按钮
			AddShopping(options) {
				// 判断是否有规格
				if (this.popInfo.properties) {
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

					// 判断弹出层按钮类型 0 为立即购买
					if (options.type == 0) {

						var str = {};
						var arrList = [];
						var array = [];
						var s = {}
						// 遍历拿到对应的选中的内容
						this.popInfo.properties.forEach(item => {
							item.childsCurGoods.forEach(el => {
								if (el.active) {
									s = {
										optionId: item.id,
										optionName: item.name,
										optionValueId: el.id,
										optionValueName: el.name,
									}
									array.push(s)
								}
							})
						})

						var str = {
							goodsId: this.popInfo.basicInfo.id,
							// key: this.popInfo.basicInfo.key,
							name: this.popInfo.basicInfo.name,
							pic: this.popInfo.basicInfo.pic,
							price: options.price,
							number: options.number,
							sku: array,
							logisticsId: this.popInfo.basicInfo.logisticsId
						}
						arrList.push(str)

						// 跳转到确认订单页面
						uni.navigateTo({
							url: "../../pagesA/confirm-order/confirm-order?data=" + JSON.stringify(arrList)
						})
						this.$refs.popup.close() // 关闭弹出层
						this.isPopup = false
						// uni.showToast({
						// 	title: "立即购买",
						// 	icon: "none"
						// })
					} else {
						this.GoodsAdd(optionsArr, 'popgoods')
					}

				} else {
					// 无规格 直接购买
					var arrList = []
					var str = {
						goodsId: this.popInfo.basicInfo.id,
						// key: this.popInfo.basicInfo.key,
						name: this.popInfo.basicInfo.name,
						pic: this.popInfo.basicInfo.pic,
						price: this.popInfo.basicInfo.minPrice,
						number: options.number,
						logisticsId: this.popInfo.basicInfo.logisticsId
					}
					arrList.push(str)
					// 跳转到确认订单页面
					uni.navigateTo({
						url: "../../pagesA/confirm-order/confirm-order?data=" + JSON.stringify(arrList)
					})
					this.$refs.popup.close() // 关闭弹出层
					this.isPopup = false;
				}
			},

			// 点击进入购物车
			ClickShopping() {
				uni.reLaunch({
					url: "../../pages/shopping/shopping"
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
						} else if (res.data.code == 700) {
							this.shoppNums = 0
						}
					}

				})
			},

		},

		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: this.popInfo["basicInfo"]["name"],
				// path: '/pages/test/test?id=123'
			}
		},


		// 监听页面滚动
		onPageScroll(e) { //根据距离顶部距离是否显示回到顶部按钮
			if (this.scollTop > e.scrollTop) {
				// 向下滚动
				if (e.scrollTop <= 0) {
					this.OpacityNum = 0
				} else {
					this.OpacityNum -= 0.01
				}
				// 小程序执行
				// #ifdef MP-WEIXIN
				// 小程序修改顶部电量，时间的颜色
				// wx.setNavigationBarColor({
				// 	frontColor: '#000000',
				// 	backgroundColor: '#000000'
				// })
				// #endif
			} else {
				// 向上滚动
				if (e.scrollTop >= 290) {
					this.OpacityNum = 1
				} else {
					this.OpacityNum += 0.01
				}
				// 小程序执行
				// #ifdef MP-WEIXIN
				// 小程序修改顶部电量，时间的颜色
				// wx.setNavigationBarColor({
				// 	frontColor: '#ffffff',
				// 	backgroundColor: '#ffffff'
				// })
				// #endif
			}
			this.scollTop = e.scrollTop
		},


	}
</script>

<style lang="scss">
	.details-box {
		position: relative;
		// height: 100%;
		display: flex;
		flex-direction: column;
		background: #f7f7f7;

		.details-header {
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 99999;

			.header-top {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 84rpx;
				background: #324B78;

				text {
					color: #fff;
					font-size: 36rpx;
					font-weight: 600;
					// padding-right: 76rpx;
				}
			}

			.head-back {
				position: absolute;
				bottom: 14rpx;
				left: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 56rpx;
				height: 56rpx;
				background: rgba(0, 0, 0, 0.1);
				border-radius: 50%;

				image {
					width: 48rpx;
					height: 48rpx;
				}
			}

		}

		.details-content {
			padding-bottom: 128rpx;

			// overflow-y: scroll;
			.details-banner {
				position: relative;
				height: 750rpx;

				swiper {
					height: 100%;

					.swiper-li {
						height: 100%;

						.swiper-item {
							height: 100%;

							image {
								width: 100%;
								height: 100%;
							}
						}

					}
				}

				.details-banner-dost {
					position: absolute;
					bottom: 34rpx;
					right: 32rpx;
					width: 72rpx;
					height: 36rpx;
					background: rgba(0, 0, 0, 0.5);
					text-align: center;
					line-height: 36rpx;
					border-radius: 18rpx;
					font-size: 24rpx;
					color: #fff;
				}
			}

			.details-content-info {
				width: 100%;
				padding: 40rpx 32rpx;
				box-sizing: border-box;
				background: #fff;

				.details-info-top {
					display: flex;
					align-items: baseline;
					font-size: 28rpx;

					.details-top-price {
						color: #E53947;

						text {
							font-weight: bold;
							font-size: 52rpx;
						}
					}

					.details-top-cost-price {
						margin-left: 20rpx;
						color: #999;
						text-decoration: line-through
					}
				}

				.details-info-bottom {
					display: flex;
					// align-items: center;
					margin-top: 38rpx;
					font-size: 28rpx;
					color: #000;

					.details-bottom-title {
						flex: 1;
						line-height: 34rpx;
					}

					.details-bottom-share {
						width: 30rpx;
						height: 30rpx;
						margin-left: 68rpx;

						button {
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							background: none;
							border: none;
							padding: 0;
							// position: static;
							line-height: normal;



							image {
								width: 23rpx;
								height: 28rpx;
							}
						}

						button::after {
							border: none !important;
						}

					}
				}
			}

			.details-content-info-two {
				margin: 16rpx 0;
				background: #fff;

				.details-info-li {
					display: flex;
					padding: 32rpx;
					box-sizing: border-box;
					border-bottom: 1px solid #f7f7f7;
					font-weight: 400;

					.details-info-li-text {
						font-size: 26rpx;
						color: #000;
					}

					.details-info-li-explain {
						flex: 1;
						margin-left: 49rpx;
						font-size: 24rpx;
					}
				}
			}

			.details-content-info-evaluate {
				padding: 0 32rpx;
				box-sizing: border-box;
				background: #fff;
				margin-bottom: 16rpx;

				.details-evaluate-top {
					padding: 32rpx 0 0;
					display: flex;
					justify-content: space-between;
					font-weight: 400;

					.details-evaluate-top-title {
						font-size: 28rpx;
					}

					.details-evaluate-top-more {
						display: flex;
						align-items: center;

						text {
							font-size: 24rpx;
							color: #324B78;
						}

						image {
							width: 22rpx;
							height: 12rpx;
							margin-left: 16rpx;
							transform: rotate(-90deg);
						}
					}
				}

				.details-evaluate-li {
					border-bottom: 1rpx solid #f2f2f2;
					padding-bottom: 40rpx;
					margin-top: 32rpx;

					.details-evaluate-center {
						.details-evaluate-center-info {
							width: 100%;
							display: flex;
							align-items: center;

							image {
								width: 48rpx;
								height: 48rpx;
								border-radius: 50%;
							}

							text {
								margin-left: 24rpx;
								font-size: 24rpx;
								color: #666;
								font-weight: 400;
							}
						}

						.details-evaluate-center-text {
							font-size: 24rpx;
							padding: 24rpx 0 32rpx;
							box-sizing: border-box;
						}
					}

					.details-evaluate-center-bottom {
						.details-evaluate-img-list {
							display: flex;
							overflow-y: scroll;

							.details-evaluate-img {
								margin-right: 20rpx;
								width: 180rpx;
								height: 220rpx;

								image {
									width: 100%;
									height: 100%;
									border-radius: 8rpx;
								}
							}

							.details-evaluate-img:last-child {
								margin-right: 0;
							}
						}
					}
				}

				.details-evaluate-li:last-child {
					border-bottom: 0;
				}
				.details-evaluate-li-active{
					padding-bottom: 0 !important;
				}
			}

			.details-content-goods {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 91rpx;
				background: #fff;

				.details-content-goods-title {
					position: relative;
					// width: 115rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #324B77;
				}

				.details-content-goods-title::after,
				.details-content-goods-title::before {
					position: absolute;
					top: 0;
					bottom: 0;
					margin: auto;
					content: '';
					width: 40rpx;
					height: 1rpx;
					background: #314B77;
				}

				.details-content-goods-title::after {
					right: -66rpx;
				}

				.details-content-goods-title::before {
					left: -66rpx;
				}
			}

			.details-goods-img-list {}
		}

		.details-footer {
			position: fixed;
			bottom: 0;
			width: 100%;
			// height: 128rpx;
			background: #fff;
			padding: 0 32rpx;
			box-sizing: border-box;

			.statusBarHeight {
				padding-bottom: 60rpx;
			}
		}

	}
</style>
