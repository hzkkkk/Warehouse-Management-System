import request from '@/utils/request'

export default {
// 角色列表分页接口
  getList(query, current = 1, size = 20) {
    return request({
      url: `/system/role/search`,
      method: 'post',
      data: { ...query, current, size } // 合并到 query 中
    })
  }
}
