<template>
	<view class="goods-box">
		<Title title="搜索" @GBack="GBack" :isGBack="true"></Title>
		<view class="goods-content">
			<Search @SearchBtn="SearchBtn" :ValTitle='ValTitle' @KeyEndter="SearchBtn"></Search>
			<view class="goods-list" v-show="isData">
				<mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
					<view class="goods-list-li" v-for="(item,index) in GoodsList" :key="item.id" @click="GoodsDetails(item.id)">
						<view class="goods-li-img">
							<image :src="item.pic" mode="aspectFill"></image>
						</view>
						<view class="goods-li-info">
							<view class="goods-info-top">
								{{item.name}}
							</view>
							<view class="goods-info-center">
								销量 {{item.numberSells}}
							</view>
							<view class="goods-info-bottom">
								<view class="goods-info-price">
									￥<text>{{item.minPrice|PriceTow}}</text>
								</view>
								<view class="goods-info-add">
									<image src="../../static/images/shopping-ico.png" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</mescroll-uni>
			</view>
			<view class="goods-list" v-show="!isData">
				<view class="goods-list-login" v-if="isLogin">
					<text>加载中...</text>
				</view>
				<view class="goods-list-login" v-else>
					<image src="../../static/images/no-search-ico.png" mode=""></image>
					<text>暂时没有搜索结果</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from '../../static/js/ajax.js'
	import Title from "../../components/title/title.vue"
	import Search from "../../components/search-input/search-input.vue"
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"

	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";

	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				ValTitle: '',
				GoodsList: [],
				arrData: [],
				isData: false,
				isLogin: true,
				downOption: { // 下拉刷新配置
					auto: false,
				},
				upOption: { // 上拉加载配置
					noMoreSize: 5,
					textLoading: "正在加载更多数据",
					textNoMore: "——  已经到底了  ——",
					auto: false
				},
				PageNumber: 1, // 请求页数，
				PageLimt: 10, // 请求条数
			}
		},
		components: {
			MescrollUni,
			Title,
			Search,
		},
		// 过滤器
		filters: {
			// 价格保留两位
			PriceTow(value) {
				let val = !value ? 0 : value
				return val.toFixed(2)
			},
		},
		created() {

		},
		onLoad(options) {
			this.arrData = uni.getStorageSync("RecordsData")
			this.ValTitle = options.data
			this.GoodsListData(options.data)
		},
		methods: {
			// 返回上一级
			GBack() {
				uni.navigateBack({
					delta: 1
				})
			},

			/*下拉刷新的回调*/
			downCallback() {
				setTimeout(() => {
					// this.mescroll.showUpScroll() // 显示上拉加载布局
					this.PageNumber = 1
					this.GoodsListData(this.ValTitle)
					// this.mescroll.endSuccess()
					// this.mescroll.endSuccess()
				}, 500)
			},
			/*上拉加载的回调*/
			upCallback(page) {
				this.PageNumber++
				this.GoodsListData(this.ValTitle)
			},


			// 搜索按钮 // 回车事件
			SearchBtn(e) {
				
				this.isLogin = true

				this.PageNumer = 1
				this.ValTitle = e
				this.GoodsList=[]
				this.GoodsListData(e)


				if (this.arrData.indexOf(e) == -1) {
					// 判断是否有输入了文字的情况下添加
					if (e != '') {
						// 数组内没有的情况
						this.arrData.splice(0, 0, e) // 向数组的第一位插入一位 
					}
				} else {
					// 数组有就改变位置
					this.arrData.unshift(...this.arrData.splice(this.arrData.findIndex(i => i === e), 1))
				}
				uni.setStorageSync('RecordsData', this.arrData);
				
			},
			// 商品详情
			GoodsDetails(id) {
				uni.navigateTo({
					url: "../goods-details/goods-details?id=" + id
				})
			},

			// 获取数据
			GoodsListData(text) {
				let data = {
					k: text,
					page: this.PageNumber,
					pageSize: this.PageLimt,
				}
				request({
					url: '/shop/goods/list',
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.isData = true
							this.mescroll.endSuccess()
							
							this.GoodsList = this.GoodsList.concat(res.data.data);
							// 数组去重 避免重复添加数据
							let hash = {};
							this.GoodsList = this.GoodsList.reduce((preVal, curVal) => {
								hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
								return preVal
							}, [])


							if (res.data.data.length < this.PageLimt) {
								this.mescroll.showNoMore()
							}
							
						} else if (res.data.code == 700) {
							// this.mescroll.endErr()
							this.isData = false
							this.isLogin = false
						}

					} else {}

				})
			},

		},
		//上拉加载
		onReachBottom() {
			console.log("触发上拉")
		},
	}
</script>

<style lang="scss" scoped>
	.goods-box {
		display: flex;
		flex-direction: column;
		height: 100%;

		.goods-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow-y: scroll;
			padding: 14rpx 32rpx 0;
			box-sizing: border-box;

			// 隐藏滚动条
			.goods-list::-webkit-scrollbar {
				display: none;
			}

			.goods-list {
				flex: 1;
				overflow-y: scroll;
				margin-top: 16rpx;

				.goods-list-li {
					display: flex;
					align-items: center;
					margin-top: 40rpx;
					height: 160rpx;

					.goods-li-img {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 160rpx;
						height: 160rpx;
						border-radius: 12rpx;
						background: #eee;

						image {
							width: 100%;
							height: 100%;
							border-radius: 12rpx;
						}
					}

					.goods-li-info {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						flex: 1;
						height: 100%;
						margin-left: 24rpx;

						.goods-info-top {
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

							.goods-info-price {
								font-weight: 500;
								font-size: 22rpx;
								color: $uni-text-color-text;

								text {
									font-size: 28rpx;
								}
							}

							.goods-info-add {
								width: 48rpx;
								height: 48rpx;

								image {
									width: 100%;
									height: 100%;
								}
							}
						}
					}
				}

				.goods-list-login {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;

					image {
						width: 208rpx;
						height: 154rpx;
						transform: translateY(-50rpx);
					}

					text {
						// margin-top: 39rpx;
						color: #B3B3B3;
						font-size: 22rpx;
						font-weight: 400;
					}
				}
			}
		}
	}
</style>
