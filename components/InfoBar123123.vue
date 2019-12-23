<template>
  <div class="infobar_container">
    <div class="infobar_outer_container">
      <div class="infobar_inner_container">
        <div class="flexnav">
          <div>
            <span
              >Production holding<br />
              GK Manovar</span
            >
          </div>
          <div>
            <span
              >Acceptance of<br />
              applications: +38 068 675 78 79</span
            >
          </div>
          <div>
            <span
              >Ukraine, Kyiv,<br />
              Malozemelna str. 75G, 02132, office 3</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flexnav {
  display: flex;
  color: white;
  width: 100vw;
  max-height: 165px;
  justify-content: space-evenly;
  text-align: center;
  overflow: hidden;
  > div {
    padding: 25px;
  }
}
@media screen and (max-width: 500px) {
  .flexnav {
    opacity: 0;
  }
}
</style>
