import request from '@/utils/request'

export default {
// 分页条件查询分类列表
  getList(query, current = 1, size = 20) {
    return request({ // Promise
      url: `/wms/goodsManager/search`,
      method: 'post',
      data: { // {name: '前端', status: 1, current: current, size: size}
        ...query,
        current, // current : current
        size // size : size
      }
    })
  }
}
