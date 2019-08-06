import Vue from 'vue'
import Router from "uni-simple-router"

Vue.use(Router);

const router = new Router({
	routes:[
		{
			"path": "/pages/index/index",
			"name": "index"
		},
		{
			"path": "/pages/apiList/apiList",
			"name": "apiList"
		}
	]
})

export default router