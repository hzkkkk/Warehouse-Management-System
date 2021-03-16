
import request from '@/utils/request'

export default {
// 文章列表分页接口
  getList(query, current = 1, size = 20) {
    return request({
      url: `/wms/goodsManager/search`,
      method: 'post',
      data: { ...query, current, size } // 合并成一个对象
    })
  },
  // 查询
  getById(id) {
    return request({
      url: `/wms/goodsManager/${id}`, // 反单引号 ``
      method: 'get'
    })
  },
  // 审核通过
  auditSuccess(id) {
    return request({
      url: `/wms/goodsManager/audit/success/${id}`, // 反单引号 ``
      method: 'get'
    })
  },
  // 审核不通过
  auditFail(id) {
    return request({
      url: `/wms/goodsManager/audit/fali/${id}`, // 反单引号 ``
      method: 'get'
    })
  }
}

