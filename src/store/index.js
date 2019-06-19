import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations"
Vue.use(Vuex);


const state = {
	baseUrl:"https://www.easy-mock.com/mock/5c063e891a285344e0eeb035/api"//接口前缀
}

export default new Vuex.Store({
	state,
	mutations
})