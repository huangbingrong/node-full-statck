<template>
  <div class="adList">
    <template>
      <el-table :data="adListData"
                style="width: 100%"
                border
                stripe>
        <el-table-column type="index"
                         width="140"></el-table-column>
        <el-table-column prop="_id"
                         label="ID"
                         width="220"></el-table-column>
        <el-table-column prop="date"
                         label="日期"
                         width="200">
          <template slot-scope="scope">
            {{scope.row.date | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column prop="name"
                         label="广告名">
        </el-table-column>
        <el-table-column label="操作"
                         width="150">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="mini"
                       @click="$router.push(`/ad/create/${scope.row._id}`)">编辑</el-button>
            <el-button type="danger"
                       size="mini"
                       @click="removeAdById(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表格列表数据
      adListData: []
    }
  },
  created() {
    this.getAdListData()
  },
  methods: {
    // 获取表格数据
    async getAdListData() {
      const { data } = await this.$http.get('/reset/ads')
      this.adListData = data.message
    },
    // 根据id删除广告
    async removeAdById(id) {
      // 确认框
      const confirm = await this.$confirm(
        '此操作将永久删除该广告, 是否继续?',
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
      const { data } = await this.$http.delete(`/reset/ads/${id}`)
      if (data.meta.status !== 204) {
        // 删除失败
        return this.$message({
          type: 'error',
          message: data.meta.msg
        })
      }
      // 删除成功
      this.$message({
        type: 'success',
        message: data.meta.msg
      })
      // 重新渲染页面
      this.getAdListData()
    }
  }
}
</script>