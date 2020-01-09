<template>
  <div id="about-us">
    <h2>About Us</h2>
    <p>
      <strong>REMA PRO is a manufacturer and exporter of timber since 2011.</strong>
    </p>
    <p>
      <strong>Specializing in both on lumber from coniferous and deciduous as well as firewood.</strong>
    </p>
    <p>
      Zhytomyr timber processing plant is part of a large industrial group of companies GK. "Manovar", the production of
      which are located on the territory of the Russian Federation and Ukraine, customers are provided with product
      worldwide. We provide comprehensive service to customers with their product quality and worldwide supply network.
    </p>
    <p>
      We have been working in the pallet industry since 1997, and we have not lose our passion to provide quality
      services and improve until today. WPES is an EPAL pallets manufacturer and has a license issued by the European
      Pallet Association.
    </p>
    <h3>Our Mission</h3>
    <p>
      <span id="about-us__mission__quote"
        >To control the maximum of work processes by integrating direct communication channels. We strive to meet and
        exceed customers&#10076; expectations and industry standards.</span
      >
      It helps our customers to reduce cash costs and time.
    </p>
  </div>
</template>

<style lang="scss" scoped>
#about-us {
  grid-area: aboutUs;
  &__mission__quote {
    &::before {
      content: '\0275D';
      margin-right: 2px;
    }
    &::after {
      content: '\0275E';
      margin-left: 2px;
    }
  }
  strong {
    font-weight: 400;
  }
  h2 {
    margin: 70px 0 35px;
    font-size: 30px;
    font-weight: 400;
  }
  h3 {
    padding-left: 25px;
    padding-top: 10px;
    font-size: 26px;
    font-weight: 200;
    margin: 0px 0px 30px;
  }
  p {
    color: #727272;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0.2px;
    line-height: 27px;
    margin: 0 0 20px;
  }
}
@media screen and (max-width: 1200px) {
  p {
    padding: 0px 70px;
  }
  h2 {
    padding-left: 10px;
  }
}
@media screen and (max-width: 550px) {
  p {
    padding: 0px 50px;
  }
}
</style>
