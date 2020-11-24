<template>
	<view class="cash-out-box">
		<view class="cash-out-box-head">
			<Title title="提现" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="cash-out-box-content">
			<view class="cash-out-content-wrap">
				<view class="cash-out-box-list">
					<view class="cash-out-box-list-li" @click="TypeClick">
						<view class="cash-out-list-li-title">提现至：</view>
						<view class="cash-out-list-li-name">{{TypeName}}</view>
						<view class="cash-out-list-li-more">
							<image src="../../static/images/mord.png" mode=""></image>
						</view>
					</view>
					<view class="cash-out-box-list-li" v-if="TypeId==0">
						<view class="cash-out-list-li-title">微信号：</view>
						<view class="cash-out-list-li-name">
							<input type="text" v-model="wechatNumber" placeholder-style="color:#999" placeholder="请输入微信号" />
						</view>
					</view>
					<view class="cash-out-box-list-li" v-if="TypeId==1">
						<view class="cash-out-list-li-title">姓名：</view>
						<view class="cash-out-list-li-name">
							<input type="text" v-model="AlipayName" placeholder-style="color:#999" placeholder="请输入支付宝姓名" />
						</view>
					</view>
					<view class="cash-out-box-list-li" v-if="TypeId==1">
						<view class="cash-out-list-li-title">账号：</view>
						<view class="cash-out-list-li-name">
							<input type="text" v-model="AlipayNumber" placeholder-style="color:#999" placeholder="请输入支付宝账号或手机号" />
						</view>
					</view>
					<view class="cash-out-box-list-li" v-if="TypeId==2">
						<view class="cash-out-list-li-title">持卡人：</view>
						<view class="cash-out-list-li-name">
							<input type="text" v-model="CardName" placeholder-style="color:#999" placeholder="请输入持卡人姓名" />
						</view>
					</view>
					<view class="cash-out-box-list-li" v-if="TypeId==2">
						<view class="cash-out-list-li-title">卡号：</view>
						<view class="cash-out-list-li-name">
							<input type="number" v-model="CardNumberVal" @blur="CardNumber" :focus="isCardFocus" placeholder-style="color:#999"
							 placeholder="请输入卡号" />
						</view>
					</view>
					<view class="cash-out-box-list-li" @click="BankClick" v-if="TypeId==2">
						<view class="cash-out-list-li-title">银行：</view>
						<view class="cash-out-list-li-name" v-if="BankTitle!=''">{{BankTitle}}</view>
						<view class="cash-out-list-li-name" style="color: #999;" v-else>请选择所属银行</view>
						<view class="cash-out-list-li-more">
							<image src="../../static/images/mord.png" mode=""></image>
						</view>
					</view>
					<view class="cash-out-box-list-li" style="display: block;height: auto;">
						<view class="cash-out-list-li-title" style="padding: 38rpx 0;">提现金额：</view>
						<view class="cash-out-li-box">
							<view class="cash-out-li-box-sign">￥</view>
							<view class="cash-out-li-box-input">
								<input type="digit" v-model="CashOutVal" maxlength="9" placeholder="请输入提现金额" @input="ChangeCashOut"
								 placeholder-style="color: #999;font-size: 28rpx;font-weight: 400;" />
							</view>
							<view class="cash-out-li-box-msg" @click="WholeCash">全部提现</view>
						</view>
						<view class="cash-out-li-box-money">
							可提现金额：{{MaxMoney|PriceTow}}元
						</view>
					</view>
				</view>
			</view>
			<view class="cash-out-box-btn">
				<FootBtn BtnName="提现" :isActive="!isActive" @footbtn="CashBtn"></FootBtn>
			</view>
			<view class="cash-out-footer" @click="CashRecord">
				提现记录
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup-box">
				<view class="popup-box-head">
					<view class="popup-box-head-title">提现至</view>
					<view class="popup-box-head-close" @click="Close(0)">
						<!-- <image src="../../static/images/close-white.png" mode=""></image> -->
					</view>
				</view>
				<view class="popup-box-content">
					<view class="popup-box-content-list">
						<view class="popup-box-content-list-li" v-for="(item,index) in TypeList" :key="item.id" @click="CashType(item)">
							<image :src="item.image" mode=""></image>
							<text>{{item.title}}</text>
						</view>
						<view class="popup-box-content-list-li">
							<text style="color: #999;">取消</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 银行 -->
		<uni-popup ref="bank" type="bottom">
			<view class="popup-box">
				<view class="popup-box-head">
					<view class="popup-box-head-title">选择银行</view>
					<view class="popup-box-head-close" @click="Close(1)">
						<image src="../../static/images/close-white.png" mode=""></image>
					</view>
				</view>
				<view class="popup-box-content">
					<view class="popup-box-content-list">
						<view class="popup-box-content-list-li" v-for="(item,index) in BankList" :key="item.SKID" @click="BankType(item)">
							<image :src="item.image" mode=""></image>
							<text>{{item.title}}</text>
						</view>
						<view class="popup-box-content-list-li">
							<text style="color: #999;">取消</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 提现确认 -->
		<uni-popup ref="cash" type="dialog">
			<uni-popup-dialog type="warn" content="是否确认发起提现？" title="提示信息" :duration="2000" :before-close="false" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import Title from "../../components/title/title.vue"
	import FootBtn from "../../components/footer-btn/foot-btn.vue"
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '../../components/uni-popup/uni-popup-dialog.vue'
	import {
		request
	} from '../../static/js/ajax.js'
	export default {
		data() {
			return {
				isActive: false,
				CashOutVal: '', // 提现金额输入框
				CardNumberVal: '', // 银行卡号输入框
				CardName: '', // 银行卡持卡人
				MaxMoney: 99, // 可提现金额
				BankTitle: "",
				isCardFocus: false,
				TypeName: '微信',
				wechatNumber: '', // 微信号输入框
				AlipayNumber: '', // 支付宝号输入框
				AlipayName: '', // 支付宝姓名输入框
				TypeId: 0,
				TypeList: [{
						title: "微信",
						id: 0,
						image: 'https://dcdn.it120.cc/2020/08/07/f12b24ac-c290-4cdb-be6a-5d9795d42837.png'
					},
					{
						title: "支付宝",
						id: 1,
						image: 'https://dcdn.it120.cc/2020/08/07/c35ce8f1-11fd-41a5-9f08-d532dafc6153.png'
					},
					{
						title: "银行卡",
						id: 2,
						image: 'https://dcdn.it120.cc/2020/08/07/fcdd46f3-4c98-4cba-ba1a-b1d3d9559148.png'
					},
				],
				BankList: [{
						title: "中国银行",
						SKID: "001",
						image: 'https://dcdn.it120.cc/2020/08/07/fe46f85c-ccc7-4979-a41c-e3a57a30d2c9.png'
					},
					{
						title: "工商银行",
						SKID: "002",
						image:'https://dcdn.it120.cc/2020/08/07/d726f161-1ad8-4d15-8ebf-298afab36225.png'
					},
					{
						title: "建设银行",
						SKID: "003",
						image:'https://dcdn.it120.cc/2020/08/07/1814fc2e-7bb5-4bd3-8e72-72b096218e3d.png'
					},
					{
						title: "农业银行",
						SKID: "004",
						image:'https://dcdn.it120.cc/2020/08/07/64f11f87-7ac3-4913-9ea5-80cc2ce856cc.png'
					},
					{
						title: "兴业银行",
						SKID: "005",
						image: 'https://dcdn.it120.cc/2020/08/07/7aae74ba-c29b-4a93-bbda-c4184a534c1e.png'
					},
				],
				dataJson: {},
			}
		},
		components: {
			Title,
			FootBtn,
			uniPopup,
			uniPopupDialog
		},
		// 过滤器
		filters: {
			// 价格保留两位
			PriceTow(value) {
				let val = !value ? 0 : value
				return val.toFixed(2)
			},
		},
		watch: {
			CashOutVal(value) {
				let price = Number(value)
				return price.toFixed(2)
			},
		},

		methods: {
			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 点击选择提现类型
			TypeClick() {
				this.$refs.popup.open()
			},

			// 提现类型点击
			CashType(item) {
				this.TypeName = item.title
				this.TypeId = item.id
				this.$refs.popup.close()
			},
			// 点击打开选择银行
			BankClick() {
				this.$refs.bank.open()
			},
			// 选择银行类型点击
			BankType(item) {
				// console.log(item)
				this.BankTitle = item.title
				this.$refs.bank.close() // 提现银行关闭
			},

			// 弹出层关闭icon
			Close(type) {
				switch (type) {
					case 0:
						this.$refs.popup.close() // 支付类型关闭
						break;
					case 1:
						this.$refs.bank.close() // 提现银行关闭
						break;
				}
			},

			// 点击全部提现
			WholeCash() {
				this.CashOutVal = this.MaxMoney
				this.isActive = true
			},

			// 提现按钮
			CashBtn() {
				var reg = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^[1-9]$)|(^\d\.[1-9]{1,2}$)|(^\d\.[0]{1}[1-9]{1}$|(^\d\.[1-9]{1}[0]{1}$)$)/; //  金额
				var regExp = /^([1-9]{1})(\d{15}|\d{17}|\d{18})$/; // 银行卡号

				if (this.isActive) {
					if (reg.exec(this.CashOutVal)) { // 金额验证
						console.log('验证通过');

						switch (this.TypeId) { // 0微信 1支付宝 2 银行卡
							case 0:
								if (this.wechatNumber != '') {
									this.$refs.cash.open()
									this.dataJson = {
										money: this.CashOutVal,
										extJsonStr: {
											wechatNumber: this.wechatNumber,
											type: "微信"
										},
										token: uni.getStorageSync("token")
									}
								} else {
									uni.showToast({
										title: "请输入微信号",
										icon: "none"
									})
								}
								break;
							case 1:
								if (this.AlipayNumber != '' & this.AlipayName != '') {
									this.$refs.cash.open()
									this.dataJson = {
										money: this.CashOutVal,
										extJsonStr: {
											AlipayVal: this.AlipayNumber,
											AlipayName: this.AlipayName,
											type: "支付宝"
										},
										token: uni.getStorageSync("token")
									}
								} else {
									uni.showToast({
										title: "请检查是否输入完整",
										icon: "none"
									})
								}
								break;
							case 2:
								if (regExp.test(Number(this.CardNumberVal))) {
									this.$refs.cash.open()
									this.dataJson = {
										money: this.CashOutVal,
										extJsonStr: {
											CardVal: this.CardNumberVal,
											CardName: this.CardName,
											BankType: this.BankTitle,
											type: "银行卡"
										},
										token: uni.getStorageSync("token")
									}
								} else {
									uni.showToast({
										title: "请输入正确的银行卡号",
										icon: "none"
									})
								}
								break;
						}
					} else {
						console.log('验证不通过');
						uni.showToast({
							title: "请输入正确的金额",
							icon: "none"
						})
					}
				} else {
					// uni.showToast({
					// 	title: "请输入正确的金额",
					// 	icon: "none"
					// })
				}

			},
			// 提现确认按钮
			confirm() {
				// 执行提现接口
				this.CashMethod()
			},

			// 数入金额监听
			ChangeCashOut() {
				if (this.CashOutVal != '') {
					if (this.CashOutVal > this.MaxMoney) {
						uni.showToast({
							title: "大于可提现金额：" + this.MaxMoney,
							icon: "none"
						})
						this.isActive = false
					} else {
						this.isActive = true
					}
				} else {
					this.isActive = false
				}
			},

			// 银行卡号监听
			CardNumber() {
				// this.isCardFocus = false
				// var regExp = /^([1-9]{1})(\d{15}|\d{18})$/;
				// if(regExp.test(this.CardNumberVal)){
				// 	console.log("通过")
				// 	this.isCardFocus = false
				// }else{
				// 	console.log("不通过")
				// 	this.isCardFocus = true
				// }
			},

			// 提现记录
			CashRecord() {
				uni.navigateTo({
					url: "../CashRecord/CashRecord"
				})
			},
			// 发起提现接口
			CashMethod() {
				request({
					url: '/user/withDraw/apply',
					method: 'GET',
					data: this.dataJson,
				}).then(res => {
					if (res.statusCode == 200) {
						this.$refs.cash.close()
						if (res.data.code == 0) {
							uni.navigateTo({
								url: '../CashSuccess/CashSuccess?money=' + this.CashOutVal
							})
						} else if (res.data.code == 700) {

						} else if (res.data.code == 20001) {
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
	.cash-out-box {
		height: 100%;
		display: flex;
		flex-direction: column;

		.cash-out-box-head {}

		.cash-out-box-content {
			position: relative;
			flex: 1;
			padding: 0 32rpx;
			box-sizing: border-box;

			.cash-out-content-wrap {
				.cash-out-box-list {
					.cash-out-box-list-li {
						display: flex;
						align-items: center;
						// padding: 28rpx 0;
						height: 88rpx;
						font-size: 24rpx;
						font-weight: 400;
						border-bottom: 1rpx solid #f2f2f2;

						.cash-out-list-li-title {
							color: #666;
						}

						.cash-out-list-li-name {
							flex: 1;
							margin: 0 20rpx;

							input {
								font-size: 24rpx;

								.uni-input-placeholder {
									color: #999;
								}
							}
						}

						.cash-out-list-li-more {
							width: 12rpx;
							height: 22rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}


						.cash-out-li-box {
							display: flex;
							align-items: center;
							justify-content: space-between;
							font-weight: 400;
							color: #666;

							.cash-out-li-box-sign {
								font-size: 40rpx;
							}

							.cash-out-li-box-input {
								flex: 1;
								margin: 0 22rpx;

								input {
									font-weight: 500;
									font-size: 40rpx;
								}
							}

							.cash-out-li-box-msg {
								color: #324B78;
							}
						}

						.cash-out-li-box-money {
							margin: 30rpx 0;
							font-size: 20rpx;
							color: #999;
						}
					}
				}
			}

			.cash-out-box-btn {
				margin-top: 144rpx;
			}

			.cash-out-footer {
				width: calc(100% - 64rpx);
				padding: 32rpx 0;
				box-sizing: border-box;
				position: absolute;
				bottom: 68rpx;
				text-align: center;
				font-size: 24rpx;
				font-weight: 400;
				color: #324B78;
			}
		}

		.popup-box {
			display: flex;
			flex-direction: column;
			min-height: 360rpx;
			box-sizing: border-box;
			border-radius: 12rpx 12rpx 0px 0px;
			background: #fff;

			.popup-box-head {
				position: relative;
				height: 88rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 12rpx 12rpx 0px 0px;
				background: #324B78;
				color: #fff;
				font-size: 32rpx;
				font-weight: 400;

				.popup-box-head-title {}

				.popup-box-head-close {
					position: absolute;
					right: 0;
					top: 0;
					padding: 32rpx;

					image {
						width: 22rpx;
						height: 22rpx;
					}
				}

			}

			.popup-box-content {
				flex: 1;
				padding: 0 32rpx;
				overflow-y: scroll;
				display: flex;
				align-items: center;
				justify-content: center;

				.popup-box-content-list {
					width: 100%;
					height: 100%;

					.popup-box-content-list-li {
						width: 100%;
						height: 88rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 28rpx;
						border-bottom: 1rpx solid #f2f2f2;
						image{
							width: 40rpx;
							height: 40rpx;
						}
						text{
							margin-left: 24rpx;
						}
						
					}

					.popup-box-content-list-li:last-child {
						border-bottom: 0;
					}
				}
			}

		}
	}
</style>
