<template>
	<!-- <view class="ajaxloader3">
		<view class="outer"></view>
		<view class="inner"></view>
	</view> -->
	<!-- <div class="loading3">
		<div class="demo3"></div>
		<div class="demo3"></div>
		<div class="demo3"></div>
		<div class="demo3"></div>
		<div class="demo3"></div>
		<div class="demo3"></div>
		<div class="demo3"></div>
		<div class="demo3"></div>
	</div> -->

	<div class="loading3">
		<div class="circle circle1">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
		<div class="circle circle2">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
		<div class="circle circle3">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>


</template>

<script>
</script>

<style scoped lang="scss">
	// .ajaxloader3 {
	// 	margin: 0 auto;

	// 	.outer {
	// 		border: 5px solid #324B78;
	// 		opacity: .9;
	// 		border-right-color: transparent;
	// 		border-left-color: transparent;
	// 		width: 50px;
	// 		height: 50px;
	// 		margin: 0 auto;
	// 		border-radius: 50%;
	// 		-webkit-box-shadow: 0 0 35px rgba(0, 76, 61, 0.5);
	// 		-moz-box-shadow: 0 0 35px rgba(0, 76, 61, 0.5);
	// 		box-shadow: 0 0 35px rgba(0, 76, 61, 0.5);
	// 		-webkit-animation: spin-pulse 1s linear infinite normal;
	// 		-moz-animation: spin-pulse 1s linear infinite normal;
	// 		-ms-animation: spin-pulse 1s linear infinite normal;
	// 		animation: spin-pulse 1s linear infinite normal;
	// 		-webkit-animation-delay: 0;
	// 		-moz-animation-delay: 0;
	// 		-o-animation-delay: 0;
	// 		animation-delay: 0;
	// 	}

	// 	.inner {
	// 		border: 5px solid #324B78;
	// 		opacity: .9;
	// 		border-left-color: transparent;
	// 		border-right-color: transparent;
	// 		border-radius: 50%;
	// 		-webkit-box-shadow: 0 0 15px rgba(0, 76, 61, 0.5);
	// 		-moz-box-shadow: 0 0 15px rgba(0, 76, 61, 0.5);
	// 		box-shadow: 0 0 15px rgba(0, 76, 61, 0.5);
	// 		width: 30px;
	// 		height: 30px;
	// 		position: relative;
	// 		top: -50px;
	// 		margin: 0 auto;
	// 		-webkit-animation: spin-right 1s linear infinite normal;
	// 		-moz-animation: spin-right 1s linear infinite normal;
	// 		-ms-animation: spin-right 1s linear infinite normal;
	// 		animation: spin-right 1s linear infinite normal;
	// 		-webkit-animation-delay: 0;
	// 		-moz-animation-delay: 0;
	// 		-o-animation-delay: 0;
	// 		animation-delay: 0;
	// 	}
	// }

	// @keyframes spin-pulse {
	// 	from {
	// 		transform: rotate(160deg);
	// 		opacity: 0;
	// 		box-shadow: 0 0 1px rgba(0, 61, 76, 0.9);
	// 	}

	// 	50% {
	// 		transform: rotate(145deg);
	// 		opacity: 1;
	// 	}

	// 	to {
	// 		transform: rotate(-320deg);
	// 		opacity: 0;
	// 	}
	// }

	// @-webkit-keyframes spin-pulse {
	// 	from {
	// 		-webkit-transform: rotate(160deg);
	// 		opacity: 0;
	// 		box-shadow: 0 0 1px rgba(0, 61, 76, 0.9);
	// 	}

	// 	50% {
	// 		-webkit-transform: rotate(145deg);
	// 		opacity: 1;
	// 	}

	// 	to {
	// 		-webkit-transform: rotate(-320deg);
	// 		opacity: 0;
	// 	}
	// }
	// @keyframes spin-right {
	//   from {
	//     transform: rotate(0deg);
	//     opacity: 0.2;
	//   }
	//   50% {
	//     transform: rotate(180deg);
	//     opacity: 1.0;
	//   }
	//   to {
	//     transform: rotate(360deg);
	//     opacity: 0.2;
	//   }
	// }


	// @-webkit-keyframes spin-right {
	//   from {
	//     -webkit-transform: rotate(0deg);
	//     opacity: 0.2;
	//   }
	//   50% {
	//     -webkit-transform: rotate(180deg);
	//     opacity: 1.0;
	//   }
	//   to {
	//     -webkit-transform: rotate(360deg);
	//     opacity: 0.2;
	//   }
	// }

	// .loading3 {
	// 	position: relative;
	// 	width: 50px;
	// 	height: 50px;

	// 	.demo3 {
	// 		width: 4px;
	// 		height: 4px;
	// 		border-radius: 2px;
	// 		background: #324B78;
	// 		// background: #68b2ce;
	// 		position: absolute;
	// 		animation: demo3 linear 1s infinite;
	// 		-webkit-animation: demo3 linear 1s infinite;
	// 	}

	// 	.demo3:nth-child(1) {
	// 		left: 24px;
	// 		top: 2px;
	// 		animation-delay: 0s;
	// 	}

	// 	.demo3:nth-child(2) {
	// 		left: 40px;
	// 		top: 8px;
	// 		animation-delay: 0.1s;
	// 	}

	// 	.demo3:nth-child(3) {
	// 		left: 47px;
	// 		top: 24px;
	// 		animation-delay: 0.1s;
	// 	}

	// 	.demo3:nth-child(4) {
	// 		left: 40px;
	// 		top: 40px;
	// 		animation-delay: 0.2s;
	// 	}

	// 	.demo3:nth-child(5) {
	// 		left: 24px;
	// 		top: 47px;
	// 		animation-delay: 0.4s;
	// 	}

	// 	.demo3:nth-child(6) {
	// 		left: 8px;
	// 		top: 40px;
	// 		animation-delay: 0.5s;
	// 	}

	// 	.demo3:nth-child(7) {
	// 		left: 2px;
	// 		top: 24px;
	// 		animation-delay: 0.6s;
	// 	}

	// 	.demo3:nth-child(8) {
	// 		left: 8px;
	// 		top: 8px;
	// 		animation-delay: 0.7s;
	// 	}
	// }

	// @keyframes demo3 {
	// 	0%,
	// 	40%,
	// 	100% {
	// 		transform: scale(1);
	// 	}

	// 	20% {
	// 		transform: scale(2);
	// 	}
	// }

	// @-webkit-keyframes demo3 {

	// 	0%,
	// 	40%,
	// 	100% {
	// 		transform: scale(1);
	// 	}

	// 	20% {
	// 		transform: scale(3);
	// 	}
	// }


	.loading3 {
		width: 80rpx;
		height: 80rpx;
		// margin: 80rpx auto;
		position: relative;

		.circle {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}

		.circle span {
			width: 8px;
			height: 8px;
			display: inline-block;
			background: #324B78;
			border-radius: 100%;
			position: absolute;
			-webkit-animation: mycircle 1.2s infinite ease-in-out;
			animation: mycircle 1.2s infinite ease-in-out;
			-webkit-animation-fill-mode: both;
			animation-fill-mode: both;
		}

		.circle2 {
			-webkit-transform: rotateZ(45deg);
			transform: rotateZ(45deg);
		}

		.circle3 {
			-webkit-transform: rotateZ(90deg);
			transform: rotateZ(90deg);
		}

		.circle>span:nth-child(1) {
			top: 0;
			left: 0;
		}

		.circle>span:nth-child(2) {
			top: 0;
			right: 0;
		}

		.circle>span:nth-child(3) {
			right: 0;
			bottom: 0;
		}

		.circle>span:nth-child(4) {
			left: 0;
			bottom: 0;
		}

		.circle2>span:nth-child(1) {
			-webkit-animation-delay: -1.1s;
			animation-delay: -1.1s;
		}

		.circle3>span:nth-child(1) {
			-webkit-animation-delay: -1.0s;
			animation-delay: -1.0s;
		}

		.circle1>span:nth-child(2) {
			-webkit-animation-delay: -0.9s;
			animation-delay: -0.9s;
		}

		.circle2>span:nth-child(2) {
			-webkit-animation-delay: -0.8s;
			animation-delay: -0.8s;
		}

		.circle3>span:nth-child(2) {
			-webkit-animation-delay: -0.7s;
			animation-delay: -0.7s;
		}

		.circle1>span:nth-child(3) {
			-webkit-animation-delay: -0.6s;
			animation-delay: -0.6s;
		}

		.circle2>span:nth-child(3) {
			-webkit-animation-delay: -0.7s;
			animation-delay: -0.7s;
		}

		.circle3>span:nth-child(3) {
			-webkit-animation-delay: -0.4s;
			animation-delay: -0.4s;
		}

		.circle1>span:nth-child(4) {
			-webkit-animation-delay: -0.3s;
			animation-delay: -0.3s;
		}

		.circle2>span:nth-child(4) {
			-webkit-animation-delay: -0.2s;
			animation-delay: -0.2s;
		}

		.circle3>span:nth-child(4) {
			-webkit-animation-delay: -0.1s;
			animation-delay: -0.1s;
		}
	}

	@-webkit-keyframes mycircle {
		0% {
			transform: scale(0.0);
		}

		40% {
			transform: scale(1.0);
		}

		80% {
			transform: scale(0.0);
		}

		100% {
			transform: scale(0.0);
		}
	}

	@keyframes mycircle {
		0% {
			transform: scale(0.0);
		}

		40% {
			transform: scale(1.0);
		}

		80% {
			transform: scale(0.0);
		}

		100% {
			transform: scale(0.0);
		}
	}
</style>
