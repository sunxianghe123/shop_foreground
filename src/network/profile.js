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

