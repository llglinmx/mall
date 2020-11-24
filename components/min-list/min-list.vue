<template>
	<view class="mine-list-box">
		<view class="mine-list-li" v-for="(item,index) in MenuList" :key="item.name" @click="MenuClick(item.name)">
			<image :src="item.ico" mode="" class="li-ico"></image>
			<text class="li-title">{{item.name}}</text>
			<image src="../../static/images/mord.png" class="li-right-ico" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			MenuList: {
				type: Array
			}
		},
		methods: {
			MenuClick(name) {
				this.$emit('TabClick', name)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mine-list-box {
		.mine-list-li {
			display: flex;
			align-items: center;
			height: 90rpx;
			border-top: 1rpx solid #f2f2f2;

			.li-ico {
				width: 32rpx;
				height: 32rpx;
			}

			.li-title {
				flex: 1;
				margin: 0 20rpx;
				font-size: 28rpx;
				color: #000;
			}

			.li-right-ico {
				width: 12rpx;
				height: 22rpx;
			}
		}

		.mine-list-li:last-child {
			border-bottom: 1rpx solid #f2f2f2;
		}
	}
</style>
