<template>
	<view class="order-box">
		<view class="order-box-head">
			<Title title="确认订单" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="order-box-content">
			<view class="order-content-address" @click="CheckAddress">
				<view class="order-address-ico">
					<image src="../../static/images/address-ico.png" mode=""></image>
				</view>
				<!-- 没有选择地址显示 -->
				<view class="order-address-info" v-if="!isState">
					<view class="order-info-title">请选择收货地址</view>
				</view>
				<!-- 选择地址显示 -->
				<view class="order-address-info" v-else>
					<view class="order-info-top">
						<view class="order-info-top-name">{{AddressInfo.linkMan}}</view>
						<view class="order-info-top-tel">{{AddressInfo.mobile}}</view>
					</view>
					<view class="order-info-bottom">{{AddressInfo.provinceStr}}-{{AddressInfo.cityStr}}-{{AddressInfo.areaStr}}-{{AddressInfo.address}}</view>
				</view>
				<view class="order-address-more">
					<image src="../../static/images/mord.png" mode=""></image>
				</view>
			</view>

			<view class="order-content-wrap">
				<confirm-list :GoodsList="GoodsList"></confirm-list>
				<view class="order-content-msg">
					<view class="order-msg-li">
						<view class="order-msg-li-title">商品总价</view>
						<view class="order-msg-li-text">￥{{TotalPrice|PriceTow}}</view>
					</view>
					<view class="order-msg-li">
						<view class="order-msg-li-title">邮费</view>
						<view class="order-msg-li-text">{{Postage}}</view>
					</view>
					<view class="order-msg-li" v-if="FullMinusPrice!=0">
						<view class="order-msg-li-title">满减优惠</view>
						<view class="order-msg-li-text" v-if="TotalPrice>=FullMinusPrice">
							<text style="color: #E53948;">满{{FullMinusPrice|PriceTow}}元减{{ReducePrice|PriceTow}}元</text>
						</view>
						<view class="order-msg-li-text" v-else>暂无满减</view>
					</view>
					<view class="order-msg-li">
						<view class="order-msg-li-title">优惠券</view>
						<view class="order-msg-li-text">
							<view class="order-msg-text-pic" v-if="CouponList.length!=0" @click="CouponDetail">
								<text style="color: #999;" v-if="couponMoney==0">{{CouponList.length}}张可用</text>
								<text style="color: #E53948;" v-else>-￥{{couponMoney}}</text>
							</view>
							<view class="order-msg-text-pic" v-else>
								<text style="color: #999;">无可用优惠券</text>
							</view>

						</view>
						<view class="order-msg-li-more">
							<image src="../../static/images/mord.png" mode=""></image>
						</view>
					</view>
					<view class="order-msg-li">
						<view class="order-msg-li-title">备注</view>
						<view class="order-msg-li-text"><input type="text" v-model="RemarkVal" placeholder="备注信息" /></view>
					</view>
				</view>
			</view>
		</view>
		<view class="order-box-footer" :class="{'statusBarHeight':isBarHeight}">
			<view class="order-footer-info">
				<view class="order-footer-info-text">
					合计：
				</view>
				<view class="order-footer-info-price">
					￥<text>{{DiscountPrice}}</text>
				</view>
			</view>
			<view class="order-footer-btn" @click="PayBtn">
				立即支付
			</view>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from "../../static/js/ajax.js"
	import Title from "../../components/title/title.vue"
	import ConfirmList from "../../components/confirm-list/confirm-list.vue"
	export default {
		data() {
			return {
				AddressInfo: {},
				isState: false,
				AddressInfoList: {},
				GoodsList: [],
				RemarkVal: '',
				CouponList: [], // 优惠券列表
				couponId: "",
				couponMoney: 0,
				OrderData: [],
				isBarHeight: false,
				isPostage: false, // 是否包邮
				Postage: "暂无", // 邮费显示
				PostagePrice: 0, // 邮费默认为0
				FullMinusPrice: 0, //满减价格
				ReducePrice: 0, // 满减优惠
			}
		},
		components: {
			Title,
			ConfirmList
		},
		// 过滤器
		filters: {
			PriceTow(value) {
				let val = !value ? 0 : value
				return val.toFixed(2)
			}
		},
		computed: {
			// 商品总价格
			TotalPrice() {
				let price = 0;
				this.GoodsList.forEach(item => {
					price += item.number * item.price

				})
				return price
			},
			DiscountPrice() {
				let TotalPrice = 0
				let price = 0;

				this.GoodsList.forEach(item => {
					price += item.number * item.price

				})
				if (this.TotalPrice >= this.FullMinusPrice) {
					TotalPrice = Number((price - this.couponMoney - this.ReducePrice) + Number(this.PostagePrice))
				} else {
					TotalPrice = Number((price - this.couponMoney) + Number(this.PostagePrice))
				}
				return TotalPrice.toFixed(2)
			}
		},
		onShow() {

		},
		onLoad(options) {
			this.GoodsList = JSON.parse(options.data)
			// console.log(this.GoodsList)

			this.getAddressList()
			this.getCoupon() // 执行优惠券列表接口
			this.SystemInfo() // 获取手机信息
			// 获取满减设置
			this.FullMinusSet()

		},
		methods: {
			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				})
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

			// 选择地址
			CheckAddress() {
				uni.navigateTo({
					url: "../../pagesA/address-list/address-list"
				})
			},
			// 支付按钮
			PayBtn() {
				// /pay/wx/wxapp
				// 判断是否 有选择收货地址
				if (JSON.stringify(this.AddressInfo) == "{}") {
					uni.showToast({
						title: "请先选择收货地址",
						icon: "none"
					})
				} else {
					uni.requestSubscribeMessage({
						tmplIds: ['mRQJTXpMgamayogng4Ai977L9h9RWzx7nGMdUBot_dI', 'Q4K-V-0ahldBI-wcqWggFX1eUpLcEhRn_XEQbtw5wIQ'],
						success: (res) => {
							uni.showLoading({
								title: '订单创建中',
								mask: true
							});
							// 创建订单
							this.CreateOrder()
						},
						fail: (err) => {
							// console.log(err)
						},
						complete: (ress) => {

						}
					})
				}

			},
			// 创建订单
			CreateOrder() {
				var str = {};
				var arr = [];
				this.GoodsList.map((item) => {
					var propertyChildIds = ''
					if (item.sku && item.sku.length > 0) {
						item.sku.forEach(el => {
							propertyChildIds = propertyChildIds + ',' + el.optionId + ':' + el.optionValueId
						})
					}
					str = {
						goodsId: item.goodsId,
						number: item.number,
						propertyChildIds: propertyChildIds,
						logisticsType: 0
					}
					arr.push(str)
				})

				let data = {
					goodsJsonStr: JSON.stringify(arr), //购买的商品、规格尺寸、数量信息的数组
					address: this.AddressInfo.address, //收货地址详细地址
					provinceId: this.AddressInfo.provinceId, //收货地址省份编码
					cityId: this.AddressInfo.cityId, //收货地址城市编码
					districtId: this.AddressInfo.districtId, //收货地址区县编码
					couponId: this.couponId, //优惠券编号，多张用逗号相隔
					linkMan: this.AddressInfo.linkMan, //收货地址联系人信息
					mobile: this.AddressInfo.mobile, //收货地址联系人手机号码
					payOnDelivery: 0, //1为货到付款，其他数字为先支付
					peisongType: "kd", //配送类型，kd 代表快递；zq代表到店自取； keloop 快跑者; pszq 商家配送自取(还需收取快递费)
					remark: this.RemarkVal == '' ? ' ' : this.RemarkVal, //订单备注信息
					token: uni.getStorageSync("token")
				}
				
				request({
					url: '/order/create',
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							// var options =
							this.OrderData = res.data.data
							// 订单创建成功 执行删除购物车数据
							this.DeleteShopping()
							uni.removeStorageSync("checkList")

							var id = res.data.data.id

							// 调用支付
							this.RequestPay(this.DiscountPrice, id)
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					} else {}
				})
			},


			// 请求支付
			RequestPay(price, id) {
				var str = {
					type: 0,
					id: id
				}
				var data = {
					money: price,
					payName: '订单支付',
					nextAction: JSON.stringify(str),
					token: uni.getStorageSync("token")
				}
				request({
					url: '/pay/wx/wxapp',
					method: 'POST',
					data: data
				}).then(res => {
					// 隐藏加载页效果
					uni.hideLoading();
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							// 调用支付接口
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: res.data.data.timeStamp,
								nonceStr: res.data.data.nonceStr,
								package: res.data.data.package,
								signType: res.data.data.signType,
								paySign: res.data.data.paySign,
								success: (ress) => {
									// console.log('支付成功：',ress)
									//跳转支付成功页面
									uni.redirectTo({
										url: '../../pagesB/pay-success/pay-success?data=' + JSON.stringify(this.OrderData)+'&price='+this.DiscountPrice
									});
									console.log('success:' + JSON.stringify(ress));
								},
								fail: (err) => {
									// console.log('支付失败：',err)
									uni.redirectTo({
										url: '../../pagesB/payment-details/payment-details?id=' + JSON.stringify(this.OrderData.id)
									});
									console.log('fail:' + JSON.stringify(err));
								},
								complete: (crr) => {

								}
							});
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					} else {}
				})
			},


			// 点击进入到优惠券列表
			CouponDetail() {
				let str = {
					type: "pay",
					money: this.TotalPrice
				}
				uni.navigateTo({
					url: "../../pagesA/coupon-list/coupon-list?item=" + JSON.stringify(str)
				})
			},

			// 删除购物车数据
			DeleteShopping() {
				var key = '';
				this.GoodsList.map((item) => {
					key += item.key + ","
				})

				let data = {
					key: key,
					token: uni.getStorageSync("token")
				}
				request({
					url: '/shopping-cart/remove',
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {

						} else if (res.data.code == 700) {
							// 存储购物车数据
							uni.setStorage({
								key: 'ShoppingList',
								data: "",
							});
						}
					} else {}

				})
			},

			// 获取满减
			FullMinusSet() {
				request({
					url: '/payBill/discounts',
					method: 'GET',
					data: {
						token: uni.getStorageSync("token")
					}
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.FullMinusPrice = res.data.data[0].consume // 满减价格
							this.ReducePrice = res.data.data[0].discounts // 满减优惠价格
						} else if (res.data.code == 700) {
							this.FullMinusPrice = 0
						}
					} else {}
				})
			},


			// 获取默认收货收货地址
			getAddressList() {
				let data = {
					token: uni.getStorageSync("token")
				}
				request({
					url: '/user/shipping-address/default/v2',
					// url: '/user/shipping-address/list',
					method: 'GET',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.AddressInfo = res.data.data.info
							this.isState = true

							var provinceId = res.data.data.info.provinceId; // 省
							var cityId = res.data.data.info.cityId; // 市
							var districtId = res.data.data.info.districtId; // 区、县

							// 目前设置 不包邮的商品与包邮的一起结算，默认包邮
							this.GoodsList.forEach(item => {
								this.LogisticsCost(provinceId, cityId, districtId, item.logisticsId)
							})

						} else {

						}
					} else {}

				})
			},
			// 获取优惠券列表
			getCoupon() {
				let data = {
					status: 0,
					token: uni.getStorageSync("token")
				}
				request({
					url: "/discounts/my",
					method: 'GET',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.CouponList = []
							res.data.data.forEach(item => {
								if (this.TotalPrice >= item.moneyHreshold) {
									this.CouponList.push(item)
								}
							})
							// console.log(this.CouponList)
							// console.log(res.data.data)
						} else {
							this.isData = false
							// uni.showToast({
							// 	title: res.data.msg,
							// 	icon: "none"
							// })
						}
					} else {}

				})
			},
			// 获取物流费用
			LogisticsCost(provinceId, cityId, districtId, templateId) {
				let data = {
					templateId: templateId, //运费模板编号，
					type: 0, //快递方式：0 快递 1 EMS 2 平邮
					provinceId: provinceId, //	用户省份编号
					cityId: cityId, //用户城市编号
					districtId: districtId, //用户区县编号
					token: uni.getStorageSync("token") //登录接口返回的token
				}
				request({
					url: "/shop/goods/price/freight",
					method: 'GET',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.isPostage = true
							if (this.isPostage) {
								this.PostagePrice = res.data.data.firstAmount
								this.Postage = "+￥" + res.data.data.firstAmount.toFixed(2)
								console.log(this.PostagePrice)
							} else {
								this.PostagePrice = 0
							}
						} else if (res.data.code == 10002) {
							if (!this.isPostage) {
								this.Postage = res.data.msg
								// this.PostagePrice = 0
							}
						}
					} else {}

				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.order-box {
		display: flex;
		flex-direction: column;
		height: 100%;

		.order-box-head {}

		.order-box-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow-y: scroll;
			height: 100%;
			background: #f7f7f7;


			.order-content-address {
				display: flex;
				align-items: center;
				width: 100%;
				// height:170rpx;
				padding: 32rpx;
				margin-bottom: 16rpx;
				box-sizing: border-box;
				// background: ;
				background: url(../../static/images/add-bg.png) no-repeat #fff;
				background-size: contain;
				background-position: bottom;

				.order-address-ico {
					display: flex;
					align-items: center;
					width: 32rpx;
					height: 34rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.order-address-info {

					flex: 1;
					margin: 0 29rpx;

					.order-info-title {
						color: #000;
						font-size: 28rpx;
						font-weight: 500rpx;
					}

					.order-info-top {
						display: flex;
						align-items: center;
						color: #000;

						.order-info-top-name {
							font-size: 28rpx;
						}

						.order-info-top-tel {
							margin-left: 24rpx;
							font-size: 24rpx;
						}
					}

					.order-info-bottom {
						// margin-top: 22rpx;
						color: #000;
						font-size: 24rpx;
					}

				}

				.order-address-more {
					display: flex;
					align-items: center;
					width: 12rpx;
					height: 22rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.order-content-wrap {
				flex: 1;
				overflow-y: scroll;

				.order-content-msg {
					flex: 1;
					margin-top: 16rpx;
					padding: 0 32rpx;
					box-sizing: border-box;
					// padding-bottom: 28rpx;
					font-weight: 500;
					background: #fff;

					.order-msg-li {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 79rpx;
						font-size: 24rpx;
						border-bottom: 1rpx solid #f2f2f2;

						.order-msg-li-title {}

						.order-msg-li-text {
							display: flex;
							justify-content: flex-end;
							margin-left: 16rpx;
							flex: 1;
							margin-left: 50rpx;
							font-size: 400;

							text {
								color: #E53948;
								margin-right: 16rpx;
							}

							input {
								width: 100%;
								font-size: 24rpx;
								text-align: right;
							}

							.uni-input-placeholder {
								color: #999;
								font-weight: 400;
							}
						}

						.order-msg-li-more {
							display: flex;
							align-items: center;
							width: 12rpx;
							height: 22rpx;

							image {
								width: 100%;
								height: 100%;
								opacity: 0.4;
							}
						}
					}
				}
			}
		}

		.statusBarHeight {
			padding-bottom: 60rpx !important;
		}

		.order-box-footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 88rpx;
			padding: 0 32rpx;
			background: #fff;

			.order-footer-info {
				display: flex;
				align-items: baseline;

				.order-footer-info-text {
					color: #000;
					font-size: 24rpx;
					font-weight: 500;
				}

				.order-footer-info-price {
					font-size: 20rpx;
					font-weight: 500;
					color: #E53948;

					text {
						font-size: 40rpx;
					}
				}
			}

			.order-footer-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 176rpx;
				height: 64rpx;
				background: #324B78;
				box-sizing: border-box;
				border-radius: 32rpx;
				color: #fff;
				font-size: 24rpx;
				font-weight: 400;
			}

		}
	}
</style>
