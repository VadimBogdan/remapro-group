<template>
  <div class="infobar_container">
    <div class="infobar_inner_container">
      <div class="flex-container">
        <div class="flex-item">
          <Logo />
        </div>
        <div class="flex-item">
          About us
        </div>
        <div class="flex-item">
          Production
        </div>
        <div class="flex-item">
          Technical Information
        </div>
        <div class="flex-item">
          EmptyEmpty
        </div>
        <div class="flex-item">
          Contacts
        </div>
        <div class="flex-item">
          <span>+38 068 675 78 79 <br>
            +38 000 000 00 00 <br>
            +38 000 000 00 00 <br>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'
export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
.infobar_container {
  height: 140px;
  position: fixed;
  padding: 14px 0;
  .infobar_inner_container {
    width: 1150px;
    margin: 0 auto;
    .logo {
      position: absolute;
      height: 100%;
      width: inherit;
    }
  }
}

.flex-container {
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-align-content: flex-start;
  -ms-flex-line-pack: start;
  align-content: flex-start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

@for $i from 2 through 7 {
  .flex-item:nth-child(#{$i}) {
    -webkit-order: 0;
    -ms-flex-order: 0;
    order: 0;
    -webkit-flex: 0 1 auto;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    -webkit-align-self: auto;
    -ms-flex-item-align: auto;
    align-self: auto;

    width: auto;
    height: auto;
    padding: 35px 0 0 20px;
  }
}

.flex-item:nth-child(1) {
  -webkit-order: 0;
  -ms-flex-order: 0;
  order: 0;
  -webkit-flex: 0 1 auto;
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  -webkit-align-self: auto;
  -ms-flex-item-align: auto;
  align-self: auto;

  width: auto;
  height: auto;
  padding: 15px 0 0 5px;
}
</style>
