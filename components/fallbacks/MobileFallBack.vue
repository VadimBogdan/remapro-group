<template>
  <div id="mobile-fallback">
    <div id="mobile-fallback__header">
      <div id="mobile-fallback__header--mobile">
        <span> Sales: <a href="tel:+380000000000"> +(380) 00 000 00 00</a> </span><br />
        <span> Purchasing: <a href="tel:+380000000000">+(380) 00 000 00 00</a> </span>
      </div>
      <h1>
        Purchase, sales, production of all types of pallets
      </h1>
      <h2>
        Firewood for fireplaces. Delivery all over Ukraine and Europe
      </h2>
    </div>
    <div id="mobile-fallback__header--buttons">
      <a href="" :class="linksAnim" @click.prevent @touchstart="isTouched = true" @touchend="isTouched = false"
        >Details</a
      >
      <a href="" :class="linksAnim" @click.prevent @touchstart="isTouched = true" @touchend="isTouched = false"
        >Contacts</a
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isTouched: false
    }
  },
  computed: {
    linksAnim() {
      return {
        'climb-down': this.isTouched
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#mobile-fallback {
  grid-area: carousel;
  height: 350px;
  width: 100%;
  background: url('~assets/background.jpg');
  background-position: -500px, -500px;

  visibility: hidden;
  &__header {
    width: 85%;
    margin: 25px auto;
    background-color: rgba(255, 255, 255, 0.85);
    padding: 10px 20px;
    &--mobile {
      text-align: center;
      span,
      a {
        font-size: 16px;
        font-family: 'Open Sans';
        color: #000;
        line-height: 1.6;
      }
    }
    &--buttons {
      text-align: center;
      a {
        display: block;
        margin: 10px auto;
        font-size: 16px;
        color: #fff;
        text-transform: uppercase;
        padding: 7px 15px;

        border-radius: 5px;
        width: 60%;

        background-color: #000000;
        box-shadow: 0 3px 0 0 #3f3b57;
        &:active {
          box-shadow: 0 0px 0 0 #3f3b57;
          transform: translateY(3px);
        }
      }
    }
  }
  h1 {
    text-align: center;
    margin: 30px auto 15px;
    font-size: 26px;
    font-weight: bold;
    text-transform: uppercase;
  }
  h2 {
    font-size: 18px;
    text-align: center;
    margin: 0;
  }
  h1,
  h2 {
    line-height: 1.1;
  }
}
</style>
