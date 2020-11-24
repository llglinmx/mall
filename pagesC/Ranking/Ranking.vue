<template>
	<view class="Ranking-box">
		<view class="Ranking-box-head">
			<Title title="佣金排行" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="Ranking-box-content">
			<view class="Ranking-box-content-list" v-show="isData">
				<view class="Ranking-content-list-head">
					<view class="Ranking-list-head-card">
						<view class="Ranking-list-head-card-left">
							<view class="Ranking-list-head-card-img" :style="[{backgroundImage:'url(' + (TopTwo?TopTwo.apiExtUser.avatarUrl:userImg) + ')'}]">
								<image src="../../static/images/rinking-two.png" mode="aspectFill" style="width: 60rpx;height: 52rpx;top: -40rpx;"></image>
							</view>
							<view class="Ranking-list-head-card-title">
								<text v-if="!!TopTwo" style="color: #000;">{{TopTwo['apiExtUser']['nick']}}</text>
								<text v-else>虚位以待</text>
								<text v-if="TopTwo" style="margin-top:30rpx;color: #324B78;">￥{{TopTwo.saleroomTeam}}</text>
							</view>
						</view>

						<view class="Ranking-list-head-card-center" style="width: 160rpx;height: 160rpx;">
							<view class="Ranking-list-head-card-img" style="width: 100%;height: 100%;" :style="[{backgroundImage:'url(' + (TopOne?TopOne.apiExtUser.avatarUrl:userImg) + ')'}]">
								<image src="../../static/images/rinking-one.png" mode="aspectFill" style="width: 74rpx;height: 62rpx;top: -48rpx;"></image>
							</view>
							<view class="Ranking-list-head-card-title">
								<text v-if="!!TopOne" style="color: #000;">{{TopOne['apiExtUser']['nick']}}</text>
								<text v-else>虚位以待</text>				
								<text v-if="TopOne" style="margin-top:30rpx;color: #324B78;">￥{{TopOne.saleroomTeam}}</text>
							</view>
						</view>
						<view class="Ranking-list-head-card-right">
							<view class="Ranking-list-head-card-img" :style="[{backgroundImage:'url(' + (TopThree?TopThree.apiExtUser.avatarUrl:userImg) + ')'}]">
								<image src="../../static/images/rinking-three.png" mode="" style="width: 56rpx;height: 46rpx;top: -36rpx;"></image>
							</view>
							<view class="Ranking-list-head-card-title">
								<text v-if="!!TopThree" style="color: #000;">{{TopThree['apiExtUser']['nick']}}</text>
								<text v-else>虚位以待</text>
								<text v-if="TopThree" style="margin-top:30rpx;color: #324B78;">￥{{TopThree.saleroomTeam}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="Ranking-content-list-wrap">
					<view class="Ranking-content-list-wrap-data" v-show="RankingList.length>4">
						<mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
							<view class="Ranking-content-list-wrap-li" v-for="(item,index) in RankingList" v-if="index!=0&&index!=1&&index!=2">
								<!-- <view class="Ranking-content-list-wrap-li" v-for="(item,index) in RankingList" :key="index"> -->
								<text class="Ranking-list-li-index">{{index+1}}</text>
								<image class="Ranking-list-li-img" :src="item.apiExtUser.avatarUrl" mode=""></image>
								<text class="Ranking-list-li-name">{{item.apiExtUser.nick}}</text>
								<text class="Ranking-list-li-money">￥25.00</text>
							</view>
						</mescroll-uni>
					</view>
					<view class="Ranking-content-list-wrap-no-data" v-show="RankingList.length<4">
						<image src="../../static/images/jp.png" mode=""></image>
						<text>暂无更多排名～</text>
					</view>
				</view>
				<view class="Ranking-content-list-bottom" :class="{'statusBarHeight':isBarHeight}">
					<!-- v-if="item.uid == userId" -->
					<view class="Ranking-content-footer" v-for="(item,index) in RankingList" :key="uid" v-if="item.uid==userId">
						 <text class="Ranking-content-footer-index">{{index+1}}</text>
						<image class="Ranking-content-footer-img" :src="item.apiExtUser.avatarUrl" mode=""></image>
						<text class="Ranking-content-footer-name">{{item.apiExtUser.nick}}</text>
						<text class="Ranking-content-footer-money">￥{{item.saleroomTeam}}</text>
					</view>
				</view>
			</view>
			<view class="Ranking-box-content-no-data" v-show="!isData">
				<view class="Ranking-content-loading" v-if="!isLoading">
					<Loading></Loading>
				</view>
				<view class="Ranking-content-loading" v-else>
					<text>暂无数据</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Title from "../../components/title/title.vue"
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import Loading from "../../components/loading/loading.vue"
	import {
		request
	} from "../../static/js/ajax.js"
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				userId:'',
				RankingList: [],
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
				TopOne: {
					apiExtUser: {
						nick: '虚位以待',
						avatarUrl: '../../static/images/rinking-user.png'
					},
					saleroomTeam:0
				},
				TopTwo: {
					apiExtUser: {
						nick: '虚位以待',
						avatarUrl: '../../static/images/rinking-user.png'
					},
					saleroomTeam:0
				},
				TopThree: {
					apiExtUser: {
						nick: '虚位以待',
						avatarUrl: '../../static/images/rinking-user.png'
					},
					saleroomTeam:0
				},
				avatarUrl:"../../static/images/rinking-user.png",
				userImg: 'https://dcdn.it120.cc/2020/07/28/2d3c38d9-ea5a-4c44-850c-af6cf7ad09a1.png',
				isData: false,
				isLoading: false,
				PageNumber: 1, // 请求页数
				PageLimt: 50, // 请求条数
				isBarHeight: false,
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
			Loading
		},
		onLoad(options) {
			this.userId = uni.getStorageSync("userId")
			this.getData()
			this.SystemInfo()
			// console.log("id为："+this.uid)
		},
		watch:{
			TopOne(value){
				this.TopOne = value
				console.log("TopOne"+this.TopOne)
			},
			TopTwo(value){
				this.TopTwo = value
				console.log("TopTwo"+this.TopTwo)
			},
			TopThree(value){
				this.TopThree = value
				console.log("TopThree"+this.TopThree)
			},
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

			/*下拉刷新的回调*/
			downCallback() {
				this.PageNumber = 1
				setTimeout(() => {
					this.getData()
				}, 500)
			},

			/*上拉加载的回调*/
			upCallback(page) {
				console.log("上拉加载")
				this.PageNumber++
				this.getData()
			},
			// 获取数据
			getData() {
				request({
					url: '/saleDistribution/sale-room-rank/team/total',
					method: 'GET',
					data: {
						page: this.PageNumber,
						pageSize: this.PageLimt,
						token: uni.getStorageSync("token")
					}
				}).then(res => {
					if (res.statusCode = 200) {

						if (res.data.code == 0) {
							this.isData = true
							this.TopOne = res.data.data.result[0]
							this.TopTwo = res.data.data.result[1]
							this.TopThree = res.data.data.result[2]?res.data.data.result[2]:false
							// this.TopThree = res.data.data.result[2]

							// this.RankingList = this.RankingList.concat(res.data.data.result)

							//  //数组去重 避免重复添加数据
							let hash = {};
							this.RankingList = this.RankingList.reduce((preVal, curVal) => {
								hash[curVal.uid] ? '' : hash[curVal.uid] = true && preVal.push(curVal);
								return preVal
							}, [])

							this.mescroll.endSuccess() // 请求成功 隐藏加载状态
							if (this.RankingList.length <= res.data.data.totalRow) {
								this.mescroll.showNoMore()
							}
						} else if (res.data.code == 700) {
							this.isData = false
							this.isLoading = true
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.Ranking-box {
		display: flex;
		flex-direction: column;
		height: 100%;

		.Ranking-box-head {}

		.Ranking-box-content {
			flex: 1;
			overflow-y: scroll;

			.Ranking-box-content-list {
				display: flex;
				flex-direction: column;
				height: 100%;

				.Ranking-content-list-head {
					padding: 32rpx;
					box-sizing: border-box;
					height: 500rpx;
					border-radius: 0rpx 0rpx 12rpx 12rpx;
					background: #324B78;

					.Ranking-list-head-card {
						position: relative;
						width: 100%;
						height: 100%;
						background: url(../../static/images/rinking-head-bg.png) no-repeat;
						background-size: contain;

						.Ranking-list-head-card-left,
						.Ranking-list-head-card-center,
						.Ranking-list-head-card-right {
							position: absolute;
							width: 120rpx;

							.Ranking-list-head-card-img {
								position: relative;
								width: 120rpx;
								height: 120rpx;
								background: url(../../static/images/rinking-user.png) no-repeat;
								background-size: contain;
								border-radius: 50%;

								image {
									position: absolute;
									left: 0;
									right: 0;
									margin: auto;
									// border-radius: 50%;
								}
							}

							.Ranking-list-head-card-title {
								margin-top: 25rpx;
								font-size: 28rpx;
								font-weight: 400;
								color: #ccc;
								text-align: center;
								text{
									display: block;
								}
							}
						}

						.Ranking-list-head-card-left {
							top: 120rpx;
							left: 50rpx;
						}

						.Ranking-list-head-card-center {
							top: 80rpx;
							left: 0;
							right: 0;
							margin: auto;
						}

						.Ranking-list-head-card-right {
							top: 120rpx;
							right: 50rpx;
						}

					}
				}

				.Ranking-content-list-wrap {
					flex: 1;
					overflow-y: scroll;
					padding: 0 32rpx;
					box-sizing: border-box;

					.Ranking-content-list-wrap-data {
						height: calc(100% - 40rpx);
						padding-top: 40rpx;

						.Ranking-content-list-wrap-li {
							display: flex;
							align-items: center;
							height: 80rpx;
							margin-bottom: 40rpx;
							font-weight: 500;

							.Ranking-list-li-index {
								font-size: 32rpx;
							}

							.Ranking-list-li-img {
								width: 80rpx;
								height: 80rpx;
								margin: 0 28rpx;
								border-radius: 50%;
							}

							.Ranking-list-li-name {
								font-size: 28rpx;
								flex: 1;
							}

							.Ranking-list-li-money {
								color: #324B78;
								font-size: 28rpx;
							}
						}

						.Ranking-content-list-wrap-li:last-child {
							margin-bottom: 0;
						}
					}

					.Ranking-content-list-wrap-no-data {
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						height: 100%;

						image {
							width: 80rpx;
							height: 128rpx;
							transform: translateY(-39rpx);
						}

						text {
							color: #B3B3B3;
							font-size: 22rpx;
						}
					}
				}

				.Ranking-content-list-bottom {
					// height: 92rpx;
					padding: 20rpx 32rpx;
					box-sizing: border-box;
					.Ranking-content-footer{
						display: flex;
						align-items: center;
						font-size: 28rpx;
						font-weight: 500;
						color: #332831;
						.Ranking-content-footer-index{
							
						}
						.Ranking-content-footer-img{
							width: 80rpx;
							height: 80rpx;
							margin: 0 20rpx;
						}
						.Ranking-content-footer-name{
							flex: 1;
						}
						.Ranking-content-footer-money{
							color: #324B78;
						}
					}
				}
				.statusBarHeight {
					padding-bottom: 60rpx !important;
				}
			}

			.Ranking-box-content-no-data {
				height: 100%;

				.Ranking-content-loading {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100%;
				}
			}
		}
	}
</style>
