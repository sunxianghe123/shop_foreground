<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton
        :is-checked="Boolean(itemInfo.is_checked)"
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
    <div class="item-delete">
      <nut-button
        @click="removeItem"
      >
        删除商品
      </nut-button>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/common/checkButton/CheckButton";
import {changeGoodChecked, deleteGoodInCart, getCartList} from "../../../network/cart";

export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  data() {
    return {
      cover: '',
      user_id: 0,
      goods_id: 0,
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
    console.log(this.itemInfo)
    this.cover = JSON.parse(this.itemInfo.image)?.[0]?.thumbUrl;
    this.user_id = sessionStorage.getItem('user_id');
    this.goods_id =this.itemInfo.goods_id;
  },
  methods: {
    async checkClick() {
      this.itemInfo.is_checked = !this.itemInfo.is_checked;
      // this.$store.commit('changeChecked', this.itemInfo.is_checked);
      let res = await changeGoodChecked(this.itemInfo.id, Number(this.itemInfo.is_checked));
      if(res.code !== 200) {
        this.$toast.fail("选择失败")
      }
    },
    async removeItem() {
      let res = await deleteGoodInCart(this.user_id, this.goods_id);
      if(res.code == 200) {
        this.$toast.success('删除成功！');
        location.reload();
      } else {
        this.$toast.fail('删除失败！')
      }
    }
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
  position: relative;
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

.item-delete {
  width: 100px;
  height: 50px;
  color: #eb4868;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
}
.nut-button {
  padding: 0 10px;
}
</style>
