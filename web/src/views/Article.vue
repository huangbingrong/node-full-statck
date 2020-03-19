<template>
  <div class="article"
       v-if="article">
    <div class="d-flex p-2 bb-1">
      <i class="iconfont icon-arrow text-blue"></i>
      <strong class="flex-1 text-blue pl-2">{{article.title}}</strong>
      <div class="text-info">{{article.updatedAt | dateFormat2}}</div>
    </div>
    <div v-html="article.body"
         class="px-3">
    </div>
    <div class="information p-3 bt-1">
      <i class="iconfont icon-information"></i>
      <strong class="text-blue fs-md pl-2">相关资讯</strong>
      <router-link tag="strong"
                   :to="`/article/${item._id}`"
                   v-for="item in article.information"
                   :key="item._id"
                   class="py-2 d-flex">
        {{item.title}}
      </router-link>
    </div>
  </div>

</template>

<script>
import moment from 'moment'

export default {
  props: {
    id: {}
  },
  data() {
    return {
      // 文章详情
      article: null
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    // 获取文章详情
    async getArticle() {
      const { data } = await this.$http.get(`/article/${this.id}`)
      this.article = data.message
    }
  },
  watch: {
    // id: 'getArticle'
    id() {
      this.getArticle()
    }
  },
  filters: {
    dateFormat2(dateStr) {
      return moment(dateStr).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  img {
    width: 100px !important;
    height: 100px !important;
  }
}
</style>