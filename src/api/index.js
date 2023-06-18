//当前模块：所有API进行统一管理
import requests from "./ajax";
import mockRequests from './mockAjax'
//三级联动接口
///api/product/getBaseCategoryList   get    无参数
//axios发送请求，返回结果为promise对象
export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get',
})

//获取banner（首页轮播图的接口）
export const reqGetBannerList = () => mockRequests.get('/banner')

export const reqFloorList = () => mockRequests.get('/floor')

//获取搜索模块数据 /api/list post 需要参数
//当前这个接口，给服务器传递的参数params至少是个空对象
export const reqGetSearchInfo = (params) => {
   return requests({
        url: '/list',
        method: 'post',
        data: params
    })
}

//获取产品详情的接口 /api/item/{ skuId }  Get  
export const reqGoodsInfo = (skuId)=> {
   return requests({
        url:`/item/${ skuId }`,
        method:'get'
    })
}

//  /api/cart/addToCart/{ skuId }/{ skuNum }
//将产品添加到购物车（或者更新某一个产品的个数0）
export const reqAddOrUpdateShopCart = (skuId,skuNum) => {
    return requests({
        url:`/cart/addToCart/${ skuId }/${ skuNum }`,
        method:'post'
    })
}

// /api/cart/cartList  GET
//获取购物车列表的接口
export const reqCarList = () => {
    return requests({
        url:'/cart/cartList',
        method:'get'
    })
}

//  /api/cart/deleteCart/{skuId}   DELETE
//删除购物车产品的接口
export const reqDeleteCartById = (skuId) => {
    return requests({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}

//  /api/cart/checkCart/{skuId}/{isChecked}    get
//  修改商品的选中状态
export const reqUpdateCheckedById = (skuId,isChecked) => {
    return requests({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}

//获取验证码接口
//  /api/user/passport/sendCode/{phone}   get
export const reqGetCode = (phone)=> {
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:'get'
    })
}

//用户注册接口
// /api/user/passport/register   post
export const reqUserRegister =(data) =>{
    return requests({
        url:'/user/passport/register',
        data,
        method:'post'
    })
}

//登录接口
// /api/user/passport/login  post   phone password
export const reqUserLogin = (data) => {
    return requests({
        url:'/user/passport/login',
        data,
        method:'post'
    })
}

//获取用户的信息（需要带着用户的token向服务器要用户的信息）
//   /api/user/passport/auth/getUserInfo     get
export const reqUserInfo =() => {
    return requests({
        url:'/user/passport/auth/getUserInfo',
        method:'get'
    })
}

//退出登录    /api/user/passport/logout    get
export const reqLogout = () => {
    return requests({
        url:'/user/passport/logout',
        method:'get'
    })
}

//获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList     get
export const reqAddressInfo = () => {
    return requests({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get'
    })
}


//  /api/order/auth/trade   get
//获取商品清单
export const reqOrderInfo = () => {
    return requests({
        url:'/order/auth/trade',
        method:'get'
    })
}

// /api/order/auth/submitOrder?tradeNo={tradeNo}  post
//提交订单接口
export const reqSubmitOrder = (tradeNo,data) => {
    return requests({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method:'post'
    })
}
 
//  /api/payment/weixin/createNative/{orderId}    get
//获取支付信息
export const reqPayInfo = (orderId) => {
    return requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}

// /api/payment/weixin/queryPayStatus/{orderId}
//获取支付订单状态
export const reqPayStatus = (orderId) => {
    return requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}

// /api/order/auth/{page}/{limit}  get
//获取我的订单列表
export const reqMyOrderList = (page,limit) => {
    return requests({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
}