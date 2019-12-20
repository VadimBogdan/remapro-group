<template>
  <form name="contact" method="POST" data-netlify="true" class="contact">
    <div class="contact__essential">
      <p>
        Ваше имя (Обязательно)<br>
        <span class="wpcf7-form-control-wrap your-name"><input
          type="text"
          name="your-name"
          value=""
          size="40"
          class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
          aria-required="true"
          aria-invalid="false"
        ></span>
      </p>
      <p>
        Ваш Email (Обязательно)<br>
        <span class="wpcf7-form-control-wrap your-email"><input
          type="email"
          name="your-email"
          value=""
          size="40"
          class="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email"
          aria-required="true"
          aria-invalid="false"
        ></span>
      </p>
      <p>
        Ваш телефон (Обязательно) <br>
        <span class="wpcf7-form-control-wrap tel-375"><input
          type="tel"
          name="tel-375"
          value=""
          size="40"
          class="wpcf7-form-control wpcf7-text wpcf7-tel wpcf7-validates-as-required wpcf7-validates-as-tel"
          aria-required="true"
          aria-invalid="false"
        ></span>
      </p>
    </div>

    <div class="contact__additionalmsg">
      <p>
        Сообщение (Обязательно)<br>
        <span class="wpcf7-form-control-wrap your-message"><textarea
          name="your-message"
          cols="40"
          rows="10"
          class="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required"
          aria-required="true"
          aria-invalid="false"
        /></span>
      </p>
    </div>
    <div class="form__submit">
      <p><input type="submit" value="Отправить" class="wpcf7-form-control wpcf7-submit"></p>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.contact {
  grid-area: form;
  padding: 0 22%;
  &__additionalmsg {
    float: right;
  }
  &__essential {
    float: left;
  }
  // &__submit {

  // }
}
</style>
