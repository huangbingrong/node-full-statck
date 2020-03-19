<template>
  <div calss="goodsCreate">
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form :model="goodsCreateForm"
             ref="goodsCreateRef"
             label-width="100px"
             :rules="goodsCreateRules">
      <!-- 物品名称区域 -->
      <el-form-item label="物品名称"
                    prop="name">
        <el-input type="name"
                  v-model.number="goodsCreateForm.name"
                  autocomplete="off"></el-input>
      </el-form-item>
      <!-- 物品图标区域 -->
      <el-form-item label="物品图标"
                    prop="icon">
        <!-- 上传区域 -->
        <el-upload class="avatar-uploader"
                   :action="uploadUrl"
                   :headers="setHeaders()"
                   :show-file-list="false"
                   :on-success="uploadSuccess">
          <img v-if="goodsCreateForm.icon"
               :src="goodsCreateForm.icon"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 操作区域 -->
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('goodsCreateRef')">提交</el-button>
        <el-button @click="resetForm('goodsCreateRef')">重置</el-button>
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
      // 物品表单对象
      goodsCreateForm: {
        name: '',
        icon: ''
      },
      // 表单验证规则
      goodsCreateRules: {
        name: { required: true, message: '名称不能为空', trigger: 'blur' },
        icon: { required: true, message: '图标不能为空', trigger: 'blur' }
      }
    }
  },
  created() {
    // 获取要编辑的物品
    this.id ? this.getGoodsById() : ''
  },
  methods: {
    // 提交按钮
    submitForm(ref) {
      // 表单验证
      this.$refs[ref].validate(async valid => {
        if (!valid) return false
        // 通过验证
        if (this.id) {
          // 编辑商品
          const { data } = await this.$http.put(
            `/reset/goods/${this.id}`,
            this.goodsCreateForm
          )
          if (data.meta.status !== 200) {
            // 请求失败
            return this.$message({
              type: 'success',
              message: data.meta.msg
            })
          }
          // 请求成功
          this.$message({
            type: 'success',
            message: data.meta.msg
          })
        } else {
          // 添加商品
          const { data } = await this.$http.post(
            '/reset/goods',
            this.goodsCreateForm
          )
          if (data.meta.status !== 201) {
            // 请求失败
            return this.$message({
              type: 'error',
              message: data.meta.msg
            })
          }
          // 请求成功
          this.$message({
            type: 'success',
            message: data.meta.msg
          })
        }

        // 清除表单
        this.$refs[ref].resetFields()
        // 跳转到 goods/list 页面
        this.$router.push('/goods/list')
      })
    },
    // 重置按钮
    resetForm(ref) {
      this.$refs[ref].resetFields()
    },
    // 获取要编辑的物品
    async getGoodsById() {
      const { data } = await this.$http.get(`reset/goods/${this.id}`)
      this.goodsCreateForm = data.message
    },
    // 图标上传成功
    uploadSuccess(res) {
      // vue 中原始赋值方法
      // this.$set(this.goodsCreateForm, 'icon', res.icon)
      this.goodsCreateForm.icon = res.icon
    }
  },
  watch: {
    // 监听路由的改变 清除表单
    $route() {
      this.goodsCreateForm = {}
    }
  }
}
</script>
