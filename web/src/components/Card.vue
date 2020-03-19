<template>
  <div class="card py-3 mt-3 px-3 bg-white">
    <div :class="`card-header d-flex fs-xl ${!plain? 'bb-1':''}`">
      <i :class="'iconfont' + ' icon-'+ icon"></i>
      <div class="title flex-1 pb-3 ml-2 text-bold">{{title}}</div>
      <i v-if="!plain"
         class="iconfont icon-sangedian"></i>
    </div>
    <div class="card-body mt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    plain: { type: Boolean }
  }
}
</script>