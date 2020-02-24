<template>
  <div>
    <main>
      <h1>Pallets EPAL / UIC</h1>
      <h2>Epal pallets</h2>
      <p>
        Wood pallets are used for shipping and storage of wide variety of goods. Due to fast increase of goods and
        service flow, the area of application of european pallets is widening on a constant basis. In turn, it requires
        strict quality control.
        <img
          src="~/assets/pallets/pallets-1.png"
          alt="pallets EPAL EUR"
          width="300px"
          height="250px"
          style="float: right"
        />
      </p>
      <p>
        <strong
          >WPES (Wood Paletten Express Service) is also a <a href="">certificated manufacturer of pallets</a> according
          to the UIC 435-2 standard from EPAL.</strong
        >
        European Pallet Association quality mark on the wood pallets of our company guarantees complete usage safety.
        Technology used for pallets production minimizes malfunction occurrence during shipping, loading and unloading.
      </p>
      <p>
        We manufacture three types of EPAL pallets:<strong
          >EPAL (1200 x 800 mm), EPAL 2 (1200 x 1000 mm) and EPAL 3 (1000 x 1200 mm)</strong
        >. Our company offers pallets of a various configuration and construction depending on the characteristics of
        load, ways of its shipping and storage. We can also implement new pallets design using the sketches of our
        clients.
      </p>
      <p>You will be pleasantly surprised with an affordable price at WPES</p>
      <p>EPAL certificate guarantees that the clients receive:</p>
      <ul>
        <li>Pallets made of first class wood</li>
        <li>
          Pallets with the load capacity up to 2000 kg
        </li>
        <li>
          Stability and durability of construction
        </li>
        <li>Multiple use production</li>
        <li>
          Confidence in the highest quality according to the recognized international standards
        </li>
      </ul>
      <table>
        <tbody>
          <tr>
            <td>Product category</td>
            <td>EPAL / UI</td>
          </tr>
          <tr>
            <td>Markin</td>
            <td>EUR</td>
          </tr>
          <tr>
            <td>Production standar</td>
            <td>UIC 435-</td>
          </tr>
          <tr>
            <td>Dimension</td>
            <td>800 x 1200 x 14</td>
          </tr>
          <tr>
            <td>Weigh</td>
            <td>
              >25>kg
            </td>
          </tr>
          <tr>
            <td>Load capacit</td>
            <td>
              >1500>kg
            </td>
          </tr>
          <tr>
            <td>Type of us</td>
            <td>Multiple us</td>
          </tr>
          <tr>
            <td>Way of entr</td>
            <td>4 way entr</td>
          </tr>
          <tr>
            <td>Safe for food shippin</td>
            <td>Ye</td>
          </tr>
          <tr>
            <td>Automatic truck loading syste</td>
            <td>Ye</td>
          </tr>
        </tbody>
      </table>
      <div class="attachment">
        <img src="~/assets/pallets/pallets-2.jpg" alt="Example of pallets" />
      </div>
      <h3>Our licences:</h3>
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
  .attachment {
    > img {
      max-width: 1024px;
      width: 100%;
      height: auto;
    }
  }
}
main {
  grid-area: main;
  h1 {
    margin-bottom: 50px;
  }
}
p {
  color: #3b3b3b;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.2px;
  line-height: 25px;
  margin: 0 0 20px;
}
ul {
  li {
    color: #3b3b3b;
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
