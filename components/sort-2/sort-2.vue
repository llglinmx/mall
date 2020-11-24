<template>
	<view class="list_box">
		<!-- 菜单左边 -->
		<view class="left">
			<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
				<view class="item" v-for="(item,index) in leftArray" :key="index" @tap="leftTap" :data-index="index">
					<text class="item-btn" :class="{ 'active':index==leftIndex }">{{item.name}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="main">
			<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }" @scroll="mainScroll" :scroll-into-view="scrollInto"
			 scroll-with-animation="true" @touchstart="mainTouch" id="scroll-el">
				<block v-for="(item,index) in mainArray" :key="index">
					<view class="item" :id="'item-'+index">
						<view class="title">
							<view>{{item.title}}</view>
						</view>
						<view class="goods" v-for="(item2,index2) in item.list" :key="index2">
							<image :src="item2.pic" mode=""></image>
							<view>
								<view>{{item2.name}}</view>
								<view class="describe">第{{index2+1}}个商品的描述内容</view>
								<view class="money">{{item2.minPrice}}</view>
							</view>
						</view>
					</view>
				</block>

			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from '../../static/js/ajax.js'
	export default {
		data() {
			return {
				scrollHeight: '500px',
				leftArray: [],
				rightArray: [],
				mainArray: [],
				topArr: [],
				leftIndex: 0,
				isMainScroll: false,
				scrollInto: '',
				tipsTop: '0px'
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					/* 设置当前滚动容器的高，若非窗口的告诉，请自行修改 */
					this.scrollHeight = `${res.windowHeight}px`;
					console.log('gaodu', res.windowHeight)
				}
			});
		},
		computed: {

		},
		mounted() {
			this.LeftMenu();
			this.RightGetData();
		},
		methods: {
			// 获取左侧菜单栏数据
			LeftMenu() {
				request({
					url: '/shop/goods/category/all',
					method: 'GET',
					data: {}
				}).then(res => {
					if (res.statusCode == 200) {
						this.leftArray = res.data.data
					} else {}
					this.getListData();
				})

			},
			// 获取右侧商品数据
			RightGetData() {
				request({
					url: '/shop/goods/list',
					method: 'GET',
					data: {}
				}).then(res => {
					if (res.statusCode == 200) {
						this.rightArray = res.data.data
						console.log(this.rightArray)
					} else {}
				})
			},

			/* 获取列表数据 */
			getListData() {
				/* 因无真实数据，当前方法模拟数据 */
				let main = [];

				for (let i = 0; i < this.leftArray.length; i++) {
					let list = [];
					for (let j = 0; j < this.rightArray.length; j++) {
						if (this.leftArray[i].id == this.rightArray[j].categoryId) {
							list.push(this.rightArray[j]);
						}
					}

					main.push({
						title: this.leftArray[i].name,
						list
					})
					// console.log([...new Set(main.title)] )

				}
				this.mainArray = main;

				this.$nextTick(() => {
					this.getElementTop();
				});
			},
			//获取距离顶部的高度
			getScrollTop(selector) {
				return new Promise((resolve, reject) => {
					let query = uni.createSelectorQuery().in(this);
					query.select(selector + '').boundingClientRect(data => {
						resolve(data.top)
					}).exec();
				})
			},
			/* 获取元素顶部信息 */
			async getElementTop() {
				/* Promise 对象数组 */
				let p_arr = [];

				/* 遍历数据，创建相应的 Promise 数组数据 */
				for (let i = 0; i < this.mainArray.length; i++) {
					const resu = await this.getScrollTop(`#item-${i}`)
					p_arr.push(resu)
				}

				// console.log('p_arr', p_arr)

				/* 主区域滚动容器的顶部距离 */
				this.getScrollTop("#scroll-el").then((res) => {

					let top = res;
					// #ifdef H5
					top += 43; //因固定提示块的需求，H5的默认标题栏是44px
					// #endif

					/* 所有节点信息返回后调用该方法 */
					Promise.all(p_arr).then((data) => {
						console.log('滚动', data)
						this.tipsTop = `${data}px`;
						this.topArr = data;
					});
				})
			},

			/* 主区域滚动监听 */
			mainScroll(e) {
				if (!this.isMainScroll) {
					return;
				}
				let top = e.detail.scrollTop;
				let index = -1;

				if (top >= this.topArr[this.topArr.length - 1]) {
					index = this.topArr.length - 1;
				} else {
					index = this.topArr.findIndex((item, index) => {
						return this.topArr[index + 1] >= top;
					});
				}
				this.leftIndex = (index < 0 ? 0 : index);
			},
			/* 主区域触摸 */
			mainTouch() {
				this.isMainScroll = true;
			},
			/* 左侧导航点击 */
			leftTap(e) {
				let index = e.currentTarget.dataset.index;
				this.isMainScroll = false;
				this.leftIndex = Number(index);
				this.scrollInto = `item-${index}`;
			}
		}
	}
</script>

<style lang="scss">
	.list_box {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		background: #eee;
		font-size: 28rpx;

		.left {
			width: 200rpx;
			background-color: #fff;
			// line-height: 80rpx;
			box-sizing: border-box;
			font-size: 28rpx;


			.item {
				// padding-left: 20rpx;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 20rpx 0;
				color:#666;

				.item-btn {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 160rpx;
					height: 50rpx;
					border-radius: 50rpx;
					transition: 0.3s;
				}

				.active {
					color: #fff;
					background: linear-gradient(to right, #c32e4a, #d80421 );
				}

				&:not(:first-child) {
					margin-top: 1px;

					&::after {
						content: '';
						display: block;
						height: 0;
						border-top: #d6d6d6 solid 1px;
						width: 620upx;
						position: absolute;
						top: -1px;
						right: 0;
						transform: scaleY(0.5);
						/* 1px像素 */
					}
				}

				// &.active,
				// &:active {
				// 	color: #42b983;
				// 	background-color: red;
				// }
			}
		}

		.main {
			background-color: #fff;
			margin-left: 20rpx;
			// padding-left: 20rpx;
			width: 0;
			flex-grow: 1;
			box-sizing: border-box;

			.tips {
				line-height: 64rpx;
				font-size: 24rpx;
				font-weight: bold;
				color: #666;
				height: 64rpx;
				position: fixed;
				top: 44px;
				right: 0;
				width: 530rpx;
				z-index: 10;
				background-color: #fff;
				padding-left: 10rpx;
			}

			.title {
				line-height: 64rpx;
				position: relative;
				font-size: 24rpx;
				font-weight: bold;
				color: #666;
				height: 64rpx;
			}

			.item {
				padding: 0 20rpx 20rpx;
				box-sizing: border-box;
				// margin-bottom: 20rpx;
			}

			.goods {
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				justify-content: flex-start;
				align-items: center;
				align-content: center;
				margin-bottom: 20rpx;

				&>image {
					width: 120rpx;
					height: 120rpx;
					margin-right: 16rpx;
				}

				.describe {
					font-size: 24rpx;
					color: #999;
				}

				.money {
					font-size: 24rpx;
					color: #efba21;
				}
			}
			.goods:last-child{
				margin-bottom: 0;
			}
		}
	}
</style>
