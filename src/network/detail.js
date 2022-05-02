import {
  request
} from './request'


// 请求商品推荐数据
export function addInToCart(params) {
  return request({
    url:'/cart/addToCart',
    method: 'POST',
    data: params
  })
}

// 详情页请求商品数据
export function getCurrentGoodInfo(id) {
  return request({
    url: '/goods/getCurrentGoodInfo',
    params: {
      id
    }
  })
}
