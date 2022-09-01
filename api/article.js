import request from '../utils/request'

/**
 * 获取文章详情
 */
export const getArticleDetail = (data) => {
  return request({
    url: '/article/details',
    method: 'GET',
    data
  })
}

/**
 * 获取文章评论列表
 */
 export function getArticleCommentList(data) {
  return request({
    url: '/article/comment/list',
    data
  });
}
