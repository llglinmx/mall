<template>
	<view class="order-box">
		<view class="order-box-head">
			<Title title="我的订单" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="order-content">
			<view class="order-tabs">
				<Tabs :TabsList='TabsList' :IndexIdx='idx' @TabClick="TabBtn"></Tabs>
			</view>
			<view class="order-list-box">
				<swiper class="swiper-box" :current="idx" @change="tabChange">
					<swiper-item class="swiper-box-item-list">
						<view class="order-list-li">
							<view class="order-list-li-data" v-show="isDataOne">
								<mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
									<tab-list :OrderList="OrderList1" @OrderDetail="OrderDetail" @ClickBtn="ClickBtn"></tab-list>
								</mescroll-uni>
							</view>
							<view class="order-list-li-data" v-show="!isDataOne">
								<view class="order-list-li-load" v-if="!isLoad">
									<Loading></Loading>
								</view>
								<view class="order-list-li-nota" v-else>
									<image src="../../static/images/order-ico3.png" mode=""></image>
									<text>暂时没有任何订单</text>
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item class="swiper-box-item-list">
						<view class="order-list-li">
							<view class="order-list-li-data" v-show="isDataTwo">
								<!-- <mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption"> -->
								<tab-list :OrderList="OrderList2" @OrderDetail="OrderDetail" @ClickBtn="ClickBtn"></tab-list>
								<!-- </mescroll-uni> -->
							</view>
							<view class="order-list-li-data" v-show="!isDataTwo">
								<view class="order-list-li-load" v-if="!isLoad">
									<Loading></Loading>
								</view>
								<view class="order-list-li-nota" v-else>
									<image src="../../static/images/order-ico1.png" mode=""></image>
									<text>暂时没有待付款订单</text>
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item class="swiper-box-item-list">
						<view class="order-list-li">
							<view class="order-list-li-data" v-show="isDataThree">
								<!-- <mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption"> -->
								<tab-list :OrderList="OrderList3" @OrderDetail="OrderDetail" @ClickBtn="ClickBtn"></tab-list>
								<!-- </mescroll-uni> -->
							</view>
							<view class="order-list-li-data" v-show="!isDataThree">
								<view class="order-list-li-load" v-if="!isLoad">
									<Loading></Loading>
								</view>
								<view class="order-list-li-nota" v-else>
									<image src="../../static/images/order-ico2.png" mode=""></image>
									<text>暂时没有待发货订单</text>
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item class="swiper-box-item-list">
						<view class="order-list-li">
							<view class="order-list-li-data" v-show="isDataFour">
								<!-- <mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption"> -->
								<tab-list :OrderList="OrderList4" @OrderDetail="OrderDetail" @ClickBtn="ClickBtn"></tab-list>
								<!-- </mescroll-uni> -->
							</view>
							<view class="order-list-li-data" v-show="!isDataFour">
								<view class="order-list-li-load" v-if="!isLoad">
									<Loading></Loading>
								</view>
								<view class="order-list-li-nota" v-else>
									<image src="../../static/images/order-ico3.png" mode=""></image>
									<text>暂时没有待收货订单</text>
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item class="swiper-box-item-list">
						<view class="order-list-li">
							<view class="order-list-li-data" v-show="isDataFive">
								<!-- <mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption"> -->
								<tab-list :OrderList="OrderList5" @OrderDetail="OrderDetail" @ClickBtn="ClickBtn"></tab-list>
								<!-- </mescroll-uni> -->
							</view>
							<view class="order-list-li-data" v-show="!isDataFive">
								<view class="order-list-li-load" v-if="!isLoad">
									<Loading></Loading>
								</view>
								<view class="order-list-li-nota" v-else>
									<image src="../../static/images/no-evalute.png" mode=""></image>
									<text>暂时没有待评价列表</text>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<uni-popup ref="close" type="dialog">
			<uni-popup-dialog type="warn" content="你确定要取消此订单吗？" title="警告" :duration="2000" :before-close="false" @confirm="CloseCnfirm"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warn" content="你确定要删除此订单吗？" title="警告" :duration="2000" :before-close="false" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="goods" type="dialog">
			<uni-popup-dialog type="warn" content="你确定要点击已收货吗？" title="警告" :duration="2000" :before-close="false" @confirm="ConfirmGoods"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {
		request
	} from "../../static/js/ajax.js"
	import Title from "../../components/title/title.vue"
	import Tabs from "../../components/tabs/tabs.vue"
	import TabList from "../../components/tab-list/tab-list.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import Loading from "../../components/loading/loading.vue"
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
				TabsList: ["全部订单", "待付款", "待发货", "待收货", "待评价"],
				idx: 0,
				OrderTitle: [],
				OrderList1: [],
				OrderList2: [],
				OrderList3: [],
				OrderList4: [],
				OrderList5: [],
				isDataOne: false,
				isDataTwo: false,
				isDataThree: false,
				isDataFour: false,
				isDataFive: false,
				isLoad1: false,
				isLoad2: false,
				isLoad3: false,
				isLoad4: false,
				isLoad: false,
				isData: false,
				timeData: '', //存放每条数据的处理好的倒计时
				timer: '', //用来清除定时器
				goodsId: '',
				orderInfo: {},

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
			}
		},
		components: {
			Title,
			Tabs,
			TabList,
			uniPopup,
			uniPopupDialog,
			MescrollUni,
			Loading
		},

		onLoad(options) {
			this.idx = options.id

			this.Init(options.id)
		},
		onUnload() {
			clearInterval(this.timer)
		},
		methods: {
			...mapMutations(['VuexOrderList']), // 引入vuex 里的事件

			// 初始执行
			Init(index) {
				this.isData = false
				var id = ""

				switch (Number(index)) {
					case 0:
						id = ""
						this.GetOrder(id)
						break;
					case 1:
						id = 0
						this.GetOrder(id)
						break;
					case 2:
						id = 1
						this.GetOrder(id)
						break;
					case 3:
						id = 2
						this.GetOrder(id)
						break;
					case 4:
						id = 3
						this.GetOrder(id)
						break;
				}
			},

			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			/*下拉刷新的回调*/
			downCallback() {
				this.PageNumber = 1
				setTimeout(() => {
					if (this.idx == 0) {
						this.GetOrder("")
					}
				}, 1500)
			},

			/*上拉加载的回调*/
			upCallback(page) {
				console.log("上拉加载")
				this.PageNumber++
				
				if (this.idx == 0) {
					this.GetOrder('');
				}
			},


			// tabs 点击
			TabBtn(index) {
				this.idx = index
				this.PageNumber = 1
				var id = ''
				switch (index) {
					case 0:
						id = ''
						break;
					case 1:
						id = 0
						break;
					case 2:
						id = 1
						break;
					case 3:
						id = 2
						break;
					case 4:
						id = 3
						break;
					default:
						break
				}
				// 判断是否有登录
				if (!!uni.getStorageSync("token")) {
					if (this.idx !== index) {
						switch (Number(this.idx)) {
							case 0:
								this.isDataOne = true
								break;
							case 1:
								this.isDataTwo = true
								break;
							case 2:
								this.isDataThree = true
								break;
							case 3:
								this.isDataFour = true
								break;
							case 4:
								this.isDataFive = true
								break;
						};
						this.isLoad = false
						this.OrderTitle = []
						this.GetOrder(id) // 点击tabs
					}
				} else {
					switch (Number(this.idx)) {
						case 0:
							this.isDataOne = true
							break;
						case 1:
							this.isDataTwo = true
							break;
						case 2:
							this.isDataThree = true
							break;
						case 3:
							this.isDataFour = true
							break;
						case 4:
							this.isDataFive = true
							break;
					};
					this.isLoad = true
				}
			},
			// 内容区域滑动切换
			tabChange(e) {
				this.idx = e.detail.current
				this.PageNumber = 1
				var id = ''
				switch (e.detail.current) {
					case 0:
						id = ''
						break;
					case 1:
						id = 0
						break;
					case 2:
						id = 1
						break;
					case 3:
						id = 2
						break;
					case 4:
						id = 3
						break;
					default:
						break
				}
				// 判断是否有登录
				if (!!uni.getStorageSync("token")) {
					this.isData = false
					this.isLoad = false
					this.OrderTitle = []
					this.GetOrder(id) // 点击tabs
				} else {
					switch (Number(this.idx)) {
						case 0:
							this.isDataOne = true
							break;
						case 1:
							this.isDataTwo = true
							break;
						case 2:
							this.isDataThree = true
							break;
						case 3:
							this.isDataFour = true
							break;
						case 4:
							this.isDataFive = true
							break;
					};
					this.isLoad = true
				}
			},


			// 订单详情
			OrderDetail(e) {
				switch (e.state) {
					case -1:
						uni.navigateTo({
							url: "../../pagesB/order-close-details/order-close-details?id=" + e.id
						})
						break;
					case 0:
						uni.navigateTo({
							url: "../../pagesB/payment-details/payment-details?id=" + e.id
						})
						break;
					case 1:
						uni.navigateTo({
							url: "../../pagesB/delivery-details/delivery-details?id=" + e.id
						})
						break;
						// 待收货详情
					case 2:
						uni.navigateTo({
							url: "../../pagesB/receiving-details/receiving-details?id=" + e.id
						})
						break;
				}
			},
			// 按钮点击
			ClickBtn(e) {
				switch (e.index) {
					case 0: // 0 取消订单
						this.goodsId = e.id
						this.$refs.close.open() // 打开弹窗

						// uni.showToast({
						// 	title: "取消订单",
						// 	icon: "none"
						// })
						break;
					case 1: // 1 立即支付

						this.orderInfo = {
							amount: e.price,
							dateAdd: e.dateAdd, // 创建时间
							orderNumber: e.orderNumber, // 订单编号
						}

						uni.showLoading({
							title: '订单支付中',
							mask: true
						});
						// 调用支付接口
						this.RequestPay(e.price, e.id)

						break;
					case 2: //  2 申请退款
						let data = {
							orderId: e.id,
							price: e.price
						}
						uni.navigateTo({
							url: "../apply-for-refund/apply-for-refund?data=" + JSON.stringify(data)
						})
						break
					case 3: // 3 查看物流
						uni.navigateTo({
							url: "../../pagesB/logistics-info/logistics-info?id=" + e.id
						})
						break;
					case 4: // 4 确认收货
						this.goodsId = e.id
						this.$refs.goods.open();
						break;

					case 5: // 5 删除订单
						this.goodsId = e.id
						this.$refs.popup.open() // 打开弹窗
						break
					case 6: // 6 立即评价
						// console.log(e.id)
						// console.log(this.OrderList4)
						uni.navigateTo({
							url: "../../pagesB/evaluate/evaluate?id=" + e.id
						})
						// this.OrderList4.forEach(item => {
						// 	if (item.id == e.id) {
						// 		if (item.OrderDataList.length != 1) {
						// 			uni.navigateTo({
						// 				url: "../../pagesC/evaluate-check/evaluate-check?id="+e.id
						// 			})
						// 		} else {
						// 			let str={
						// 				orderId:e.id,
						// 				id:item.OrderDataList[0].id
						// 			}
						// 			console.log(str)
						// 			uni.navigateTo({
						// 				url: "../../pagesB/evaluate/evaluate?obj=" + JSON.stringify(str)
						// 			})
						// 		}
						// 	}
						// })


						break
				}
			},

			// 删除订单 确认操作
			confirm(done, value) {
				let data = {
					orderId: this.goodsId,
					token: uni.getStorageSync("token")
				}
				//删除订单接口
				request({
					url: '/order/delete',
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.GetOrder("")
						} else {

						}
					} else {}
				})
				done() // 关闭弹出层

			},

			// 取消订单确认事件
			CloseCnfirm(done, value) {
				let data = {
					orderId: this.goodsId,
					token: uni.getStorageSync("token")
				}
				//删除订单接口
				request({
					url: '/order/close',
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.GetOrder(0)
						} else {

						}
					} else {}
					done() // 关闭弹出层
				})
			},

			// 确认收货弹窗确定按钮
			ConfirmGoods(done, value) {
				request({
					url: '/order/delivery',
					method: 'POST',
					data: {
						orderId: this.goodsId,
						token: uni.getStorageSync("token")
					}
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.GetOrder(2)
						} else {

						}
					} else {}
					done() // 关闭弹出层
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
									//跳转支付成功页面
									uni.redirectTo({
										url: '../../pagesB/pay-success/pay-success?data=' + JSON.stringify(this.orderInfo)+'&price='+price
									});
									console.log('success:' + JSON.stringify(ress));
								},
								fail: (err) => {
									// uni.redirectTo({
									// url: '../../pagesB/payment-details/payment-details?id=' + JSON.stringify(this.orderInfo.id)
									// });
									console.log('fail:' + JSON.stringify(err));
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



			// 换算日期时间
			getTimeList() {
				let that = this
				that.OrderList1.forEach((item) => {
					var nowdate = new Date().getTime() //获取当前时间毫秒数
					var time = item.dateClose.replace(new RegExp("-", "gm"), "/") //ios不能识别日期格式中的 "-" ； .productExpiredTime是接口返回的名称
					var time = time.split('.')[0] //此处是因为我们接口返回的时间格式是这样："2019-12-31 11:00:00.0"
					var enddate = new Date(time).getTime() //处理好格式之后获取结束时间的毫秒数
					var totaltime = enddate - nowdate //获取时间差
					that.totaltime(totaltime) //这是下面封装的方法，将毫秒数处理成"xx时xx分xx秒"
					item.end_time1 = that.timeData //处理好的单个时间安排到item上（重要）
				})
				this.OrderList1 = that.OrderList1 //全部处理好的数据重新赋值
			},

			totaltime(a) { //计算单个剩余时间
				let totaltime = a
				let that = this
				var h, m, s, d

				function test(num) {
					if (num < 10) {
						num = "0" + num
					}
					return num
				}

				if (totaltime > 0) {
					d = Math.floor(totaltime / 1000 / 60 / 60 / 24) * 24
					h = Math.floor(totaltime / 1000 / 60 / 60 % 24)
					m = Math.floor(totaltime / 1000 / 60 % 60)
					s = Math.floor(totaltime / 1000 % 60)
					//获取时分秒
					h = d + h
					h = test(h)
					m = test(m)
					s = test(s)
					// this.timeData = `${m}分钟之后自动取消订单` // 每个时间的显示格式
					// this.timeData = "距离订单关闭还有：" + `${h}时 : ${m}分 : ${s}秒` // 每个时间的显示格式
					this.timeData = "距离订单关闭还有：" + `${m}分 : ${s}秒` // 每个时间的显示格式
				} else {
					// this.timeData = `00 : 00 : 00`
					this.timeData = ``
				}
			},


			// 获取订单列表
			GetOrder(id) {
				var that = this
				var data = {
					status: id,
					page: this.PageNumber,
					pageSize: this.PageLimt,
					token: uni.getStorageSync("token")
				}
				request({
					url: '/order/list',
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						this.isLoad = true

						if (res.data.code == 0) {
							// 数据处理
							res.data.data.orderList.forEach(item => {
								for (let key in res.data.data.goodsMap) {
									if (item.id == key) {
										// console.log(res.data.data.goodsMap[key])
										Object.assign(item, {
											OrderDataList: res.data.data.goodsMap[key]
										});
										// 判断当前处于第几个
										switch (Number(this.idx)) {
											case 0:
												this.isDataOne = true
												this.OrderList1.push(item)
												break;
											case 1:
												this.isDataTwo = true
												this.OrderList2.push(item)
												break;
											case 2:
												this.isDataThree = true
												this.OrderList3.push(item)
												break;
											case 3:
												this.isDataFour = true
												this.OrderList4.push(item)
												break;
											case 4:
												this.isDataFive = true
												this.OrderList5.push(item)
												break;
										};
									}
								}
							})

							var hash = {};
							// 判断当前处于第几个
							switch (Number(this.idx)) {
								case 0:
									// 数组去重 避免重复添加数据
									this.OrderList1 = this.OrderList1.reduce((preVal, curVal) => {
										hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
										return preVal
									}, [])
									this.mescroll.endSuccess() // 请求成功 隐藏加载状态
									if (res.data.data.orderList.length < this.PageLimt) {
										this.mescroll.showNoMore()
									}
									break;
									
								case 1:
									// 数组去重 避免重复添加数据
									this.OrderList2 = this.OrderList2.reduce((preVal, curVal) => {
										hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
										return preVal
									}, [])
									break;
								case 2:
									// 数组去重 避免重复添加数据
									this.OrderList3 = this.OrderList3.reduce((preVal, curVal) => {
										hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
										return preVal
									}, [])
									break;
								case 3:
									// 数组去重 避免重复添加数据
									this.OrderList4 = this.OrderList4.reduce((preVal, curVal) => {
										hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
										return preVal
									}, [])
									break;
								case 4:
									// 数组去重 避免重复添加数据
									this.OrderList5 = this.OrderList5.reduce((preVal, curVal) => {
										hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
										return preVal
									}, [])
									break;
							};
							

							//数据返回成功之后再调计时器，防止异步
							this.getTimeList()
							var timer = setInterval(function() {
								that.getTimeList()
							}, 1000)
							this.timer = timer

						} else if (res.data.code == 700) {
							// 判断当前处于第几个
							switch (Number(this.idx)) {
								case 0:
									this.isDataOne = false
									break;
								case 1:
									this.isDataTwo = false
									break;
								case 2:
									this.isDataThree = false
									break;
								case 3:
									this.isDataFour = false
									break;
								case 4:
									this.isDataFive = false
									break;
							};

						}
					} else {}

				})

			},
		},
	}
</script>

<style lang="scss" scoped>
	.order-box {
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #f7f7f7;

		.order-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow-y: scroll;

			.order-list-box {
				flex: 1;
				overflow-y: scroll;

				// background: #fff;
				.swiper-box {
					height: 100%;
					overflow-y: scroll;

					// 隐藏滚动条
					.swiper-box-item-list::-webkit-scrollbar {
						display: none;
					}

					.swiper-box-item-list {
						overflow-y: scroll;

						.order-list-li {
							height: 100%;

							.order-list-li-data {
								height: 100%;

								.order-list-li-load,
								.order-list-li-nota {
									display: flex;
									align-items: center;
									justify-content: center;
									flex-direction: column;
									height: 100%;

									image {
										width: 208rpx;
										height: 154rpx;
									}

									text {
										margin-top: 39rpx;
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
	}
</style>
