<template>
  <div class="container color-white">Hello {{ msg }}</div>
</template>

<script>
import './core.styl' // Must configure `rules test .styl` in webpack 

export default {
  data() {
      return {
          msg: 'World!'
      }
  }
}
</script>

<style lang="stylus">
  // @import './core.styl'

  .container
    background-color #333
</style>

