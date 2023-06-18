import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
//三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
//全局注册组件，第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)

//轮播图全局组件
import Carsouel from '@/components/Carsouel'
Vue.component(Carsouel.name,Carsouel)

//分页器全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)

//全局引入elemnt-ui
import { Button, MessageBox ,FormItem,Form,Input} from 'element-ui';
//Vue.component()
Vue.component(Button.name,Button)
Vue.use( FormItem)
Vue.use( Form)
Vue.use( Input)
Vue.use( Button)
//element-ui组测组件时候，还有一种写法，挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入mock模拟数据
import '@/mock/mockServe'


//统一引入接口api文件夹里面全部请求函数
import * as API from '@/api'


//引入swiper样式
import 'swiper/css/swiper.min.css'

//引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
//引入
import logo from '@/assets/logo.png'
Vue.use(VueLazyload,{
  //懒加载默认图片
  loading:logo
})

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this,
    Vue.prototype.$API = API
  }
}).$mount('#app')
