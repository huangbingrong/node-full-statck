<template>
  <div class="adminCreate">
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form :model="adminCreateForm"
             ref="adminCreateFormRef"
             :rules="adminCreateFormRules"
             label-width="100px">
      <!-- 用户名 -->
      <el-form-item label="用户名"
                    prop="name">
        <el-input v-model="adminCreateForm.name"></el-input>
      </el-form-item>
      <!-- 头像 -->
      <el-form-item label="头像"
                    prop="avarta">
        <!-- 上传头像 -->
        <el-upload class="avatar-uploader"
                   :action="uploadUrl"
                   :headers="setHeaders()"
                   :show-file-list="false"
                   :on-success="res => $set(adminCreateForm, 'avatar', res.icon)">
          <img v-if="adminCreateForm.avatar"
               :src="adminCreateForm.avatar"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item :label="id ? '原密码' : '密码'"
                    prop="password">
        <el-input type="password"
                  v-model="adminCreateForm.password"></el-input>
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item :label="id ? '新密码' : '确认密码'"
                    :prop="id ? 'password' : 'password2'">
        <el-input type="password"
                  v-model="adminCreateForm.password2"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- 操作 -->
        <el-button type="primary"
                   @click="submitForm('adminCreateFormRef')">提交</el-button>
        <el-button @click="resetForm('adminCreateFormRef')">重置</el-button>
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
    // 验证两次密码是否一致
    const checkedPass = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.adminCreateForm.password) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      // 表单数据对象
      adminCreateForm: {
        password3: ''
      },
      // 原始密码
      password2: '',
      // 表单验证规则
      adminCreateFormRules: {
        name: { required: true, message: '用户名不能为空', trigger: 'blur' },
        password: {
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        },
        // 验证两次密码是否一致
        password2: [
          { validator: checkedPass, required: true, trigger: 'blur' },
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.id ? this.getEditAdmin() : ''
  },
  methods: {
    // 提交按钮
    submitForm(ref) {
      // 表单验证
      this.$refs[ref].validate(async valid => {
        // 验证失败
        if (!valid) return false
        // 验证成功
        if (this.id) {
          // 编辑管理员
          const { data } = await this.$http.put(
            `/admin/create/${this.id}`,
            this.adminCreateForm
          )
          if (data.meta.status !== 200)
            // 编辑失败
            return this.$message({
              type: 'error',
              message: data.meta.msg
            })
          // 编辑成功
          this.$message({
            type: 'success',
            message: data.meta.msg
          })
        } else {
          // 重新拼接一个表单数据对象
          const formData = {
            name: this.adminCreateForm.name,
            avatar: this.adminCreateForm.avatar,
            password: this.adminCreateForm.password
          }
          // 新建管理员
          const { data } = await this.$http.post('/reset/admins', formData)
          if (data.meta.status !== 201)
            // 新建失败
            return this.$message({
              type: 'error',
              message: data.meta.msg
            })
          // 新建成功
          this.$message({
            type: 'success',
            message: data.meta.status
          })
        }
        // 跳转到 admin/list 页面
        this.$router.push('/admin/list')
      })
    },
    // 重置按钮
    resetForm(ref) {
      this.$refs[ref].resetFields()
    },
    // 获取要编辑的管理员
    async getEditAdmin() {
      const { data } = await this.$http.get(`/reset/admins/${this.id}`)
      this.adminCreateForm = data.message
      this.password2 = data.message.password
      this.adminCreateForm.password = ''
    }
  },
  watch: {
    // 监听路由的改变 清除表单
    $route() {
      this.adminCreateForm = {}
    }
  }
}
</script>