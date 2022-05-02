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

export async function login(body) {
  // TODO 自己写接口改这里api
  return request( {
    url: '/users/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}
