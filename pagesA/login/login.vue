<template>
	<view class="login-box">
		<view class="login-head">
			<Title title="登录" :isGBack="true" @GBack="GBack"></Title>
		</view>
		<view class="login-content">
			<view class="login-top">欢迎来到逗芙商城</view>
			<view class="login-logo">
				<image src="../../static/images/logo.png" mode="aspectFill"></image>
			</view>

			<view class="login-text-box">
				<view class="login-text-title">
					登录后可继续操作
				</view>
				<view class="login-tetx-msg">
					登录将获得您的公开信息（昵称、头像等）
				</view>
			</view>
			<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">授权登录</button>
			<!-- <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">getPhoneNumber</button> -->
		</view>
	</view>
</template>

<script>
	import Title from "../../components/title/title.vue"
	import {
		request
	} from "../../static/js/ajax.js"
	export default {
		data() {
			return {
				nickName: null,
				avatarUrl: null,
				isCanUse: false, //默认为false  记录当前用户是否是第一次授权使用的
			}
		},
		components: {
			Title,
		},
		methods: {
			// 返回按钮
			GBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			getPhoneNumber(e) {
				console.log(e.detail.errMsg);
				console.log(e.detail.iv);
				console.log(e.detail.encryptedData);
			},

			// 获取用户信息
			wxGetUserInfo() {
				uni.showLoading({
					title: '登录中...',
					mask: true
				});
				
				let that = this;
				// 获取用户信息
				uni.getUserInfo({
					provider: 'weixin',
					success: (res) => {	
						uni.setStorageSync("nickName", res.userInfo.nickName)
						uni.setStorageSync("avatarUrl", res.userInfo.avatarUrl)

						this.Login(res.userInfo)
				
					},
					fail: function(fail) {
						console.log("fail:", fail)
					}
				});
			},
			
			
			// 登录方法
			Login(UserInfo) {
				let that = this
				var UserId;
				
				if(!!uni.getStorageSync("userId")){
					UserId = uni.getStorageSync("userId")
				}else{
					UserId = ''
				}

				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						// console.log(res)
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									request({
										url: '/user/wxapp/login',
										method: 'POST',
										data: {
											code: loginRes.code,
											// type: 2,
											autoReg:true, // 没有注册是否自动注册
											referrer:UserId, // 邀请人id
										}
									}).then(ress => {
										if (ress.statusCode == 200) {
											// 隐藏加载页效果
											uni.hideLoading();
											if (ress.data.code == 10000) {
												that.register(loginRes.code)
											} else {
												that.$components.token = ress.data.data.token
												uni.setStorageSync("token", ress.data.data.token) // token
												
												uni.setStorageSync("userId", ress.data.data.uid) // 用户编号
												
												uni.setStorageSync("isCanUse", true)
												
												uni.setStorageSync("loginInfo", JSON.stringify(ress.data.data))
																
												uni.showToast({
													title: "登录成功",
													icon: "none"
												})
												uni.navigateBack({
													delta: 1
												})
												that.EditUserInfo(UserInfo)
											}
										}
									})
								}
							});
						}
					}
				});
			},
			
			EditUserInfo(info){
				let data={
					avatarUrl:info.avatarUrl,// 头像地址
					city:info.city,//所在城市
					nick:info.nickName,//昵称
					province:info.province,// 所在省份
					token:uni.getStorageSync("token")
				}
				request({
					url: '/user/modify',
					method: 'POST',
					data:data
				}).then(ress => {
					if (ress.statusCode == 200) {
						console.log(ress.data)
						if (ress.data.code == 0) {
							
						} else {
							
						}
					}
				})
				
			},
			
			
			
			// 注册
			register(code) {
				request({
					url: '/user/wxapp/register/simple',
					method: 'POST',
					data: {
						code: code,
					}
				}).then(res => {
					if (res.statusCode == 200) {
						console.log(res)
						if (res.data.code == 0) {
							// ogkQC0XFhvdaHTy6Wp8l6f2YgCQU   1465556
						} else {

						}


					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.login-box {
		display: flex;
		flex-direction: column;
		height: 100%;

		.login-head {}

		.login-content {
			flex: 1;
			background: #F7F7F7;
			display: flex;
			flex-direction: column;
			align-items: center;

			.login-top {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 253rpx;
				margin-top: -1px;
				font-size: 52rpx;
				color: #fff;
				background: url(../../static/images/mine-ico.png);
				background-size: contain;
			}

			.login-logo {
				width: 144rpx;
				height: 144rpx;
				margin-top: 160rpx;
				// background: #324B78;
				border-radius: 24rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}

			.login-text-box {
				margin-top: 113rpx;
				text-align: center;

				.login-text-title {
					font-size: 32rpx;
					color: #000;
				}

				.login-tetx-msg {
					margin-top: 22rpx;
					color: #999;
					font-size: 28rpx;
				}
			}

			button {
				width: 688rpx;
				height: 80rpx;
				margin-top: 119rpx;
				background: #08C160;
				border: none;
				font-size: 30rpx;
				color: #f7f7f7;
			}
		}
	}
</style>


<!-- 

<template>
	<view>
		<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>
		<button type="primary" open-type="getUserInfo" @click="getuserinfo" withCredentials="true">微信登录</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onLoad: function() {
			wx.login({
				success: function(res) {
					console.log(res)
					// 获取code  
					// console.log(JSON.stringify(res));  
				}
			});
		},

		methods: {
			getPhoneNumber(e) {
				console.log(e)

			},
			getUserInfo: function(loginType, cb) {
				var that = this
				if (this.globalData.userInfo) {
					typeof cb == "function" && cb(this.globalData.userInfo, true);
				} else {
					//1.调用登录接口  
					wx.login({
						success: function() {
							wx.getUserInfo({
								success: function(res) {
									that.globalData.userInfo = res.userInfo;
									typeof cb == "function" && cb(that.globalData.userInfo, true);
								},
								fail: function() {
									//2.第一次登陆不强制授权，直接返回  
									if (loginType == 0) {
										typeof cb == "function" && cb(that.globalData.userInfo, false);
									} else {
										//3.授权友好提示  
										wx.showModal({
											title: '提示',
											content: "您还未授权登陆，部分功能将不能使用，是否重新授权？",
											showCancel: true,
											cancelText: "否",
											confirmText: "是",
											success: function(res) {
												//4.确认授权调用wx.openSetting  
												if (res.confirm) {
													if (wx.openSetting) { //当前微信的版本 ，是否支持openSetting  
														wx.openSetting({
															success: (res) => {
																if (res.authSetting["scope.userInfo"]) { //如果用户重新同意了授权登录  
																	wx.getUserInfo({
																		success: function(res) {
																			that.globalData.userInfo = res.userInfo;
																			typeof cb == "function" && cb(that.globalData.userInfo, true);
																		}
																	})
																} else { //用户还是拒绝  
																	typeof cb == "function" && cb(that.globalData.userInfo, false);
																}
															},
															fail: function() { //调用失败，授权登录不成功  
																typeof cb == "function" && cb(that.globalData.userInfo, false);
															}
														})
													} else {
														typeof cb == "function" && cb(that.globalData.userInfo, false);
													}
												} else {
													typeof cb == "function" && cb(that.globalData.userInfo, false);
												}
											}
										})
									}
								}
							})
						}
					})
				}
			}
		}
	}
</script>

<style>

</style>
 -->
