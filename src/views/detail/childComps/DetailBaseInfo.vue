<template>
  <!-- 商品基本信息 -->
  <!-- 有数据展示，无数据就不展示 Object.keys().length判断对象是不是空的  -->
  <div v-if="Object.keys(goods).length != 0" class="base-info">
    <div class="info-title">分类：{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">价格：{{ goods.price }}</span>
      <span v-if="goods.description" class="info-other">详情：{{ goods.description }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>


<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}

.info-title {
  font-size: 18px;
  color: #222;
}

.info-price {
  font-size: 18px;
  margin-top: 10px;
}

.info-price .n-price {
  font-size: 18px;
  color: var(--color-high-text);
}

.info-price .o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}

.info-price .discount {
  font-size: 12px;
  padding: 2px 5px;
  color: #fff;
  background-color: var(--color-high-text);
  border-radius: 8px;
  margin-left: 5px;

  /*让元素上浮一些: 使用相对定位即可*/
  position: relative;
  top: -8px;
}

.info-other {
  margin-top: 15px;
  line-height: 30px;
  display: flex;
  font-size: 13px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  justify-content: space-between;
}

.info-service {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}

.info-service-item img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}

.info-service-item span {
  font-size: 13px;
  color: #333;
}
</style>
