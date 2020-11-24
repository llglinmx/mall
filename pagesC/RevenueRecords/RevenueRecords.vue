<template>
	<view class="Revenue-box">
		<view class="Revenue-box-head">
			<Title title="收益记录" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="Revenue-box-content">
			<view class="Revenue-box-content-info">
				<view class="Revenue-content-info-amount">
					<view class="Revenue-info-data-amount-msg">
						<view class="Revenue-info-data-amount-msg-title">
							本月收益（元）
						</view>
						<view class="Revenue-info-data-amount-msg-text">
							0.00
						</view>
					</view>
					<view class="Revenue-info-data-amount-msg">
						<view class="Revenue-info-data-amount-msg-title">
							上月收益（元）
						</view>
						<view class="Revenue-info-data-amount-msg-text">
							0.00
						</view>
					</view>
				</view>
				<view class="Revenue-content-info-data" @click="showPop">
					<view class="Revenue-info-data-time">{{dataTitle}}</view>
					<view class="Revenue-info-data-jt"></view>
				</view>
			</view>
			<view class="Revenue-box-content-list" v-show="isData">
				<mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
					<view class="Revenue-list-li" v-for="(item,index) in RevenueList">
						<view class="Revenue-list-li-img">
							<image :src="item.avatarUrls" mode="aspectFill"></image>
						</view>
						<view class="Revenue-list-li-info">
							<view class="Revenue-list-li-info-top">
								<view class="Revenue-list-li-info-title">
									{{item.nicks}}
								</view>
								<view class="Revenue-list-li-info-msg">
									{{item.level}}级
								</view>
							</view>
							<view class="Revenue-list-li-info-dataTime">
								{{item.dateAdd}}
							</view>
						</view>
						<view class="Revenue-list-li-money">
							+{{item.money|PriceTow}}
						</view>
					</view>
				</mescroll-uni>
			</view>
			<view class="Revenue-box-content-list" v-if="!isData">
				<view class="Revenue-box-no-data">
					<image src="../../static/images/profit-no-data.png" mode=""></image>
					<text>当月暂无收益</text>
				</view>
			</view>
		</view>
		<min-pop size="height" :show="show1" @close='close'>
			<min-picker :endTime="endTime" :startTime="startTimes" @cancel="cancel" @sure="sure">
			</min-picker>
		</min-pop>
	</view>
</template>

