<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
        <CartListItem v-for="item in cartList" :key="item.id" :item-info="item">
        </CartListItem>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import CartListItem from './CartListItem.vue'
import {getCartList} from "../../../network/cart";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  data() {
    return {
      cartList: [],
      id: ''
    }
  },
  activated() {
      this.$refs.scroll.refresh()
  },
  async created() {
    this.id = sessionStorage.getItem('user_id');
    let res = await getCartList(this.id);
    console.log(res)
    this.cartList = res?.data;
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
