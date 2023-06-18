//登录和注册的模块
import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo ,reqLogout } from "@/api"
//引入外部自定义函数 给token在封装
import { setToken ,getToken,removeToken} from "@/utils/token"
import { set } from "nprogress"
export default {
    state: {
        code: '',
        token:getToken(),
        userInfo:{}
    },
    actions: { 
        //获取验证码
        async getCode({ commit }, phone) {
            let result = await reqGetCode(phone)
            if (result.code == 200) {
                commit('GETCODE', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //用户注册
        async userRegister({commit},user) {
          let result =  await reqUserRegister(user)
          console.log(result);
          if(result.code == 200) {
            return 'ok'
          }else {
            return Promise.reject(new Error('faile'))
          }
        },
        //登录业务（token）
        async userLogin({commit},data) {
            let result = await reqUserLogin(data)
            console.log(result);
            if(result.code == 200) {
                commit('USERLOGIN',result.data.token)
                //持久化存储
                setToken(result.data.token)
                return 'ok'
              }else {
                return Promise.reject(new Error('faile'))
              }
        },
        //获取用户信息
        async getUserInfo({commit}) {
           let result = await reqUserInfo()
           if(result.code == 200) {
            commit('GETUSERINFO',result.data)
            return 'ok'
          }else {
            return Promise.reject(new Error('faile'))
          }
        },
        //退出登录
        async userLogout({commit}) {
         let result = await reqLogout()
         if(result.code == 200) {
          //action不能操作state
          commit('CLEAR')
          return 'ok'
         }else {
          return Promise.reject(new Error('faile'))
         }
        }
    },
    mutations: {
        //获取验证码
        GETCODE(state, code) {
            state.code = code
        },
        //
        USERLOGIN(state,token){
            state.token =token
        },
        GETUSERINFO(state,userInfo) {
            state.userInfo = userInfo
        },
        CLEAR(state) {
          state.token = '',
          state.userInfo = '',
          removeToken()
        }
        
    },
    getters: {

    }
}
