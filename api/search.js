import request from '../utils/request'

/**
 * 获取默认搜索内容
 */
export const getDefaultText = () => {
  return request({
    url: '/search/default-text',
    method: 'GET'
  })
}

/**
 * 搜索列表
 */
export const getSearchHotList = () => {
  return request({
    url: '/search/hot-list',
    method: 'GET'
  })
}

/**
 * 搜索结果
 */
export const getSearchResult = (data) => {
  return request({
    url: '/search',
    data
  })
}
