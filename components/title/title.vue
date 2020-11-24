<template>
	<view class="title-box">
		<view class="title-top" :style="{paddingTop:paddingTop +'px'}"></view>
		<view class="title-content">
			<view class="header-img" v-if="isGBack" @click="GBack">
				<image src="../../static/images/back.png" mode="" ></image>
			</view>

			<view class="header-title">
				<text :class="{'gback-class':isGBack}">{{title}}</text>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				paddingTop: 0
			}
		},
		props: {
			title: {
				type: String
			},
			isGBack: {
				type: Boolean,
				default: false
			}
		},
		created() {
			let that = this
			uni.getSystemInfo({
				success: function(res) {
					that.paddingTop = res.statusBarHeight
				}
			});
		},
		methods: {
			GBack() {
				this.$emit("GBack")
			},
		}
	}
</script>

<style lang="scss" scoped>
	.title-box {
		background: #324B78;

		.title-content {
			display: flex;
			align-items: center;
			// justify-content: center;
			padding: 0 30rpx;
			height: 90rpx;
			box-sizing: border-box;
			color: #fff;

			.header-img {
				display: flex;
				align-items: center;
				justify-content: center;
				padding:20rpx 20rpx 20rpx 0;
				box-sizing: border-box;

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}


			.header-title {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;

				text {
					font-family: PingFang SC;
					font-weight: 500;
					font-size: 32rpx;
					text-align: center;
				}
			}

			.gback-class {
				margin-right: 40rpx !important;
			}



		}
	}
</style>
