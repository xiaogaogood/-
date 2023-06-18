import { reqAddOrUpdateShopCart, reqGoodsInfo, } from '@/api'
//封装游客身份模块
import {getUUID} from '@/utils/uuid_token'
export default {
    state: {
        goodInfo:{},
        //游客临时身份
        uuid_token:getUUID()
    },
    actions: {
        //获取产品信息
        async getGoodInfo({ commit },skuId) {
            let result = await reqGoodsInfo(skuId)
            if(result.code == 200) {
                commit('GETGOODINFO',result.data)
            }
        },
        //将产品添加到购物车中
        async reqAddOrUpdateShopCart({commit},{skuId,skuNum}) {
            //加入购物车以后（发请求），前台将参数带给服务器
            //服务器写入数据成功，并没有返回其他数据，只是返回code=200，代表成功（没必要存储）
             let result = await reqAddOrUpdateShopCart(skuId,skuNum)
             if(result.code ==200 ) {
                return 'ok'
             }else {
                return Promise.reject(new Error('faile'))
             }
        }
    },
    mutations: {
        GETGOODINFO(state,goodInfo) {
            state.goodInfo = goodInfo
        }
    },
    getters: {
        //路径导航数据简化categoryView
        categoryView(state) {
            return state.goodInfo.categoryView || {}
        },
        //产品信息数据
        skuInfo(state){
            return state.goodInfo.skuInfo || {}
        },
        //产品售卖属性
        spuSaleAttrList(state) {
            return state.goodInfo.spuSaleAttrList || []
        }
    }
}