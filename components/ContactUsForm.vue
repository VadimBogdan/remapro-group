<template>
  <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="contact">
    <input type="hidden" name="bot-field" />
    <input type="hidden" name="form-name" value="contact" />
    <div class="contact__essential">
      <p>
        Your Name (required)
        <br />
        <input
          v-model="name"
          type="text"
          name="your-name"
          placeholder="John Smith"
          size="40"
          aria-required="true"
          aria-invalid="false"
        />
      </p>
      <p>
        Your Email (required)
        <br />
        <input
          v-model="email"
          type="email"
          name="your-email"
          placeholder="youremail@gmail.com"
          size="40"
          aria-required="true"
          aria-invalid="false"
        />
      </p>
      <p>
        Your phone number (not-required)
        <br />
        <input
          v-model="tel"
          type="tel"
          name="your-tel"
          size="40"
          placeholder="+491-111-111-1111"
          aria-required="true"
          aria-invalid="false"
        />
      </p>
    </div>

    <div class="contact__additionalmsg">
      <p>
        Message (required)
        <br />
        <textarea
          v-model="msg"
          name="your-message"
          placeholder="I need to contact for..."
          cols="40"
          rows="10"
          aria-required="true"
          aria-invalid="false"
        ></textarea>
      </p>
    </div>

    <div class="form__submit">
      <input type="submit" value="Submit" />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      email: null,
      tel: null,
      msg: null
    }
  }
}
</script>

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
