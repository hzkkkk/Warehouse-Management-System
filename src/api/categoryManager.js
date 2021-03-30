import request from '@/utils/request'

export default {
// 分页条件查询分类列表
  getList(query, current = 1, size = 20) {
    return request({ // Promise
      url: `/wms/categoryManager/search`,
      method: 'post',
      data: { // {name: '前端', status: 1, current: current, size: size}
        ...query,
        current, // current : current
        size // size : size
      }
    })
  },

  // 新增：交表单
  add(data) {
    return request({
      url: `/wms/categoryManager`,
      method: 'post',
      data
    })
  },

  // 修改：查询
  getById(id) {
    return request({
      url: `/wms/categoryManager/${id}`, // 反单引号 ``
      method: 'get'
    })
  },

  // 修改：更新
  update(data) {
    return request({
      url: `/wms/categoryManager`,
      method: 'put', // put 方式提交
      data
    })
  },
  // 删除
  deleteById(id) {
    return request({
      url: `/wms/categoryManager/${id}`, // 反单引号 ``
      method: 'delete' // delete 方式提交
    })
  },

  // 供应商：获取所有正常状态的物资分类
  getNormalList() {
    return request({
      url: `/wms/categoryManager/list`,
      method: 'get'
    })
  },
  // 获取所有正常状态的分类和标签
  getCategoryAndLabel() {
    return request({
      url: `/wms/categoryManager/label/list`,
      method: 'get'
    })
  }

}
