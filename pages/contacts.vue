<template>
  <div>
    <main>
      <h1>Contacts</h1>
      <h2>Uzhgorod – head office</h2>
      <div class="cards">
        <div>
          <h3>Office</h3>
          <p>
            Address: Ukraine, 88018, Uzhgorod, Lva Tolstoho str., 10b<br />
            Phone: <a href="tel:+380000000000">+ (380) 000 00 00 00</a><br />
            E-mail: office@wpes.com.ua
          </p>
        </div>
        <div>
          <h3>Buying department</h3>
          <p>
            Phone: <a href="tel:+380000000000">+(380) 000 00 00 00</a><br />
            E-mail: buy@wpes.com.ua
          </p>
        </div>
      </div>

      <div class="cards">
        <div>
          <h3>Sales department</h3>
          <p>
            Phone: <a href="tel:+380000000000">+(380) 000 00 00 00</a><br />
            E-mail: sell@wpes.com.ua
          </p>
        </div>
        <div>
          <h3>Logistics department</h3>
          <p>
            Phone: <a href="tel:+380000000000">+(380) 000 00 00 00</a><br />
            E-mail logistic@wpes.com.ua
          </p>
        </div>
      </div>

      <div class="cards">
        <div>
          <h2>Main warehouse and production facility</h2>
          <p>
            Svaliava, Pershotravneva str., 64<br />
            Phone: <a href="tel:+380000000000">+(380) 000 00 00 00</a>
          </p>
        </div>
      </div>

      <div class="cards">
        <div>
          <h2>Kyiv</h2>
          <p>
            Kyiv region, Sofiyivska Borshchagivka, 48B<br />
            Phone: <a href="tel:+380000000000">+(380) 000 00 00 00</a>
          </p>
          <p>
            Kyiv, Sadova str., 33/2<br />
            Phone: <a href="tel:+380000000000">+(380) 000 00 00 00</a>
          </p>
        </div>
        <div>
          <h2>Lviv</h2>
          <p>
            Lviv, Gorodotska str., 367<br />
            Phone: <a href="tel:+380000000000">+(380) 000 00 00 00</a>
          </p>
        </div>
      </div>
      <ContactUsForm />
    </main>
  </div>
</template>

<script>
import ContactUsForm from '~/components/ContactUsForm'
export default {
  components: {
    ContactUsForm
  }
}
</script>

<style lang="scss" scoped>
.cards {
  margin-bottom: 25px;
  > div {
    width: 50%;
    float: left;
  }
  &::after {
    display: block;
    content: '';
    clear: both;
  }

  position: relative;
  padding-right: 15px;
  padding-left: 15px;
}
.container {
  display: grid;
  grid:
    'nav nav nav' 75px
    '. main .' auto
    '. form .' auto
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
