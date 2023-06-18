import Vue from 'vue'
//引入路由插件
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//模块化管理
import routes from './routes'

//引入store
import store from '@/store'
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push，第一个参数往哪里跳转
//解决搜索多次点击报错问题
VueRouter.prototype.push = function(location,resolve,reject) {
    if(resolve && reject) {
        originPush.call(this,location,resolve,reject)
    }else {
        originPush.call(this,location,() =>{},() =>{})
    }
} 
//重写replace
VueRouter.prototype.replace = function(location,resolve,reject) {
    if(resolve && reject) {
        originReplace.call(this,location,resolve,reject)
    }else {
        originReplace.call(this,location,() =>{},() =>{})
    }
}

let router = new VueRouter({
    routes,
    scrollBehavior(to,from,savePosition) {
        //滚动条返回条返回位置
        return {y:0}
    }
})

//全局前置守卫(在路由跳转之间进行判断)
router.beforeEach(async(to,from,next) => {
    // next(path)放行到指定路由
    next()
    let token = store.state.user.token
    let name = store.state.user.userInfo.name  //空对象if判断永远是真
    if(token) {
        //用户已经登录 就不能去login 直接回到首页
        if(to.path == '/login') {
            next('/')  //回到home
        }else {
            //登录了去的不是login  是{home、detail、shopCart}
            //如果有用户信息
            if(name) {
                next()
            }else {
                //没有用户信息 派发action 让仓库存储用户信息
               try {
                await store.dispatch('getUserInfo')
                console.log('getUserInfo');
                //获取用户信息成功放行
                next()
               } catch (error) {
                //token失效了  清除已有token 从新注册
                   await store.dispatch('userLogout')
                   next('/login')
               }
            }
        }
    }else {
        //未登录  不能去交易 支付  个人中心
        let toPtah = to.path
        if(toPtah.indexOf('/trade')!= -1 || toPtah.indexOf('/pay')!= -1 || toPtah.indexOf('/center') != -1) {
            //如果点击我的订单直接跳转到登录界面  但是要携带我的订单地址传递到登录界面 点击登录后直接跳转到我的订单
            next('/login?redirect='+ toPtah)  //重定向
        }else {
            next()
        }
        
    }
})



export default router