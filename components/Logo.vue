<template>
  <div class="remapro-logo">
    <img src="~/assets/remapro_logo.png" alt="company logo" class="company_logo" width="85px">
  </div>
</template>

<style lang="scss" scoped>
.company_logo {
  height: 85px;
  // border-radius: 50%;
  // box-shadow: 0px 0px 14px 5px rgba(255, 253, 253, 0.4);
}
@media screen and (max-width: 1550px) {
  .company_logo {
    transform: translate(#{$Logo_width_offset}, #{$Logo_height_offset});
  }
}
@media screen and (max-width: 700px) {
  .company_logo {
    transform: translate(
      calc(#{$Logo_width_offset} - 3vw),
      calc(#{$Logo_height_offset} + 10vh)
    );
    width: 70px;
    height: 70px;
  }
}
@media screen and (max-width: 530px) {
  .company_logo {
    transform: translate(
      calc(#{$Logo_width_offset} - (1.5 * 6vw)),
      calc(#{$Logo_height_offset} + (1.5 * 12vh))
    );
  }
}
</style>
