<template>
  <div class="type-nav" >
    <div class="container" :class="{ cur: currentIndex == index }">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all" >全部商品分类</h2>
       <transition name="sort">
         <div class="sort" v-show="show">
          <!-- 事件委派 -->
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item bo"
              v-for="(c1,index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)" >
                <!-- data-categoryName自定义属性 -->
                <a :data-categoryName = "c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
              </h3>
              <!-- 二级分类 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }">
                <div
                  class="subitem"
                  v-for="(c2) in c1.categoryChild"
                  :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <!-- 三级分类 --> 
                      <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
       </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入lodash插件（防抖节流）
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      index:'',
      show:true
    };
  },
  //组件挂在完毕，向服务器发请求
  mounted() {
    
    if(this.$route.path!='/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    //es6
    // changeIndex(index) {
    //   this.currentIndex = index
    // },
    //对象
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    leaveIndex() {
      this.currentIndex = -1;
      //是search组件时候执行
      if(this.$route.path!='/home') {
        this.show = false
      }
     
    },
    //进行路由跳转方法
    goSearch(event) {
      //获取的事件节点有一个属性dataset，可以获取节点的自定义属性与属性值 （属性均为小写）
      let element = event.target
      console.log(element.dataset);
      let {categoryname,category1id,category2id,category3id} = element.dataset
      //判断是否有categoryname（是否是a标签）
      if(categoryname) {
        //整理路由跳转参数
        let location ={name:'search'}
          let query = { categoryName: categoryname }
        if(category1id) {
          query.category1Id = category1id
        }else if(category2id) {
          query.category2Id = category2id
        }else if(category3id) {
          query.category3Id = category3id

        }
        //判断：如果路由跳转的时候，带有params参数，必须传递过去
        if(this.$route.params) {
          location.params =this.$route.params
          location.query = query
        this.$router.push(location)
        }
        
      }
    },
    //在search中，当鼠标移入的时候，让商品列表进行展示
    enterShow() {
      this.show = true
    }
  },
  // computed: {
  //   ...mapState('home',['categoryList'])
  // }
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //过渡动画的样式
    .sort-enter {
      height: 0px;
    }
    .sort-enter-active {
      transition: 0.5s linear;
    }
    .sort-enter-to {
      height: 461px;
    }
    
  }
}
</style>