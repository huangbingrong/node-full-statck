<template>
  <div class="adCreate">
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form :model="adCreateForm"
             :rules="adCreateFormRules"
             ref="adCreateFormRef"
             label-width="100px">
      <!--名称  -->
      <el-form-item label="名称"
                    prop="name">
        <el-input v-model="adCreateForm.name"></el-input>
      </el-form-item>
      <el-form-item label="广告"
                    prop="ad">
        <el-row>
          <!-- 添加广告按钮 -->
          <el-card>
            <el-col :span="24">
              <el-button size="mini"
                         @click="adCreateForm.ad.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
            </el-col>
            <!-- 添加广告区域 -->
            <el-col v-for="(item, i) in adCreateForm.ad"
                    :key="i"
                    :span="24"
                    style="margin-top: 1rem;">
              <el-row>
                <!-- 广告列表 -->
                <el-col>
                  <!-- 跳转链接(URL) -->
                  <el-form-item label="跳转链接(URL)"
                                label-width="120px"
                                prop="url">
                    <el-input v-model="item.url"></el-input>
                  </el-form-item>
                  <!-- 图片 -->
                  <el-form-item label="图片"
                                label-width="120px"
                                prop="icon"
                                style="margin-top: 1rem">
                    <!-- 上传图片 -->
                    <el-upload class="avatar-uploader"
                               :action="uploadUrl"
                               :headers="setHeaders()"
                               :show-file-list="false"
                               :on-success="res =>$set(item, 'img', res.icon)">
                      <img v-if="item.img"
                           :src="item.img"
                           class="avatar">
                      <i v-else
                         class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <!-- 删除 -->
                <el-col>
                  <el-button type="danger"
                             size="mini"
                             style="margin-left: 93%"
                             @click="adCreateForm.ad.splice(i, 1)">删除</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-card>
        </el-row>
      </el-form-item>
      <!-- 操作区域 -->
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('adCreateFormRef')">提交</el-button>
        <el-button @click="resetForm('adCreateFormRef')">重置</el-button>
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
      adCreateForm: {
        ad: []
      },
      // 验证规则
      adCreateFormRules: {
        name: { required: true, message: '名称不能为空', trigger: 'blur' },
        ad: { required: true },
        url: { required: true, message: '路径不能为空', trigger: 'blur' },
        icon: { required: true, message: '图标不能为空', trigger: 'blur' }
      }
    }
  },
  created() {
    this.id ? this.getAdEditData() : ''
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
          // 编辑广告
          const { data } = await this.$http.put(
            `/reset/ads/${this.id}`,
            this.adCreateForm
          )
          if (data.meta.status !== 200) {
            // 编辑失败
            return this.$message({
              type: 'error',
              message: data.meta.status
            })
          }
          this.$message({
            type: 'success',
            message: data.meta.msg
          })
        } else {
          // 新建广告
          const { data } = await this.$http.post(
            '/reset/ads',
            this.adCreateForm
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
        // 跳转到 ad/list 页面
        this.$router.push('/ad/list')
      })
    },
    // 重置按钮
    resetForm(ref) {
      this.$refs[ref].resetFields()
    },
    // 获取要编辑的广告
    async getAdEditData() {
      const { data } = await this.$http.get(`/reset/ads/${this.id}`)
      this.adCreateForm = data.message
    }
  }
}
</script>