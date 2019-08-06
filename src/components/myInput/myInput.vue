<template>
	<label class="label">
		<view class="titleBox flex mainJustify crossCenter">
			<text class="labelName">{{labelName}}</text>
			<slot name="boxRightContent"></slot>
		</view>
		<view class="inputBox flex crossCenter">
			<slot name="boxLeftContent"></slot>
			<!-- #ifndef H5 -->
			<input type="text" :name="bindName" v-model="value">
			<!-- #endif -->
			
			<!-- #ifdef H5 -->
			<input type="text" :name="bindName">
			<!-- #endif -->
		</view>
	</label>
</template>

<script>
	export default {
		behaviors: ['uni://form-field'],
		props:{
			labelName:{
				type:String,
				default:"labelName"
			},
			isPassword:{
				type:Boolean,
				default:false
			},
			bindName:{//支付宝小程序必须
				type:String,
				required:true
			}
		}
	}
</script>

<style lang="scss">
	@import "./myInput"
</style>
