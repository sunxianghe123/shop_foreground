<template>
  <div class="cart">
    <!-- 导航 -->
    <NavBar class="nav-bar"
      ><div slot="center">购物车</div></NavBar
    >
    <!-- 商品列表 -->
    <CartList></CartList>
    <!-- 底部汇总 -->
    <CartBottomBar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from './childComps/CartBottomBar.vue'
import {getCartList} from "../../network/cart";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  data() {
    return {
      length: 0,
    }
  },
  created() {
    this.$nextTick()
  }
};
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  height: 40px;
}
</style>
