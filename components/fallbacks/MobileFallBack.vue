<template>
  <div id="mobile-fallback">
    <div id="mobile-fallback__header">
      <div id="mobile-fallback__header--mobile">
        <span>Sales:<a href="tel:+380000000000">+(380) 00 000 00 00</a></span>

        <br />
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
      <a class="gotoButton" href="" @click.prevent="scrollToAbout">About</a>
      <a class="gotoButton" href="" @click.prevent="scrollToContact">Contact us</a>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    scrollToAbout() {
      const top = document.getElementById('about-us').getBoundingClientRect().top + 150
      window.scroll({ top, behavior: 'smooth' })
    },
    scrollToContact() {
      const top = document.getElementById('contact').getBoundingClientRect().top - 80
      window.scroll({ top, behavior: 'smooth' })
    }
  }
}
</script>

<style lang="scss" scoped>
#mobile-fallback {
  grid-area: carousel;
  height: 450px;
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
