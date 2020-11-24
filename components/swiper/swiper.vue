<template>
	<view class="banner">
		<swiper class="swiper" indicator-dots="true" autoplay="true" interval="3000" duration="1000" indicator-active-color="#fff"
		 circular="true">
			<swiper-item v-for="(item , index) in ImgList" :key="index" class="swiper-item" @click.stop="BannerClick(item.businessId)">
				<image :src="item.picUrl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			ImgList: {
				type: Array,
				// default:[]
			}
		},
		onLoad() {

		},
		mounted() {
			// console.log(this.ImgList)
		},
		methods: {
			BannerClick(SKID) {	
				this.$emit('Details',SKID)
			},
		}
	}
</script>

<style lang="scss">
	.banner {
		width: 100%;
		height: auto;
		/* padding:0 20rpx; */
		box-sizing: border-box;
		// border-radius: 20rpx;
		background: #fff;

		.swiper {
			// width: 686rpx;
			// height: 288rpx;
			width: 100%;
			height: 388rpx;
			margin: auto;
			// border-radius: 20rpx;

			.swiper-item {
				// border-radius: 20rpx;
				// padding:0 20rpx;

				image {
					width: 100%;
					height: 100%;
					// border-radius: 20rpx;
				}
			}

		}
	}
</style>
