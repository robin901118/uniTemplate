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
				<button slot="boxRightContent" class="togglePsw" size="mini" @click="togglePsw">
					{{showPsw ? "隐藏" : "显示"}}
				</button>
			</myInput>
			<view class="nullFloor"></view>
			<view class="flex mainRight">
				<button class="forgetBtn" size="mini">忘记密码？</button>
			</view>
			<!-- 已授权 -->
			<template v-if="isAuthed">
				<button
				formType="submit"
				class="loginBtn">
				<!-- #ifdef MP-WEIXIN -->
				微信登录
				<!-- #endif -->
				
				<!-- #ifdef MP-ALIPAY -->
				支付宝登录
				<!-- #endif -->
				</button>
			</template>
			
			<!-- 未授权 -->
			<template v-else>
				<!-- #ifdef MP-WEIXIN -->
				<button
				class="loginBtn"
				@getuserinfo="getUserInfo"
				open-type="getUserInfo">微信授权</button>
				<!-- #endif -->
				
				<!-- #ifdef MP-ALIPAY -->
				<button
				class="loginBtn"
				@click="getUserInfo">支付宝授权</button>
				<!-- #endif -->
			</template>
			
			<!-- #ifdef H5 -->
			<button
			class="loginBtn"
			formType="submit">登录</button>
			<!-- #endif -->
		</form>
	</view>
</template>

<script>
	import myInput from "../../components/myInput/myInput";

	export default {
		data() {
			return {
				showPsw: false,
				isAuthed:false,//是否授权过
				imgCode:""
			}
		},
		components: {
			myInput
		},
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
					this.$Router.push('/pages/apiList/apiList');
				} else {
					uni.showToast({
						title: '电话和密码不能为空',
						icon: "none",
						duration: 2000
					});
				}
			},
			

			/**
			 * 获取用户信息
			 * **/
			getUserInfo(e) {
				//微信小程序授权
				// #ifdef MP-WEIXIN
				if(e.detail.hasOwnProperty('userInfo')){
					uni.showToast({
						title: '授权成功',
						icon: "success",
						duration: 2000
					});
					this.isAuthed = true;
				}else{
					uni.showToast({
						title: '您拒绝了授权',
						icon: "none",
						duration: 2000
					});
				}
				// #endif
				
				//支付宝小程序授权
				// #ifdef MP-ALIPAY
				my.getAuthCode({
				  scopes: 'auth_user',
				  success: (res) => {
					my.getAuthUserInfo({
					  success: (userInfo) => {
						  console.log('获取授权成功');
						  // console.log('userInfo',userInfo);
						  this.isAuthed = true;
					  }
					});
				  },
				});
				// #endif
			},
		
		},
		mounted() {
			// 微信获取授权列表
			// #ifdef MP-WEIXIN
			uni.getSetting({
				success: res => {
					this.isAuthed = res.authSetting['scope.userInfo'];
				},
				fail:() => {
					console.log('失败')
				}
			});
			// #endif
			
			//支付宝小程序
			// #ifdef MP-ALIPAY
			my.getSetting({
				success:res=>{
					console.log('授权列表',res.authSetting['userInfo']);
					this.isAuthed = res.authSetting['userInfo']
				}
			})
			// #endif
		}
	}
</script>

<style lang="scss">
	@import "./index";
</style>
