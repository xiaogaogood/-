<template>
  <div>
    <!-- 三级联动 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <like></like>
    <Floor v-for="(floor) in floorList" :key="floor.id" :List="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'
export default {
    name:'',
    components: {
        ListContainer,Recommend,Rank,Like,Floor,Brand
    },
    mounted() {
      //派发action 获取floor组件的数据
      this.$store.dispatch('getFloorList')
      // //获取用户信息在首页展示
      // this.$store.dispatch('getUserInfo')
    },
    computed:{
      ...mapState({
        floorList: state=> state.home.floorList
      })
    }
}
</script>

<style>

</style>