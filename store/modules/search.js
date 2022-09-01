export default {
  // 独立命名空间
  namespaced: true,
  // 通过 state 声明数据
  state: () => ({
    searchData: uni.getStorageSync('search') || []
  }),

  mutations: {
    /**
     * 保存数据到 storage
     */
    saveToStorage(state) {
      uni.setStorage({
        key: 'search',
        data: state.searchData
      })
    },

    /**
     * 添加数据
     */
    addSearchData(state, val) {
      if (!val) return
      const index = state.searchData.findIndex((item) => item === val)
      //搜索过，删除掉，加在第一位
      if (index !== -1) {
        state.searchData.splice(index, 1)
      }
      state.searchData.unshift(val)

      //超过10条历史记录，删掉最后超出的
      if (state.searchData.length > 10) {
        state.searchData.splice(9, state.searchData.length - 10 - 1)
      }

      this.commit('search/saveToStorage')
    },

    /**
     * 删除指定数据
     */
    removeSearchData(state, index) {
      state.searchData.splice(index, 1)
      this.commit('search/saveToStorage')
    },

    /**
     * 删除所有数据
     */
    removeAllSearchData(state) {
      state.searchData = []
      this.commit('search/saveToStorage')
    }
  }
}
