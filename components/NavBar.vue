<template>
  <div class="navbar_container">
    <div class="links_list">
      <div><a href="#">Test</a></div>
      <div><a href="#">ABRA</a></div>
      <div><a href="#">DELI</a></div>
      <div><a href="#">GGGGG</a></div>
      <div><a href="#">ROWWWWWWW</a></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar_container {
  @include nav-bkg;
  color: white;
  width: 15vw;
  .opener {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 150px;
    height: 48px;
  }
  .links_list {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    padding-top: 100px;
    > div {
      > a {
        padding-left: 15px;
      }
      > a:visited {
        color: white;
      }
      > a:hover {
        color: hotpink;
      }
    }
  }
}
</style>
