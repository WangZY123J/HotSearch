import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import rTime from 'dayjs/plugin/relativeTime'

/**
 * 将字符串转化为以千为单位的字符
 * @param {*} val 待转换字符
 * @returns
 */
export const hotNumber = (val) => {
  const num = parseInt(val)
  if (num < 1000) return val

  val = val + '' //将val转换成字符串
  return val.substring(0, val.length - 3) + 'k'
}

dayjs.locale('zh-cn') //加载中文语音包
dayjs.extend(rTime) //加载相对时间插件
//定义过滤器，把当前时间加载成相对时间
export const relativeTime = (val) => {
  return dayjs().to(dayjs(val))
}
