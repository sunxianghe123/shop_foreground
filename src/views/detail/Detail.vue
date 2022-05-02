<template>
  <div id="detail">
    <nut-navbar
      @on-click-back="back"
      :leftShow="true"
      :rightShow="false"
    >商品详情</nut-navbar>
    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <DetailSwiper :top-images="topImages" />
      <DetailBaseInfo :goods="goods" />
    </Scroll>
    <DetailBottomBar @addToCart="addInToCart" @buyGoods="buyGoods"/>

    <BackTop @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";


import { debounce } from "common/utils";

import {
  getCurrentGoodInfo,
} from "network/detail";

import { itemListenerMixin } from "common/mixin";

import {mapActions} from 'vuex'
import {addInToCart} from "../../network/detail";

// import Toast from 'components/common/toast/Toast'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailBottomBar,
    Scroll,
    BackTop,
    // Toast

  },
  mixins: [itemListenerMixin],

  data() {
    return {
      id: null,
      goods_id: null,
      topImages: [], // 轮播图
      goods: {}, // 商品基本信息
      detailInfo: {},
      themeTopYs: [], // 标题内容对应的y值
      getThemeTopY: null, // 防抖
      currentIndex: 0, // 当前滚动到第几个主题
      isShowBackTop: false,
    };
  },
  created() {
    // 1.保存传入的id
    this.goods_id = this.$route.params.id;
    this.id = sessionStorage.getItem("user_id")
    // 2.根据id请求详情数据
    getCurrentGoodInfo(this.goods_id).then((res) => {
      const data = res.list[0];
      // 1.获取顶部的图片轮播数据
      this.topImages = JSON.parse(data?.pics);
      // 2.获取商品信息
      this.goods = data;
      console.log(this.goods)
    });


    // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []; //先清空，不然不止4个值
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE); // js里面number的最大值
    }, 100);
  },
  destroyed() {
    // detail没有keep-alive，所以这里不用deactivated
    // 取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      // 获取4个主题的offsetTop
      this.getThemeTopY();
    },
    // 点击标题，滚动到对应内容
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    // 监听滚动到哪个主题
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      // **法二 hack做法，引入一个最大值与最后一个值进行比较
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex != i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

       // 3.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
    },
     // 点击backtop回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 加入购物车
    addInToCart(){
      addInToCart({
        user_id: this.id,
        goods_id: this.goods.id,
        image: this.goods.cover,
        title: this.goods.title,
        description: this.goods.description,
        price: this.goods.price,
      }).then(res=>{
        if(res.code == 200){
          this.$toast.success('添加成功！');
        } else {
          this.$toast.fail('添加失败！');
        }
      });
    },
    buyGoods(){
      //TODO 调用支付接口
    },
    back(){
      this.$router.back()
    }
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

/* 给一个固定的高度 */
.content {
  height: calc(100% - 44px);
}
</style>
