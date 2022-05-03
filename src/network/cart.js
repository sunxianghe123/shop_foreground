import {
  request
} from './request'


// 修改个人信息
export function getCartList(value) {
  return request({
    url:'/cart/getCartList',
    params: {
      user_id: value,
    }
  })
}

export async function getCurrentUser(value) {
  return request( {
    url: '/users/getCurrentUserInfo',
    // get请求使用params配置，post请求使用data配置。
    params: {
      user_id: value
    },
  });
}

export function changeGoodChecked(id, is_checked) {
  return request({
    url:'/cart/changeGoodChecked',
    params: {
      id,
      is_checked
    }
  })
}

export function deleteGoodInCart(user_id, goods_id) {
  return request({
    url:'/cart/deleteGoodInCart',
    params: {
      user_id,
      goods_id
    }
  })
}
