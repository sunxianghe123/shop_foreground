<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton
        :is-checked="itemInfo.is_checked"
        @click.native="checkClick"
      ></CheckButton>
    </div>
    <div class="item-img">
      <img :src="cover" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.description }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ itemInfo.price }}</div>
        <div class="item-count right">x{{ itemInfo.num }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/common/checkButton/CheckButton";
import {changeGoodChecked} from "../../../network/cart";

export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  data() {
    return {
      cover: ''
    }
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  created() {
    this.cover = JSON.parse(this.itemInfo.image)?.[0]?.thumbUrl;
  },
  methods: {
    async checkClick() {
      // 这里能逆向修改state的cartList -> 修改对象的引用地址
      this.itemInfo.is_checked = !this.itemInfo.is_checked;
      // this.$store.commit('changeChecked', this.itemInfo.is_checked);
      let res = await changeGoodChecked(this.itemInfo.id, Number(this.itemInfo.is_checked));
      if(res.code !== 200) {
        this.$toast.fail("选择失败")
      }
    },
  },
};
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
</style>
