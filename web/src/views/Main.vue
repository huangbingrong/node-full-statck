<template>
  <div class="main">
    <!-- 头部区域 -->
    <div class="topbar d-flex bg-black py-2 px-3 ai-center">
      <!-- 头部 logo -->
      <img src="../assets/img/logo.png"
           style="height: 2.3rem">
      <div class="title ml-2 flex-1">
        <div class="text-white fs-md">王者荣耀</div>
        <div class="text-grey fs-xxs">团队成就更多</div>
      </div>
      <!-- 头部按钮 -->
      <button class="btn bg-primary">立即下载</button>
    </div>

    <!-- tabbar区域 -->
    <div class="nav bg-primary d-flex jt-around py-2 fs-md text-white">
      <div class="nav-item py-1">
        <router-link class="nav-link active pb-1"
                     tag="div"
                     to="/">首页</router-link>
      </div>
      <div class="nav-item py-1">
        <router-link class="nav-link"
                     tag="div"
                     to="/">攻略中心</router-link>
      </div>
      <div class="nav-item py-1">
        <router-link class="nav-link"
                     tag="div"
                     to="/">赛事中心</router-link>
      </div>
    </div>
    <!-- 主体区域 -->
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.main {
  .topbar {
    position: sticky;
    top: 0;
    z-index: 999;
  }
}
</style>