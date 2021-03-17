import request from '@/utils/request'

export default {
// 角色列表分页接口
  getList(query, current = 1, size = 20) {
    return request({
      url: `/system/role/search`,
      method: 'post',
      data: { ...query, current, size } // 合并到 query 中
    })
  },

  add(data) {
    return request({
      url: `/system/role`,
      method: 'post',
      data
    })
  },

  // 查询
  getById(id) {
    return request({
      url: `/system/role/${id}`, // 反单引号 ``
      method: 'get'
    })
  },
  // 更新
  update(data) {
    return request({
      url: `/system/role`,
      method: 'put', // put 方式提交
      data
    })
  }
}
