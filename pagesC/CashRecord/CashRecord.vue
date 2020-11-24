<template>
	<view class="CashRecord-box">
		<view class="CashRecord-box-head">
			<Title title="提现记录" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="CashRecord-box-content">
			<view class="CashRecord-box-content-list" v-show="isData">
				<mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
					<view class="CashRecord-box-list-li" v-for="(item,index) in CashList" :key="item.id">
						<view class="CashRecord-box-list-li-info">
							<view class="CashRecord-box-list-li-info-title">
								{{item.statusStr}}
							</view>
							<view class="CashRecord-box-list-li-info-time">
								{{item.dateAdd}}
							</view>
						</view>
						<view class="CashRecord-list-li-money">
							￥{{item.money}}
						</view>
					</view>
				</mescroll-uni>
			</view>
			<view class="CashRecord-box-content-list" v-show="!isData">
				<view class="CashRecord-box-list-loading" v-if="!isLoading">
					<Loading></Loading>
				</view>
				<view class="CashRecord-box-list-loading" v-else>
					<image src="../../static/images/cash-no-data.png" mode=""></image>
					<text>暂时没有提现记录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Title from "../../components/title/title.vue"
	import Loading from "../../components/loading/loading.vue"
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {
		request
	} from '../../static/js/ajax.js'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				isData: false,
				isLoading: false,
				CashList: [],
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
				PageNumber: 1, // 请求页数
				PageLimt: 20, // 请求条数
			}
		},
		components: {
			Title,
			Loading,
			MescrollUni
		},
		onLoad() {
			this.getCashRecord()
		},
		methods: {
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
					this.getCashRecord()
				}, 500)
			},

			/*上拉加载的回调*/
			upCallback(page) {
				this.PageNumber++
				this.getCashRecord()
			},


			getCashRecord() {
				request({
					url: '/user/withDraw/list',
					method: 'POST',
					data: {
						page: this.PageNumber,
						pageSize: this.PageLimt,
						token: uni.getStorageSync("token")
					}
				}).then(res => {
					if (res.statusCode == 200) {
						this.isLoading = true
						if (res.data.code == 0) {
							this.isData = true
							this.CashList = this.CashList.concat(res.data.data)
							//  //数组去重 避免重复添加数据
							let hash = {};
							this.CashList = this.CashList.reduce((preVal, curVal) => {
								hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
								return preVal
							}, [])

							this.mescroll.endSuccess() // 请求成功 隐藏加载状态
							if (this.CashList.length <= this.PageLimt) {
								this.mescroll.showNoMore()
							}
						} else if (res.data.code == 700) {
							this.isData = false
						}
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.CashRecord-box {
		display: flex;
		flex-direction: column;
		height: 100%;

		.CashRecord-box-head {}

		.CashRecord-box-content {
			padding: 0 32rpx;
			box-sizing: border-box;
			flex: 1;
			overflow-y: scroll;

			.CashRecord-box-content-list {
				height: 100%;

				.CashRecord-box-list-li {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 118rpx;
					border-bottom: 1rpx solid #f2f2f2;

					.CashRecord-box-list-li-info {
						display: flex;
						// align-items: center;
						justify-content: center;
						flex-direction: column;
						height: 100%;
						font-weight: 400;

						.CashRecord-box-list-li-info-title {
							font-size: 28rpx;
							color: #332831;
						}

						.CashRecord-box-list-li-info-time {
							font-size: 20rpx;
							color: #666;
						}
					}

					.CashRecord-list-li-money {
						font-size: 28rpx;
						color: #332831;
					}
				}

				.CashRecord-box-list-loading {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					height: 100%;

					image {
						width: 208rpx;
						height: 154rpx;
						transform: translateY(-39rpx);
					}

					text {
						color: #B3B3B3;
						font-size: 22rpx;
					}
				}
			}
		}
	}
</style>
