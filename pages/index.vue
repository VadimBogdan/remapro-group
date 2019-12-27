<template>
  <div class="container">
    <NavInfoBar class="infobar" />
    <PhotoCarousel class="carousel" />
    <Goods class="goods" />
    <AboutUs />
    <ContactForm />
    <Footer />
  </div>
</template>

<script>
import PhotoCarousel from '@/components/PhotoCarousel'
import NavInfoBar from '@/components/NavInfoBar'
import AboutUs from '@/components/AboutUs'
import Goods from '@/components/Goods'
import ContactForm from '@/components/ContactUsForm'
import Footer from '@/components/Footer'

export default {
  components: {
    PhotoCarousel,
    NavInfoBar,
    AboutUs,
    Goods,
    ContactForm,
    Footer
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid:
    'nav nav nav' 75px
    'carousel carousel carousel' auto
    '. goods .' auto
    '. aboutUs .' auto
    '. form .' auto
    'footer footer footer' auto
    / 1fr minmax(150px, 1170px) 1fr;

  // grid-template-columns: ;repeat(2, 1fr)
  // grid-template-rows: 150px auto repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  // background-size: cover;
}
</style>
