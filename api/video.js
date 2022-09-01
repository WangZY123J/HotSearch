import request from '../utils/request'

/**
 * 热播视频列表
 */
export const getHotVideoList = (data) => {
  return request({
    url: '/video/list',
    data
  })
}

/**
 * 获取视频弹幕列表
 */
export const getVideoDanmuList = (data) => {
  return request({
    url: '/video/danmu',
    data
  })
}
