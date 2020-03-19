<template>
  <div class="categoriesCreate">
    <h1>{{id? '编辑':'新建'}}分类</h1>
    <el-form :model="createForm"
             ref="createForm"
             label-width="100px"
             :rules="createFormRules">
      <!-- 上级分类区域 -->
      <el-form-item label="上级分类">
        <el-select v-model="createForm.parent">
          <el-option v-for="item in options"
                     :key="item._id"
                     :label="item.name"
                     :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 分类名称区域 -->
      <el-form-item label="分类名称"
                    prop="name">
        <el-input type="name"
                  v-model="createForm.name"></el-input>
      </el-form-item>
      <!-- 操作区域 -->
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('createForm')">提交</el-button>
        <el-button @click="resetForm('createForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      // 表单对象
      createForm: {},
      // 父级分类选项
      options: {},
      // 验证规则
      createFormRules: {
        name: { required: true, message: '名称不能为空', trigger: 'blur' }
      }
    }
  },
  created() {
    // 判断是否编辑分类
    this.id ? this.getEditData() : ''
    // 获取所有分类
    this.getCategory()
  },
  methods: {
    // 提交按钮
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        if (this.id) {
          // 编辑分类---
          const { data } = await this.$http.put(
            `/reset/categories/${this.id}`,
            this.createForm
          )
          if (data.meta.status !== 200) {
            // 编辑失败
            return this.$message({
              type: 'error',
              message: data.meta.msg
            })
          }
          // 编辑成功
          this.$message({
            type: 'success',
            message: data.meta.msg
          })
        } else {
          // 新建分类---
          const { data } = await this.$http.post(
            '/reset/categories',
            this.createForm
          )
          if (data.meta.status !== 201) {
            // 创建失败
            return this.$message({
              type: 'error',
              message: data.meta.msg
            })
          }
          // 创建成功
          this.$message({
            type: 'success',
            message: data.meta.msg
          })
        }

        // 清除表单
        this.$refs[formName].resetFields()
        // 跳转到分类页面
        this.$router.push('/categories/list')
      })
    },
    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 获取编辑分类
    async getEditData() {
      const { data } = await this.$http.get(`/reset/categories/${this.id}`)
      this.createForm = data.message
    },
    // 获取全部分类
    async getCategory() {
      const { data } = await this.$http.get('/reset/categories')
      this.options = data.message
    }
  },
  watch: {
    // 监听路由的改变 清除表单
    $route() {
      this.createForm = {}
    }
  }
}
</script>