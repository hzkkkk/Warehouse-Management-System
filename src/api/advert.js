
import request from '@/utils/request'

export default {
// 列表分页接口
  getList(query, current = 1, size = 20) {
    return request({
      url: `/article/advert/search`,
      method: 'post',
      data: { ...query, current, size } // 合并成一个对象
    })
  }
}
