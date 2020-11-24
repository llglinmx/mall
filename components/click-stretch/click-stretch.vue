<template>
	<view class="stretch-box">
		<view @click="ClickAuto" class="stretch-box-info">
			{{Title}}
			<image src="../../static/images/xl.png" mode="" :class="{'rotate':ImgRotate}"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			Title: {
				type: String,
				default: "默认标题"
			},
			ImgRotate: {
				type: Boolean,
				default: false
			}
		},

		methods: {
			ClickAuto() {
				this.$emit("stretch")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.stretch-box {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 69rpx;
		font-size: 22rpx;
		color: #999;

		image {
			margin-left: 10rpx;
			width: 18rpx;
			height: 10rpx;
			transition: 0.3s;
			// transform: rotate(180deg);
		}

		.rotate {
			transform: rotate(180deg);
		}
	}
</style>
