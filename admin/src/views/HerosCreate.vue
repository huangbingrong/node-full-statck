<template>
  <div class="herosCreate">
    <h1>{{ id ? '编辑' : '新建' }}英雄</h1>
    <el-form :model="herosCreateForm"
             ref="herosCreateFormRef"
             label-width="100px"
             :rules="herosCreateFormRules">
      <!-- 标签页 -->
      <el-tabs value="basic"
               type="border-card">
        <!-- 基础信息标签页 -->
        <el-tab-pane label="基础信息"
                     name="basic">
          <!-- 英雄名称 -->
          <el-form-item label="英雄名称"
                        prop="name">
            <el-input type="name"
                      v-model="herosCreateForm.name"
                      autocomplete="off"></el-input>
          </el-form-item>
          <!-- 英雄头像 -->
          <el-form-item label="英雄头像"
                        prop="avatar">
            <!-- 上传图标区域 -->
            <el-upload class="avatar-uploader"
                       :action="uploadUrl"
                       :headers="setHeaders()"
                       :show-file-list="false"
                       :on-success="uploadSuccess">
              <img v-if="herosCreateForm.avatar"
                   :src="herosCreateForm.avatar"
                   class="avatar" />
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 英雄背景 -->
          <el-form-item label="英雄背景"
                        prop="banner">
            <!-- 上传图标区域 -->
            <el-upload class="avatar-uploader"
                       :action="uploadUrl"
                       :headers="setHeaders()"
                       :show-file-list="false"
                       :on-success="res => $set(herosCreateForm,  'banner', res.icon )">
              <img v-if="herosCreateForm.banner"
                   :src="herosCreateForm.banner"
                   class="avatar" />
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 称号 -->
          <el-form-item label="英雄称号"
                        prop="title">
            <el-input v-model="herosCreateForm.title"></el-input>
          </el-form-item>
          <!-- 分类 -->
          <el-form-item label="英雄分类"
                        prop="categories">
            <el-select v-model="herosCreateForm.categories"
                       multiple>
              <el-option v-for="item in categories"
                         :key="item._id"
                         :value="item._id"
                         :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <!-- 困难 -->
          <el-form-item label="英雄等级">
            <el-form-item label="困难"
                          prop="scores">
              <el-rate style="margin-top: 0.7rem"
                       v-model="herosCreateForm.scores.difficult"
                       :max="9"
                       show-score></el-rate>
            </el-form-item>
            <!-- 名称 -->
            <el-form-item label="名称">
              <el-rate style="margin-top: 0.7rem"
                       v-model="herosCreateForm.scores.skill"
                       :max="9"
                       show-score></el-rate>
            </el-form-item>
            <!-- 攻击 -->
            <el-form-item label="攻击">
              <el-rate style="margin-top: 0.7rem"
                       v-model="herosCreateForm.scores.attack"
                       :max="9"
                       show-score></el-rate>
            </el-form-item>
            <!-- 生存 -->
            <el-form-item label="生存">
              <el-rate style="margin-top: 0.7rem"
                       v-model="herosCreateForm.scores.exist"
                       :max="9"
                       show-score></el-rate>
            </el-form-item>
          </el-form-item>
          <!-- 顺风装备 -->
          <el-form-item label="顺风装备"
                        prop="goods1">
            <el-select multiple
                       v-model="herosCreateForm.goods1">
              <el-option v-for="item in goods"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 逆风装备 -->
          <el-form-item label="逆风装备"
                        prop="goods2">
            <el-select multiple
                       v-model="herosCreateForm.goods2">
              <el-option v-for="item in goods"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 使用技巧 -->
          <el-form-item label="使用技巧"
                        prop="usage">
            <el-input type="textarea"
                      v-model="herosCreateForm.usage"></el-input>
          </el-form-item>
          <!-- 对抗技巧 -->
          <el-form-item label="对抗技巧"
                        prop="compete">
            <el-input type="textarea"
                      v-model="herosCreateForm.compete"></el-input>
          </el-form-item>
          <!-- 团战思路 -->
          <el-form-item label="团战思路"
                        prop="team">
            <el-input type="textarea"
                      v-model="herosCreateForm.team"></el-input>
          </el-form-item>
        </el-tab-pane>

        <!-- 添加技能标签页 -->
        <el-tab-pane label="添加技能"
                     name="skill">
          <el-button size="mini"
                     @click="herosCreateForm.skills.push({})"><i class="el-icon-plus"></i>添加技能 </el-button>
          <el-row>
            <el-col :span="12"
                    v-for="(item, i) in herosCreateForm.skills"
                    :key="i"
                    style="margin-top: 2rem">
              <!-- 技能名称 -->
              <el-form-item label="技能名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <!-- 技能图标 -->
              <el-form-item label="技能图标">
                <!-- 上传图标区域 -->
                <el-upload class="avatar-uploader"
                           :action="uploadUrl"
                           :headers="setHeaders()"
                           :show-file-list="false"
                           :on-success="
										res => $set(item, 'icon', res.icon)
									">
                  <img v-if="item.icon"
                       :src="item.icon"
                       class="avatar" />
                  <i v-else
                     class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <!-- 冷却值 -->
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <!-- 消耗 -->
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <!-- 技能描述 -->
              <el-form-item label="技能描述">
                <el-input type="textarea"
                          v-model="item.description"></el-input>
              </el-form-item>
              <!-- 小提示 -->
              <el-form-item label="小提示">
                <el-input type="textarea"
                          v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger"
                           size="mini"
                           @click="herosCreateForm.skills.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- 最佳搭档标签页 -->
        <el-tab-pane label="添加搭档"
                     name="partners">
          <el-button size="mini"
                     @click="herosCreateForm.partners.push({})"><i class="el-icon-plus"></i>添加搭档 </el-button>
          <el-row>
            <el-col :span="12"
                    v-for="(item, i) in herosCreateForm.partners"
                    :key="i"
                    style="margin-top: 2rem">
              <!-- 搭档英雄 -->
              <el-form-item label="搭档英雄">
                <el-select v-model="item.hero"
                           placeholder="请选择搭档英雄"
                           filterable>
                  <el-option v-for="hero in heroes"
                             :key="hero._id"
                             :label="hero.name"
                             :value="hero._id">
                  </el-option>
                </el-select>

              </el-form-item>
              <!-- 搭档描述 -->
              <el-form-item label="搭档描述">
                <el-input type="textarea"
                          v-model="item.introduce"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger"
                           size="mini"
                           @click="herosCreateForm.partners.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <!-- 操作区域 -->
      <el-form-item style="margin-top: 1rem">
        <el-button type="primary"
                   @click="submitForm('herosCreateFormRef')">提交</el-button>
        <el-button @click="resetForm('herosCreateFormRef')">重置</el-button>
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
      // 表单数据
      herosCreateForm: {
        name: '',
        icon: '',
        banner: '',
        scores: {},
        skills: [],
        partners: []
      },
      // 分类数据
      categories: [],
      // 物品数据
      goods: [],
      // 英雄列表
      heroes: [],
      // 表单验证
      herosCreateFormRules: {
        name: { required: true, message: '英雄名称不能为空', trriger: 'blur' },
        avatar: {
          required: true,
          message: '英雄头像不能为空',
          trriger: 'blur'
        },
        banner: {
          required: true,
          message: '英雄背景不能为空',
          trriger: 'blur'
        },
        title: { required: true, message: '英雄称号不能为空', trriger: 'blur' },
        usage: { required: true, message: '使用技巧不能为空', trriger: 'blur' },
        compete: {
          required: true,
          message: '对抗技巧不能为空',
          trriger: 'blur'
        },
        team: { required: true, message: '团队思路不能为空', trriger: 'blur' },
        name2: { required: true, message: '技能名称不能为空', trriger: 'blur' },
        icon: { required: true, message: '技能图标不能为空', trriger: 'blur' },
        delay: { required: true, message: '冷却值不能为空', trriger: 'blur' },
        cost: { required: true, message: '消耗不能为空', trriger: 'blur' },
        description: {
          required: true,
          message: '技能描述不能为空',
          trriger: 'blur'
        },
        tips: { required: true, message: '小提示不能为空', trriger: 'blur' }
      }
    }
  },
  created() {
    this.id ? this.getHeroById() : ''
    this.getCategories()
    this.getGoods()
    this.getHeroes()
  },
  methods: {
    // 提交按钮
    submitForm(ref) {
      this.$refs[ref].validate(async valid => {
        // 验证失败
        if (!valid) return false
        // 验证成功
        if (this.id) {
          // 编辑英雄
          const { data } = await this.$http.put(
            `/reset/heros/${this.id}`,
            this.herosCreateForm
          )
          // 编辑失败
          if (data.meta.status !== 200)
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
          // 添加英雄
          const { data } = await this.$http.post(
            '/reset/heros',
            this.herosCreateForm
          )
          // 添加失败
          if (data.meta.status !== 201)
            return this.$message({
              type: 'error',
              message: data.meta.msg
            })
          // 添加成功
          this.$message({
            type: 'success',
            message: data.meta.msg
          })
        }
        // 跳转到 herosList 页面
        this.$router.push('/heros/list')
      })
    },
    // 重置按钮
    resetForm(ref) {
      this.$refs[ref].resetFields()
      this.herosCreateForm.skills = []
    },
    // 上传图标
    uploadSuccess(res) {
      this.herosCreateForm.icon = res.icon
    },
    // 根据id获取英雄信息
    async getHeroById() {
      const { data } = await this.$http.get(`/reset/heros/${this.id}`)
      this.herosCreateForm = Object.assign(
        {},
        this.herosCreateForm,
        data.message
      )
    },
    // 获取分类数据
    async getCategories() {
      const { data } = await this.$http.get('/reset/categories')
      this.categories = data.message
    },
    // 获取分类数据
    async getGoods() {
      const { data } = await this.$http.get('/reset/goods')
      this.goods = data.message
    },
    // 获取英雄数据
    async getHeroes() {
      const { data } = await this.$http.get('/reset/heroes')
      this.heroes = data.message
    }
  },
  watch: {
    // 监听路由的改变 清除表单
    $route() {
      this.herosCreateForm = {}
    }
  }
}
</script>
