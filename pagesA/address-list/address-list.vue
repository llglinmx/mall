<template>
	<view class="address-box">
		<view class="address-box-head">
			<Title title="收货地址" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="address-content">
			<view class="address-content-list" v-if="isData">
				<view class="address-list-li" v-for="(item,index) in AddressList" :key="item.id" @click="addressList(item)">
					<view class="address-li-info">
						<view class="address-info-top">
							<text class="address-info-name">{{item.linkMan}}</text>
							<text class="address-info-tel">{{item.mobile}}</text>
							<text class="address-default" v-if="item.isDefault">默认</text>
						</view>
						<view class="address-info-bottom">{{item.provinceStr}}-{{item.cityStr}}-{{item.areaStr}}-{{item.address}}</view>
					</view>
					<view class="address-li-more">
						<image src="../../static/images/mord.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="add-content-list" v-else>
				<view class="address-list-no-data" v-if="!isLoading">
					<Loading></Loading>
				</view>
				<view class="address-list-no-data" v-else>
					<image src="../../static/images/no-address.png" mode=""></image>
					<text>暂时没有收货地址</text>
				</view>
			</view>
		</view>
		<AddressBtn @footbtn="AddressBtn" BtnName="新增收货地址"></AddressBtn>
		<!-- <view class="address-footer">
			
		</view> -->
	</view>
</template>

<script>
	import {
		request
	} from '../../static/js/ajax.js'
	import Title from "../../components/title/title.vue"
	import AddressBtn from "../../components/footer-btn/foot-btn.vue"
	import Loading from "../../components/loading/loading.vue"
	export default {
		data() {
			return {
				AddressList: [],
				idx: 0,
				isData: false,
				isLoading:false,
			}
		},
		components: {
			Title,
			AddressBtn,
			Loading
		},
		onLoad(options) {
			this.idx = options.isId // 传递此变量方便判断是从哪个页面进入地址栏列表
		},
		onShow() {
			this.getAddressList()
		},
		methods: {
			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 列表点击
			addressList(item) {
				if (this.idx == 1) {
					uni.navigateTo({
						url: "../../pagesB/add-address/add-address?data=" + JSON.stringify(item)
					})
				} else {
					let pages = getCurrentPages(); //获取所有页面栈实例列表
					let nowPage = pages[pages.length - 1]; //当前页页面实例
					let prevPage = pages[pages.length - 2]; //上一页页面实例
					prevPage.$vm.AddressInfo = item; //修改上一页面的  参数值为 value
					prevPage.$vm.isState = true; //修改上一页面的  参数值为 value
					uni.navigateBack({
						delta: 1
					})
					// console.log(item)
				}
			},


			// 新增收货地址按钮
			AddressBtn() {
				var token = uni.getStorageSync("token")
				// 判断是否已经登录
				if (!!token) {
					uni.navigateTo({
						url: '../../pagesB/add-address/add-address?id=1'
					})
				} else {
					uni.showModal({
						title: "提示信息",
						content: "你还未登录，请先登录",
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: "../../pagesA/login/login"
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}

			},
			// 获取所有收货地址
			getAddressList() {
				let data = {
					token: uni.getStorageSync("token")
				}
				request({
					url: '/user/shipping-address/list',
					method: 'GET',
					data: data
				}).then(res => {
					this.isLoading = true
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.AddressList = res.data.data.reverse()
							this.isData = true
						} else if (res.data.code == 700) {
							this.AddressList = []
							this.isData = false
						}
					} else {}

				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.address-box {
		display: flex;
		flex-direction: column;
		height: 100%;

		.address-content {
			flex: 1;
			overflow-y: scroll;
			// background: #F7F7F7;

			.address-content-list {
				padding: 0 32rpx;
				height: 137rpx;
				box-sizing: border-box;

				.address-list-li {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 100%;
					border-bottom: 1px solid #f2f2f2;

					.address-li-info {
						.address-info-top {
							display: flex;
							align-items: center;
							color: #000;

							.address-info-name {
								font-size: 28rpx;
							}

							.address-info-tel {
								margin: 0 24rpx;
								font-size: 24rpx;
							}

							.address-default {
								display: block;
								width: 64rpx;
								height: 29rpx;
								text-align: center;
								line-height: 29rpx;
								font-size: 18rpx;
								color: #E63948;
								border-radius: 15rpx;
								border: 0.5px solid #E63948;
							}
						}

						.address-info-bottom {
							margin-top: 5rpx;
							font-size: 24rpx;
							color: #999;
						}

					}

					.address-li-more {
						display: flex;
						align-items: center;
						width: 12rpx;
						height: 22rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}

			.add-content-list {
				height: 100%;

				.address-list-no-data {
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;

					image {
						width: 208rpx;
						height: 154rpx;
					}

					text {
						margin-top: 39rpx;
						font-size: 22rpx;
						font-weight: 400;
						color: #B2B2B2;
					}
				}
			}
		}
	}
</style>
