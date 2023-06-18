import { reqGetSearchInfo } from "@/api"
export default {
    //state仓库存储数据地方
    state: {
        searchList:{}
    },
    //mutations：修改state的唯一手段（操作数据）
    mutations: {
        GETSEARCHLIST(state,searchList) {
            state.searchList = searchList
        }

    },
    //actions：书写业务逻辑
    actions: {
        async getSearchList({ commit }, params = {}) {
            let result = await reqGetSearchInfo(params)
            if(result.code == 200) { 
                commit('GETSEARCHLIST',result.data)
            }
        }
    },
    //getters：理解为计算属性 简化仓库中得数据
    getters: {
        goodsList(state) {
            //假如没有网络 则返回数组
            return state.searchList.goodsList||[]
        },
        trademarkList(state) {
            return state.searchList.trademarkList||[]
        },
        attrsList(state) {
            return state.searchList.attrsList||[]
        }
    }
}