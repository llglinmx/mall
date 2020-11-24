<template>
	<view class="menu-list">
		<view class="menu-box">
			<view class="menu-li"  v-for="(item,index) in TabList" :key="index" @click="Category(index)">
				<view class="menu-img">
					<image :src="item.icon" mode=""></image>
				</view>
				<view class="menu-title">
					{{item.name}}
				</view>
			</view>
			<view class="menu-li" @click="Category(-1)">
				<view class="menu-img">
					<image src="../../static/images/menu.png" mode="" style="width: 62rpx;height: 62rpx;"></image>
				</view>
				<view class="menu-title">
					全部
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default{
		data(){
			return{
				num:7
			}
		},
		props:{
			TabList:{
				type:Array
			}
		},
		created() {
			
		},
		methods:{
			Category(index){
				this.$emit('catClick',index)	
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu-list{
		position: relative;
		width: 100%;
		height:360rpx;
		overflow: hidden;
		background: #fff;
		
		.menu-box{
			width: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.menu-li{
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				width: 25%;
				padding:10rpx 0;
				.menu-img{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 112rpx;
					height: 112rpx;
					// background: purple; 
					border-radius: 50%;
					image{
						width: 100%;
						height: 100%;
						// border-radius: 50%;
					}
				}
				.menu-title{
					margin-top: 10rpx;
					font-size: 24rpx;
					color:#000
				}
			}
		}
	}
	
	
	
</style>
