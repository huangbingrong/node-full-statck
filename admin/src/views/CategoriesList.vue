<template>
  <div class="categoriesList">
    <el-table :data="categoriesListData"
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
      <el-table-column label="日期"
                       width="200">
        <template slot-scope="scope">
          {{scope.row.date | dateFormat}}
        </template>
      </el-table-column>
      <!-- 上级分类 -->
      <el-table-column prop="parent.name"
                       label="上级分类"> </el-table-column>
      <!-- 分类名称 -->
      <el-table-column prop="name"
                       label="分类名称"> </el-table-column>
      <el-table-column label="操作"
                       width="150">
        <!-- 操作区域 -->
        <template slot-scope="scope">
          <el-button type="primary"
                     size="mini"
                     @click="$router.push(`/categories/create/${scope.row._id}`)">编辑</el-button>
          <el-button type="danger"
                     size="mini"
                     @click="removeCategoryById(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 分类列表数据
      categoriesListData: []
    }
  },
  created() {
    this.getListData()
  },
  methods: {
    // 获取分类
    async getListData() {
      const { data } = await this.$http.get('/reset/categories')
      this.categoriesListData = data.message
    },
    // 删除分类
    async removeCategoryById(id) {
      // 确认框
      const confirm = await this.$confirm(
        '此操作将永久删除该分类, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(() => {
        // 取消删除
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      // 确认删除
      if (confirm === 'confirm') {
        const { data } = await this.$http.delete(`/reset/categories/${id}`)
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

        // 刷新分类列表
        this.getListData()
      }
    }
  }
}
</script>

<style></style>
