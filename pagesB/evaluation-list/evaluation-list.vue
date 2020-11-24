<template>
	<view class="evaluate-list-box">
		<view class="evaluate-list-box-header">
			<Title title="评论列表" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="evaluate-list-box-content">
			<view class="evaluate-content-wrap" v-show="isData">
				<view class="evaluate-content-wrap-list">
					<mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
						<view class="evaluate-content-wrap-list-li" v-for="(item,index) in EvaluateData">
							<view class="evaluate-list-li-top-info">
								<view class="evaluate-list-li-user-img">
									<image :src="item.user.avatarUrl" mode=""></image>
								</view>
								<view class="evaluate-list-li-wrap">
									<view class="evaluate-list-li-wrap-title">
										{{item.user.nick}}
									</view>
									<view class="evaluate-list-li-wrap-msg">
										<text>{{item.goods.dateReputation|DataTime}} </text>
										<text style="margin-left: 10rpx;">{{item.goods.property}}</text>
									</view>
								</view>
							</view>
							<view class="evaluate-list-li-text">{{item.goods.goodReputationRemark}}</view>
							<view class="evaluate-list-li-img-arr" v-if="item.reputationPics">
								<view class="evaluate-li-arr" v-for="(v,j) in item.reputationPics" @click="previewImg(item.reputationPics,j)">
									<image :src="v.pic" mode="aspectFill"></image>
								</view>
							</view>
							<view class="evaluate-list-li-bottom-info" v-if="item.goods.goodReputationReply">
								<text>商家回复：</text>
								{{item.goods.goodReputationReply}}
							</view>
						</view>
					</mescroll-uni>
				</view>
			</view>
			<view class="evaluate-content-wrap" v-show="!isData">
				<view class="evaluate-loading" v-if="!isLoading">
					<Loading></Loading>
				</view>
				<view class="evaluate-loading" v-else>
					<no-data msg="该商品暂无评价" ImgUrl="../../static/images/extend-no-data.png"></no-data>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from "../../static/js/ajax.js"
	import Title from "../../components/title/title.vue"
	import NoData from "../../components/no-data/no-data.vue"
	import Loading from "../../components/loading/loading.vue"
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
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
				PageNumber: 1,
				PageLimt: 10,
				goodsId: '',
				isData: false,
				isLoading: false,
				EvaluateData: [], // 存储评论列表数据
			}
		},
		// 过滤器
		filters: {
			// 切割日期时间  ，只保留日期
			DataTime(value) {
				var s = value.split(' ')
				return s[0]
			},
		},
		components: {
			Title,
			MescrollUni,
			NoData,
			Loading
		},
		onLoad(options) {
			this.EvaluateList(options.id)
			this.goodsId = options.id
			// this.timer("2020-08-06 15:41:01")
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
				setTimeout(() => {
					// this.mescroll.showUpScroll() // 显示上拉加载布局
					this.PageNumber = 1
					this.EvaluateList(this.goodsId);
				}, 500)
			},

			/*上拉加载的回调*/
			upCallback(page) {
				this.PageNumber++
				this.EvaluateList(this.goodsId);
			},


			// 获取评价列表
			EvaluateList(id) {
				request({
					url: '/shop/goods/reputation',
					method: 'POST',
					data: {
						goodsId: id,
						page: this.PageNumber,
						pageSize: this.PageLimt,
						token: uni.getStorageSync("token")
					}
				}).then(res => {
					if (res.statusCode == 200) {
						console.log(res.data)
						this.isLoading = true;
						if (res.data.code == 0) {
							this.isData = true;
							this.EvaluateData = res.data.data
							this.mescroll.endSuccess()
							// 判断返回的数组长度是否大于请求的条数
							if (res.data.data.length < this.PageLimt) {
								this.mescroll.showNoMore()
							}
						} else if (res.data.code == 700) {
							this.mescroll.endErr()
							this.isData = false;
						}
					} else {

					}
				})
			},
			// 轮播图片放大预览
			previewImg(item, index) {
				console.log(item)
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
			timer(datetime){ //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
				var dateTimeStamp = new Date(datetime.replace(/ /, 'T')).getTime() - 8 * 60 * 60 * 1000; //这里要减去中国的时区8小时
				var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
				var hour = minute * 60;
				var day = hour * 24;
				var week = day * 7;
				var halfamonth = day * 15;
				var month = day * 30;
				var now = new Date().getTime(); //获取当前时间毫秒
				var diffValue = now - dateTimeStamp; //时间差

				if (diffValue < 0) {
					console.log("diffValue<0", datetime, dateTimeStamp, now, diffValue);
					return '刚刚';
				}
				var minC = diffValue / minute; //计算时间差的分，时，天，周，月
				var hourC = diffValue / hour;
				
				var dayC = diffValue / day;
				var weekC = diffValue / week;
				var monthC = diffValue / month;
				var result = "2";
				if (monthC >= 1 && monthC <= 3) {
					result = " " + parseInt(monthC) + "个月前"
				} else if (weekC >= 1 && weekC <= 3) {
					result = " " + parseInt(weekC) + "周前"
				} else if (dayC >= 1 && dayC <= 6) {
					result = " " + parseInt(dayC) + "天前"
				} else if (hourC >= 1 && hourC <= 23) {
					result = " " + parseInt(hourC) + "小时前"
				} else if (minC >= 1 && minC <= 59) {
					result = " " + parseInt(minC) + "分钟前"
					console.log(minC)
				} else if (diffValue >= 0 && diffValue <= minute) {
					result = "刚刚"
				} else {
					var datetime = new Date();
					datetime.setTime(dateTimeStamp);
					var Nyear = datetime.getFullYear(); {}
					var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
					var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
					var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
					var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
					var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
					result = Nyear + "-" + Nmonth + "-" + Ndate
				}
				console.log(result)
				return result;
			},


		}
	}
