<template>
	<view class="add-address-box">
		<view class="add-address-head">
			<Title :title="TitleName" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="add-address-content">
			<view class="add-content-list">
				<view class="add-list-li">
					<view class="add-li-name">联系人：</view>
					<view class="add-li-input">
						<input type="text" v-model="UserName" placeholder="请输入收货人姓名" />
					</view>
					<view class="add-li-ico" @click="getContacts">
						<image src="../../static/images/book-ico.png" mode=""></image>
					</view>
				</view>
				<view class="add-list-li">
					<view class="add-li-name">手机号：</view>
					<view class="add-li-input">
						<input type="number" v-model="UserTel" placeholder="输入收货人手机号码" />
					</view>
				</view>
				<view class="add-list-li" @click="CheckAddress">
					<view class="add-li-name">所在地区：</view>
					<view class="add-li-input">
						<text v-if="addressValue!=''">{{addressValue}}</text>
						<text style="color: #999;" v-else>选择地区信息</text>
					</view>
					<view class="add-li-ico">
						<image style="width:12rpx;height:22rpx" src="../../static/images/mord.png" mode=""></image>
					</view>
				</view>
				<view class="add-list-li">
					<view class="add-li-name">详细地址：</view>
					<view class="add-li-input">
						<input type="text" v-model="UserAddress" placeholder="输入小区、楼牌号等" />
					</view>
				</view>
				<view class="add-list-li">
					<view class="add-li-name">是否设置为默认地址：</view>
					<view class="add-li-input add-li-set">
						<evan-switch @change="SwitchBtn" v-model="checked" active-color="#324B78" :size="16" inactive-color="#eee"></evan-switch>
					</view>
				</view>
			</view>
			<!-- 添加地址 -->
			<FootBtn BtnName="保存地址信息" @footbtn="Keep(0)" :isActive="isActive" v-if="isState"></FootBtn>
			<!-- 修改地址 -->
			<FootBtn BtnName="保存地址信息" :isActive="isActive" @footbtn="Keep(1)" v-else></FootBtn>
			<view class="address-del" v-if="!isState" @click="AddressDel">删除地址</view>
			<view style="opacity: 0;">{{name}}</view>
		</view>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#324B78'></simple-address>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="warn" content="你确定要删除该地址吗？" title="警告" :duration="2000" :before-close="false" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {
		request
	} from '../../static/js/ajax.js'
	import Title from "../../components/title/title.vue"
	import FootBtn from "../../components/footer-btn/foot-btn.vue"
	import simpleAddress from "../../components/simple-address/simple-address.nvue"
	import evanSwitch from "../../components/evan-switch/evan-switch.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'


	export default {
		data() {
			return {
				isState: true,
				TitleName: '',
				cityPickerValueDefault: [0, 0, 1], //弹框的初始值
				list: {},
				addressInfo: {},
				addressValue: '', // 选择地区
				UserName: '', // 姓名
				UserTel: '', // 电话
				UserAddress: '', // 详细地址
				checked: false, // 设置默认地址
				isActive: true, // 检测内容是否有全部输入
				arr1: [],
				arr2: [],
				arr3: []
			}
		},
		components: {
			Title,
			FootBtn,
			simpleAddress,
			evanSwitch,
			uniPopup,
			uniPopupDialog
		},
		computed: {
			name(val) {
				if (val.UserAddress != '' && val.UserName != '' && val.UserTel != '' && val.addressValue != '') {
					this.isActive = false
				} else {
					this.isActive = true
				}

				return
			},
		},
		onLoad(options) {

			// 设置标题名称 判断是新增地址 还是修改地址
			if (options.id == 1) {
				this.TitleName = '新增收货地址'
			} else {
				this.TitleName = '修改收货地址'
				var data = JSON.parse(options.data)
				this.list = data
				this.isState = false // 判断显示按钮

				this.UserName = data.linkMan // 姓名
				this.UserTel = data.mobile // 电话
				this.checked = data.isDefault // 是否默认地址
				this.UserAddress = data.address // 详细地址

				this.addressValue = data.provinceStr + '-' + data.cityStr + '-' + data.areaStr
			}
		},
		created() {

		},
		methods: {
			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				})
			},

			// 点击选择地区按钮
			CheckAddress() {
				this.$refs.simpleAddress.open();
			},

			// 选择地址确定按钮
			onConfirm(e) {
				this.addressValue = e.label; //把选择的地址回显示到界面上
				this.addressInfo = e
				console.log(this.addressInfo)

				// console.log(e)
			},
			// 是否设置为默认地址开关
			SwitchBtn(e) {
				this.checked = e
			},

			// 保存按钮
			Keep(type) {
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				switch (type) {
					//  0 为添加地址  1 为修改地址
					case 0:
						var data = {
							address: this.UserAddress, //详细地址
							// address: this.addressValue + '-' + this.UserAddress, //详细地址
							provinceId: this.addressInfo.provinceCode, // 所属省份编码
							cityId: this.addressInfo.cityCode, //所属城市编码
							districtId: this.addressInfo.areaCode, //所属区县编码
							linkMan: this.UserName, // 联系人名称
							mobile: this.UserTel, // 联系人电话
							isDefault: this.checked, // 是否默认地址
							token: uni.getStorageSync("token")
						}
						if (this.UserAddress != '' && this.UserName != '' && this.UserTel != '' && this.addressValue != '') {
							if (!myreg.test(this.UserTel)) {
								uni.showToast({
									title: "手机号码有误，请重新输入",
									icon: 'none'
								})
							} else {
								request({
									url: '/user/shipping-address/add',
									method: 'POST',
									data: data
								}).then(res => {
									if (res.statusCode == 200) {
										console.log(res.data)
										if (res.data.code == 0) {
											uni.showToast({
												title: "地址添加成功",
												icon: "none",
												success() {
													uni.navigateBack({
														delta: 1
													})
												}
											})

										}
									} else {}
								})
							}
						} else {
							uni.showToast({
								title: "请检查是否输入完整",
								icon: 'none'
							})
						}
						break;
					case 1:
						// 判断addressInfo是否为空
						var isNull = false
						if (JSON.stringify(this.addressInfo) == '{}') {
							isNull = true
						} else {
							isNull = false
						}

						var data = {
							address: this.UserAddress, //详细地址
							provinceId: isNull ? this.list.provinceId : this.addressInfo.provinceCode, // 所属省份编码
							cityId: isNull ? this.list.cityId : this.addressInfo.cityCode, //所属城市编码
							districtId: isNull ? this.list.districtId : this.addressInfo.areaCode, //所属区县编码
							id: this.list.id, //需要修改的记录id	
							linkMan: this.UserName, // 联系人名称
							mobile: this.UserTel, // 联系人电话
							isDefault: this.checked, // 是否默认地址
							token: uni.getStorageSync("token")
						}
						console.log(this.addressInfo)

						if (this.UserAddress != '' && this.UserName != '' && this.UserTel != '' && this.addressValue != '') {
							request({
								url: '/user/shipping-address/update',
								method: 'POST',
								data: data
							}).then(res => {
								if (res.statusCode == 200) {
									console.log(res.data)
									if (res.data.code == 0) {
										uni.showToast({
											title: "地址信息修改成功",
											icon: "none",
											success() {
												uni.navigateBack({
													delta: 1
												})
											}
										})

									}
								} else {}
							})
						} else {
							uni.showToast({
								title: "请检查是否输入完整",
								icon: 'none'
							})
						}
						break
				}
			},

			// 删除地址
			AddressDel() {
				this.$refs.popup.open() // 打开弹窗
			},
			// 删除确认事件
			confirm(done, value) {
				let data = {
					id: this.list.id,
					token: uni.getStorageSync("token")
				}
				request({
					url: '/user/shipping-address/delete',
					method: 'POST',
					data: data
				}).then(res => {
					if (res.statusCode == 200) {
						console.log(res.data)
						if (res.data.code == 0) {
							uni.showToast({
								title: "地址删除成功",
								icon: "none",
								success() {
									uni.navigateBack({
										delta: 1
									})
								}
							})

						}
					} else {}
					done() // 关闭弹出层
				})
			},

			// 获取手机通讯录
			getContacts: function() {
				console.log("获取手机通讯录信息")
				// wx.addPhoneContact({
				// 	success:function(e) {
				// 		console.log(e)
				// 	}
				// })
			},

		}
	}
</script>

<style lang="scss" scoped>
	.add-address-box {
		display: flex;
		flex-direction: column;
		height: 100%;

		.add-address-head {}

		.add-address-content {
			width: 100%;
			height: 100%;
			flex: 1;
			overflow: scroll;

			.add-content-list {

				padding: 0 32rpx;
				margin-bottom: 160rpx;

				.add-list-li {
					display: flex;
					align-items: center;
					height: 87rpx;
					border-bottom: 1px solid #f2f2f2;

					.add-li-name {
						font-size: 24rpx;
						color: #666;
					}

					.add-li-input {
						flex: 1;
						margin: 0 32rpx;
						// color: #999999;
						font-size: 24rpx;

						input {
							width: 100%;
							font-size: 24rpx;

							.uni-input-placeholder {
								color: #999;
							}
						}
					}

					.add-li-set {
						display: flex;
						justify-content: flex-end;
						margin-right: 0 !important;
					}

					.add-li-ico {
						display: flex;
						align-items: center;
						justify-content: flex-end;
						width: 34rpx;
						height: 34rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}

			.address-del {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 39rpx 0;
				color: #E53947;
				font-size: 24rpx;
			}
		}
	}
</style>
