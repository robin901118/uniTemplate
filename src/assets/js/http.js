/**
 * 通用请求方法
 * **/

import store from "../../store"

export default class Http {
	constructor(arg) {
		this.baseUrl = store.state.baseUrl
	}
	
	//错误码集合
	statusCodes = {
        400: '错误请求',
        403: '拒绝访问',
        404: '啊哦,接口404...',
        405: '请求方法未允许',
        408: '请求超时',
        500: '服务器端出错',
        501: '网络未实现',
        502: '网络错误',
        503: '服务不可用',
        504: '网络超时',
        505: 'http版本不支持该请求'
	}
	

	/**
	 * 错误弹窗
	 * error 错误信息
	 * confirmCallBack 点击模态框确定之后的回调
	 * **/
	errorPop(error, confirmCallBack) {
		let obj = {
			title: '接口提示',
			content: error,
			showCancel: false,
			confirmText: '确认'
		};
		obj.success = (res) => res.confirm && confirmCallBack && confirmCallBack(); //回调;
		obj.fail = () => console.log("modalFail");
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
					let errorMsg = "";
					
					//接口错误拦截(非200错误码拦截)
					self.statusCodes.hasOwnProperty(res['statusCode'])
					&& (errorMsg = self.statusCodes[res['statusCode']]);
					
					let result = res['data'];
					if (errorMsg || !result.hasOwnProperty('_code')) {
						self.errorPop(errorMsg || '无法获取到_code');
						reject(false);
						return;
					}
					
					switch(result['_code']){
						
						//请求成功
						case '99999':
							result.hasOwnProperty('_result') ? resolve(result['_result']) : resolve(true);
							break;
						
						//未登录
						case'20001':
							self.errorPop(result['_msg'], function() {
								console.log('登出');
							});
							reject(false);
							break;
						
						default:
							self.errorPop(result['_msg']);
							reject(false);
					}
				},
				fail: rej => {
					//请求失败
					console.log(`接口请求失败:${rej}`);
					console.log(rej['errMsg']);
					reject(false);
				},
				complete: () => loading && uni.hideNavigationBarLoading() //关闭loading
			})
		})
	}
}
