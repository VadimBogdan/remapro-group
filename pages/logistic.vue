<template>
  <div>
    <main>
      <h1>Logistics</h1>
      <p>
        <strong>Wood Paletten Express Services LLC</strong> has been providing transport and expeditionary services
        since 2009. After all this time, we became known as professionals at what we do and as a reliable business
        partner.
      </p>
      <p>
        <span style="font-weight: 400;"
          >Transport logistic is the system of delivery management, namely relocation of any material objects from one
          point of destination to another at the most optimal route. This is a well-thought logistics that ensures goods
          movement processes management. &nbsp;</span
        >
      </p>
      <p>
        <span style="font-weight: 400;"
          >Our company has <strong>its own vehicle fleet and delivery service</strong>. We provide
          <strong>load delivery services all over Ukraine and Europe</strong> every day of the year.
        </span>
      </p>
      <p>
        <span style="font-weight: 400;"
          >We guarantee delivery of the loads of any number and size to any point of destination. Regardless the the
          type of load you will always get it safe and sound.
        </span>
      </p>
      <p>
        <span style="font-weight: 400;"
          >We will help you to make the most optimal route and deliver your goods in the shortest time frames possible
          with minimal expenses and harmlessly to the objects of delivery. <a href="/contacts">Contact us</a> and
          we&nbsp;will answer all your questions.
        </span>
      </p>
      <p>
        <img
          class="attachment"
          src="~/assets/logistic/logistic-1.jpg"
          alt="map of pallets delivery"
          width="1024"
          height="360"
        />
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
