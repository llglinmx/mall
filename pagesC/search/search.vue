<template>
	<view class="search-box">
		<Title title="搜索" @GBack="GBack" :isGBack="true"></Title>
		<view class="search-content">
			<view class="search-con-top">
				<search-input @SearchBtn="SearchBtn" @KeyEndter="SearchBtn" :autoFocus="true"></search-input>
				<search-records title="搜索记录" v-if='NoData' :DataList="arrData" @DeleteBtn="DeleteBtn" @list='ListBtn'></search-records>
				<search-records :State="false" title="热门搜索" :DataList='MsgList'></search-records>
			</view>
		</view>
	</view>
</template>

<script>
	import Title from "../../components/title/title.vue"
	import SearchInput from "../../components/search-input/search-input.vue"
	import SearchRecords from "../../components/search-records/search-records.vue"
	export default {
		data() {
			return {
				arrData: [],
				NoData: false,
				MsgList: []
			}
		},
		components: {
			Title,
			SearchInput,
			SearchRecords,
		},
		onShow() {
			var data = uni.getStorageSync("RecordsData")
			if (!!data) {
				this.NoData = true
				if (data.length > 10) {
					data.splice(data.length - 1, 1)
				}
				this.arrData = data
				//this.arrData = data.reverse()
				// } else {
			} else {
				this.NoData = false
			}
		},
		methods: {
			// 返回上一级
			GBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 搜索按钮   // 回车事件
			SearchBtn(e) {
				if (e != '') {
					uni.navigateTo({
						// url: "../goods-list/goods-list?data=" + e
						url: "../../pagesA/goods-list/goods-list?data="+e
					})
					setTimeout(() => {
						if (this.arrData.indexOf(e) == -1) {
							// 数组内没有的情况
							this.arrData.splice(0, 0, e) // 向数组的第一位插入一位 
						} else {
							// 数组有就改变位置
							this.arrData.unshift(...this.arrData.splice(this.arrData.findIndex(i => i === e), 1))
						}

						uni.setStorageSync('RecordsData', this.arrData);
					}, 1000)

				} else {
					uni.showToast({
						title: "请输入需要搜索的内容",
						icon: "none"
					})
				}

			},


			// 删除清空搜索记录
			DeleteBtn() {
				uni.removeStorageSync("RecordsData")
				this.NoData = false
			},
			// 搜索历史点击
			ListBtn(e) {
				uni.navigateTo({
					url: "../../pagesA/goods-list/goods-list?data="+e
				})
				setTimeout(() => {
					// 改变当前点击的历史记录顺序
					this.arrData.unshift(...this.arrData.splice(this.arrData.findIndex(i => i === e), 1))
					uni.setStorageSync('RecordsData', this.arrData);
				}, 1000)
			},

		}
	}
</script>

<style lang="scss" scoped>
	.search-box {
		height: 100%;
		background: #fff;

		.search-content {
			padding: 0 32rpx;
			box-sizing: border-box;

			.search-con-top {
				padding: 14rpx 0;
			}
		}
	}
</style>
