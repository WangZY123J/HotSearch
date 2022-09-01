import request from '../utils/request'

/**
 * 获取导航条
 */
export const getHotTabs = () => {
  return request({
    url: '/hot/tabs',
    method: 'GET'
  })
}

/**
 * 热搜文章列表
 * @param {*} type tab的id
 * @returns 
 */
export const getHotListFromTabType = (type) => {
  return request({
    url: '/hot/list',
    method: 'GET',
    data: {
      type
    }
  })
}
