<template>
  <div class="bottom-bar">
    <div class="price">合计 : {{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去计算 ( {{ checkLength }} )</div>
    <nut-popup :style="{ padding: '10px 10px 20px 10px', }" v-model="show">
      <div class="pay-content">
        <h3>
          总金额为：{{totalPrice}}
        </h3>
        <p>
          请扫描付款码支付：
        </p>
        <img class="pay-img" alt='收款码' src="@/assets/img/cart/payCode.jpg"/>
      </div>
    </nut-popup>
  </div>
</template>

<script>
import CheckButton from "components/common/checkButton/CheckButton";

import { mapGetters } from "vuex";
import {getCartList} from "../../../network/cart";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  data(){
    return {
      cartList: [],
      id: '',
      show: false,
    }
  },
  async created() {
    this.id = sessionStorage.getItem('user_id');
    let res = await getCartList(this.id);
    this.cartList = res?.data;
  },
  computed: {
    // 合计
    totalPrice() {
      return (
        "￥" +
        this.cartList.filter((item) => {
            return item.is_checked;
          }).reduce((preValue, item) => {
            return preValue + item.price * item.num;
          }, 0).toFixed(2)
      );
    },
    // 去计算
    checkLength() {
      return this.cartList.filter((item) => item.is_checked).length;
    },
  },
  methods: {
    async calcClick(){
      let res = await getCartList(this.id);
      this.cartList = res?.data;
      this.$nextTick();
      if(this.checkLength==0){
        this.$toast.text('请选择购买的商品',2000)
      }
      this.show = true;
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 40px;
  background-color: #eee;
  /*position: relative;*/
  line-height: 40px;
  font-size: 14px;
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  z-index: 9;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  color: #fff;
  background-color: red;
  text-align: center;
}
.pay-img {
  width: 100px;
}
.pay-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>
