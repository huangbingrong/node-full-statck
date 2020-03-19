<template>
  <div class="heroes"
       v-if="heroes">
    <!-- 头部区域 -->
    <div class="topbar d-flex bg-black py-2 px-3 ai-center">
      <!-- 头部 logo -->
      <img src="../assets/img/logo.png"
           style="height: 2.3rem">
      <div class="title ml-2 flex-1">
        <span class="text-white fs-md">王者荣耀</span>
        <span class="text-light pl-3">攻略战</span>
      </div>
      <div class="text-white">更多英雄 &gt;</div>
    </div>

    <!-- banner区域 -->
    <div class="page-hero"
         :style="{'background-image': `url(${heroes.banner})`}">
      <div class="info text-white p-3 d-flex flex-column jt-end">
        <div class="fs-xs">{{heroes.title}}</div>
        <h2 class="my-2">{{heroes.name}}</h2>
        <div class="fs-xs">{{heroes.categories.map(v => v.name).join('/')}}</div>
        <div v-if="heroes.scores"
             class="d-flex jt-between">
          <div class="mt-1 d-flex jt-center">
            难度<span class="badge bg-primary mx-1  fs-xxs">{{heroes.scores.difficult}}</span>
            技能<span class="badge bg-blue mx-1  fs-xxs">{{heroes.scores.skill}}</span>
            攻击<span class="badge bg-danger mx-1  fs-xxs">{{heroes.scores.attack}}</span>
            生存<span class="badge bg-dark mx-1  fs-xxs">{{heroes.scores.exist}}</span>
          </div>
          <router-link tag="div"
                       to="/">
            皮肤 2 &gt;
          </router-link>
        </div>
      </div>
    </div>

    <!-- tabbar 区域 -->
    <div class="nav d-flex jt-around pt-3 pb-2 bg-white">
      <div class="nav-link active-inverse">英雄初识</div>
      <div class="nav-link">进阶攻略</div>
    </div>

    <!-- 主体 -->
    <div class="bg-white main px-3">
      <div class="divider"></div>
      <swiper class="swiper">
        <swiper-slide>
          <div class="d-flex jt-around py-2">
            <router-link tag="div"
                         to="/"
                         class="btn-large bg-light-1 fs-md mr-2"><i class="iconfont icon-bofang_huaban pr-2 text-primary"></i>英雄介绍视频</router-link>
            <router-link tag="div"
                         to="/"
                         class="btn-large bg-light-1 fs-md"> <i class="iconfont icon-tupian pr-2 text-primary"></i>一图识英雄</router-link>
          </div>
        </swiper-slide>
      </swiper>
      <!-- 技能 -->
      <div class="d-flex jt-around pt-4"
           v-if="heroes">
        <img :src="item.icon"
             v-for="(item, i) in heroes.skills"
             :key="i"
             :class="{active: activeIndex === i}"
             @click="activeIndex = i">
      </div>
      <div class="py-2 d-flex my-3">
        <h3 class="m-0 pr-3">{{heroes.skills[activeIndex].name}}</h3>
        <span class="fs-xs">(冷却值：{{heroes.skills[activeIndex].delay}} 消耗：{{heroes.skills[activeIndex].cost}})</span>
      </div>
      <div class="pb-2"
           style="line-height:1.5rem">{{heroes.skills[activeIndex].description}}
      </div>
      <div class="divider"></div>
      <div class="pt-2 text-grey fs-xs pb-3">小提示：{{heroes.skills[activeIndex].tips}}</div>
    </div>
    <!-- 出装推荐 -->
    <c-card plain
            title="出装推荐"
            icon="jinqian">
      <!-- 顺风出装 -->
      <div class="text-bold">顺风出装</div>
      <div class="d-flex goods jt-around text-center py-2">
        <div v-for="(item, i) in heroes.goods1"
             :key="i">
          <img :src="item.icon">
          <div class="fs-xs">{{item.name}}</div>
        </div>
      </div>
      <div class="divider pb-2"></div>
      <!-- 逆风出装 -->
      <div class="text-bold pt-2">逆风出装</div>
      <div class="d-flex goods jt-around text-center py-2">
        <div v-for="(item, i) in heroes.goods2"
             :key="i">
          <img :src="item.icon">
          <div class="fs-xs">{{item.name}}</div>
        </div>
      </div>
    </c-card>
    <!-- 使用技巧 -->
    <c-card plain
            title="使用技巧"
            icon="quanzi">
      <p style="line-height:1.5rem">{{heroes.usage}}</p>
    </c-card>
    <!-- 对抗技巧 -->
    <c-card plain
            title="对抗技巧"
            icon="dingwei">
      <p style="line-height:1.5rem">{{heroes.compete}}</p>
    </c-card>
    <!-- 团战思路 -->
    <c-card plain
            title="团战思路"
            icon="quanzi">
      <p style="line-height:1.5rem">{{heroes.team}}</p>
    </c-card>
    <!-- 最佳搭档 -->
    <c-card plain
            title="最佳搭档"
            icon="menu">
      <div class="d-flex pb-2"
           v-for="(item, i) in heroes.partners"
           :key="i">
        <img class="img"
             :src="item.hero.avatar">
        <span class="pl-2"
              style="line-height: 1.5rem">{{item.introduce}}</span>
      </div>
    </c-card>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  created() {
    this.getheroDetail()
  },
  data() {
    return {
      // 英雄数据
      heroes: null,
      // 当前激活的技能图标索引
      activeIndex: 0
    }
  },
  methods: {
    async getheroDetail() {
      const { data } = await this.$http.get(`/hero/${this.id}`)
      this.heroes = data.message
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/_variables.scss';

.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}

.page-hero {
  height: 30vh;
  width: 100%;
  background: #fff no-repeat top center;
  background-size: 100% 100%;
  .info {
    height: 100%;
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .badge {
      display: inline-block;
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
      text-align: center;
      line-height: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
}

.main {
  .swiper {
    .btn-large {
      border: 1px solid map-get($map: $colors, $key: 'light');
      line-height: 2.5rem;
      text-align: center;
      width: 50%;
    }
  }
  img {
    height: 5.3846rem;
    width: 5.3846rem;
    border: 0.1538rem solid map-get($map: $colors, $key: 'white');
    &.active {
      border-color: map-get($map: $colors, $key: 'primary');
      border-radius: 50%;
    }
  }
}

.goods {
  img {
    width: 3.8462rem;
    height: 3.8462rem;
    border-radius: 50%;
  }
}

.img {
  width: 3.8462rem;
  height: 3.8462rem;
}
</style>