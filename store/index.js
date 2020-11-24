import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		sortIndex:-1,
		CollectionList: [], // 收藏列表
		ShoppingList: [], // 购物车列表
		SortListData:[],// 分类列表数据
		OrderListData:[],// 订单列表
	},
	mutations: {
		// 分类菜单点击
		ClikSortIndex(state,data){
			state.sortIndex = data
		},
		
		// 收藏列表方法
		VuexCollectionList(state, data) {
			state.CollectionList = data // 赋值
			state.CollectionList.forEach((item,index)=>{
				if(!item.isCheck){
					state.CollectionList.splice(index,1)
				}
			})
			
			// console.log(state.CollectionList)
		},
		
		// 购物车列表
		VuexShoppingList(state,data) {
			state.ShoppingList = data // 赋值
		},
		// 分类类列表数据
		VuexSortListData(state,data){
			state.SortListData = data // 赋值
		},
		// 订单列表
		VuexOrderList(state,data){
			state.OrderListData = data // 赋值
		}


	},
	actions: {}
})
export default store
