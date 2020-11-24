<template>
	<view class="cash-suss-box">
		<view class="cash-suss-box-head">
			<Title title="提现成功"  :isGBack="true" @GBack="Complete"></Title>
		</view>
		<view class="cash-suss-box-conten">
			<view class="cash-suss-box-conten-ico">
				<image src="../../static/images/check.png" mode=""></image>
			</view>
			<view class="cash-suss-box-conten-title">提现发起成功</view>
			<view class="cash-suss-box-conten-money">
				￥{{Money}}
			</view>
			<view class="cash-suss-box-conten-msg">
				(交易将在1-3个工作日内完成)
			</view>
			<view class="cash-suss-box-conten-btn">
				<FootBtn BtnName="完成" @footbtn="Complete"></FootBtn>
			</view>
		</view>
	</view>
</template>

<script>
	import Title from "../../components/title/title.vue"
	import FootBtn from "../../components/footer-btn/foot-btn.vue"
	export default {
		data() {
			return {
				Money: 0
			}
		},
		components: {
			Title,
			FootBtn,
		},
		onLoad(options) {
			this.Money = options.money;
		},
		methods: {
			Complete() {
				uni.navigateBack({
					delta:2
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.cash-suss-box {
		height: 100%;
		display: flex;
		flex-direction: column;

		.cash-suss-box-head {}

		.cash-suss-box-conten {
			flex: 1;
			display: flex;
			align-items: center;
			flex-direction: column;

			.cash-suss-box-conten-ico {
				width: 128rpx;
				height: 128rpx;
				margin-top: 160rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.cash-suss-box-conten-title {
				margin: 30rpx 0 40rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #324B78;
			}

			.cash-suss-box-conten-money {
				font-size: 44rpx;
				font-weight: 500;
				color: #324B78;
			}

			.cash-suss-box-conten-msg {
				margin: 80rpx 0 60rpx;
				font-size: 24rpx;
				color: #999;
			}

			.cash-suss-box-conten-btn {}
		}
	}
</style>