<script>
	import {
		request
	} from "../../static/js/ajax.js"
	import Title from "../../components/title/title.vue"
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import MinPicker from "../../components/min-picker/min-picker.vue"
	import MinPop from "../../components/min-picker/min-popup.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";


	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				RevenueList: [],
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
				isData: false,
				isLoading: false,
				PageNumber: 1, // 请求页数，
				PageLimt: 10, // 请求条数
				dataTitle: new Date().getFullYear() + ' - ' + ((new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) :
					(new Date().getMonth() + 1)),
				startTimes: [2010, 1, 1], // 开始时间
				endTime: new Date().getFullYear(), // 结束时间
				startData: '',
				endData: '',
				show1: false
			}
		},
		// 过滤器
		filters: {
			// 价格保留两位
			PriceTow(value) {
				let val = !value ? 0 : value
				return val.toFixed(2)
			},
		},
		components: {
			Title,
			MescrollUni,
			MinPicker,
			MinPop
		},
		onLoad() {
			var start = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) :
				(new Date().getMonth() + 1)) + '-01'
			var end = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) :
				(new Date().getMonth() + 1)) + '-31'

			this.getRecords(start, end)
			
			this.getdata()
		},
		methods: {
			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				})
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
					this.getRecords()
				}, 500)
			},

			/*上拉加载的回调*/
			upCallback(page) {
				console.log("上拉加载")
				this.PageNumber++
				this.getRecords()
			},

			getdata(){
				let data={
					token: uni.getStorageSync("token")
				}
				request({
					// url: '/saleDistribution/sale-room-rank/team/total',
					url: '/saleDistribution/sale-room-rank/total',
					
					method: 'GET',
					data: data
				}).then(res => {
					if (res.statusCode = 200) {
						console.log(res.data)
						if (res.data.code == 0) {
							
						} else if (res.data.code == 700) {
							
						}
					}
				})
			},



			// 获取收益记录
			getRecords(startData, endData) {
				let data = {
					dateAddBegin: startData,
					dateAddEnd: endData,
					isSettlement:true,
					page: this.PageNumber,
					pageSize: this.PageLimt,
					token: uni.getStorageSync("token")
				}
				request({
					url: '/saleDistribution/commision/log',
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode = 200) {
						if (res.data.code == 0) {
							this.isData = true;
							this.RevenueList = this.RevenueList.concat(res.data.data.result)
							
							//  //数组去重 避免重复添加数据
							let hash = {};
							this.RevenueList = this.RevenueList.reduce((preVal, curVal) => {
								hash[curVal.orderId] ? '' : hash[curVal.orderId] = true && preVal.push(curVal);
								return preVal
							}, [])
							
							this.mescroll.endSuccess() // 请求成功 隐藏加载状态
							if (this.RevenueList.length <= res.data.data.totalRow) {
								this.mescroll.showNoMore()
							}
						} else if (res.data.code == 700) {
							this.isData = false
						}
					}
				})
			},

			// 取消事件
			cancel() {
				this.close()
			},
			// 确认事件
			sure(e) {
				this.dataTitle = e.year + "-" + (Number(e.month) < 10 ? '0' + Number(e.month) : Number(e.month)) // 显示时间年份月份
				this.startData = e.year + "-" + (Number(e.month) < 10 ? '0' + Number(e.month) : Number(e.month)) + "-01" // 开始日期
				this.endData = e.year + "-" + (Number(e.month) < 10 ? '0' + Number(e.month) : Number(e.month)) + "-31" // 结束日期
				this.PageNumber = 1
				this.getRecords(this.startData, this.endData)
			},
			// picker显示
			showPop() {
				this.show1 = true
			},
			// 关闭picker
			close() {
				this.show1 = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Revenue-box {
		display: flex;
		flex-direction: column;
		height: 100%;

		.Revenue-box-head {}

		.Revenue-box-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow-y: scroll;

			.Revenue-box-content-info {
				position: relative;
				height: 220rpx;
				padding: 0 54rpx;
				box-sizing: border-box;
				background: #324B78;

				.Revenue-content-info-amount {
					height: 100%;
					display: flex;
					color: #fff;

					.Revenue-info-data-amount-msg {
						flex: 1;

						.Revenue-info-data-amount-msg-title {
							font-weight: 400;
							font-size: 22rpx;
							margin-top: 20rpx;
						}

						.Revenue-info-data-amount-msg-text {
							font-size: 48rpx;
							font-weight: 600;
							margin-top: 30rpx;
						}
					}

				}

				.Revenue-content-info-data {
					display: flex;
					align-items: center;
					justify-content: center;
					position: absolute;
					left: 0;
					right: 0;
					bottom: -30rpx;
					margin: auto;
					width: 230rpx;
					height: 60rpx;
					background: rgba(255, 255, 255, 1);
					box-shadow: 0px 6rpx 12rpx 0rpx rgba(29, 29, 38, 0.12);
					border-radius: 30rpx;

					.Revenue-info-data-time {
						font-size: 28rpx;
						font-weight: 500;
					}

					.Revenue-info-data-jt {
						width: 0;
						height: 0;
						margin-left: 16rpx;
						border-left: 10rpx solid transparent;
						border-right: 10rpx solid transparent;
						border-bottom: 12rpx solid #000;
						transform: rotate(180deg);
					}

				}
			}

			.Revenue-box-content-list {
				flex: 1;
				overflow-y: scroll;
				padding: 70rpx 32rpx 0;
				box-sizing: border-box;

				.Revenue-list-li {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 40rpx;

					.Revenue-list-li-img {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;

						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}

					.Revenue-list-li-info {
						flex: 1;
						display: flex;
						flex-direction: column;
						margin-left: 25rpx;

						.Revenue-list-li-info-top {
							display: flex;
							align-items: center;

							.Revenue-list-li-info-title {
								color: #332831;
								font-size: 28rpx;
								font-weight: 500;
							}

							.Revenue-list-li-info-msg {
								margin-left: 10rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								width: 64rpx;
								height: 26rpx;
								border: 1rpx solid #999;
								border-radius: 12rpx;
								font-size: 18rpx;
								color: #999;
							}
						}

						.Revenue-list-li-info-dataTime {
							font-size: 20rpx;
							font-weight: 400;
							color: #666;
						}
					}

					.Revenue-list-li-money {
						display: flex;
						align-items: center;
						justify-content: center;
						color: #332831;
						font-size: 28rpx;
						font-weight: 500;
					}
				}

				.Revenue-list-li:last-child {
					margin-bottom: 0;
				}

				.Revenue-box-no-data {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					height: 100%;

					image {
						width: 208rpx;
						height: 154rpx;
						transform: translateY(-39rpx);
					}

					text {
						color: #B3B3B3;
						font-size: 22rpx;
						font-weight: 400rpx;
					}
				}

			}
		}
	}
</style>
