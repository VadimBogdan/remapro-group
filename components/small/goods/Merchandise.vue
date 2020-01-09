<template>
  <div class="merch">
    <div class="merch__info">
      <a>
        <h3>{{ title }}</h3>
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
  }
}
</script>

<style lang="scss" scoped>
.merch {
  padding: 0 15px;
  margin-top: 100px;
  &:nth-child(even) {
    margin-left: 72.5%;
    .merch__info {
      transform: translate(-250px, 140px);
    }
  }
  &:nth-child(odd) {
    margin-right: 95%;
    .merch__info {
      transform: translate(515px, 130px);
    }
  }
  &:last-child {
    .merch__info {
      transform: translate(550px, 130px);
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
    font-size: 20px;
    line-height: 27px;
    margin: 0 0 12px;
  }
}
@media screen and (max-width: 1490px) {
  .merch {
    &:nth-child(even) {
      margin-left: 60%;
    }
    &:nth-child(odd) {
      margin-right: 70%;
    }
  }
}
@media screen and (max-width: 1250px) {
  .merch {
    &:nth-child(even) {
      margin-left: 45%;
    }
    &:nth-child(odd) {
      margin-right: 50%;
    }
  }
}
@media screen and (max-width: 950px) {
  .merch {
    &:nth-child(even) {
      margin-left: 30%;
    }
    &:nth-child(odd) {
      margin-right: 25%;
    }
  }
}
@media screen and (max-width: 800px) {
  .merch {
    &__image {
      width: 300px;
      height: 200px;
    }
    &:nth-child(even) {
      margin-left: 30%;
      .merch__info {
        transform: translate(-225px, 55px);
      }
    }
    &:nth-child(odd) {
      margin-right: 25%;
      .merch__info {
        transform: translate(300px, 25px);
      }
    }
    &:last-child {
      .merch__info {
        transform: translate(325px, 25px);
      }
    }
  }
}
@media screen and (max-width: 610px) {
  .merch {
    padding: 0 50px;
    &__image {
      width: 200px;
      height: 150px;
      margin-left: -25px;
    }
    &__info {
      position: relative;
    }
    &:nth-child(even) {
      margin-left: 0;
      .merch__info {
        transform: none;
      }
    }
    &:nth-child(odd) {
      margin-right: 0;
      .merch__info {
        transform: none;
      }
    }
    &:last-child {
      .merch__info {
        transform: none;
      }
    }
  }
}
</style>
