const Mock = require('mockjs')

const data = Mock.mock({
  // 获取 30 条模拟数据
  'items|30': [{
    id: '@id',
    // 模拟数据： 10 到 20 个字符
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    // 模拟数据：300 到 5000 个字符
    pageviews: '@integer(300, 5000)'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
