<template>
	<view class="live-box">
		<view class="live-box-head">
			<Title title="直播间列表" @GBack="GBack" :isGBack="true"></Title>
		</view>
		<view class="live-box-content">
			<view class="live-list">
				<view class="live-list-li" v-for="(item,index) in liveList" :key="item.roomid">
					<view class="live-li-top">
						<view class="live-li-img">
							<image :src="item.cover_img" mode=""></image>
						</view>
					</view>
					<view class="live-li-info">
						<view @click="EnterLive(item.roomid)">{{item.name}}</view>
					</view>
					<view class="live-li-bottom">
						<view>{{item.anchor_name}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Title from "../../components/title/title.vue"
	import {
		request
	} from '../../static/js/ajax.js'
	export default {
		data() {
			return {
				liveList: []
			}
		},
		components: {
			Title,
		},
		onLoad() {
			this.LiveData()
		},
		methods: {

			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				})
			},

			EnterLive(roomid) {
				console.log(roomid)
				uni.navigateTo({
					url: 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + roomid
				})
			},

			// 获取直播间数据
			LiveData() {
				request({
					url: "/wx/live/rooms",
					method: 'GET',
					data: {
						token: uni.getStorageSync("token")
					}
				}).then(res => {
					if (res.statusCode = 200) {
						console.log(res.data.data)
						if (res.data.code == 0) {
							this.liveList = res.data.data
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.live-box{
		display: flex;
		flex-direction: column;
		height: 100%;
		.live-box-head{
			
		}
		.live-box-content{
			flex: 1;
			display: flex;
			flex-direction: column;
			
			.live-list{
				padding: 0 32rpx;
				box-sizing: border-box;
				display: flex;
				.live-list-li{
					width: 320rpx;
					// height: 500rpx;
					margin-left: 40rpx;
					.live-li-top{
						width: 100%;
						height: 320rpx;
						.live-li-img{
							width: 100%;
							height: 320rpx;
							image{
								width: 100%;
								height: 100%;
							}
						}
					}
				}
				.live-list-li:nth-child(2n+1){
					margin-left: 0;
				}
			}
		}
	}
</style>
