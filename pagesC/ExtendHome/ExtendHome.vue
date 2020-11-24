<template>
	<view class="exend-box">
		<view class="exend-box-head">
			<Title title="分销系统" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="exend-box-content">
			<view class="exend-box-content-user-info">
				<view class="exend-user-info-box">
					<view class="exend-user-info-box-img">
						<image :src="userImg" mode=""></image>
					</view>
					<view class="exend-user-info-box-wrap">
						<view class="exend-user-info-title">
							{{userName}}
						</view>
						<view class="exend-user-info-tel">
							{{userTel}}
						</view>
					</view>
				</view>
				<view class="exend-box-card"  @click="CashOutBtn">
					<view class="exend-box-card-top">
						<view class="exend-box-card-top-title">当前佣金（元）</view>
						<view class="exend-box-card-top-text">
							<text>提现</text>
							<image src="../../static/images/extend-more-ico.png" mode=""></image>
						</view>
					</view>
					<view class="exend-box-card-center">0.00</view>
					<view class="exend-box-card-bottom">
						<view class="exend-box-card-bottom-text">
							昨日收益（元）<text>0.00</text>
						</view>
						<view class="exend-box-card-bottom-text">
							累计收益（元）<text>0.00</text>
						</view>
					</view>
				</view>
			</view>

			<view class="exend-box-content-list">
				<view class="exend-box-content-list-li" v-for="(item,index) in menuList" :key="item.skid" @click="ListClick(item.skid)">
					<image :src="item.url" mode=""></image>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Title from "../../components/title/title.vue"
	import {
		request
	} from "../../static/js/ajax.js"
	export default {
		data() {
			return {
				menuList: [{
						title: "推广码",
						url: "../../static/images/extent-cord.png",
						skid: "001"
					},
					{
						title: "我的推广",
						url: "../../static/images/extent-user.png",
						skid: "002"
					},
					{
						title: "收益记录",
						url: "../../static/images/extent-money.png",
						skid: "003"
					},
					{
						title: "佣金排行",
						url: "../../static/images/extent-commission.png",
						skid: "004"
					}
				],
				userName: "王二麻子",
				userTel: "暂无电话",
				userImg: ""
			}
		},
		components: {
			Title,
		},
		onLoad() {
			this.userName = uni.getStorageSync("nickName") // 用户名称
			if (!!uni.getStorageSync("loginInfo")) {
				this.userTel = JSON.parse(uni.getStorageSync("loginInfo")).mobile // 用户电话
			}

			this.userImg = uni.getStorageSync("avatarUrl") // 用户头像
		},
		methods: {
			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 菜单栏点击
			ListClick(skid) {
				switch (skid) {
					case "001":
						// 生成推广码
						uni.navigateTo({
							url: "../QRcode/QRcode"
						})
						break;
					case "002":
						// 我的推广
						uni.navigateTo({
							url: "../PromotionTeam/PromotionTeam"
						})
						break;
					case "003":
						// 收益记录
						uni.navigateTo({
							url:"../RevenueRecords/RevenueRecords"
						})
						break;
					case "004":
						// 佣金排行
						uni.navigateTo({
							url:"../Ranking/Ranking"
						})
						break;
				}
			},
			// 点击提现
			CashOutBtn(){
				uni.navigateTo({
					url:"../CashOut/CashOut"
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.exend-box {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #f7f7f7;

		.exend-box-head {}

		.exend-box-content {
			flex: 1;

			.exend-box-content-user-info {
				padding: 32rpx 32rpx 0;
				height: 376rpx;
				margin-top: -1px;
				background: url("https://dcdn.it120.cc/2020/07/23/f5ef472f-663e-4459-9666-b0845eda550e.png");
				background-size: contain;
				box-sizing: border-box;

				.exend-user-info-box {
					display: flex;
					align-items: center;

					.exend-user-info-box-img {
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						background: #2C405A;

						image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}

					.exend-user-info-box-wrap {
						margin-left: 38rpx;
						color: #fff;

						.exend-user-info-title {
							font-weight: 500;
							font-size: 32rpx;
						}

						.exend-user-info-tel {
							margin-top: 16rpx;
							font-size: 24rpx;
							font-weight: 400;
						}
					}
				}

				.exend-box-card {
					margin-top: 58rpx;
					width: 686rpx;
					height: 235rpx;
					padding: 32rpx 48rpx;
					box-sizing: border-box;
					background: url("https://dcdn.it120.cc/2020/07/23/977a6e5b-66a5-4584-a0c9-9178b17a260c.png");
					background-size: cover;
					color: #ECC296;

					.exend-box-card-top {
						display: flex;
						justify-content: space-between;
						font-size: 24rpx;
						font-weight: 400;

						.exend-box-card-top-title {}

						.exend-box-card-top-text {
							display: flex;
							align-items: center;

							text {
								margin-right: 8rpx;
							}

							image {
								width: 10rpx;
								height: 18rpx;
							}
						}
					}

					.exend-box-card-center {
						font-size: 48rpx;
						font-weight: 600;
						line-height: 100rpx;
					}

					.exend-box-card-bottom {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.exend-box-card-bottom-text {
							font-size: 24rpx;
							font-weight: 400;

							text {
								font-size: 32rpx;
								font-weight: 500;
							}
						}
					}
				}

			}

			.exend-box-content-list {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				padding: 0 40rpx;
				margin-top: 118rpx;
				box-sizing: border-box;

				.exend-box-content-list-li {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					width: 320rpx;
					height: 260rpx;
					background: #fff;
					margin-left: 30rpx;
					margin-bottom: 30rpx;
					border-radius: 12rpx;

					image {
						width: 92rpx;
						height: 92rpx;
					}

					text {
						margin-top: 36rpx;
						font-size: 28rpx;
						font-weight: 400;
						color: #666;
					}
				}

				.exend-box-content-list-li:nth-child(2n+1) {
					margin-left: 0 !important;
				}
			}
		}
	}
</style>
