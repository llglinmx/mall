<template>
	<view class="refund-box">
		<view class="refund-header">
			<Title title="申请退款" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="refund-content">
			<view class="refund-content-explain">
				<view class="refund-explain-text">1. 申请退款将导致已使用的优惠券失效；</view>
				<view class="refund-explain-text">2. 退款金额将返至微信钱包；</view>
			</view>
			<view class="refund-content-info-box">
				<view class="refund-content-info-title">货物状态（必选）：</view>
				<view class="refund-content-info-li" v-for="(item,index) in CheckList1" :key="index" @click="CargoStatus(index)">
					<view class="refund-content-info-li-check">
						<text v-if="!item.isCheck"></text>
						<image src="../../static/images/check.png" mode="" v-else></image>
					</view>
					<view class="refund-content-info-li-text">{{item.title}}</view>
				</view>
			</view>
			<view class="refund-content-info-box">
				<view class="refund-content-info-title">请选择退款原因（必选）：</view>
				<view class="refund-content-info-li" v-for="(item,index) in CheckList2" :key="index" @click="RefundCheck(index)">
					<view class="refund-content-info-li-check">
						<text v-if="!item.isCheck"></text>
						<image src="../../static/images/check.png" mode="" v-else></image>
					</view>
					<view class="refund-content-info-li-text">{{item.title}}</view>
				</view>
			</view>
			<view class="refund-content-info-box">
				<view class="refund-content-list">
					<view class="refund-content-list-li">
						<view class="refund-content-li-title">退款金额：</view>
						<view class="refund-content-li-text">{{orderInfo.price}}</view>
					</view>
					<view class="refund-content-list-li">
						<view class="refund-content-li-title">退款说明：</view>
						<view class="refund-content-li-text"><input type="text" v-model="remarks" placeholder="选填" value="" /></view>
					</view>
				</view>
				<view class="refund-content-imgList">
					<view class="refund-content-imgList-title">上传凭证</view>
					<view class="refund-content-img-list">
						<view class="refund-img-list-li" v-for="(item,index) in ImgList" :key="index">
							<view class="refund-img-li-pic" @click="previewImg(index)">
								<image :src="item" mode=""></image>
							</view>
							<view class="refund-img-li-del-pic" @click="DeleteImg(index)">
								<image src="../../static/images/del-ico.png" mode=""></image>
							</view>
						</view>
						<view class="refund-img-list-li" @click="UpLoad">
							<view class="refund-img-li-pic">
								<image src="../../static/images/add-ico.png" mode=""></image>
							</view>
						</view>
						<view class="refund-img-li-msg">
							{{ImgList.length}}/3
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="refund-footer" :class="{'statusBarHeight':isBarHeight}">
			<FootBtn BtnName="提交" @footbtn="Submit"></FootBtn>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from "../../static/js/ajax.js"
	import Title from "../../components/title/title.vue"
	import FootBtn from "../../components/footer-btn/foot-btn.vue"
	export default {
		data() {
			return {
				CheckList1: [{
					title: "未收到货",
					isCheck: false,
				}, {
					title: "已收到货",
					isCheck: false,
				}],
				CheckList2: [{
						title: "实物与商品描述不符",
						isCheck: false,
					},
					{
						title: "商品损坏",
						isCheck: false,
					},
					{
						title: "少件/漏发",
						isCheck: false,
					},
					{
						title: "商品信息填写错误",
						isCheck: false,
					},
					{
						title: "地址信息填写错误",
						isCheck: false,
					},
					{
						title: "未按约定时间发货",
						isCheck: false,
					},
					{
						title: "不喜欢/不想要",
						isCheck: false,
					},
					{
						title: "其他",
						isCheck: false,
					}
				],
				ImgList: [], // 存放图片list
				UplodList: [],
				list: [],
				remarks: '',
				Idx: -1,
				IdxTwo: -1,
				Reason: '',
				orderInfo: {
					orderId: '',
					price: 0
				},
				isBarHeight: false,
			}
		},
		components: {
			Title,
			FootBtn
		},
		onLoad(options) {
			this.orderInfo = JSON.parse(options.data)
			this.SystemInfo()
		},
		methods: {
			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 获取手机设备信息
			SystemInfo() {
				uni.getSystemInfo({
					success: (res) => {
						if (res.statusBarHeight == 44) {
							this.isBarHeight = true
						}
					}
				})
			},


			// 货物状态选择
			CargoStatus(index) {
				// 循环把所有的状态改为false
				this.CheckList1.forEach(item => {
					item.isCheck = false
				})
				// 给当前点击的这个变为true
				this.CheckList1[index].isCheck = true

				this.Idx = index
			},
			// 退款原因按钮
			RefundCheck(index) {
				// 循环把所有的状态改为false
				this.CheckList2.forEach(item => {
					item.isCheck = false
				})
				// 给当前点击的这个变为true
				this.CheckList2[index].isCheck = true
				this.Reason = this.CheckList2[index].title
				this.IdxTwo = index
			},

			// 上传图片
			UpLoad() {
				let that = this
				uni.chooseImage({
					count: 3,
					success: (res) => {
						this.ImgList = this.ImgList.concat(res.tempFilePaths)
						this.UplodList = this.UplodList.concat(res.tempFilePaths)

						// 判断是否上传图片的最大张数
						if (this.ImgList.length > 3) {
							this.ImgList.splice((this.ImgList.length - 1), 1)
							uni.showToast({
								title: "超过图片上传张数",
								icon: "none"
							})
						}
					}
				})
			},


			// 删除已经添加到需要上传的显示界面
			DeleteImg(index) {
				this.ImgList.splice(index, 1)
				this.UplodList.splice(index, 1)
			},

			// 轮播图片放大预览
			previewImg(index) {
				let imgsArray = [];
				for (let i = 0; i < this.ImgList.length; i++) {
					imgsArray.push(this.ImgList[i]);
				}
				uni.previewImage({
					current: index,
					urls: imgsArray,
					indicator: 'number',
					loop: true
				});
			},

			// 提交按钮
			Submit() {
				// 判读是否选择货物状态
				if (this.Idx != -1) {
					if (this.IdxTwo != -1) {
						uni.showLoading({
							title: '退款申请中',
							mask: true
						});
						// 判断是否有选择了退款图片
						if (this.ImgList.length != 0) {
							// 循环上传图片
							for (let i = 0; i < this.UplodList.length; i++) {
								uni.showLoading({
									title: "图片已上传" + i + "张",
									mask: true
								})
								this.ChangeImg(this.UplodList[i])
							}
						} else {
							uni.hideLoading();
							this.RefundFunction()
						}
					} else {
						uni.showToast({
							title: "请选择退货原因",
							icon: "none"
						})
					}

				} else {
					uni.showToast({
						title: "请选择货物状态",
						icon: "none"
					})
				}
			},
			ChangeImg(ImgUrl) {
				const uploadTask = uni.uploadFile({
					url: 'https://api.it120.cc/doufu/dfs/upload/file',
					name: 'upfile',
					filePath: ImgUrl,
					formData: {
						"token": uni.getStorageSync('token'),
					},
					success: (res) => {
						var dataList = JSON.parse(res.data)
						// 执行完删除,对应的图片
						this.UplodList.splice(0, 1)

						uni.hideLoading();

						// 添加上传图片 传递到退款图片
						this.list.splice(this.list.length - 1, 0, dataList.data.url)

						// 图片上传完成在执行退款原因接口
						if (this.UplodList.length == 0) {
							this.RefundFunction()
						}
					},
					fail: (err) => {
						console.log(err)
					},
					complete: (lee) => {

					}
				});

			},

			RefundFunction() {
				var data = {
					orderId: this.orderInfo.orderId,
					amount: this.orderInfo.price,
					type: 0,
					logisticsStatus: this.Idx,
					reason: this.Reason,
					remark: this.remarks,
					pic: this.list,
					token: uni.getStorageSync('token'),
				}
				request({
					url: '/order/refundApply/apply',
					method: 'POST',
					data: data
				}).then(res => {
					// 隐藏加载页效果
					uni.hideLoading();
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							// 成功之后返回前一个页面
							// uni.navigateBack({
							// 	delta:1
							// })
							uni.redirectTo({
								url: "../../pagesA/order/order?id=1"
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					} else {}

				})
			},



		}
	}
</script>

<style lang="scss" scoped>
	.refund-box {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;

		.refund-header {
			width: 100%;
		}

		.refund-content {
			width: 100%;
			flex: 1;
			overflow-y: scroll;
			background: #f7f7f7;

			.refund-content-explain {
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 100%;
				height: 114rpx;
				padding: 0 32rpx;
				box-sizing: border-box;
				background: #FAD9D9;

				.refund-explain-text {
					font-weight: 400;
					font-size: 24rpx;
					color: #E53948;
				}
			}

			.refund-content-info-box {
				padding: 32rpx;
				box-sizing: border-box;
				background: #fff;
				margin-top: 16rpx;
				font-weight: 400;

				.refund-content-info-title {
					font-size: 28rpx;
				}

				.refund-content-info-li {
					display: flex;
					align-items: center;
					padding: 16rpx 0;

					.refund-content-info-li-check {
						display: flex;
						align-items: center;
						width: 28rpx;
						height: 28rpx;

						text {
							display: block;
							width: 26rpx;
							height: 26rpx;
							border: 1rpx solid #ccc;
							border-radius: 50%;
						}

						image {
							width: 100%;
							height: 100%;
						}
					}

					.refund-content-info-li-text {
						margin-left: 16rpx;
						font-size: 24rpx;
					}
				}

				.refund-content-list {
					.refund-content-list-li {
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 20rpx;
						font-weight: 400;

						.refund-content-li-title {
							font-size: 28rpx;
							color: #000;
						}

						.refund-content-li-text {
							font-size: 28rpx;
							color: #000;

							input {
								text-align: right;
								font-size: 24rpx;
							}
						}
					}
				}

				.refund-content-imgList {
					.refund-content-imgList-title {
						font-size: 28rpx;
						color: #000;
					}

					.refund-content-img-list {
						margin-top: 35rpx;
						display: flex;
						align-items: center;

						.refund-img-list-li {
							position: relative;
							width: 100rpx;
							height: 100rpx;
							margin-right: 32rpx;

							.refund-img-li-pic {
								width: 100rpx;
								height: 100rpx;
								border-radius: 15rpx;

								image {
									width: 100%;
									height: 100%;
									border-radius: 15rpx;
								}
							}

							.refund-img-li-del-pic {
								position: absolute;
								top: -17rpx;
								right: -17rpx;
								width: 34rpx;
								height: 34rpx;

								image {
									width: 100%;
									height: 100%;
								}
							}
						}

						.refund-img-li-msg {
							display: flex;
							align-items: flex-end;
							font-size: 20rpx;
							font-weight: 400;
							height: 100rpx;
							color: #999;
						}
					}
				}

			}
		}

		.refund-footer {}

		.statusBarHeight {
			padding-bottom: 60rpx !important;
		}
	}
</style>
