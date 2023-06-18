<template>
<div>
  <Header></Header>
  <router-view></router-view>
  <!-- 利用v-show显示隐藏底部菜单 -->
  <Footer v-show="$route.meta.show"></Footer>
</div>
</template>

<script>

import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name:'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    //通知vue获取数据，存储仓库中,在app组件中只执行一次
     this.$store.dispatch("categoryList");
    // //获取用户信息在首页展示
    // this.$store.dispatch('getUserInfo')
  }
}
</script>

<style>

</style>