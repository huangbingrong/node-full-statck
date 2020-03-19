  <template>
  <el-table :data="articleList"
            style="width: 100%"
            border
            stripe>
    <!-- 索引 -->
    <el-table-column type="index"
                     width="140"></el-table-column>
    <el-table-column prop="_id"
                     label="ID"
                     width="220"></el-table-column>
    <!-- 日期 -->
    <el-table-column label="日期"
                     width="200">
      <template slot-scope="scope">
        {{scope.row.date | dateFormat}}
      </template>
    </el-table-column>
    <!-- 文章 -->
    <el-table-column prop="title"
                     label="文章名称"></el-table-column>
    <el-table-column label="操作"
                     width="150">
      <template slot-scope="scope">
        <!-- 操作区域 -->
        <el-button type="primary"
                   size="mini"
                   @click="$router.push(`/article/create/${scope.row._id}`)">编辑</el-button>
        <el-button type="danger"
                   size="mini"
                   @click="removeArticleById(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      // 文章列表
      articleList: []
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    // 获取文章列表数据
    async getArticleList() {
      const { data } = await this.$http.get('/reset/article')
      this.articleList = data.message
    },
    // 根据id删除文章
    async removeArticleById(id) {
      // 确认框
      const confirm = await this.$confirm(
        '此操作将永久删除该文章, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(() => {
        // 取消删除
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      if (confirm !== 'confirm') return false
      // 确认删除
      const { data } = await this.$http.delete(`/reset/articles/${id}`)
      // 删除失败
      if (data.meta.status !== 204)
        return this.$message({
          type: 'error',
          message: data.meta.msg
        })
      // 删除成功
      this.$message({
        type: 'success',
        message: data.meta.msg
      })
      // 重新渲染页面
      this.getArticleList()
    }
  }
}
</script>