import request from '@/utils/request'

export default {
// 列表分页接口
  getList(query) {
    return request({
      url: `/system/menu/search`,
      method: 'post',
      data: query
    })
  },
  add(data) {
    return request({
      url: `/system/menu`,
      method: 'post',
      data
    })
  }
}
