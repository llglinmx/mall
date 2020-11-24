<template>
	<view class="search-records">
		<view class="search-records-top">
			<view class="search-records-text">
				{{title}}
			</view>
			<view class="search-records-del" v-if="State">
				<image src="../../static/images/del.png" mode="" @click="DeleteBtn"></image>
			</view>
		</view>
		<view class="search-records-bottom">
			<view class="search-records-li" v-for="(item,index) in DataList" :key="index" @click="ListClick(item)">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				ReordsData:[]
			}
		},
		props:{
			State:{
				type:Boolean,
				default:true
			},
			title:{
				type:String,
				default:'默认'
			},
			DataList:{
				type:Array,
				value:[]
			},
		},
		methods:{
			// 删除按钮点击
			DeleteBtn(){
				this.$emit("DeleteBtn")
			},
			// 搜索列表点击
			ListClick(item){
				this.$emit('list',item)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.search-records{
		padding: 24rpx 0;
		.search-records-top{
			display: flex;
			justify-content: space-between;
			.search-records-text{
				font-size: 28rpx;
				color: #000;
				font-weight:400;
			}
			.search-records-del{
				width: 30rpx;
				height: 30rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.search-records-bottom{
			display: flex;
			flex-flow:wrap;
			
			color: #999;
			.search-records-li{
				height: 52rpx;
				line-height: 52rpx;
				text-align: center;
				padding: 0 26rpx;
				background: #EDEDED;
				border-radius: 56rpx;
				margin: 24rpx 12rpx 0;
				max-width: 331rpx;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				box-sizing: border-box;
				font-size: 24rpx;
				box-sizing: border-box;
			}
		}
	}
</style>