</script>

<style lang="scss" scoped>
	.evaluate-list-box {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #f7f7f7;

		.evaluate-list-box-header {
			width: 100%;
		}

		.evaluate-list-box-content {
			width: 100%;
			flex: 1;
			overflow-y: scroll;

			.evaluate-content-wrap {
				height: 100%;

				.evaluate-content-wrap-list {
					height: 100%;

					.evaluate-content-wrap-list-li {
						padding: 32rpx;
						box-sizing: border-box;
						background: #fff;
						margin-bottom: 16rpx;

						.evaluate-list-li-top-info {
							display: flex;
							align-items: center;

							.evaluate-list-li-user-img {
								width: 48rpx;
								height: 48rpx;

								image {
									width: 100%;
									height: 100%;
									border-radius: 50%;
								}
							}

							.evaluate-list-li-wrap {
								flex: 1;
								margin-left: 32rpx;
								color: #666;
								font-weight: 400;

								.evaluate-list-li-wrap-title {
									font-size: 24rpx;
								}

								.evaluate-list-li-wrap-msg {
									display: flex;
									align-items: center;

									text {
										font-size: 22rpx;
									}
								}
							}
						}

						.evaluate-list-li-text {
							font-size: 24rpx;
							font-weight: 400;
							margin-top: 24rpx;
						}

						.evaluate-list-li-img-arr {
							display: flex;
							margin: 32rpx 0;

							.evaluate-li-arr {
								margin-right: 20rpx;
								width: 180rpx;
								height: 220rpx;

								image {
									width: 100%;
									height: 100%;
									border-radius: 8rpx;
								}
							}

							.evaluate-li-arr:last-child {
								margin-right: 0;
							}

						}

						.evaluate-list-li-bottom-info {
							margin-top: 32rpx;
							padding: 24rpx;
							box-sizing: border-box;
							background: #f7f7f7;
							border-radius: 4rpx;
							font-size: 24rpx;
							font-weight: 400;

							text {
								color: #324B78;
							}
						}
					}

					.evaluate-content-wrap-list-li:last-child {
						margin-bottom: 0;
					}
				}

				.evaluate-loading {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100%;
				}
			}
		}
	}
</style>
