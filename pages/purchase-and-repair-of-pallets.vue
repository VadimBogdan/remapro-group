<template>
  <div>
    <main>
      <h1>Purchase and repair of pallets</h1>
      <h2>We buy pallets</h2>
      <p>
        <strong>WPES (Wood Paletten Express Service)</strong> company is ready to buy new and used pallets on easy
        terms. We accept wooden pallets of all sizes and configurations. Our warehouses are located in Ukraine’s main
        cities and so we can receive goods in any location you need. We also
        <strong>offer pallet delivery by our own transport</strong>. Our company does everything to ensure that you sell
        pallets with no obstacles. We make timely payments on convenient terms.
      </p>
      <p>
        <strong>Purchasing pallets is one of the most important services</strong> in our company as we care about the
        natural resources preservation. We restore and repair damaged and used pallets and so they are reused again. If
        a pallet’s level of damages is too high and it cannot be repaired, we dismantle it to separate parts. Those that
        are in a good condition can be reused again later. So, our company ensures waste-free production.
      </p>
      <img
        src="~/assets/pallets/pallets-1.png"
        alt="pallets EPAL EUR"
        width="300px"
        height="250px"
        style="float: right"
      />
      <h2>Pallet repair</h2>
      <p>
        Due to the multiple use and carelessness, pallets often lose their attractive appearance and get cracks. To
        elongate their durability, we offer <strong>quality pallet repair</strong> regardless of their type and
        condition.
      </p>
      <p>
        WPES company repairs wooden pallets in spite of the level of damages. As soon as we receive them, our
        professional team will do everything to restore it and get pallets back in working order.
      </p>
      <p>
        Our repairmen have all necessary instruments at their disposal to conduct efficient repair as soon as possible.
        Since we understand the value time to our customers, you do not have to waste it for pallets delivery. You can
        use our delivery service for shipping pallets for repair.
      </p>
      <p>
        With us, you always receive quality service and may count on the optimal conditions of cooperation.
        <nuxt-link to="/contacts">Contact our sales department</nuxt-link> to start our productive cooperation.
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
