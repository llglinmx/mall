<template>
	<view class="pop-goods-details">
		<view class="pop-goods-head">
			<view class="pop-head-img" @click="ClickPreview(ImgUrl)">
				<image :src="ImgUrl" mode=""></image>
			</view>
			<view class="pop-head-info">
				<view class="pop-head-info-price">￥ <text>{{goodsPrice | PriceTwo}}</text></view>
				<view class="pop-head-info-stock">
					库存{{stores}}件
				</view>
				<view class="pop-head-info-title">
					{{goodsTitle}}
				</view>
			</view>
			<view class="pop-head-close" @click="PopClose">
				<image src="../../static/images/close.png" mode=""></image>
			</view>
		</view>
		<view class="pop-goods-content">
			<view class="pop-goods-li" v-for="(item,index) in popInfo.properties" :key="item.id">
				<view class="pop-content-title">
					{{item.name}}
				</view>
				<view class="pop-content-box">
					<view class="pop-content-box-li" :class="el.active?'active':''" v-for="(el,idx) in item.childsCurGoods" :key="el.id"
					 @click="checkList(index,idx)">
						{{el.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="pop-goods-footer">
			<view class="pop-goods-stepper">
				<view class="pop-stepper-title">
					购买数量
				</view>
				<view class="shopping-info-stepper">
					<view class="stepper-reduce" :class="{'active':this.valueNum==1}" @click.stop="AddGoodsClick('reduce')">
						<image src="../../static/images/reduce.png" mode=""></image>
					</view>
					<view class="stepper-num">{{valueNum}}</view>
					<!-- <input class="stepper-num" type="text" :value="item.number" /> -->
					<view class="stepper-add" :class="{'active':this.valueNum>=this.stores}" @click.stop="AddGoodsClick('add')">
						<image src="../../static/images/add.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="pop-footer-btn" @click="AddShopping(0)" v-if="isBtnType">
				立即购买
			</view>
			<view class="pop-footer-btn" @click="AddShopping(1)" v-else>
				加入购物车
			</view>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from '../../static/js/ajax.js'
	export default {
		data() {
			return {
				goodsTitle: '暂未选择',
				goodsPrice: 0,
				stores: 0,
				valueNum: 1,
				ImgUrl: '',
				isImg: false,
				isStores: false,
			}
		},
		created() {
			// console.log(this.popInfo)
		},
		// 过滤器
		filters: {
			PriceTwo(value) {
				return value.toFixed(2)
			},

		},
		props: {
			popInfo: {
				// type: Object,
				default:{
					basicInfo: {
						pic: "",
						minPrice: 0,
						stores: ""
					}
				}
			},
			priceData: {

			},
			isBtnType: {
				type: Boolean,
				default: false
			},
			isPopup: {
				type: Boolean,
				default: false
			},
		},
		created() {
			// 设置初始图片
			this.goodsPrice = this.popInfo["basicInfo"]["minPrice"] // 设置初始价格
			this.stores = this.popInfo["basicInfo"]["stores"] // 库存数量
			this.goodsTitle = "暂未选择"
			this.ImgUrl = this.popInfo.basicInfo.pic

			// #ifdef H5 
			if (!this.popInfo.properties) {
				this.isStores = true
				this.goodsTitle = this.popInfo['basicInfo']['name'] // 单规格直接拿到商品名称
			}
			// #endif 
		},
		
		watch: {
			popInfo(val) {
				this.popInfo = val
				this.goodsPrice = this.popInfo["basicInfo"]["minPrice"] // 设置初始价格
				this.stores = this.popInfo["basicInfo"]["stores"] // 库存数量
				this.goodsTitle = "暂未选择"
				// console.log(this.popInfo)
				// 开始默认使用初始图片，选择不同的规格显示对应不同的图片
				if (!this.isImg) {
					this.ImgUrl = this.popInfo.basicInfo.pic // 设置初始图片
				}
				console.log(!this.popInfo.properties)
				if (!this.popInfo.properties) {
					this.isStores = true
					this.goodsTitle = this.popInfo['basicInfo']['name'] // 单规格直接拿到商品名称
				}
			},
			isPopup(value) {
				if (!value) {
					this.isStores = false
				}
			},
		},

		onLoad() {

		},
		methods: {
			// 点击选择商品属性
			checkList(index, idx) {
				const property = this.popInfo.properties[index]
				const child = property.childsCurGoods[idx]

				this.popInfo.properties[index].childsCurGoods.forEach(child => {
					child.active = false
				})

				this.popInfo.properties[index].childsCurGoods[idx].active = true

				let propertyChildIds = "";
				let propertyChildNames = ""; //
				let popertyTitle = ''; //已选商品
				let str = {};
				let isImg = '' // 用来获取当前点击时那种规格 然后显示对应的图片

				this.popInfo.properties.forEach(p => {
					p.childsCurGoods.forEach(c => {
						if (c.active) {
							propertyChildIds = propertyChildIds + p.id + ":" + c.id + ",";
							propertyChildNames = propertyChildNames + p.name + ":" + c.name + "  ";
							popertyTitle = popertyTitle + c.name + ' / ' // 已选商品标题
							isImg = c.id

							// 循环图片列表 ,选中对应的图片
							this.popInfo.subPics.forEach(item => {
								if (item.optionValueId == c.id) {
									this.ImgUrl = item.pic
									this.isImg = true
								}
							})

						}
					})
				})
				// console.log(propertyChildIds, propertyChildNames)



				// this.goodsTitle = '已选：' + popertyTitle // 已选商品标题

				let data = {
					goodsId: this.popInfo.basicInfo.id,
					propertyChildIds: propertyChildIds,
					token: uni.getStorageSync("token")
				}
				this.getPrice(data) // 获取价格及库存数量


				// 导出一个事件
				this.$emit("CheckActive", this.popInfo)

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
							this.goodsTitle = '已选：' + res.data.data.propertyChildNames // 已选商品
							this.goodsPrice = res.data.data.price // 价格
							this.stores = res.data.data.stores // 库存数量

							this.isStores = true // 用来判断是否选择了规格数量

						} else if (res.data.code = 405) {
							this.goodsTitle = res.data.msg
						}
					}
				})
			},

			// 关闭按钮
			PopClose() {
				this.$emit('PopClose')
				this.isImg = false
			},
			// 加入购物车按钮
			AddShopping(type) {
				let optionsArr = {
					number: this.valueNum,
					DataList: this.popInfo,
					type: type,
					price: this.goodsPrice
				}
				this.$emit('ShoppingBtn', optionsArr)
				this.valueNum = 1
				this.isImg = false
			},

			// 商品数量加减
			AddGoodsClick(type) {
				// console.log(this.isStores)
				if (this.isStores) {
					switch (type) {
						case "reduce":
							if (this.valueNum != 1) {
								this.valueNum--
							} else {
								uni.showToast({
									title: '商品数量最低为 1',
									icon: 'none'
								})
							}
							break;
						case "add":
							if (this.valueNum >= this.stores) {
								uni.showToast({
									title: '超过可售数量：' + this.stores,
									icon: 'none'
								})
							} else {
								this.valueNum++
							}
							break;
					}
				} else {
					uni.showToast({
						title: '请先选择规格',
						icon: 'none'
					})
				}

			},
			// 点击图片放大预览
			ClickPreview(url) {
				let imgsArray = [];
				imgsArray[0] = url
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pop-goods-details {
		display: flex;
		flex-direction: column;
		width: 100%;
		// height: 950rpx;
		padding: 0 32rpx;
		box-sizing: border-box;
		max-height: 1200rpx;
		min-height: 400rpx;
		background: #fff;
		border-radius: 12rpx 12rpx 0 0;

		.pop-goods-head {
			position: relative;
			display: flex;
			width: 100%;
			padding: 32rpx 0;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;

			.pop-head-img {
				width: 160rpx;
				height: 160rpx;
				border-radius: 20rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
				}
			}

			.pop-head-info {
				flex: 1;
				margin: 0 20rpx 0 20rpx;

				.pop-head-info-price {
					font-size: 24rpx;
					line-height: 56rpx;
					color: #c11b14;

					text {
						font-size: 40rpx;
						font-weight: 600;
					}
				}

				.pop-head-info-stock {
					font-size: 24rpx;
					color: #999;
				}

				.pop-head-info-title {
					margin-top: 16rpx;
					font-size: 28rpx;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}

			.pop-head-close {
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				top: 32rpx;
				right: 0;
				width: 50rpx;
				height: 50rpx;

				image {
					width: 22rpx;
					height: 22rpx;
				}
			}

		}

		.pop-goods-content {
			flex: 1;
			overflow-y: scroll;

			.pop-goods-li {
				.pop-content-title {
					padding: 30rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #000;
				}

				.pop-content-box {
					display: flex;
					flex-wrap: wrap;

					.pop-content-box-li {
						display: flex;
						align-items: center;
						justify-content: center;
						max-width: 427rpx;
						min-width: 94rpx;
						height: 50rpx;
						padding: 0 25rpx;
						box-sizing: border-box;
						margin: 0 20rpx 20rpx;
						border: 1px solid #eee;
						background: #eee;
						border-radius: 50rpx;
						font-size: 28rpx;
						color: #999;
					}

					.active {
						color: #324B78 !important;
						border: 1px solid #324B78 !important;
						background: #dce5f5;
					}
				}
			}
		}

		.pop-goods-footer {
			padding: 30rpx 0;

			.pop-stepper-title {
				font-size: 28rpx;
				color: #000;
			}

			.pop-goods-stepper {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 64rpx;
				// background: $uni-bg-color-mask;

				.shopping-info-stepper {
					display: flex;
					width: 128rpx;
					height: 36rpx;
					margin-right: 20rpx;

					.active {
						opacity: 0.5;
					}

					.stepper-reduce,
					.stepper-add {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 36rpx;
						height: 36rpx;
						font-weight: 600;
						border-radius: 50%;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.stepper-num {
						display: flex;
						justify-content: center;
						align-items: center;
						flex: 1;
						color: #000;
						font-size: 28rpx;
						text-align: center;
					}
				}
			}

			.pop-footer-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 650rpx;
				height: 64rpx;
				margin-top: 80rpx;
				color: #fff;
				background: #324B78;
				font-size: 24rpx;
				border-radius: 50rpx;
			}
		}

	}
</style>
