<template>
  <div class="container color-white">
    <h1>Hello {{ msg }}</h1>
    <p>
    <router-link to="/foo">
    Go to Foo</router-link>
    <router-link to="/bar.html">Go to Bar.html</router-link>
  </p>
  <router-view></router-view>
  </div>
</template>

<script>
import './core.styl' // Must configure `rules test .styl` in webpack

export default {
  data () {
    return {
      msg: 'World!!!'
    }
  }
}
</script>

<style lang="stylus">
  // @import './core.styl'

  .container
    background-color #333
</style>

