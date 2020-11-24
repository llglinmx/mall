<template>
	<view class="no-data">
		<image :src="ImgUrl" mode=""></image>
		<text>{{msg}}</text>
	</view>
</template>

<script>
	export default{
		data(){
			return{}
		},
		props:{
			ImgUrl:{
				default:'../../static/images/extend-no-data.png'
			},
			msg:{
				type:String,
				default:"暂无数据"
			},
		}
	}
</script>

<style scoped lang="scss">
	.no-data{
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		image{
			width: 208rpx;
			height: 150rpx;
			transform: translateY(-39rpx);
		}
		text{
			font-size: 22rpx;
			font-weight: 400;
			color: #B3B3B3;
		}
	}
</style>
