<template>
  <div>
    <main>
      <h1>Pallet sales and manufacture</h1>
      <h2>Selling pallets</h2>
      <p>
        We are Ukrainian wooden pallet manufacturer that boasts of quality and reliable production. Our<strong>
          pallets, european pallets, custom pallets and firewood logs</strong
        >
        made a name for WPES company. Also,<strong> we have delivery service</strong> and so our products moves along
        the full cycle from production facility to our customers.
      </p>
      <img
        src="~/assets/pallets/pallets-1.png"
        alt="pallets EPAL EUR"
        width="300px"
        height="250px"
        style="float: right"
      />
      <p>
        It is not a secret that potential clients have high expectations towards the package for their goods. They
        expect pallets to be economical, practical and ecological, and we meet them all. We offer
        <strong>wholesale pallets and serve individual orders</strong>, as well. Since we are one of the direct pallet
        manufacturers, you have a rare opportunity to order custom pallets in our company. We offer pallets of all types
        and sizes. Also, we have used wood pallets for sale.
      </p>
      <p>
        <strong>WPES (Wood Paletten Express Service)</strong> company guarantees high quality of production and meeting
        the deadlines when completing your orders.
      </p>
      <p>
        To buy euro pallets, <nuxt-link to="/contacts">contact our managers </nuxt-link>and we will assist you in
        selecting production that best suits your needs.
      </p>
      <h2>Pallet production</h2>
      <p>
        Head office and production facility of our company is located in Svaliava, in Carpathian region. Since our
        facilities are located in the woodland, delivery of certified wood (UA DALRU) is conducted on a regular basis.
      </p>
      <p>
        All over goods are produced in compliance with European standards (EPAL, UIC) and are made only of hardwood.
      </p>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid:
    'nav nav nav' 75px
    '. main .' auto
    / 1fr minmax(150px, 1170px) 1fr;

  grid-column-gap: 0px;
  grid-row-gap: 0px;
}
main {
  grid-area: main;
  h1 {
    margin-bottom: 50px;
  }
}
p {
  color: #727272;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.2px;
  line-height: 25px;
  margin: 0 0 20px;
}
ul {
  li {
    color: #727272;
    padding: 6px 0;
  }
  margin: 0 0 20px;
  padding: 0 0px 0px 20px;
}
table {
  td {
    border: 1px solid #e8e7e7;
    padding: 5px 10px;
  }
  border: 1px solid #e9e9e9;
  background-color: #fcfcfc;
  border-spacing: 0;
  letter-spacing: 0.5px;
  margin: 0 0 20px;
  text-align: left;
  table-layout: fixed;
  width: 100%;
}
h3 {
  font-size: 27px;
  line-height: 35px;
}
h2 {
  font-size: 30px;
}
h2,
h3 {
  font-weight: 400;
}
</style>
