 <template>
  <div class="goodsList">
    <el-table :data="goodsListData"
              style="width: 100%"
              border
              stripe>
      <!-- 索引 -->
      <el-table-column type="index"
                       width="140">
      </el-table-column>
      <!-- ID -->
      <el-table-column label="ID"
                       prop="_id"
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
      <!-- 物品图标 -->
      <el-table-column prop="icon"
                       label="物品图标"
                       width="100">
        <template slot-scope="scope">
          <img :src="scope.row.icon"
               style="height:3em">
        </template>
      </el-table-column>
      <!-- 物品名称 -->
      <el-table-column prop="name"
                       label="物品名称">
      </el-table-column>
      <!-- 操作区域 -->
      <el-table-column label="操作"
                       width="150">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="mini"
                     @click="$router.push(`/goods/create/${scope.row._id}`)">编辑</el-button>
          <el-button type="danger"
                     size="mini"
                     @click="removeGoodsById(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

  <script>
export default {
  data() {
    return {
      goodsListData: []
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 删除物品
    async removeGoodsById(id) {
      // 删除确认框
      const confirm = await this.$confirm(
        '此操作将永久删除该物品, 是否继续?',
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
          message: '删除取消'
        })
      })
      if (confirm !== 'confirm') return false
      // 确认删除
      const { data } = await this.$http.delete(`/reset/goods/${id}`)
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
      // 重新获取数据
      this.getGoodsList()
    },
    // 获取商品列表数据
    async getGoodsList() {
      const { data } = await this.$http.get('/reset/goods')
      this.goodsListData = data.message
    }
  }
}
</script>