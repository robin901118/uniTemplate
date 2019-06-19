<template>
	<view class="content">
		<view class="head">
			<image src="/static/bg.png" mode="scaleToFill" class="bgImg" />
			<image src="/static/logo.png" mode="scaleToFill" class="logo" />
			<button size="mini" class="registerBtn">注册</button>
		</view>

		<form class="form" @submit="loginSubmit">
			<myInput name="tel" bindName="tel" labelName="电话">
				<text slot="boxLeftContent" class="telCode">+86</text>
			</myInput>
			<view class="nullFloor"></view>
			<myInput name="password" bindName="password" labelName="密码" :isPassword="showPsw">
				<button
				slot="boxRightContent"
				class="togglePsw"
				size="mini"
				@click="togglePsw">
				{{showPsw ? "隐藏" : "显示"}}
				</button>
			</myInput>
			<view class="nullFloor"></view>
			<view class="flex mainRight">
				<button class="forgetBtn" size="mini">忘记密码？</button>
			</view>
			<button formType="submit" class="loginBtn">登录</button>
		</form>
	</view>
</template>

<script>
	import myInput from "../../components/myInput/myInput";

	export default {
		data() {
			return {
				showPsw: false,
			}
		},
		components:{myInput},
		methods: {
			/**
			 * 密码显示隐藏
			 * **/
			togglePsw() {
				this.showPsw = !this.showPsw;
			},

			/** 
			 * 登录表单提交
			 * **/
			loginSubmit(e) {
				const val = e.detail.value;
				console.log(val);
				if (val.tel && val.password) {
					// 登录成功，跳转api列表页面
					uni.navigateTo({
						url: '/pages/apiList/apiList'
					});
				} else {
					uni.showToast({
						title: '登录失败',
						icon: "icon",
						duration: 2000
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "./index";
</style>
