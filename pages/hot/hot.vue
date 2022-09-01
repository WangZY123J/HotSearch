<template>
  <view class="hot-container">
    <image src="@/static/images/logo.png" mode="aspectFit" class="logo" />

    <!-- 搜索栏 -->
    <view class="search-box" @click="onToSearch">
      <my-search placeholderText="想搜点儿什么呢"></my-search>
    </view>

    <!-- 标题栏 -->
    <view class="tab-sticky">
      <my-tabs
        :tabData="tabData"
        :defaultIndex="currentIndex"
        @tabClick="tabClick"
      ></my-tabs>
    </view>

    <!-- 列表数据 -->
    <swiper
      class="swiper"
      :current="currentIndex"
      :style="{ height: `${currentSwiperHeight}px` }"
      @animationfinish="onSwiperEnd"
      @change="onSwiperChange"
    >
      <swiper-item
        class="swiper-item"
        v-for="(tabItem, tabIndex) in tabData"
        :key="tabIndex"
      >
        <view class="list-item-box">
          <!-- 加载动画 -->
          <uni-load-more status="loading" v-if="loading" />
          <!-- 列表 -->
          <block v-else>
            <hot-list-item
              :class="'hot-list-item-' + tabIndex"
              v-for="(item, index) in listData[tabIndex]"
              :key="index"
              :data="item"
              :ranking="index + 1"
              @click="onItemClick(item)"
            ></hot-list-item>
          </block>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { getHotTabs, getHotListFromTabType } from 'api/hot'

export default {
  data() {
    return {
      tabData: [], //热搜标题
      currentIndex: 0, //当前选中的索引
      loading: true, //加载动画
      listData: {}, //以index为key，对应的list为val
      currentSwiperHeight: 0, //当前 swiper 的高度
      swiperHeightData: {},
      currentPageScrollTop: 0 //当前滚动距离
    }
  },

  //在实例创建完后被立即调用
  created() {
    this.getHotTabs()
  },

  /**
   * 监听页面的滚动距离(uni-app的页面生命周期)
   */
  onPageScroll({ scrollTop }) {
    this.currentPageScrollTop = scrollTop
  },

  methods: {
    /**
     * 搜索点击事件
     */
    onToSearch() {
      uni.navigateTo({ url: '/subpkg/pages/search-blog/search-blog' })
    },

    /**
     * 获取热搜标题数据
     */
    async getHotTabs() {
      const { data } = await getHotTabs()
      this.tabData = data.list //放入标题数据
      this.getHotListFromTabType() //获取list列表数据
    },

    /**
     * 获取 list 列表数据
     */
    async getHotListFromTabType() {
      this.loading = true
      if (!this.listData[this.currentIndex]) {
        const id = this.tabData[this.currentIndex].id
        const { data } = await getHotListFromTabType(id) //获取列表数据
        this.listData[this.currentIndex] = data.list //放入数据缓存
      }
      this.loading = false
      //获取高度，放入缓存
      setTimeout(async () => {
        this.currentSwiperHeight = await this.getCurrentSwiperHeight() //获取当前 swiper 高度
        this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight //放入缓存
      }, 0)
    },

    /**
     * 获取当前 swiper 的高度
     */
    getCurrentSwiperHeight() {
      return new Promise((resolve, reject) => {
        let sum = 0
        const query = uni.createSelectorQuery().in(this)
        query
          .selectAll(`.hot-list-item-${this.currentIndex}`)
          .boundingClientRect((result) => {
            result.forEach((item) => {
              sum += item.height
            })
            resolve(sum)
          })
          .exec()
      })
    },

    /**
     * 热搜标题 tab item 点击事件
     */
    tabClick(index) {
      this.currentIndex = index
    },

    /**
     * 解决卡顿问题，等待 swiper 动画执行之后获取数据
     */
    onSwiperEnd() {
      if (!this.listData[this.currentIndex]) {
        this.getHotListFromTabType()
        return
      }
      //存在缓存数据
      this.currentSwiperHeight = this.swiperHeightData[this.createSelectorQuery]
    },

    /**
     * 监听 swiper 切换事件
     */
    onSwiperChange(event) {
      if (this.currentPageScrollTop > 130) {
        //控制列表滚动位置,返回吸顶位置
        uni.pageScrollTo({ scrollTop: 130 })
      }
      this.currentIndex = event.detail.current
    },

    /**
     * 点击 item ，进入详情页
     */
    onItemClick(item) {
      uni.navigateTo({
        url: `/subpkg/pages/blog-detail/blog-detail?author=${item.user_name}&articleId=${item.id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.hot-container {
  background-color: $uni-bg-color;

  .logo {
    width: 100%;
    height: 80px;
  }
  .search-box {
    padding: 0 16px;
    margin-bottom: $uni-spacing-col-base;
  }
  .tab-sticky {
    position: sticky;
    z-index: 999;
    /* #ifndef H5 */
    top: -1px;
    /* #endif */
    /* #ifdef H5 */
    top: 43px;
    /* #endif */
  }
}
</style>
