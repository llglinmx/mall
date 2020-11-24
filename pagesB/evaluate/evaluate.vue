<template>
	<view class="evaluate-box">
		<view class="evaluate-box-header">
			<Title title="评论" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="evaluate-box-content">
			<view class="evaluate-content-list">
				<view class="evaluate-content-list-li" v-for="(item,index) in goodsList" :key="item.id">
					<view class="evaluate-content-list-li-top">
						<view class="evaluate-content-list-li-img">
							<image :src="item.pic" mode="aspectFill"></image>
						</view>
						<view class="evaluate-content-list-li-info">
							<view class="evaluate-li-info-title">{{item.goodsName}}</view>
							<view class="evaluate-li-info-property">{{item.property}}</view>
						</view>
					</view>
					<view class="evaluate-content-list-li-state">
						<view class="evaluate-list-li-state-title">
							评论状态
						</view>
						<view class="evaluate-list-li-state-wrap">
							<view class="evaluate-list-li-state-item" v-for="(v,j) in item.DataList" @click="EvaluateState(index,j)">
								<image :src="v.isFlag?v.acImg:v.Img" mode=""></image>
								<text :style="{color:(v.isFlag?'#324B78':'#ccc')}">{{v.title}}</text>
							</view>
						</view>
					</view>
					<view class="evaluate-content-list-li-box">
						<view class="evaluate-list-li-remarks">
							<textarea class="textarea" v-model="item.remarks" placeholder="请输入评价内容(必填)，最多200字" maxlength="200" />
							</view>
						<view class="evaluate-content-list-li-box-imgarr">
							<view class="evaluate-list-imgarr-li" v-for="(pic,picIndex) in item.picArr" @click="previewImg(index,picIndex)">
								<image class="evaluate-list-imgarr-li-img" :src="pic" mode="aspectFill"></image>
								
								<image class="evaluate-list-imgarr-li-img-del" src="../../static/images/del-ico.png" mode="aspectFill" @click.stop="DeleteImg(index,picIndex)"></image>
							</view>
							<view class="evaluate-list-imgarr-li" @click="UpLoad(index)">
								<image class="evaluate-list-imgarr-li-img" src="../../static/images/add-ico.png" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="evaluate-box-footer">
			<FootBtn BtnName="提交评价" :isActive="!isActive" @footbtn="SubMit"></FootBtn>
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
				ImgList: [],
				picList: [],
				goodsList: [],
				orderInfo: {},
				ImgLength: [], // 上传图片长度
				isActive: true
			}
		},
		components: {
			Title,
			FootBtn
		},

		onLoad(options) {
			// var obj = JSON.parse(options.obj)
			// this.OrderId = obj.orderId // 订单商品orderid
			// this.SKID = obj.id // 
			this.OrderDetails(options.id)
		},
		methods: {
			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				})
			},

			// 评价状态
			EvaluateState(index, idx) {
				this.goodsList[index].DataList.forEach(item => {
					item.isFlag = false
				})
				Object.assign(this.goodsList[index].DataList[idx], {
					isFlag: true,
				})

				this.$forceUpdate(); // 强制更新页面视图
			},

			// 选择上传图片
			UpLoad(index) {
				let that = this
				uni.chooseImage({
					count: 3,
					success: (res) => {
						this.goodsList[index].picArr = this.goodsList[index].picArr.concat(res.tempFilePaths)
						console.log(this.goodsList)

						// 判断是否上传图片的最大张数
						if (this.goodsList[index].picArr.length > 3) {
							this.goodsList[index].picArr.splice((this.goodsList[index].picArr.length - 1), 1)
							uni.showToast({
								title: "超过图片上传张数：3张",
								icon: "none"
							})
						}
						this.$forceUpdate(); // 强制更新页面视图
					}
				})
			},
			// 提交按钮
			SubMit() {
				for (var i = 0; i < this.goodsList.length; i++) {
					if (!this.goodsList[i].remarks) {
						uni.showToast({
							title: "请输入第" + (i + 1) + "个商品的评论信息",
							icon: "none"
						});
						break;
					}
				}
				this.goodsList.forEach((item, index) => {
					item.picArr.forEach(v => {
						this.ImgLength.push(v) // 统计需要上传图片的张数
					})
				})

				// 判断是否有选择评价图片
				if (this.ImgLength.length != 0) {
					this.ChangeImg() // 上传图片
				} else {
					this.EvaluateFuntion()
				}
			},

			// 删除已经添加到需要上传的显示界面
			DeleteImg(index,idx) {
				this.goodsList[index].picArr.splice(idx,1)
				this.$forceUpdate(); // 强制更新页面视图
				console.log(index,idx)
			},
			ChangeImg() {
				var i = 0 // 统计上传张数
				this.goodsList.forEach((item, index) => {
					item.picArr.forEach(v => {
						const uploadTask = uni.uploadFile({
							url: 'https://api.it120.cc/doufu/dfs/upload/file',
							name: 'upfile',
							filePath: v,
							formData: {
								"token": uni.getStorageSync('token'),
							},
							success: (res) => {
								i++
								uni.showLoading({
									title: "图片已上传" + i + "张",
									mask: true
								})
								console.log("图片已上传" + i + "张")

								var dataList = JSON.parse(res.data)
								// 添加上传图片 传递到评价图片
								this.goodsList[index].picList.splice(this.goodsList[index].picList.length - 1, 0, dataList.data.url)
								// 图片上传完成在执行评价接口
								if (this.ImgLength.length == i) { // 判断图片是否上传完成
									uni.hideLoading();
									this.EvaluateFuntion()
								}
							},
							fail: (err) => {
								console.log(err)
							},
						});
					})
				})
			},

			// 轮播图片放大预览
			previewImg(index, prevIdx) {
				let imgsArray = [];
				for (let i = 0; i < this.goodsList[index].picArr.length; i++) {
					imgsArray.push(this.goodsList[index].picArr[i]);
				}
				uni.previewImage({
					current: prevIdx,
					urls: imgsArray,
					indicator: 'number',
					loop: true
				});
			},

			// 执行评价接口
			EvaluateFuntion() {
				var arr = []
				var data = {}
				this.goodsList.forEach(item => {
					item.DataList.forEach(v => {
						let img = [];
						if (v.isFlag) {
							item.picList.forEach(id => {
								img.push(id)
							})
							let str = {
								id: item.id,
								reputation: v.state, // 好评状态
								remark: item.remarks, // 评价内容
								pics: img, // 图片
							}
							arr.push(str)
						}
					})
				})
				data = {
					token: uni.getStorageSync("token"),
					orderId: this.orderInfo.id, // "数字订单号，订单接口的id，不是 orderNumber",
					reputations: arr
				}

				uni.showLoading({
					title: '评价提交中',
					mask: true
				});

				request({
					url: '/order/reputation',
					method: 'POST',
					data: {
						postJsonString: JSON.stringify(data),
						token: uni.getStorageSync("token")
					}
				}).then(res => {
					if (res.statusCode == 200) {
						console.log(res.data)
						uni.hideLoading();
						if (res.data.code == 0) {
							// 跳转到评论成功列表
							uni.navigateTo({
								url:"../../pagesC/evaluate-success/evaluate-success"
							})
						} else {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					} else {}
				})
			},

			// 轮播图片放大预览
			EvaluatepreviewImg(index) {
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

			// 获取订单详情
			OrderDetails(id) {
				request({
					url: '/order/detail',
					method: 'POST',
					data: {
						id: id,
						token: uni.getStorageSync("token")
					}
				}).then(res => {
					if (res.statusCode == 200) {
						if (res.data.code == 0) {
							this.orderInfo = res.data.data.orderInfo
							this.goodsList = res.data.data.goods

							this.goodsList.forEach(item => {
								Object.assign(item, {
									remarks: '',
									DataList: [{
											title: "好评",
											state: 2,
											isFlag: true,
											acImg: "../../static/images/look/hp-ico-active.png",
											Img: "../../static/images/look/hp-ico.png"
										},
										{
											title: "中评",
											state: 1,
											isFlag: false,
											acImg: "../../static/images/look/zp-ico-active.png",
											Img: "../../static/images/look/zp-ico.png"
										},
										{
											title: "差评",
											state: 0,
											isFlag: false,
											acImg: "../../static/images/look/cp-ico-active.png",
											Img: "../../static/images/look/cp-ico.png"
										},
									],
									picArr: [],
									picList: []
								})
							})
						} else {}
					} else {}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.evaluate-box {
		height: 100%;
		display: flex;
		flex-direction: column;

		.evaluate-box-header {}

		.evaluate-box-content {
			flex: 1;
			overflow-y: scroll;
			background: #f7f7f7;

			.evaluate-content-list {
				height: 100%;

				.evaluate-content-list-li {
					padding: 32rpx;
					box-sizing: border-box;
					background: #fff;
					margin-bottom: 16rpx;

					.evaluate-content-list-li-top {
						display: flex;

						.evaluate-content-list-li-img {
							width: 80rpx;
							height: 80rpx;

							image {
								width: 100%;
								height: 100%;
								border-radius: 8rpx;
							}
						}

						.evaluate-content-list-li-info {
							margin-left: 28rpx;
							flex: 1;
							font-weight: 400;

							.evaluate-li-info-title {
								font-size: 24rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 1;
							}

							.evaluate-li-info-property {
								font-size: 20rpx;
								color: #999;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 1;
								line-height: 48rpx;
							}
						}
					}

					.evaluate-content-list-li-state {
						display: flex;
						align-items: center;
						padding: 24rpx 0 32rpx;

						.evaluate-list-li-state-title {
							margin-right: 80rpx;
							font-size: 28rpx;
							font-weight: 400;
							color: #000;
						}

						.evaluate-list-li-state-wrap {
							padding-right: 42rpx;
							flex: 1;
							display: flex;
							justify-content: space-between;

							.evaluate-list-li-state-item {
								display: flex;
								align-items: center;

								image {
									width: 48rpx;
									height: 48rpx;
								}

								text {
									margin-left: 24rpx;
									font-size: 28rpx;
									font-weight: 500;
									color: #ccc;
								}
							}
						}
					}

					.evaluate-content-list-li-box {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						width: 100%;
						height: 420rpx;
						padding: 26rpx 32rpx;
						box-sizing: border-box;
						border-radius: 12rpx;
						background: #f7f7f7;
						.evaluate-list-li-remarks {
							textarea{
								height: 200rpx;
								font-size: 28rpx;
							}
						}

						.evaluate-content-list-li-box-imgarr {
							display: flex;
							align-items: center;
							.evaluate-list-imgarr-li {
								position: relative;
								margin-right: 32rpx;
								width: 100rpx;
								height: 100rpx;
								
								.evaluate-list-imgarr-li-img {
									width: 100rpx;
									height: 100rpx;
									border-radius: 12rpx;
								}
								
								.evaluate-list-imgarr-li-img-del{
									position: absolute;
									right: -17rpx;
									top: -17rpx;
									width: 34rpx;
									height: 34rpx;
								}
							}
							.evaluate-list-imgarr-li:last-child{
								margin-right: 0;
							}
						}
					}
				}
			}
		}

		.evaluate-box-footer {}
	}


	image {
		width: 200rpx;
		height: 200rpx;
	}
</style>
