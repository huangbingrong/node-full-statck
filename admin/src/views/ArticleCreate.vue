<template>
  <div class="articleCreate">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="100px"
             :model="articleCreateForm"
             :rules="articleCreateRules"
             ref="articleCreateRef">
      <!-- 上级分类 -->
      <el-form-item label="上级分类"
                    prop="categories">
        <el-select v-model="articleCreateForm.categories"
                   multiple>
          <el-option v-for="item in categories"
                     :key="item._id"
                     :value="item._id"
                     :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <!-- 名称 -->
      <el-form-item label="名称"
                    prop="title">
        <el-input v-model="articleCreateForm.title"></el-input>
      </el-form-item>
      <!-- 文章 -->
      <el-form-item label="文章"
                    prop="body">
        <!-- 富文本编辑器 -->
        <VueEditor v-model="articleCreateForm.body"
                   useCustomImageHandler
                   @image-added="handleImageAdded"></VueEditor>
      </el-form-item>
      <!-- 操作区域 -->
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('articleCreateRef')">提交</el-button>
        <el-button @click="resetForm('articleCreateRef')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      // 表单对象
      articleCreateForm: {},
      // 分类列表
      categories: {},
      icon: {},
      // 表单验证规则
      articleCreateRules: {
        categories: {
          required: true,
          message: '分类不能为空',
          trigger: 'blur'
        },
        title: { required: true, message: '名称不能为空', trigger: 'blur' },
        body: { required: true, message: '名称不能为空', trigger: 'blur' }
      }
    }
  },
  created() {
    this.getCategories()
    this.id ? this.getArticleData() : ''
  },
  methods: {
    // 获取分类列表
    async getCategories() {
      const { data } = await this.$http.get('/reset/categories')
      this.categories = data.message
    },
    // 提交按钮
    async submitForm(ref) {
      // 验证表单
      this.$refs[ref].validate(async valid => {
        // 验证失败
        if (!valid) return false
        // 验证成功
        if (this.id) {
          // 编辑文章
          const { data } = await this.$http.put(
            `/reset/articles/${this.id}`,
            this.articleCreateForm
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
          // 新建文章
          const { data } = await this.$http.post(
            '/reset/articles',
            this.articleCreateForm
          )
          // 新建失败
          if (data.meta.status !== 201)
            return this.$message({
              type: 'error',
              message: data.meta.msg
            })
          // 新建成功
          this.$message({
            type: 'success',
            message: data.meta.msg
          })
        }
        // 跳转到 article/list 页面
        this.$router.push('/article/list')
      })
    },
    // 重置按钮
    async resetForm(ref) {
      this.$refs[ref].resetFields()
    },
    // 获取要编辑的数据
    async getArticleData() {
      const { data } = await this.$http.get(`/reset/articles/${this.id}`)
      this.articleCreateForm = data.message
    },
    // 保存副文本中的图片
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)

      const res = await this.$http.post('/upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.icon)
      resetUploader()
    }
  },
  watch: {
    $route() {
      // 监听路由的改变 清除表单
      this.articleCreateForm = {}
    }
  }
}
</script>