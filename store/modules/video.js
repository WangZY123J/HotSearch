export default {
  namespaced: true,
  state: () => ({
    videoData: {}
  }),

  mutations: {
    /**
     * 保存视频对象
     */
    setVideoData(state, videoData) {
      state.videoData = videoData
    }
  }
}
