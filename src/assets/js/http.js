/**
 * 通用请求方法
 * **/

import store from "../../store"

export default class Http {
	constructor(arg) {
		this.baseUrl = store.state.baseUrl
	}

	/**
	 * 错误弹窗
	 * error 错误信息
	 * confirmCallBack 点击模态框确定之后的回调
	 * **/
	errorPop(error, confirmCallBack) {
		let obj = {
			title: '温馨提示',
			content: error,
			showCancel: false,
			confirmText: '我知道了'
		};
		obj.success = (res) => {
			if (res.confirm && confirmCallBack) {
				confirmCallBack(); //回调
			}
		};
		obj.fail = () => {
			console.log("modalFail");
		};
		uni.showModal(obj);
	}


	/**
	 * +++++++++++++++++++++++++++++++++++
	 * @param url 请求链接
	 * @param data 请求参数
	 * @param loading 是否需要loading default false
	 * @param method 请求方式 default 'get'
	 * +++++++++++++++++++++++++++++++++++
	 * */
	ajax({
		url = "/api",
		data,
		loading,
		method = 'GET'
	}) {
		const self = this;
		return new Promise((resolve, reject) => {
			//请求头配置
			let headerConfig = {
				'content-type': 'application/x-www-form-urlencoded',
			};

			//微信无法设置cookie，所以一般是存储在缓存内的
			// #ifdef MP-WEIXIN
			headerConfig['cookie'] = uni.getStorageSync('SESSION')
			// #endif

			loading && uni.showNavigationBarLoading();

			//开始请求
			uni.request({
				url: self['baseUrl'] + url,
				data: data,
				method: method,
				header: headerConfig,
				success: res => {
					//请求成功
					let result = res['data'];

					if (!result.hasOwnProperty('_code')) {
						self.errorPop('后台维护中,请稍后再试');
						reject(false);
						return;
					}
					if (result['_code'] === '99999') {
						result.hasOwnProperty('_result') ? resolve(result['_result']) : resolve(true);
					} else if (result['_code'] === '20001') {
						//未登录状态
						self.errorPop(result['_msg'], function() {
							// wepy.$instance.publicLoginOut();//登出操作
							console.log('登出');
						});
						reject(false);
					} else {
						self.errorPop(result['_msg']);
						reject(false);
					}
				},
				fail: rej => {
					//请求失败
					console.log(rej['errMsg']);
					reject(false);
				},
				complete: () => {
					//关闭loading
					loading && uni.hideNavigationBarLoading();
				}
			})
		})
	}
}
