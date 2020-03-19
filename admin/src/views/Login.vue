<template>
  <div class="login">
    <el-card class="loginHeader"
             header="用户登陆">
      <el-form :model="loginForm"
               label-width="4rem"
               :rules="loginFormRules"
               ref="loginFormRef">
        <el-form-item label="用户名"
                      prop="name">
          <el-input v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input type="password"
                    v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('loginFormRef')">登陆</el-button>
          <el-button @click="resetForm('loginFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单对象
      loginForm: {},
      // 表单验证规则
      loginFormRules: {
        name: { required: true, message: '用户名不能为空', trigger: 'blur' },
        password: { required: true, message: '密码不能为空', trigger: 'blur' }
      }
    }
  },
  methods: {
    // 提交按钮
    submitForm(ref) {
      // 表单验证
      this.$refs[ref].validate(async valid => {
        // 验证失败
        if (!valid) return false
        // 验证成功
        const { data } = await this.$http.post('/login', this.loginForm)
        // 登陆失败
        if (data.meta.status !== 200) return false
        // 保存 token
        localStorage.token = data.token
        // 跳转到主页面
        this.$router.push('/')
        // 登陆成功
        this.$message({
          type: 'success',
          message: data.meta.msg
        })
      })
    },
    // 提交按钮
    resetForm(ref) {
      this.$refs[ref].resetFields()
    }
  }
}
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.loginHeader {
  width: 25rem;
  margin: 8rem auto;
}
</style>