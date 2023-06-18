<template>
  <div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
      <!-- 轮播图 -->
      <div
        class="swiper-slide"
        v-for="carousel in List"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carsouel",
  props:['List'],
  watch: {
    List: {
      //立即监听
      //为什么watch监听不到list，因为数据从来没有发生变化（数据是父亲给的）
      immediate: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          var mySwiper = new Swiper(".swiper-container", {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>