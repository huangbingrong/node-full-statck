 <template>
  <div class="herosList">
    <el-table :data="herosListData"
              style="width: 100%"
              border
              stripe>
      <!-- 索引 -->
      <el-table-column type="index"
                       width="140">
      </el-table-column>
      <!-- ID -->
      <el-table-column prop="_id"
                       label="ID"
                       width="220">
      </el-table-column>
      <!-- 日期 -->
      <el-table-column prop="date"
                       label="日期"
                       width="200">
        <template slot-scope="scope">
          {{scope.row.date | dateFormat}}
        </template>
      </el-table-column>
      <!-- 英雄图标 -->
      <el-table-column prop="avatar"
                       label="英雄图标"
                       width="100">
        <template slot-scope="scope">
          <img :src="scope.row.avatar"
               style="height: 3em">
        </template>
      </el-table-column>
      <!-- 英雄称号 -->
      <el-table-column prop="title"
                       label="英雄称号">
      </el-table-column>
      <!-- 英雄名称 -->
      <el-table-column prop="name"
                       label="英雄名称">
      </el-table-column>
      <!-- 操作区域 -->
      <el-table-column label="操作"
                       width="150">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="mini"
                     @click="$router.push(`/heros/create/${scope.row._id}`)">编辑</el-button>
          <el-button type="danger"
                     size="mini"
                     @click="removeHero(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

  <script>
export default {
  data() {
    return {
      herosListData: []
    }
  },
  created() {
    this.getHeroList()
  },
  methods: {
    // 获取英雄列表数据
    async getHeroList() {
      const { data } = await this.$http.get('/reset/heros')
      this.herosListData = data.message
    },
    // 删除英雄
    async removeHero(id) {
      // 删除提示框
      const confirm = await this.$confirm(
        '此操作将永久删除该英雄, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(() => {
        // 删除取消
        return this.$message({
          type: 'error',
          message: '删除取消'
        })
      })
      if (confirm !== 'confirm') return false
      // 确认删除
      const { data } = await this.$http.delete(`/reset/heros/${id}`)
      if (data.meta.status !== 204)
        // 删除失败
        return this.$message({
          type: 'error',
          message: data.meta.msg
        })
      // 删除成功
      this.$message({
        type: 'success',
        message: data.meta.msg
      })
      // 重新渲染英雄列表
      this.getHeroList()
    }
  }
}
</script>