<template>
	<view class="main">
		<button type="primary" @click="testVuex">测试一下vuex</button>
		<button type="primary" @click="testRequest">测试一下请求</button>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	import Http from "../../assets/js/http.js"
	
	export default {
		data() {
			return {}
		},
		computed: { ...mapState(["baseUrl"])},
		methods: {
			/**
			 * 测试vuex
			 * **/
			testVuex() {
				console.log(this.baseUrl);
				this.$store.commit("CONSOLE_LOG", "vuex action");
			},
			
			/**
			 * 测试请求
			 * **/
			async testRequest() {
				try {
					const result = await new Http().ajax({
						data: {
							action: "111"
						},
						method: "POST"
					});
					console.log("请求结束");
					console.log("请求结果：",result);
				} catch (e) {
					//TODO handle the exception
					console.log(e);
					return false;
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "./apiList"
</style>
