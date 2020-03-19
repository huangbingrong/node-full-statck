<template>
  <div class="home">
    <!-- 轮播 -->
    <swiper class="swiper"
            :options="swiperOption">
      <swiper-slide>
        <img src="../assets/img/swipe.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/img/swipe.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/img/swipe.jpeg">
      </swiper-slide>
      <!-- 幻灯片指示按钮 -->
      <div class="swiper-pagination pagination-home text-right"
           slot="pagination"></div>
    </swiper>

    <!-- 导航区域 -->
    <div class="nav mt-3 bt-1 bb-1">
      <div class="d-flex flex-wrap text-center bg-white">
        <div class="nav-item my-3 bl-1"
             style="width: 25%">
          <i class="sprite sprite-icon"></i>
          <div class="mt-2">爆料站</div>
        </div>
        <div class="nav-item my-3 bl-1"
             style="width: 25%">
          <i class="sprite sprite-icon"></i>
          <div class="mt-2">故事站</div>
        </div>
        <div class="nav-item my-3 bl-1"
             style="width: 25%">
          <i class="sprite sprite-icon"></i>
          <div class="mt-2">周边商城</div>
        </div>
        <div class="nav-item my-3 bl-1"
             style="width: 25%">
          <i class="sprite sprite-icon"></i>
          <div class="mt-2">体验服</div>
        </div>
        <div class="nav-item my-3 bl-1"
             style="width: 25%">
          <i class="sprite sprite-icon"></i>
          <div class="mt-2">新人专区</div>
        </div>
        <div class="nav-item my-3 bl-1"
             style="width: 25%">
          <i class="sprite sprite-icon"></i>
          <div class="mt-2">荣耀-传承</div>
        </div>
        <div class="nav-item my-3 bl-1"
             style="width: 25%">
          <i class="sprite sprite-icon"></i>
          <div class="mt-2">同人社区</div>
        </div>
        <div class="nav-item my-3 bl-1"
             style="width: 25%">
          <i class="sprite sprite-icon"></i>
          <div class="mt-2">王者营地</div>
        </div>
        <div class="nav-item my-3 bl-1"
             style="width: 25%">
          <i class="sprite sprite-icon"></i>
          <div class="mt-2">公众号</div>
        </div>
        <div class="nav-item my-3 bl-1"
             style="width: 25%">
          <i class="sprite sprite-icon"></i>
          <div class="mt-2">版本介绍</div>
        </div>
      </div>
      <!-- 收起导航按钮区域 -->
      <div class="width-100 text-center bg-light-1 py-2 fs-sm">
        <i class="arrow-icon mr-1 mt-1"></i>
        <span>收起</span>
      </div>
    </div>

    <!-- 新闻资讯 -->
    <c-cardList icon="menu"
                title="新闻列表"
                :categorys="newsList">
      <template #items="{categorys}">
        <!-- 接受子组件穿的值 -->
        <router-link :to="`/article/${item._id}`"
                     tag="div"
                     class="d-flex fs-lg"
                     v-for="(item, i) in categorys.newsList"
                     :key="i">
          <p class="pr-2 text-info">[{{item.categoriesName}}]</p>
          <p>|</p>
          <p class="flex-1 pl-2 pr-2 text-dark text-ellipsis">{{item.title}}</p>
          <p class="text-info">{{item.createdAt | dateFormat}}</p>
        </router-link>
      </template>
    </c-cardList>

    <!--英雄列表-->
    <c-cardList icon="toukui"
                title="英雄列表"
                :categorys="heroesList">
      <template #items="{categorys}">
        <!-- 接受子组件穿的值 -->
        <div class="d-flex flex-wrap"
             style="margin: 0 -0.5rem">
          <router-link tag="div"
                       :to="`/heroes/${item._id}`"
                       class="text-center p-2"
                       v-for="(item, i) in categorys.heroesList"
                       :key="i"
                       style="width: 20%">
            <img :src="item.avatar"
                 class="width-100">
            <div>{{item.name}}</div>
          </router-link>
        </div>
      </template>
    </c-cardList>

    <!-- 精彩时刻 -->
    <c-cardList icon="dianshi"
                title="精彩时刻">
    </c-cardList>

  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图属性参数
      swiperOption: {
        autoHeight: true,
        loop: true,
        loopAdditionalSliedes: 3,
        slidesPreView: 1,
        autoplay: {
          delay: 3000,
          disableOnInteraction: true
        },
        pagination: {
          el: '.pagination-home'
        }
      },
      // 新闻列表数据
      newsList: [],
      // 英雄列表数据
      heroesList: []
    }
  },
  created() {
    this.getNewsList()
    this.getHeroesList()
  },
  methods: {
    // 获取新闻列表数据
    async getNewsList() {
      const { data } = await this.$http.get('/news/list')
      this.newsList = data.message
    },
    // 获取英雄列表数据
    async getHeroesList() {
      const { data } = await this.$http.get('/heroes/list')
      this.heroesList = data.message
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/_variables.scss';

// swipe
.swiper {
  img {
    width: 100%;
  }
  .pagination-home {
    .swiper-pagination-bullet {
      opacity: 1;
      border-radius: 0.2308rem;
      background: map-get($map: $colors, $key: 'white');
    }
    &.swiper-pagination-bullet-active {
      background: map-get($map: $colors, $key: 'info');
    }
  }
}

// nav
.nav {
  .nav-item {
    &:nth-child(4n + 1) {
      border: none;
    }
    &:nth-child(1) {
      .sprite-icon {
        display: inline-block;
        background: url('../assets/img/sprite.png') no-repeat -17.2308rem -5.1538rem;
        background-size: 28.8462rem 35rem;
        width: 1.7692rem;
        height: 1.5385rem;
      }
    }
    &:nth-child(2) {
      .sprite-icon {
        display: inline-block;
        background: url('../assets/img/sprite.png') no-repeat -9.8462rem -5.0769rem;
        background-size: 28.8462rem 35rem;
        width: 1.7692rem;
        height: 1.5385rem;
      }
    }
    &:nth-child(3) {
      .sprite-icon {
        display: inline-block;
        background: url('../assets/img/sprite.png') no-repeat -10.0769rem -0.3077rem;
        background-size: 28.8462rem 35rem;
        width: 1.7692rem;
        height: 1.5385rem;
      }
    }
    &:nth-child(4) {
      .sprite-icon {
        display: inline-block;
        background: url('../assets/img/sprite.png') no-repeat -2.8462rem -5.1538rem;
        background-size: 28.8462rem 35rem;
        width: 1.7692rem;
        height: 1.5385rem;
      }
    }
    &:nth-child(5) {
      .sprite-icon {
        display: inline-block;
        background: url('../assets/img/sprite.png') no-repeat -24.5385rem -0.3846rem;
        background-size: 28.8462rem 35rem;
        width: 1.7692rem;
        height: 1.5385rem;
      }
    }
    &:nth-child(6) {
      .sprite-icon {
        display: inline-block;
        background: url('../assets/img/sprite.png') no-repeat -9.8462rem -5.0769rem;
        background-size: 28.8462rem 35rem;
        width: 1.7692rem;
        height: 1.5385rem;
      }
    }
    &:nth-child(7) {
      .sprite-icon {
        display: inline-block;
        background: url('../assets/img/sprite.png') no-repeat -2.6154rem -0.3846rem;
        background-size: 28.8462rem 35rem;
        width: 1.7692rem;
        height: 1.5385rem;
      }
    }
    &:nth-child(8) {
      .sprite-icon {
        display: inline-block;
        background: url('../assets/img/sprite.png') no-repeat -17.0769rem -0.3077rem;
        background-size: 28.8462rem 35rem;
        width: 1.7692rem;
        height: 1.5385rem;
      }
    }
    &:nth-child(9) {
      .sprite-icon {
        display: inline-block;
        background: url('../assets/img/sprite.png') no-repeat 0 -32.1538rem;
        background-size: 28.8462rem 35rem;
        width: 1.7692rem;
        height: 1.5385rem;
      }
    }
    &:nth-child(10) {
      .sprite-icon {
        display: inline-block;
        background: url('../assets/img/sprite.png') no-repeat -17.2308rem -5.1538rem;
        background-size: 28.8462rem 35rem;
        width: 1.7692rem;
        height: 1.5385rem;
      }
    }
  }
  .packUp {
    .arrow-icon {
      display: inline-block;
      background: url('../assets/img/sprite.png') no-repeat -10.8462rem -17.8462rem;
      background-size: 28.8462rem 35rem;
      width: 0.7692rem;
      height: 0.7692rem;
    }
  }
}
</style>
