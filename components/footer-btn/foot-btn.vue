<template>
	<view class="btn-box" :class="{'statusBarHeight':isBarHeight}">
		<view class="btn" :class="{'active':isActive}" @click="FootBtn">{{BtnName}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isBarHeight:false,
			}
		},
		props: {
			BtnName: {
				type: String,
				default: "按钮名称"
			},
			isActive: {
				type: Boolean,
				default: false
			}
		},
		created() {
			this.SystemInfo()
		},
		methods: {
			FootBtn() {
				this.$emit("footbtn")
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
		}
	}
</script>

<style lang="scss" scoped>
	.statusBarHeight {
		padding-bottom: 60rpx !important;
	}
	.btn-box {
		width: 100%;
		height: 94rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;

		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 654rpx;
			height: 64rpx;
			border-radius: 32rpx;
			background: #324B78;
			font-weight: 400;
			font-size: 24rpx;
			color: #fff;
		}

		.active {
			opacity: 0.5;
		}
	}
</style>
