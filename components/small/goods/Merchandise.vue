<template>
  <div class="merch_container">
    <a>
      <h3>{{ title }}</h3>
    </a>
    <slot></slot>
    <img :src="require('~/assets/merch/' + src + '.png')" alt="merch" class="merch_image" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.merch_container {
  width: 265px;
  height: 270px;
  padding: 0 15px;
  ul {
    margin: 0 0 20px;
    padding: 0 0px 0px 20px;
  }
  h3 {
    color: #242526;
    font-family: 'Open Sans';
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0px;
    line-height: 27px;
    margin: 0 0 12px;
  }
  li {
    color: #727272;
    padding: 6px 0;
  }
  .merch_image {
    width: 150px;
    height: 77px;
  }
}
</style>
