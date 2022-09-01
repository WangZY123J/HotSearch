<template>
	<view class="hot-video-container">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @up="upCallback" @down="downCallback">
			<block v-for="(item, index) in videoList" :key="index">
				<hot-video-item :data="item" @click="onItemClick" />
			</block>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins'
	import {
		getHotVideoList
	} from 'api/video'
	import {
		mapMutations
	} from 'vuex'

	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				videoList: [], // 视频数据源
				size: 10,
				page: 1,
				isInit: true,
				mescroll: null //实例
			}
		},

		mounted() {
			this.mescroll = this.$refs.mescrollRef.mescroll
		},

		methods: {
			...mapMutations('video', ['setVideoData']),
			/**
			 * 获取列表数据
			 */
			async loadHotVideoList() {
				const {
					data: res
				} = await getHotVideoList({
					page: this.page,
					size: this.size
				})
				if (this.page === 1) {
					this.videoList = res.list
				} else {
					this.videoList = [...this.videoList, ...res.list]
				}
			},

			/**
			 * 首次加载
			 */
			async mescrollInit() {
				await this.loadHotVideoList()
				this.isInit = false
				this.mescroll.endSuccess() //结束上拉刷新、下拉加载
			},

			/**
			 * 下拉刷新的回调
			 */
			async downCallback() {
				if (this.isInit) return
				this.page = 1
				await this.loadHotVideoList()
				this.mescroll.endSuccess()
			},

			/**
			 * 上拉加载的回调
			 */
			async upCallback() {
				if (this.isInit) return
				this.page += 1
				await this.loadHotVideoList()
				this.mescroll.endSuccess()
			},

			/**
			 * item 点击事件
			 */
			onItemClick(data) {
				this.setVideoData(data)
				uni.navigateTo({
					url: `/subpkg/pages/video-detail/video-detail`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hot-video-container {
		background-color: $uni-bg-color-grey;
	}
</style>
