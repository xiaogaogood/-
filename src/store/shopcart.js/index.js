import {reqCarList,reqDeleteCartById,reqUpdateCheckedById} from '@/api'
export default {
    //state仓库存储数据地方
    state: {
        cartList:[]
    },
    //mutations：修改state的唯一手段（操作数据）
    mutations: {
        GETCARTLIST(state,cartList) {
            state.cartList = cartList
        }
     
    },
    //actions：书写业务逻辑
    actions: {
        //获取购物车列表数据
       async getCartList({commit}) {
        let result = await reqCarList()
        console.log(result,'购物车列表后台返回数据');
        if(result.code == 200) {
            commit('GETCARTLIST',result.data)
        }
        
        },
        //删除购物出某一个产品
        async deleteCartListBySkuId({commit},skuId) {
            let result = await reqDeleteCartById(skuId)
            if(result.code==200) {
                return 'ok'
            }else {
                return Promise.reject(new Error('faile'))
            }
        },
        //修改购物车某一个产品的选中状态
        async updateCheckedById({commit},{skuId,isChecked}) {
          let result = await reqUpdateCheckedById(skuId,isChecked)
          if(result.code==200) {
            return 'ok'
           }else {
            return Promise.reject(new Error('faile'))
           }
        },
        //删除全部勾选的产品
        deleteAllCheckedCart({dispatch,getters}) {
            //获取购物车全部产品(是一个数组)
            let PromiseAll = []
            getters.cartList.cartInfoList.forEach(item=> {
              let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId',item.skuId):''
              //将每一次返回的promise添加到数组中
              PromiseAll.push(promise)
            })
            //知道全部promise成功 返回结果为成功
            return Promise.all(PromiseAll)
        },
        //修改全部产品的状态
        updateAllCartIsChecked({dispatch,state},isChecked) {
            let promiseAll =[]
            state.cartList[0].cartInfoList.forEach(item => {
              let promise =  dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
              promiseAll.push(promise)
            })
            return Promise.all(promiseAll)
        }
    },
    //getters：理解为计算属性 简化仓库中得数据
    getters: {
        cartList(state) {
            return state.cartList[0] || {}
        }
    }
}