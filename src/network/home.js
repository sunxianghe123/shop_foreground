import {
  request
} from './request'

/* 封装首页home的全部网络请求 */

// 请求首页商品数据
export function getHomeGoods(type) {
  return request({
    url:'/goods/getGoodsList',
    params: {
      title: type,
    }
  })
}

// 请求轮播图接口
export function getSlidesList() {
  return request({
    url: '/slides/getSlidesList',
  })
}
