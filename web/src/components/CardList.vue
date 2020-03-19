<template>
  <div class="cardList">
    <c-card :icon="icon"
            :title="title">
      <!-- tabbar -->
      <div class="nav d-flex ai-center jt-between">
        <div class="nav-item"
             v-for="(item, i) in categorys"
             :key="i">
          <div :class="'nav-link'+ ' pb-1' + (i===activeIndex? ' active-inverse' : '')"
               @click="() => $refs.list.swiper.slideTo(i)">
            {{item.name}}
          </div>
        </div>
      </div>
      <!-- swipe -->
      <div>
        <swiper ref="list"
                :options="swiperOption"
                @slide-change="() => activeIndex = $refs.list.swiper.realIndex">
          <swiper-slide v-for="(item, i) in categorys"
                        :key="i">
            <!-- 作用域插槽并把子组件遍历的数据项传到父组件 -->
            <slot name="items"
                  :categorys="item">
            </slot>
          </swiper-slide>
          <!-- 幻灯片指示按钮 -->
          <div class="swiper-pagination"
               slot="pagination"></div>
        </swiper>
      </div>

    </c-card>
  </div>
</template>


<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categorys: { type: Array }
  },
  data() {
    return {
      // 当前显示的 tabbar
      activeIndex: 0,
      // 轮播图属性参数
      swiperOption: {
        autoHeight: true
      }
    }
  }
}
</script>