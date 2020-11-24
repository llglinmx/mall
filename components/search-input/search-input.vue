<template>
	<view class="search-box">
		<view class="search-input">
			<image class="search-ico" src="../../static/images/search-ico.png" mode=""></image>
			<input type="text" value="" v-model="InputVal" placeholder="搜索" @input="change"  @confirm="KeyEnter" :focus='autoFocus' />
		</view>
		<view class="search-text">
			<text v-if="isFlag" @click="SearchBtn">搜索</text>
			<text v-else @click="cancel">取消</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				InputVal: "", // 输入框value值
				isFlag: false, // 显示搜索 、取消按钮
			};
		},
		props:{
			ValTitle:{
				type:String
			},
			autoFocus:{
				type:Boolean,
				default:false
			}
		},
		created() {
			if(this.ValTitle){
				this.InputVal = this.ValTitle
			}
		},
		watch:{
			ValTitle(value){
				this.InputVal = value
			},
		},
		methods: {
			// 输入框输入事件
			change() {
				if (Boolean(this.InputVal)) {
					this.isFlag = true
				} else {
					this.isFlag = false
				}
			},
			// 取消事件
			cancel() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 搜索按钮
			SearchBtn() {
				this.$emit("SearchBtn", this.InputVal)
				this.InputVal = ''
			},	
			// 回车事件
			KeyEnter(){
				this.$emit("KeyEndter",this.InputVal)
				this.InputVal = ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.search-input {
			flex: 1;
			padding: 0 20rpx;
			display: flex;
			align-items: center;
			height: 56rpx;
			// justify-content: center;
			background: #eee;
			border-radius: 50rpx;

			.search-ico {
				display: block;
				width: 24rpx;
				height: 24rpx;
			}

			input {
				font-size: 26rpx;
				margin-left: 10rpx;
				flex: 1;
			}
		}

		.search-text {
			margin-left: 24rpx;
			font-size: 28rpx;
			color: #324B78;
		}
	}
</style>
