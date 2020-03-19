<template>
  <div class="adminList">
    <el-table :data="adminListData"
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
      <!-- 管理员头像 -->
      <el-table-column prop="name"
                       label="管理员头像"
                       width="100">
        <template slot-scope="scope">
          <img :src="scope.row.avatar"
               style="height: 3rem">
        </template>
      </el-table-column>
      <!-- 管理员名称 -->
      <el-table-column prop="name"
                       label="管理员名称">
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作"
                       width="150">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="mini"
                     @click="$router.push('/admin/create/' + scope.row._id)">编辑
          </el-button>
          <el-button type="danger"
                     size="mini"
                     @click="removeAdminById(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 管理员列表数据
      adminListData: []
    }
  },
  created() {
    this.getAdminListData()
  },
  methods: {
    // 获取管理员数据
    async getAdminListData() {
      const { data } = await this.$http.get('/reset/admin')
      this.adminListData = data.message
    },
    // 根据id删除管理员
    async removeAdminById(id) {
      // 确认框
      const confirm = await this.$confirm(
        '此操作将永久删除该管理, 是否继续?',
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
          message: '经取消删除'
        })
      })
      if (confirm !== 'confirm') return false
      // 确认删除
      const { data } = await this.$http.delete(
        `/reset/admins/${id}`,
        this.adminListData
      )
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
      // 重新渲染页面
      this.getAdminListData()
    }
  }
}
</script>