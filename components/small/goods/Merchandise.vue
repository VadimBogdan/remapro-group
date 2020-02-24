<template>
  <div class="merch">
    <div class="merch__info">
      <a @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
        <h3>{{ title }}</h3>
        <div class="moving-border"><div></div></div>
      </a>
      <slot></slot>
    </div>

    <img :src="require('~/assets/merch/' + src + '.jpg')" alt="merch" class="merch__image" />
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
  },
  data() {
    return {
      width: 10
    }
  },
  mounted() {
    this.width = this.$el.querySelector('.merch__info > a').offsetWidth
    this.$el.querySelector('.moving-border').style.width = `${this.width}px`
    this.$el.querySelector('.moving-border').style.clip = `rect(0px ${this.width / 2}px 1px ${this.width / 2}px)`
  },
  methods: {
    handleMouseLeave() {
      this.$el.querySelector('.moving-border').style.clip = `rect(0px ${this.width / 2}px 1px ${this.width / 2}px)`
    },
    handleMouseOver() {
      this.$el.querySelector('.moving-border').style.clip = `rect(0px ${this.width}px 1px 0px)`
    }
  }
}
</script>

<style lang="scss" scoped>
.merch {
  .moving-border {
    position: absolute;
    overflow: hidden;
    width: 130px;
    transform: translateY(-10px);
    transition: clip 250ms ease-in-out;

    > div {
      position: relative;
      border-top: 1px solid #3f3b57;
    }
  }

  padding: 0 15px;
  margin-top: 100px;
  opacity: 0.15;
  transition: opacity 650ms ease-in-out, transform 550ms ease-in-out;
  &:nth-child(even) {
    margin-left: 60%;
    transform: translate(100px);
    .merch__info {
      transform: translate(-150px, 140px);
    }
  }
  &:nth-child(odd) {
    transform: translate(-100px);
    margin-right: 70%;
    .merch__info {
      transform: translate(465px, 130px);
    }
  }
  &:last-child {
    .merch__info {
      transform: translate(500px, 130px);
    }
  }
  ul {
    margin: 0 0 20px;
    padding: 0 0px 0px 20px;
  }
  li {
    color: #7a7a7a;
    padding: 6.5px 0;
  }
  &__info {
    position: absolute;
  }
  &__image {
    width: 500px;
    height: 400px;
  }
  h3 {
    display: inline-block;
    font-size: 20px;
    line-height: 27px;
    margin: 0 0 12px;
  }
}
@media screen and (max-width: 1260px) {
  .merch {
    &__image {
      width: 400px;
      height: 300px;
    }
    &:nth-child(even) {
      .merch__info {
        transform: translate(-190px, 90px);
      }
    }
    &:nth-child(odd) {
      .merch__info {
        transform: translate(375px, 75px);
      }
    }
    &:last-child {
      .merch__info {
        transform: translate(400px, 75px);
      }
    }
  }
}
@media screen and (max-width: 1160px) {
  .merch {
    &__image {
      width: 300px;
      height: 200px;
    }
    &:nth-child(even) {
      .merch__info {
        transform: translate(-190px, 40px);
      }
    }
    &:nth-child(odd) {
      .merch__info {
        transform: translate(300px, 30px);
      }
    }
    &:last-child {
      .merch__info {
        transform: translate(320px, 30px);
      }
    }
  }
}
@media screen and (max-width: 700px) {
  .merch {
    &__info {
      position: relative;
      margin-left: 55px;
    }
    &:nth-child(even) {
      .merch__info {
        transform: none;
        margin-left: 70px;
      }
    }
    &:nth-child(odd) {
      .merch__info {
        transform: none;
      }
    }
    &:last-child {
      .merch__info {
        transform: none;
        margin-left: 105px;
      }
    }
  }
}
@media screen and (max-width: 500px) {
  .merch {
    display: inline-grid;
    &:nth-child(n) {
      margin-left: 0;
      margin-right: 0;
      .merch__info {
        transform: none;
        margin: 0 auto;
        ul {
          list-style-position: inside;
          padding: 0;
        }
      }
    }
    &:last-child {
      .merch__image {
        margin-left: -15%;
      }
    }
  }
}
</style>
