import {
  request
} from './request'


// 修改个人信息
export function editUserInfo(params) {
  return request({
    url:'/foreuser/editUserInfo',
    params
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

