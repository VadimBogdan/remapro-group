<template>
  <div>
    <NavInfoBar class="infobar" />
    <nuxt class="container" />
    <Footer />
  </div>
</template>
<script>
import NavInfoBar from '@/components/NavInfoBar'
import Footer from '@/components/Footer'

export default {
  components: {
    NavInfoBar,
    Footer
  }
}
</script>
<style lang="scss">
html {
  -webkit-font-smoothing: subpixel-antialiased;
}
html,
body,
div {
  margin: 0;
}
// html {
//   overflow-x: hidden;
// }
input,
textarea {
  font-size: 16px;
}
body {
  overflow-y: scroll;
  font-family: sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
}
*,
::after,
::before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  cursor: pointer;
}
h2 {
  margin: 0;
  font-size: 34px;
  line-height: 1.5;
}
</style>
