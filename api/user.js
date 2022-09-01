import request from '../utils/request'

/**
 * 用户登录
 */
export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 关注用户
 */
export const userFollow = (data) => {
  return request({
    url: '/user/follow',
    data
  })
}

/**
 * 发表评论
 */
export const userArticleComment = (data) => {
  return request({
    url: '/user/article/comment',
    method: 'POST',
    data
  })
}

/**
 * 用户点赞
 */
export const userPraise = (data) => {
  return request({
    url: '/user/praise',
    data
  })
}

/**
 * 用户收藏
 */
export const userCollect = (data) => {
  return request({
    url: '/user/collect',
    data
  })
}
