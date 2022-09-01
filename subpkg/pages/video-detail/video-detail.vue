<template>
  <view class="video-detail-container">
    <view class="video-box">
      <video
        id="myVideo"
        class="video"
        :src="videoData.play_url"
        :danmu-list="danmuList"
        enable-danmu
        danmu-btn
        controls
      />
      <hot-video-info :data="videoData" />
    </view>
    <!-- 弹幕模块 -->
    <view class="danmu-box">
      <!-- 加载动画 -->
      <uni-load-more :status="loading" v-if="isLoadingComment" />
      <!-- 无弹幕 -->
      <empty-data v-else-if="commentList.length === 0"></empty-data>
      <!-- 有弹幕 -->
      <view class="comment-container" v-else>
        <view class="all-comment-title">全部弹幕</view>
        <view class="list">
          <block v-for="(item, index) in commentList" :key="index">
            <article-comment-item :data="item" />
          </block>
        </view>
      </view>
    </view>
    <!-- 底部功能区 -->
    <article-operate
      :placeholder="'发个弹幕，吐槽一下'"
			:articleData="videoData"
      @commitClick="onCommit"
      @changePraise="onChangePraise"
      @changeCollect="onChangeCollect"
    />
    <uni-popup ref="popup" type="bottom" @change="onCommitPopupChange">
      <article-comment-commit
        v-if="isShowCommit"
        :articleId="videoData.id"
        @success="onSendDanmu"
      />
    </uni-popup>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getVideoDanmuList } from 'api/video'
import { getRandomColor } from 'utils'

export default {
  data() {
    return {
      danmuList: [], //弹幕数据源
      commentList: [], //评论数据源
      isShowCommit: false,
      videoContext: null,
      isLoadingComment: true //弹幕数据加载中
    }
  },
  computed: {
    ...mapState('video', ['videoData'])
  },
  created() {
    this.loadVideoDanmuList()
  },
  onReady(res) {
    this.videoContext = uni.createVideoContext('myVideo')
  },
  methods: {
    ...mapMutations('video', ['setVideoData']),
    /**
     * 获取弹幕数据
     */
    async loadVideoDanmuList() {
      const { data: res } = await getVideoDanmuList({
        videoId: this.videoData.id
      })
      //定义随机颜色
      res.list.forEach((item) => {
        item.color = getRandomColor()
      })
      this.danmuList = [...res.list]
      this.commentList = [...res.list]
      this.isLoadingComment = false
    },

    /**
     * 发布弹幕点击事件
     */
    onCommit() {
      this.$refs.popup.open()
    },

    /**
     * popup 切换事件
     */
    onCommitPopupChange(e) {
      if (e.show) {
        this.isShowCommit = e.show
      } else {
        setTimeout(() => {
          this.isShowCommit = e.show
        }, 200)
      }
    },

    /**
     * 弹幕发送成功之后的回调
     */
    onSendDanmu(data) {
      //发送弹幕，内置 api
      this.videoContext.sendDanmu({
        text: data.info.content,
        color: getRandomColor()
      })
      //添加弹幕到数据源
      this.commentList.unshift(data.info)
      this.$refs.popup.close()
      this.isShowCommit = false
      uni.showToast({
        title: '发表成功',
        icon: 'success'
      })
    },

    /**
     * 点赞
     */
    onChangePraise(isPraise) {
      this.setVideoData({ ...this.videoData, isPraise })
    },

    /**
     * 收藏
     */
    onChangeCollect(isCollect) {
      this.setVideoData({ ...this.videoData, isCollect })
    }
  }
}
</script>

<style lang="scss" scoped>
.video-detail-container {
  .video-box {
    background-color: $uni-bg-color;
    position: sticky;
    top: 0;
    z-index: 9;
    .video {
      width: 100%;
      height: 230px;
    }
  }
  .danmu-box {
    border-top: $uni-spacing-col-sm solid $uni-bg-color-grey;
    margin-bottom: 36px;
    .comment-container {
      padding: $uni-spacing-col-lg $uni-spacing-row-lg;
      .all-comment-title {
        font-size: $uni-font-size-lg;
        font-weight: bold;
      }
    }
  }
}
</style>
